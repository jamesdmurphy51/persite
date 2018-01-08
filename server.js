const express = require('express');

//return express app
const app = express();

//handle root page request
app.get(['/', 'index.html'], function(req, res){
    res.sendFile(__dirname + '/public/index-1.html')
});

//handle download request
app.get('/downloadcv', function(req, res){
    var file = __dirname + '/public/downloads/JamesMurphyCV.pdf';
    res.download(file); // Set disposition and send it.
});

//.....so we dont need to create seperate paths for all the static files
app.use(express.static('public'));

//activate server

app.listen(80, '104.236.151.230', function(){
    console.log('App listening on port 80');
});

/*
app.listen(8080, '127.0.0.1', function(){
    console.log('App listening on port 8080');
});
*/