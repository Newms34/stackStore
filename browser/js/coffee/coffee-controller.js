'use strict';
app.controller('CoffeeCtrl', function($scope, CoffeeFactory) {

  $scope.showCoffee = function() {
    CoffeeFactory.getCoffeeDb().then(function(data) {
      $scope.coffee = data;
    });
  };
});
