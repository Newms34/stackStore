'use strict';
app.controller('CoffeeCtrl', function($scope, CoffeeFactory, MintFactory, addtocart) {
    CoffeeFactory.getCoffeeDb().then(function(data) {
        $scope.things=data;
        console.log(typeof $scope.things);
    });
    $scope.getKitties = function(kitty) {
        //search thru both dbs (on backend) and return concatenated arr
        CoffeeFactory.getByCatDb(kitty).then(function(data) {
            angular.copy(data, $scope.things);
        });
    };

    $scope.addtocart = function(id, type){
    	addtocart.addtocart(id, type);
    };
});