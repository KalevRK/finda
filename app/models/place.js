var db = require('../config');
var mongoose = require('mongoose');

var Place = mongoose.model('place', db.placeSchema);
module.exports = Place;