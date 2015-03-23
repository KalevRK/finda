angular.module('kalevApp.places', [])
  .controller('mainController', function(Places, Google, $scope, $filter) {
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
            Google.initialize();

            // get the place details for each place in the list
            // by making requests to the Google Places API
            for (var i = 0; i < $scope.data.places.length; i++) {
              Google.addToMap($scope.data.places[i]);
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
        Google.searchMap($scope.formData.name, function(results, status) {
        
          if (status == google.maps.places.PlacesServiceStatus.OK) {
            Google.addToMap(results[0]);

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
       Google.centerMap(id);
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
