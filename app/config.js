var path = require('path');
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

mongoose.connect('mongodb://localhost:27017/mvp');

module.exports.userSchema = new mongoose.Schema({
    username: String,
    password: String,
    friends: [{type: Schema.Types.ObjectId, ref: 'User'}],
    places: [{type: Schema.Types.ObjectId, ref: 'Place'}]
});

module.exports.placeSchema = new mongoose.Schema({
    name: String,
    place_id: String
});

