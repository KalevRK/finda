angular.module('kalevApp.places', [])
  .controller('mainController', function(Places, $scope, $filter) {
    $scope.formData = {};
    $scope.data = { places: [] };

    // Get the list of places from the database,
    // get their data from the Google Places API,
    // and display their markers on the map
    angular.element(document).ready(function() {

      Places.getAllPlaces()
        .success(function (res) {
            res = $filter('orderBy')(res, 'votes', true);
            $scope.data.places = res;

            // initialize the Google Maps and Google Places services
            initialize();

            // get the place details for each place in the list
            // by making requests to the Google Places API
            for (var i = 0; i < $scope.data.places.length; i++) {

              // makes requests to the Google Places API using the place_id
              // stored in the database for each place in the list
              var request = {
                placeId: $scope.data.places[i].place_id
              };

              service.getDetails(request, function (place, status) {
                // if the place details were retrieved successfully
                // then create a marker for the place on the map
                if (status == google.maps.places.PlacesServiceStatus.OK) {
                  createMarker(place);
                }
              });
            }
        }).error(function(res, status){
          console.log(status);
          console.error('Error in getting all places on page ready: ', res);
        });
    });

    $scope.createPlace = function() {
        
        // escape the name data entered by the user
        $scope.formData.name = _.escape($scope.formData.name);

        // query Google Places API to get place to show on map
        var request = {
          query: $scope.formData.name,
          location: mapOptions.center,
          radius: 1000,
        };

        console.log('request: ', request);

        searchMap(request, function(results, status) {
        
          if (status == google.maps.places.PlacesServiceStatus.OK) {
            createMarker(results[0]);

            $scope.formData.place_id = results[0].place_id;

            // use the Places service method createPlace to make the
            // HTTP request to the server
            Places.createPlace(results[0])
              .success(function(res) {
                $scope.formData = {};
                res = $filter('orderBy')(res, 'votes', true);
                $scope.data.places = res;
              })
              .error(function(res) {
                console.error('createPlace error in places.js: ', res);
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

      Places.updateVoteCount(place)
        .success(function(res) {
            res = $filter('orderBy')(res, 'votes', true);
            $scope.data.places = res;
        })
        .error(function(res) {
            console.error('incrementVotes error in places.js: ', res);
        });
    };

  });

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
