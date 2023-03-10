var secretToken = "1d794e0a0f9df0ac77e3800c757306f9";

const conf = require('../res/config');
var fs = require('fs');
var https = require('https');
var bcrypt = require('bcrypt');
var sqlite = require('sqlite3');

var db = new sqlite.Database(conf.databaseFile);

var privateKey  = fs.readFileSync(conf.privateKeyPath, 'utf8');
var certificate = fs.readFileSync(conf.certificatePath, 'utf8');

var paymentData = JSON.parse(fs.readFileSync(conf.paymentFile, "utf-8")).payments;
var depositData = JSON.parse(fs.readFileSync(conf.depositFile, "utf-8")).deposits;

var credentials = {key: privateKey, cert: certificate};
var express = require('express');

var hashCreator = require('pbkdf2-password');
var hasher = hashCreator();
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
    if (req.body.token === secretToken) {
      next();
    } else {
        return badRequest(res, "Token invalid");
    }
}

app.post('/login', jsonParser, function (req, res, next) {
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
        res.json({token: secretToken});
    })
});

app.post('/register', jsonParser, function(req, res, next) {
    if(!req.body.username || !req.body.password) {
        return badRequest(res, "Required username and password");
    }
    bcrypt.genSalt(10)
        .then(salt => bcrypt.hash(req.body.password, salt))
        .then(hash => {
            db.run("INSERT INTO users (username, password, role) VALUES (?, ?, ?)", req.body.username, hash, 'USER', (err)=> {
                if(err)
                    return internalError(res,err);
                res.send({token: secretToken});
            });
        })
}); 

function removeItemFromList(l, id){
    for(let i = l.length-1; i>=0; i--){
        if(l[i].id === id){
            l.splice(i,1);
            return true;
        }
    }
    return false;
}

app.post('/payments', jsonParser, restrict, function(req, res, next) {
    if(req.body.action === "ADD"){
        paymentData.push(req.body.item);
        fs.writeFileSync(conf.paymentFile, JSON.stringify({"payments":paymentData}))
        res.sendStatus(200);
    } else if(req.body.action === "GET") {
        res.send(paymentData);
    } else if(req.body.action === "DELETE") {
        let deleted = removeItemFromList(paymentData, req.body.id);
        if(!deleted) {
            console.log("Item was not found: "+ req.body.id);
            return badRequest(res, "Item not found. Please refresh the page");
        }
        fs.writeFileSync(conf.paymentFile, JSON.stringify({"payments":paymentData}))
        res.sendStatus(200);
    } else {
        return badRequest(res, "Only ADD | GET | DELETE are valid actions");
    }
});

app.post('/deposits', jsonParser, restrict, function(req, res, next) {
    if(req.body.action === "ADD"){
        depositData.push(req.body.item);
        fs.writeFileSync(conf.depositFile, JSON.stringify({"deposits":depositData}))
        res.sendStatus(200);
    }else if(req.body.action === "GET") {
        res.send(depositData);
    } else if(req.body.action === "DELETE") {
        let deleted = removeItemFromList(depositData, req.body.id);
        if(!deleted) {
            console.log("Item was not found:" + req.body.id);
            return badRequest(res, "Item not found. Please refresh the page");
        }
        fs.writeFileSync(conf.depositFile, JSON.stringify({"deposits":depositData}))
        res.sendStatus(200);
    } else {
        return badRequest(res, "Only ADD | GET | DELETE are valid actions");
    }
});

app.get("/test", function(req,res) {
    res.send("TEST");
});

var httpsServer = https.createServer(credentials, app);
httpsServer.listen(conf.apiPort, () => console.log("Listening on Port " + conf.apiPort + " (HTTPS)"));
