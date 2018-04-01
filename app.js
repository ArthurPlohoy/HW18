var express = require('express');
var bodyParser = require('body-parser');
var nodemailer = require('nodemailer');
var app = express();


var transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'plohoya@gmail.com',
    pass: '**********'
  }
});

app.set('view engine', 'pug');

app.use( bodyParser.urlencoded( { extended: true }));
app.use(express.static(__dirname + '/public'));
app.use(express.static(__dirname + '/node_modules/bootstrap/dist'));

app.get('/about', function (req, res){
	res.render('about.pug', { title: 'about' });
});

app.get('/', function (req, res){
	res.render('index.pug', { title: 'index' });
});

app.get('/contact', function (req, res){
	res.render('contact.pug', { title:'contact'});
});

app.post('/contact', function (req, res){
	var mailOptions = {
  	from: 'plohoya@gmail.com ',
  	to: 'plohoya@gmail.com ',
  	subject: 'сообщение',
  	text: req.body.text
	};

	transporter.sendMail(mailOptions, function(error, info){
  	if (error) {
    	console.log(error);
  	} else {
    	console.log('Email sent: ' + info.response);
  	}
	});
  res.redirect('/contact');
});

app.listen(3000, function(){
	console.log ('Go to localhost 3000');
});
