var express = require('express');
var bodyParser = require('body-parser');

var app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static('../public'));


// app.get('/', function(req, res) {
//     res.send('This is a simple response.');
// });

module.exports = app;