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

appServices.factory('Google', function() {

  var mapOptions;
  var map;
  var infowindow;
  var service;

  // setup the Google Map, Infowindow, and Places Service
  var initialize = function() {
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

  // perform a Google Places text search for the place contained in the request
  var searchMap = function(placeName, callback) {

    var request = {
          query: placeName,
          location: mapOptions.center,
          radius: 1000,
        };

    service.textSearch(request, callback);
  };

  // get the details for a place and add a marker for it to the map
  var addToMap = function(place) {
    // makes requests to the Google Places API using the place_id
    // stored in the database for each place in the list
    var request = {
      placeId: place.place_id
    };

    service.getDetails(request, function (place, status) {
      // if the place details were retrieved successfully
      // then create a marker for the place on the map
      if (status == google.maps.places.PlacesServiceStatus.OK) {
        createMarker(place);
      }
    });

  };

  // create a marker on the map for the specified place
  var createMarker = function(place) {

    var placeLoc = place.geometry.location;

    var marker = new google.maps.Marker({
      map: map,
      position: place.geometry.location
    });

    map.setCenter(marker.getPosition())

    google.maps.event.addListener(marker, 'click', function() {
      var isOpen = place.opening_hours.open_now ? 'Yes' : 'No';
      infowindow.setContent('<b>' + place.name + '</b>' + '<br>' +
                            place.address_components[0].short_name + ' ' +
                            place.address_components[1].short_name + '<br>' +
                            place.formatted_phone_number + '<br>Open Now: ' + isOpen);
      infowindow.open(map, this);
    });
  };

  // center the map on the place represented by the id
  var centerMap = function(id) {

    var request = {
      placeId: id
    };

    service.getDetails(request, function (place, status) {
      if (status == google.maps.places.PlacesServiceStatus.OK) {
        map.setCenter(place.geometry.location);
      }
    });
  };

  return {
    initialize: initialize,
    searchMap: searchMap,
    addToMap: addToMap,
    centerMap: centerMap
  };

});
