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

        searchMap(request, function(results, status) {
          
          if (status == google.maps.places.PlacesServiceStatus.OK) {
            createMarker(results[0]);

            $scope.formData.place_id = results[0].place_id;

            console.log('$scope.formData: ', $scope.formData);

            $http.post('/api/places', $scope.formData)
              .success(function(data) {
                $scope.formData = {};
                $scope.places = data;
                console.log(data);
              })
              .error(function(data) {
                console.log('Error: ' + data);
              });
          }
        });
      };

      // focus the map on the clicked place
      $scope.focusPlace = function(id) {

         console.log(id);
         centerMap(id);
      };
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

  console.log(request);

  service.getDetails(request, function (place, status) {
    console.log(place);
    console.log(status);
    if (status == google.maps.places.PlacesServiceStatus.OK) {
      map.setCenter(place.geometry.location);
    }
  });
};

google.maps.event.addDomListener(window, 'load', initialize);

