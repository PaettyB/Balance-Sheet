// This code is heavily inspired by the example code:
// https://github.com/expressjs/express/blob/master/examples/auth/index.js

var fs = require('fs');
var http = require('http');
var https = require('https');
var privateKey  = fs.readFileSync('C:/Users/Patrick/.ssh/selfsigned.key', 'utf8');
var certificate = fs.readFileSync('C:/Users/Patrick/.ssh/selfsigned.crt', 'utf8');

var credentials = {key: privateKey, cert: certificate};
var express = require('express');

var hashCreator = require('pbkdf2-password');
var hasher = hashCreator();
var cors = require('cors');
var bodyParser = require('body-parser');
var path = require('path');
var session = require('express-session');

var app = module.export =  express();


var urlencodedParser = bodyParser.urlencoded({ extended: false })
var jsonParser = bodyParser.json();

app.use(cors());

app.use(session({
    resave: false, // don't save session if unmodified
    saveUninitialized: false, // don't create session until something stored
    secret: 'This is a secret token'
}));

// Session-persisted message middleware
app.use(function(req, res, next){
    var err = req.session.error;
    var msg = req.session.success;
    delete req.session.error;
    delete req.session.success;
    res.locals.message = '';
    if (err) res.locals.message = '<p class="msg error">' + err + '</p>';
    if (msg) res.locals.message = '<p class="msg success">' + msg + '</p>';
    next();
});

// dummy database
var users = {
    pb: { name: 'pb' }
};

hasher({ password: 'foobar' }, function (err, pass, salt, hash) {
    if (err) throw err;
    // store the salt & hash in the "db"
    users.pb.salt = salt;
    users.pb.hash = hash;
});

// Authenticate using our plain-object database of doom!
function authenticate(name, pass, fn) {
    //if (!module.parent) 
    console.log('authenticating %s:%s', name, pass);
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
    if (req.session.user) {
      next();
    } else {
      req.session.error = 'Access denied!';
      res.send("Access Denied");
      //res.redirect('/login');
    }
}

app.get('/', function(req, res){
    res.redirect('/login');
  });


app.use('/restricted', restrict, (req, res) => {
    res.send({
        token: "This is a secret token"
    });
});

app.post('/login', jsonParser, function (req, res, next) {
    
    authenticate(req.body.username, req.body.password, function(err, user){
        if (err) return next(err)
        if (user) {
            // Regenerate session when signing in
            // to prevent fixation
            req.session.regenerate(function(){
            // Store the user's primary key
            // in the session store to be retrieved,
            // or in this case the entire user object
            console.log(req.session);
            req.session.user = user;
            req.session.success = 'Authenticated as ' + user.name
                + ' click to <a href="/logout">logout</a>. '
                + ' You may now access <a href="/restricted">/restricted</a>.';
            res.send({ token: "testToken"});
            });
        } else {
            req.session.error = 'Authentication failed, please check your '
            + ' username and password.'
            + ' (use "tj" and "foobar")';
            res.redirect('/login');
        }
    });
  });


var httpServer = http.createServer(app);
var httpsServer = https.createServer(credentials, app);

httpServer.listen(8080, () => console.log("Listening on Port 8080 (HTTP)"));
httpsServer.listen(8443, () => console.log("Listening on Port 8443 (HTTPS)"));
