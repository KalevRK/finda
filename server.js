var express = require('express');
var bodyParser = require('body-parser');
var methodOverride = require('method-override')
var morgan = require('morgan');
var mongoose = require('mongoose');

var app = express();

mongoose.connect('mongodb://localhost:27017/mvp');
app.use(express.static(__dirname + '/public'));
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({'extended':'true'}));
app.use(bodyParser.json());
app.use(bodyParser.json({type: 'application/vnd.api+json'}));
app.use(methodOverride());



// Mongoose model
var Place = mongoose.model('Place', {
    name: String,
    place_id: String,
    votes: {type: Number, default: 0}
});

// routes

// GET all places
app.get('/api/places', function(req, res) {
    Place.find(function(err, places) {
        if (err) {
            res.send(err);
        }

        res.json(places);
    });
});

// POST a new place
app.post('/api/places', function(req, res) {
  Place.create({
    name: req.body.name,
    place_id: req.body.place_id
  }, function (err, place) {
    if (err) {
        res.send(err);
    }
    
    Place.find(function(err, places) {
        if (err) {
            res.send(err);
        }

        res.json(places);
    });

  });
});

app.put('/api/places/:place_id', function(req, res){
    Place.find({_id: req.params.place_id}, function(err, place) {
      if (err) {
        res.send(err);
      }

      Place.update({
        name: req.body.name,
        place_id: req.body.place_id,
        votes: req.body.votes
      }, function (err, place) {
        if (err) {
            res.send(err);
        }

        Place.find(function(err, places) {
          if (err) {
            res.send(err);
          }

          res.json(places);
        });
      });
    });
});

// DELETE a place
app.delete('/api/places/:place_id', function(req, res){
  Place.remove({
    _id: req.params.place_id
  }, function(err, place) {
    if (err) {
        res.send(err);
    }

    Place.find(function(err, places) {
        if (err) {
            res.send(err);
        }

        res.json(places);
    });
  });
});


// Serve up home page
app.get('*', function(req, res) {
    res.sendfile('./public/index.html');
})

// listen on server
app.listen(5309);
console.log('Listening on port 5309');
