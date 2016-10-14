var express = require('express');
var Mailgun = require('mailgun-js');
var bodyParser = require('body-parser');
var path = require('path');
var session = require('express-session');

var app = express();

app.use(session({
    secret: '2C44-4D44-WppQ38S',
    resave: true,
    saveUninitialized: true
}));

var auth = function(req, res, next) {
  if (req.session && req.session.user === "ira" && req.session.admin)
    return next();
  else
    return res.sendStatus(401);
};

app.use(express.static(path.resolve(__dirname, 'static')));
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: true
}));

var api_key = 'key-3166b8b2de42edb6ec808d676aa87e38';
var domain = 'kanboard.projtest.info';

var mailgun = new Mailgun({apiKey: api_key, domain: domain});
var list = mailgun.lists('bot@kanboard.projtest.info');


app.get('/login', function (req, res) {
  if (!req.query.username || !req.query.password) {
    res.send('login failed');
  } else if(req.query.username === "ira" || req.query.password === "ira") {
    req.session.user = "ira";
    req.session.admin = true;
    res.send("login success!");
  }
});

app.get('/maillist', function(req, res){
  list.members().list(function (err, members) {
    return res.json(members);
  });
});

// Logout endpoint
app.get('/logout', function (req, res) {
  req.session.destroy();
  res.send("logout success!");
});

app.get('*', auth, function (req, res) {
  return res.sendFile(path.resolve(__dirname, 'index.html'));
});

app.post('/delete', function(req, res){
  var delUser = req.body.email;
  list.members(delUser).delete(function (err, body) {
    // `data` is the member details
    res.json(body);
  });
});

app.post('/addusr', function(req, res) {
  console.log(req.body.email);
  var user = {
      subscribed: true,
      address: req.body.email,
      name: req.body.name,
      vars: {}};
  console.log(req.body);
  list.members().create(user, function (err, data) {
    // `data` is the member details
    console.log(err);
    console.log(data);
    res.json(data);
  });
});

app.post('/send', function(req,res) {
  var data = {
    from: "bot@kanboard.projtest.info",
    to: 'bot@kanboard.projtest.info',
    subject: 'Hello from Mailgun',
    html: req.body.message
  }
  mailgun.messages().send(data, function (err, body) {
      if (err) {
          console.log("got an error: ", err);
      }
      else {
          console.log(body);
          res.json(body);
      }
  });
});

app.listen(3030);
