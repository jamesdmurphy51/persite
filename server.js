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
//root page
app.get(['/', 'index.html'], function(req, res){
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
    var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
               xoauth2: xoauth2.createXOAuth2Generator({
                   user: 'jamesdmurphy51@gmail.com',
                   clientId: '425687429415-hv4us89a20t3qaearu6hanqbtvlpsaen.apps.googleusercontent.com',
                   clientSecret: '6smTsFUrvprK6GqYZr8843WL',
                   refreshToken: ''
               })
           }
       });
    
    const mailOptions = {
        from: "James <jamesdmurphy51@gmail.com>", // sender address
        to: "jamesdmurphy51@gmail.com", // list of receivers
        subject: "Someone has messaged your website", // Subject line
        html: "<p>Name: " + req.body.fullName + "<br>Email: " + req.body.email + "<br>Message: " + req.body.msg + "</p>"
    };
    
    transporter.sendMail(mailOptions, function (err, info) {
        console.log("got this far")
        if(err)
          console.log(err)
        else
          console.log(info);
     });

});



//activate server
app.listen(80, '104.236.151.230', function(){
    console.log('App listening on port 80');
});

/*
app.listen(8080, '127.0.0.1', function(){
    console.log('App listening on port 8080');
});
*/