'use strict';
app.config(function ($stateProvider) {

    $stateProvider.state('coffee', {
        url: '/product/coffee',
        controller: 'ProductCtrl',
        templateUrl: 'js/productlisting/productlisting.html'
    });

    $stateProvider.state('mint', {
      url: '/product/mint',
      controller: 'ProductCtrl',
      templateUrl: 'js/productlisting/productlisting.html'
    });
});

app.controller('ProductCtrl', function ($scope, ProductFactory) {

  $scope.getProducts = function() {
    ProductFactory.getCoffee().then(function(data) {
      $scope.coffee = data;
    });
    ProductFactory.getMints().then(function(data) {
      $scope.mint = data;
    });
  };
});
