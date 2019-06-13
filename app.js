var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var nodeMailer = require('nodemailer');

var app = express();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static(path.join(__dirname, 'public')));

app.get('/',(req,res)=>{
    res.render('index', {title: 'welcome'});
})
app.get('/about',(req,res)=>{
    res.render('about');
})
app.get('/contact',(req,res)=>{
    res.render('contact');
})
app.post('/contact/send', (req, res) => {
  console.log('Sucessfully posted');
  //transporter
  var transporter = nodeMailer.createTransport({
    service: 'Gmail',
    auth: {
      user: 'your email address',
      pass: 'your password'
    }
  });

  var mailOptions = {
    from: 'Marco del Carmen <jmdc@my.codergv.org>',
    to: req.body.email,
    subject: 'Nodemailer Testing',
    text: `You have a submission with the following details... Name: ${req.body.name} Email: ${req.body.email} Message: ${req.body.message}`,
    html: `<p>You have a submission with the following details...</p>
    <ul>
      <li>Name: ${req.body.name}</li>
      <li>Email: ${req.body.email}</li>
      <li>Message: ${req.body.message}</li>
    </ul>`
  };

  transporter.sendMail(mailOptions, (e, info) => {
    if(e) {
      console.log(e);
      res.redirect('/');
    } else {
      console.log(`Message Sent: ${info.response}`);
      res.redirect('/');
    }
  });
});
app.listen(3000);
console.log('server is running on port 3000');