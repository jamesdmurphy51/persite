const express = require('express');

console.log('1');

//return express app
const app = express();

console.log('2');

//handle root page request
app.get(['/', 'index.html'], function(req, res){
    res.sendFile(__dirname + '/public/index-1.html')
});

console.log('3');

//.....so we dont need to create seperate paths for all the static files
app.use(express.static('public'));

console.log('4');

//activate server

app.listen(80, '104.236.151.230', function(){
    console.log('App listening on port 80');
});

console.log('5');
/*
app.listen(8080, '127.0.0.1', function(){
    console.log('App listening on port 8080');
});
*/