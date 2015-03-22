var express = require('express');
var app = require('./server/serverSetup.js').app;

// use the server's port if deployed
// otherwise use the localhost port 5309
var port = process.env.PORT || 5309;

// serve up the static index.html file when the client
// requests the home directory of the site
app.use(express.static(__dirname + '/public'));

// listen for requests on the specified port
app.listen(port);
console.log('Server is now listening on port ', port);
