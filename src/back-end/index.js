const conf = require('../res/config');
var fs = require('fs');
var https = require('https');
var bcrypt = require('bcrypt');
var crypto = require('crypto');
var base64 = require('base64url');
var sqlite = require('sqlite3');


var db = new sqlite.Database(conf.databaseFile);

var privateKey  = fs.readFileSync(conf.privateKeyPath, 'utf8');
var certificate = fs.readFileSync(conf.certificatePath, 'utf8');


var express = require('express');
var cors = require('cors');
var bodyParser = require('body-parser');
var app = module.export =  express();
// var urlencodedParser = bodyParser.urlencoded({ extended: false })
var jsonParser = bodyParser.json();

app.use(cors());


function internalError(res, message) {
    console.error("[ERROR] " + message);
    return res.status(500).json({status: "error", message: message});
  }
  function badRequest(res, message) {
    return res.status(403).json({status: "error", message: message});
  }

function restrict(req, res, next) {
    if(!req.headers.authorization)
        return badRequest(res, "Missing Authorization Header");
    let token = req.headers.authorization.split(" ")[1];
    db.get("SELECT * FROM users WHERE accesstoken=?", token, (err, data) => {
        if(err || !data) {
            console.log("Invalid Token:" + req.headers.authorization);
            return badRequest(res, "Invalid Access Token")
        } else {
            req.username = data["username"];
            next();
        }
    })
}

app.post('/login', jsonParser, function (req, res) {
    if(!req.body.username || !req.body.password) {
        return badRequest(res, "Required username and password");
    }

    db.get("SELECT * FROM users WHERE username=?", req.body.username, (err, data) => {
        if(err)
            return internalError(res,err)
        if(!data)
            return badRequest(res, "User does not exists");
        if(!bcrypt.compareSync(req.body.password, data["password"]))
            return badRequest(res, "Wrong Username or Passsword");
        res.json({token: data["accesstoken"]});
    })
});

app.post('/register', jsonParser, function(req, res) {
    if(!req.body.username || !req.body.password) {
        return badRequest(res, "Required username and password");
    }
    crypto.randomBytes(32, (err, token) => {
        if(err){
            console.log(err);
            return;
        }
        bcrypt.genSalt(10)
            .then(salt => bcrypt.hash(req.body.password, salt))
            .then(hash => {
                const encodedToken = base64(token)
                db.run("INSERT INTO users (username, password, role, accesstoken) VALUES (?, ?, ?, ?)", req.body.username, hash, 'USER', encodedToken, (err)=> {
                    if(err)
                        return internalError(res,err);
                    res.send({token: encodedToken});
                });
            })
    })
}); 

function addItem(res, table, username, item) {
    db.run("INSERT INTO " + table + " (id, user, date, amount, comment) VALUES (?, ?, ?, ?, ?)",
        item.id, username, item.date, item.amount, item.comment, (err) => {
        if(err) {
            console.log("Failed to insert: " + err);
            return badRequest(req, "Could not add item")
        } 
        return res.sendStatus(200);
    })
}

function sendTable(res, table, username) {
    db.all("SELECT * FROM " + table + " WHERE user=?", username, (err, rows) => {
        if(err){
            console.log("Could not get Table: " + table + " for user " + username + ": " + err);
            return internalError(res, "Failed to fetch " + table);
        }
        return res.send(rows);
    })
}

function deleteItem( res, table, username, id) {
    db.run("DELETE FROM " + table + " WHERE user=? AND id=?", username, id, (err) => {
        if(err)
            return internalError(res, "Could not delete Item: " + err);
        return res.sendStatus(200);
    })
}

function handleList(req, res, table) {
    if(req.body.action === "ADD"){
        addItem(res, table, req.username, req.body.item)
    } else if(req.body.action === "GET") {
        sendTable(res, table, req.username);
    } else if(req.body.action === "DELETE") {
        deleteItem(res, table, req.username, req.body.id);
    } else {
        return badRequest(res, "Only ADD | GET | DELETE are valid actions");
    }
}


app.post('/payments', jsonParser, restrict, function(req, res) {
    handleList(req, res, "payments");
});

app.post('/deposits', jsonParser, restrict, function(req, res) {
    handleList(req, res, "deposits");
});

app.get("/test", function(_, res) {
    res.send("TEST");
});

var httpsServer = https.createServer({key: privateKey, cert: certificate}, app);
httpsServer.listen(conf.apiPort, () => console.log("Listening on Port " + conf.apiPort + " (HTTPS)"));
