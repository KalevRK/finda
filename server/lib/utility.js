var request = require('request');

exports.comparePassword = function(attemptedPassword, actualPassword, callback) {
  var passwordCorrect = (attemptedPassword === actualPassword);
  callback(passwordCorrect);
};