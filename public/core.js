var kalevApp = angular.module('kalevApp', []);

function mainController($scope, $http) {
    $scope.formData = {};

    // get all of the places and show them when landing on this page
    $http.get('/api/places')
      .success(function(data) {
        $scope.places = data;

        for (var i = 0; i < $scope.places.length; i++) {

          var request = {
            placeId: $scope.places[i].place_id
          };

          service.getDetails(request, function (place, status) {
            if (status == google.maps.places.PlacesServiceStatus.OK) {
              createMarker(place);
            }
          });
        }
      })
      .error(function(data) {
        console.log('Error: ' + data);
      });

      // handle creating a new place 
      $scope.createPlace = function() {

        // query Google Places API to get place to show on map
        var request = {
          query: $scope.formData.name,
          location: mapOptions.center,
          radius: 1000,
        };

        searchMap(request, function(results, status) {
          
          if (status == google.maps.places.PlacesServiceStatus.OK) {
            createMarker(results[0]);

            $scope.formData.place_id = results[0].place_id;

            $http.post('/api/places', $scope.formData)
              .success(function(data) {
                $scope.formData = {};
                $scope.places = data;
              })
              .error(function(data) {
                console.log('Error: ' + data);
              });
          }
        });
      };

      // focus the map on the clicked place
      $scope.focusPlace = function(id) {
         centerMap(id);
      };

      // increment the vote count on the place whose vote count was clicked
      $scope.incrementVotes = function(place) {
        place.votes++;

        // update the vote count on the place
        $http.put('/api/places/' + place._id, place)
               .success(function(data) {
                 $scope.places = data;
                 console.log(data);
               })
               .error(function(data) {
                 console.log('Error: ' + data);
               });

        // retrieve all of the places again from the database
        $http.get('/api/places')
              .success(function(data) {
                $scope.places = data;
                console.log(data);
              })
              .error(function(data) {
                 console.log('Error: ' + data);
               });
      }
};

var map;
var mapOptions;
var infowindow;
var marker;
var markers = [];
var service;
var current_place_id;

// Google Maps
function initialize() {
    mapOptions = {
        center: {
            lat: 37.782,
            lng: -122.411
        },
        zoom: 13
    };
    map = new google.maps.Map(document.getElementById('map-view'), mapOptions);

    infowindow = new google.maps.InfoWindow();
    service = new google.maps.places.PlacesService(map);
};

function searchMap(request, callback) {
  service.textSearch(request, callback);
};

function createMarker(place) {

  var placeLoc = place.geometry.location;
  marker = new google.maps.Marker({
    map: map,
    position: place.geometry.location
  });

  markers.push(marker);

  map.setCenter(marker.getPosition())

  google.maps.event.addListener(marker, 'click', function() {
    infowindow.setContent(place.name);
    infowindow.open(map, this);
  });
};

function centerMap(id) {

  var request = {
        placeId: id
  };

  service.getDetails(request, function (place, status) {
    if (status == google.maps.places.PlacesServiceStatus.OK) {
      map.setCenter(place.geometry.location);
    }
  });
};

google.maps.event.addDomListener(window, 'load', initialize);

