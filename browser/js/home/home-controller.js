app.controller('HomeCtrl', function($scope, CoffeeFactory, MintFactory) {

  CoffeeFactory.getCoffeeDb().then(function(coffeeData) {
    MintFactory.getMintsDb().then(function(mintData) {
      $scope.products = shuffleArray(coffeeData.concat(mintData));
    });
  });

  $scope.getKitties = function(kitty) {
    //search thru both dbs (on backend) and return concatenated arr
    CoffeeFactory.getByCatDb(kitty).then(function(data) {
      angular.copy(data, $scope.products);
    });
  };

  function shuffleArray(array) {
    for (var i = array.length - 1; i > 0; i--) {
      var j = Math.floor(Math.random() * (i + 1));
      var temp = array[i];
      array[i] = array[j];
      array[j] = temp;
    }
    return array;
  }
});

