var placeController = require('./placeController.js');

module.exports = function(app) {

  // route GET and POST request for /api/places
  app.route('/')
    .get(placeController.getAllPlaces)
    .post(placeController.addPlace);

  // route POST requests for /api/places/:_id
  app.route('/:_id')
    .post(placeController.updateVoteCount);
};
