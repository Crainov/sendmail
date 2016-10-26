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
  else {
    // return res.sendStatus(401);
    return res.sendFile(path.resolve(__dirname, 'login.html'));
  }
};

app.use(express.static(path.resolve(__dirname, 'static')));
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: true
}));

var api_key = 'key-3166b8b2de42edb6ec808d676aa87e38';
var domain = 'kanboard.projtest.info';

var mailgun = new Mailgun({apiKey: api_key, domain: domain});
var list = mailgun.lists('bot@kanboard.projtest.info');

app.get('/maillist', function(req, res){
  list.members().list(function (err, members) {
    return res.json(members);
  });
});

// Logout endpoint
app.get('/logout', function (req, res) {
  req.session.destroy();
  res.redirect('/');
});

app.get('*', auth, function (req, res) {
  return res.sendFile(path.resolve(__dirname, 'index.html'));
});

app.post('/login', function (req, res) {
  if (!req.body.username || !req.body.password) {
    res.send('login failed');
  } else if(req.body.username === "ira" || req.body.password === "ira") {
    req.session.user = "ira";
    req.session.admin = true;
    return res.redirect('/');
  }
});

app.post('/delete', function(req, res){
  var delUser = req.body.email;
  list.members(delUser).delete(function (err, body) {
    // `data` is the member details
    res.json(body);
  });
});

app.post('/addusr', function(req, res) {
  var user = {
      subscribed: true,
      address: req.body.user.email,
      name: req.body.user.name,
      vars: req.body.user.vars};
  console.log(req.body);
  list.members().create(user, function (err, data) {
    // `data` is the member details
    console.log(err);
    console.log(data);
    res.json(err || data);
  });
});

app.post('/updusr', function(req, res) {
  console.log(req.body);
  var user = req.body.user.address;
  var vars = req.body.user.vars;
  list.members(user).update({vars: vars}, function (err, body) {
    console.log(body);
    res.json(body);
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
