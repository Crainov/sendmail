
var express = require('express');
var Mailgun = require('mailgun-js');
var bodyParser = require('body-parser');

var app = express();

app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: true
}));


var api_key = 'key-3166b8b2de42edb6ec808d676aa87e38';


var domain = 'kanboard.projtest.info';


var from_who = 'bot@kanboard.projtest.info';


app.use(express.static(__dirname + '/js'));


app.set('view engine', 'jade')


app.get('/', function(req, res) {
    res.render('index', function(err, html) {
        if (err) {
            console.log(err);
        }
        else {
            res.send(html)
        };
    });
});

app.post('/submit', function(req,res) {
  console.log("sdfdsf");
    console.log(req.body);
    // var mailgun = new Mailgun({apiKey: api_key, domain: domain});
    //
    // var data = {
    //   from: from_who,
    //   to: req.params.mail,
    //   subject: 'Hello from Mailgun',
    //   html: "asdasfsdfszdfasdfasdf"
    // }
    //
    // mailgun.messages().send(data, function (err, body) {
    //     if (err) {
    //         res.render('error', { error : err});
    //         console.log("got an error: ", err);
    //     }
    //     else {
    //         res.render('submitted', { email : req.params.mail });
    //         console.log(body);
    //     }
    // });
});

app.get('/submit/:mail', function(req,res) {

    var mailgun = new Mailgun({apiKey: api_key, domain: domain});

    var data = {
      from: from_who,
      to: req.params.mail,
      subject: 'Hello from Mailgun',
      html: "asdasfsdfszdfasdfasdf"
    }

    mailgun.messages().send(data, function (err, body) {
        if (err) {
            res.render('error', { error : err});
            console.log("got an error: ", err);
        }
        else {
            res.render('submitted', { email : req.params.mail });
            console.log(body);
        }
    });
});

app.get('/validate/:mail', function(req,res) {
    var mailgun = new Mailgun({apiKey: api_key, domain: domain});

    var members = [
      {
        address: req.params.mail
      }
    ];
    mailgun.lists('NAME@MAILINGLIST.COM').members().add({ members: members, subscribed: true }, function (err, body) {
      console.log(body);
      if (err) {
            res.send("Error - check console");
      }
      else {
        res.send("Added to mailing list");
      }
    });

})

app.get('/invoice/:mail', function(req,res){
    //Which file to send? I made an empty invoice.txt file in the root directory
    //We required the path module here..to find the full path to attach the file!
    var path = require("path");
    var fp = path.join(__dirname, 'invoice.txt');
    //Settings
    var mailgun = new Mailgun({apiKey: api_key, domain: domain});

    var data = {
      from: from_who,
      to: req.params.mail,
      subject: 'An invoice from your friendly hackers',
      text: 'A fake invoice should be attached, it is just an empty text file after all',
      attachment: fp
    };


    //Sending the email with attachment
    mailgun.messages().send(data, function (error, body) {
        if (error) {
            res.render('error', {error: error});
        }
            else {
            res.send("Attachment is on its way");
            console.log("attachment sent", fp);
            }
        });
})


app.listen(3030);
