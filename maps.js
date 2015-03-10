function initialize() {
    console.log('Initialized map');
    var mapOptions = {
        center: {
            lat: 37.782,
            lng: -122.411
        },
        zoom: 12
    };
    var map = new google.maps.Map(document.getElementById('map'), mapOptions);
};

google.maps.event.addDomListener(window, 'load', initialize);