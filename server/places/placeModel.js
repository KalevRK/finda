var mongoose = require('mongoose');

// define the schema for the Place model
var PlaceSchema = new mongoose.Schema({
  name: String,
  place_id: String,
  votes: {type: Number, default: 0}
});

// create and export the Place model
module.exports = mongoose.model('Place', PlaceSchema);
