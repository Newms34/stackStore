'use strict';
app.controller('MintCtrl', function($scope, MintFactory) {

  $scope.showMints = function() {
    MintFactory.getMintsDb().then(function(data) {
      $scope.mints = data;
    });
  };
});
