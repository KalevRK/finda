angular.module('kalevApp', ['ngRoute'])

.config(function($routeProvider) {
    $routeProvider

    .when('/', {
      templateUrl: 'pages/home.html',
      controller: 'mainController'
    })
})

.controller('mainController', function($scope) {
    $scope.message = 'This is my app!';
});