var express = require('express');
var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/mvp');

module.exports.app = express();

app.get('/', function (req, res) {
  res.send('This is a server response.');
});
