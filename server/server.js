var express = require('express');

var app = express();
console.log(__dirname + '/../client/');
app.use(express.static(__dirname + '/../client/'));
app.get('/', function(req, res){
  res.render('dev');
});

app.listen(3000);
