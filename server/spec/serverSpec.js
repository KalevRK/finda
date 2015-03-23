var expect = require('chai').expect;
var request = require('supertest');
var app = require('../serverSetup.js').app;
var db = require('../serverSetup.js').db;
var Place = require('../places/placeModel');

describe('', function() {

    beforeEach(function(done) {

        // Delete any places from the database
        // so that they can be recreated during the tests
        Place.remove({name: 'Nopa'}).exec();

        done();
    });

    describe('Place creation', function() {
      it('Responds with created place', function(done) {
        request(app)
          .post('/api/places')
          .send({
            'name': 'Nopa',
            'place_id': 12345
          })
          .expect(200)
          .expect(function(res) {
            expect(res.body[0].name).to.equal('Nopa');
            expect(res.body[0].place_id).to.equal('12345');
          })
          .end(done);
      });

      it('A new place creates a database entry', function(done) {
        request(app)
          .post('/api/places')
          .send({
            'name': 'Nopa',
            'place_id': 12345
          })
          .expect(200)
          .expect(function(res) {
            Place.findOne({'name': 'Nopa'})
              .exec(function(err, place) {
                if(err) {
                  console.error(err);
                }
                expect(place.name).to.equal('Nopa');
                expect(place.place_id).to.equal('12345');
              });
          })
          .end(done);
      });
    });

    describe('Place retrieval', function() {
      
      beforeEach(function(done) {
        place = new Place({
          name: 'Nopa',
          place_id: 12345
        });

        place.save(function() {
            done();
        });
      });

      afterEach(function(done) {
        Place.remove({}, function() {
            done();
        });
      });

      it('Responds with the stored place', function(done) {
        request(app)
          .get('/api/places')
          .expect(200)
          .expect(function(res) {
            expect(res.body[0].name).to.equal('Nopa');
            expect(res.body[0].place_id).to.equal('12345');
          })
          .end(done);
      });
    });

    describe('Change vote count', function() {
      beforeEach(function(done) {
        place = new Place({
          name: 'Nopa',
          place_id: 12345
        });

        place.save(function() {
            done();
        });
      });

      afterEach(function(done) {
        Place.remove({}, function() {
            done();
        });
      });

      it('Increments the vote count on the place', function(done) {
        request(app)
          .get('/api/places')
          .expect(function(res) {
            request(app)
              .post('/api/places/' + res.body[0]._id)
              .send()
              .expect(200)
              .expect(function(res) {
                expect(res.body[0].name).to.equal('Nopa');
                expect(res.body[0].votes).to.equal(1);
              })
              .end(done);
          })
          .end(done);
      });

      it('Increments the vote count twice on the same place', function(done) {
        request(app)
          .get('/api/places')
          .expect(function(res) {
            request(app)
              .post('/api/places/' + res.body[0]._id)
              .send()
              .expect(200)
              .expect(function(res) {
                request(app)
                .post('/api/places/' + res.body[0]._id)
                .send()
                .expect(200)
                .expect(function(res) {
                  expect(res.body[0].name).to.equal('Nopa');
                  expect(res.body[0].votes).to.equal(2);  
                })
                .end(done);
              })
              .end(done);
          })
          .end(done);
      });

    });
})