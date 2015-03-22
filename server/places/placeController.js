var Q = require('q');
var Place = require('./placeModel.js');

module.exports = {

  // retrieve all of the places in the database
  getAllPlaces: function(req, res, next) {

    // bind the Mongoose find method for the Place model
    // to allow for use of promises
    var findAllPlaces = Q.nbind(Place.find, Place);
    
    findAllPlaces({})
      .then(function(places) {
        // send back the list of places as JSON
        res.json(places);
      })
      .fail(function(err) {
        next(err);
      });
  },

  // add a new place to the database
  addPlace: function(req, res, next) {
    
    // bind the Mongoose find method for the Place model
    // to allow for use of promises
    var findAllPlaces = Q.nbind(Place.find, Place);

    // bind the Mongoose create method for the Place model
    // to allow for use of promises
    var createPlace = Q.nbind(Place.create, Place);

    // create a new document from the Place model
    var newPlace = {
      name: req.body.name,
      place_id: req.body.place_id
    };

    createPlace(newPlace)
      .then(function(createdPlace) {
        if (createdPlace) {
            // if the new Place was create successfully in
            // the database then retrieve all of the places
            // and send back to the client
            findAllPlaces({})
              .then(function(places) {
                // send back the list of places as JSON
                res.json(places);
              })
              .fail(function(err) {
                next(err);
              });
        }
      })
      .fail(function(err) {
        next(err);
      });
  },

  // update the vote count on an existing place
  updateVoteCount: function(req, res, next) {

    // bind the Mongoose findOneAndUpdate method for the Place model
    // to allow for use of promises
    var updatePlaceVoteCount = Q.nbind(Place.findOneAndUpdate, Place);

    var query = { '_id': req.params._id };

    updatePlaceVoteCount(query, { $inc: { votes: 1 } })
      .then(function(place) {
        if (place) {
            // if the place had its vote count updated successfully
            // then send back the updated list of places to the client
            findAllPlaces({})
              .then(function(places) {
                // send back the list of places as JSON
                res.json(places);
              })
              .fail(function(err) {
                next(err);
              });
        }
      })
      .fail(function(err) {
        next(err);
      });
  }
};
