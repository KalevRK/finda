var express = require('express');
var bodyParser = require('body-parser');

var handler = require('./lib/request-handler');

var app = express();

app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(__dirname + '/public'));


app.get('/', handler.renderIndex);

app.get('/login', handler.loginUserForm);
app.post('/login', handler.loginUser);
app.get('/logout', handler.logoutUser);

app.get('/signup', handler.signupUserForm);
app.post('/signup', handler.signupUser);

module.exports = app;