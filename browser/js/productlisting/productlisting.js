'use strict';
app.config(function ($stateProvider) {

    $stateProvider.state('coffee', {
        url: '/coffee',
        controller: 'ProductCtrl',
        templateUrl: 'js/productlisting/productlisting.html'
    });

    $stateProvider.state('mint', {
      url: '/mint',
      controller: 'ProductCtrl',
      templateUrl: 'js/productlisting/productlisting.html'
    });
});

app.controller('ProductCtrl', function ($scope, ProductFactory) {

  $scope.getCoffeeProducts = function() {
    ProductFactory.getCoffee().then(function(data) {
      $scope.coffee = data;
    });
    ProductFactory.getMints().then(function(data) {
      $scope.mint = data;
    });
  };

  // $scope.getMintProducts = function() {
  // };
});
