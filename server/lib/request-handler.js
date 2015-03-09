var request = require('request');
var db = require('../../app/config');
var util = require('../lib/utility');
var User = require('../../app/models/user');
var Place = require('../../app/models/place');

exports.renderIndex = function(req, res) {
    res.render('index');
};

exports.signupUserForm = function(req, res) {
    res.render('signup');
};

exports.loginUserForm = function(req, res) {
    res.render('login');
};

exports.logoutUser = function(req, res) {
    res.redirect('/login');
};

exports.loginUser = function(req, res) {
    var username = req.body.username;
    var password = req.body.password;
    User.findOne({'username': username}, function(err, data) {
        if (data) {
            util.comparePassword(password, data.password, function(match) {
                if (match) {
                    res.redirect('/');
                } else {
                    res.redirect('/login');
                }
            });
        }
    });
};

exports.signupUser = function(req, res) {
    var username = req.body.username;
    var password = req.body.password;

    User.findOne({'username': username}, function(err, data) {
        if (data) {
            console.log(username, ' already exists');
            res.redirect('/login');
        } else {
            var user = new User( {
                username: username,
                password: password
            });
            user.save(function(err, result) {
                if (err) {
                    console.error(err);
                    return res.send(404);
                }
                console.log(username, ' created account successfully');
            });
        }
    });
};

