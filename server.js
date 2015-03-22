var express = require('express');
var bodyParser = require('body-parser');
var morgan = require('morgan');
var mongoose = require('mongoose');

var app = express();

mongoose.connect('mongodb://localhost:27017/mvp');
app.use(express.static(__dirname + '/public'));
app.use(morgan('dev'));
app.use(bodyParser.json());


// Mongoose model
var Place = mongoose.model('Place', {
    name: String,
    place_id: String,
    votes: {type: Number, default: 0}
});
 
// routes

// Get all of the places
app.get('/api/places', function(req, res) {
    Place.find(function(err, places) {
        if (err) {
            res.send(err);
        }

        res.json(places);
    });
});

// Create a new place
app.post('/api/places', function(req, res) {
  // create a new Place document in the database
  Place.create({
    name: req.body.name,
    place_id: req.body.place_id
  }, function (err, place) {
    if (err) {
        res.send(err);
    }
    
    // if the new Place was created successfully then
    // retrieve all of the places from the database and return them
    // to the client
    Place.find(function(err, places) {
        if (err) {
            res.send(err);
        }

        res.json(places);
    });

  });
});

// Update the vote count on a specific place
app.post('/api/places/:_id', function(req, res){
    Place.findOne({'_id': req.params._id}, function(err, place) {
      if (err) {
        res.send(err);
      }

      // TODO: Call a function to retrieve and increment the vote count
      // Don't use the value passed from the client
      place.votes = req.body.votes;

      place.save(function (err) {
        if (err) {
            res.send(err);
        }

        res.send(place);

      });

    });
});

// listen on server
app.listen(5309);
console.log('Listening on port 5309');
