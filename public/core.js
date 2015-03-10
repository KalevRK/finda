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


// Google Maps
function initialize() {
    console.log('Initialized map');
    var mapOptions = {
        center: {
            lat: 37.782,
            lng: -122.411
        },
        zoom: 13
    };
    var map = new google.maps.Map(document.getElementById('map-view'), mapOptions);
};

google.maps.event.addDomListener(window, 'load', initialize);

