const express = require('express');

//return express app
const app = express();

//middleware
app.use(express.static('public'));

var bodyParser = require('body-parser');
app.use(bodyParser.json());

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

//contact request
app.post('/contact', function(req, res){
    console.log(req.body); // parsed to JS object
    
    res.send(JSON.stringify(req.body)); //just bounce json right back
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