var appServices = angular.module('kalevApp.services', []);

appServices.factory('Places', function($http) {

  var getAllPlaces = function(){
    
    return $http.get('/api/places')
      .success(function(res) {
        return res.data;
      }).error(function(res) {
        console.error('getAllPlaces error in services.js: ', res);
      });
  };

  var createPlace = function(place){

    return $http.post('api/places', place)
      .success(function(res) {
        return res.data;
      }).error(function(res) {
        console.error('createPlace error in services.js: ', res);
      });
  };

  var updateVoteCount = function(place){

    return $http.post('api/places/' + place._id)
      .success(function(res) {
        return res.data;
      }).error(function(res) {
        console.error('updateVoteCount error in services.js: ', res);
      });
  };

  return {
    getAllPlaces: getAllPlaces,
    createPlace: createPlace,
    updateVoteCount: updateVoteCount
  };

});
