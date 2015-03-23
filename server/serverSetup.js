var express = require('express');
var mongoose = require('mongoose');

// create the Express app
var app = express();

// create the Mongoose connection to the MongoDB
// Be able to connect to the hosted MongoDB when deployed
// or the local MongoDB when run locally
mongoURI = process.env.MONGOLAB_URI || 'mongodb://localhost:27017/mvp';
mongoose.connect(mongoURI);

// confirm that the database connection is open
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
    console.log('MongoDB connection is open');
});

// connect the Express app to the middleware file
require('./config/middleware.js')(app, express);

module.exports.app = app;
module.exports.db = db;
