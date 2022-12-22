import { apiPort } from '../res/config';
var secretToken = "1d794e0a0f9df0ac77e3800c757306f9";

var fs = require('fs');
var https = require('https');
var privateKey  = fs.readFileSync('C:/Users/Patrick/.ssh/selfsigned.key', 'utf8');
var certificate = fs.readFileSync('C:/Users/Patrick/.ssh/selfsigned.crt', 'utf8');

const paymentFile = process.cwd()+"/paymentData.json";
const depositFile = process.cwd()+"/depositData.json";

var paymentData = JSON.parse(fs.readFileSync(paymentFile, "utf-8")).payments;
var depositData = JSON.parse(fs.readFileSync(depositFile, "utf-8")).deposits;

var credentials = {key: privateKey, cert: certificate};
var express = require('express');

var hashCreator = require('pbkdf2-password');
var hasher = hashCreator();
var cors = require('cors');
var bodyParser = require('body-parser');
// const conf = require('../res/config');

var app = module.export =  express();


// var urlencodedParser = bodyParser.urlencoded({ extended: false })
var jsonParser = bodyParser.json();

app.use(cors());


// dummy database
var users = {
    pb: { name: 'pb' }
};

hasher({ password: '5bd773f55ef2c4e7b37771f8594a53a3' }, function (err, pass, salt, hash) {
    if (err) throw err;
    // store the salt & hash in the "db"
    users.pb.salt = salt;
    users.pb.hash = hash;
});

// Authenticate using our plain-object database of doom!
function authenticate(name, pass, fn) {
    //if (!module.parent) 
    console.log('authenticating %s', name);
    var user = users[name];
    // query the db for the given username
    if (!user) return fn(null, null)
    // apply the same algorithm to the POSTed password, applying
    // the hash against the pass / salt, if there is a match we
    // found the user
    hasher({ password: pass, salt: user.salt }, function (err, pass, salt, hash) {
      if (err) return fn(err);
      if (hash === user.hash) return fn(null, user)
      fn(null, null)
    });
}

function restrict(req, res, next) {
    if (req.body.token === secretToken) {
      next();
    } else {
        res.sendStatus(403);
    }
}



app.use('/restricted', restrict, (req, res) => {
    res.send({
        token: "This is a secret token"
    });
});

app.post('/login', jsonParser, function (req, res, next) {
    
    authenticate(req.body.username, req.body.password, function(err, user){
        if (err) return next(err)
        if (user) {
            res.send({ token: secretToken});
        } else {
            res.sendStatus(403);
        }
    });
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
        fs.writeFileSync(paymentFile, JSON.stringify({"payments":paymentData}))
        res.sendStatus(200);
    } else if(req.body.action === "GET") {
        res.send(paymentData);
    } else if(req.body.action === "DELETE") {
        let deleted = removeItemFromList(paymentData, req.body.id);
        if(!deleted) {
            console.log("Item was not found: "+ req.body.id);
            res.sendStatus(400);
            return;
        }
        fs.writeFileSync(paymentFile, JSON.stringify({"payments":paymentData}))
        res.sendStatus(200);
    } else {
        res.sendStatus(400);
    }
});

app.post('/deposits', jsonParser, restrict, function(req, res, next) {
    if(req.body.action === "ADD"){
        depositData.push(req.body.item);
        fs.writeFileSync(depositFile, JSON.stringify({"deposits":depositData}))
        res.sendStatus(200);
    }else if(req.body.action === "GET") {
        res.send(depositData);
    } else if(req.body.action === "DELETE") {
        let deleted = removeItemFromList(depositData, req.body.id);
        if(!deleted) {
            console.log("Item was not found:" + req.body.id);
            res.sendStatus(400);
            return;
        }
        fs.writeFileSync(depositFile, JSON.stringify({"deposits":depositData}))
        res.sendStatus(200);
    } else {
        res.sendStatus(400);
    }
});

app.get("/test", function(req,res) {
    res.send("TEST");
});

var httpsServer = https.createServer(credentials, app);

httpsServer.listen(apiPort, () => console.log("Listening on Port " + apiPort + " (HTTPS)"));
