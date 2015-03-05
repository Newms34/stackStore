'use strict';
app.controller('CoffeeCtrl', function($scope, CoffeeFactory) {
  CoffeeFactory.getCoffeeDb().then(function(data) {
    $scope.coffee = data;
  });
});
