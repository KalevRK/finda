var express = require('express');
var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/mvp');

var app = express();

module.exports.app = app;

app.get('/', function (req, res) {
  res.send('This is a server response.');
});

app.listen(5309);
