'use strict';
app.controller('MintCtrl', function($scope, MintFactory, CoffeeFactory) {
    MintFactory.getMintsDb().then(function(data) {
        $scope.things = data;
    });

    $scope.getKitties = function(kitty) {
        //search thru both dbs (on backend) and return concatenated arr
        CoffeeFactory.getByCatDb(kitty).then(function(data) {
            $scope.things = data;
        })
    }
});