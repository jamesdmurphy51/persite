const express = require('express');

//return express app
const app = express();

//middleware
app.use(express.static('public'));

var bodyParser = require('body-parser');
app.use(bodyParser.json());

const nodemailer = require('nodemailer');
const xoauth2 = require('xoauth2');

//HANDLE PAGE REQS
//dum google page
app.get('/google495c73f1f9c05beb.html', function(req, res){
    res.sendFile(__dirname + '/google495c73f1f9c05beb.html')
});

//root page
app.get(['/', '/index.html'], function(req, res){
    res.sendFile(__dirname + '/public/index-1.html')
});

//download request
app.get('/downloadcv', function(req, res){
    var file = __dirname + '/public/downloads/JamesMurphyCV.pdf';
    res.download(file); // Set disposition and send it.
});


//NODEMAILER/CONTACT FORM
app.post('/contact', function(req, res){
    console.log(req.body); // parsed to JS object
    res.send(JSON.stringify(req.body)); //just bounce json right back
    
    //generate email
    let transporter = nodemailer.createTransport({
        host: 'smtp.office365.com',
        port: 587,
        secure: false, //true for 465 only
        auth: {
            user: 'james@jamesdavidmurphy.com',
            pass:  ''
        }
       });
    
    const mailOptions = {
        from: '"Administrator" <james@jamesdavidmurphy.com>', // sender address
        to: 'james@jamesdavidmurphy.com', // list of receivers
        subject: "Someone has messaged your website", // Subject line
        html: "<p>Name: " + req.body.fullName + "<br>Email: " + req.body.email + "<br>Message: " + req.body.msg + "</p>"
    };
    
    transporter.sendMail(mailOptions, function (err, info) {
        console.log("got this far")
        if(err)
          console.log(err)
        else
          console.log(info.messageId);
     });
});



//activate server

app.listen(80, '192.241.220.140', function(){
    console.log('App listening on port 80');
});


/*
app.listen(8080, '127.0.0.1', function(){
    console.log('App listening on port 8080');
});
*/