var kalevApp = angular.module('kalevApp', []);

function mainController($scope, $http) {
    $scope.formData = {};

    // get all of the places and show them when landing on this page
    $http.get('/api/places')
      .success(function(data) {
        $scope.places = data;
        console.log(data);
      })
      .error(function(data) {
        console.log('Error: ' + data);
      });

      // handle creating a new place 
      $scope.createPlace = function() {

        console.log('name: ', $scope.formData.name);

        // query Google Places API to get place to show on map
        var request = {
          query: $scope.formData.name,
          location: mapOptions.center,
          radius: 1000,
        };

        searchMap(request);

        $http.post('/api/places', $scope.formData)
          .success(function(data) {
            $scope.formData = {};
            $scope.places = data;
            console.log(data);
          })
          .error(function(data) {
            console.log('Error: ' + data);
          });
      };

      // handle deleting a place
      $scope.deletePlace = function(id) {
        $http.delete('/api/places/' + id)
          .success(function(data) {
            $scope.places = data;
            console.log(data);
          })
          .error(function(data) {
            console.log('Error: ' + data);
          });
      };
};

var map;
var mapOptions;
var infowindow;
var service;

// Google Maps
function initialize() {
    console.log('Initialized map');
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

function searchMap(request) {
  service.textSearch(request, callback);
};

function callback(results, status) {
    if (status == google.maps.places.PlacesServiceStatus.OK) {
      for (var i = 0; i < results.length; i++) {
        createMarker(results[i]);
      }
    }
};

function createMarker(place) {
  var placeLoc = place.geometry.location;
  var marker = new google.maps.Marker({
    map: map,
    position: place.geometry.location
  });

  google.maps.event.addListener(marker, 'click', function() {
    infowindow.setContent(place.name);
    infowindow.open(map, this);
  });
};

google.maps.event.addDomListener(window, 'load', initialize);

