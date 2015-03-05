'use strict';
app.controller('MintCtrl', function($scope, MintFactory) {
  MintFactory.getMintsDb().then(function(data) {
    $scope.mints = data;
  });
});
