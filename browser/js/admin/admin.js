'use strict';
app.config(function($stateProvider) {

    // Register our *about* state.
    $stateProvider.state('admin', {
        url: '/admin',
        controller: 'adminController',
        templateUrl: 'js/admin/admin.html'
    });

});

app.controller('adminController', function($scope, adminFactory, $state) {
    $scope.users = {};
    $scope.prods = {};
    $scope.whichProd = 'Mint';
    $scope.allProdCats = {
        one: 'Mint',
        two: 'Coffee'
    };
    console.log($scope.allProdCats);
    $scope.checkForAdmin = function(){
        console.log('checkin user:')
        adminFactory.checkUser().then(function(response){
            console.log(response.data);
            if(response.data == 'no'){
                $state.go('home');
            }
            else{
            }
        });
    };
    $scope.checkForAdmin();
    $scope.getAllUsr = function() {
        adminFactory.getUsers().then(function(data) {
            $scope.users = data;
        });
    };
    $scope.getAllUsr();

    $scope.getAllProds = function(type) {
        adminFactory.getProds(type).then(function(data) {
            $scope.prods = data;
            $scope.prods.map(function(el){
                el.priceOut = el.price/100;
                el.kittens = el.category.join(', ');
            })
        });
    };
    $scope.getAllProds($scope.whichProd);
    $scope.pickCat = function(prod) {
        $scope.whichProd = prod;
        $scope.getAllProds($scope.whichProd);
    };

    $scope.adminify = function(name) {
        adminFactory.adminUser(name).then(function(data) {
            $scope.getAllUsr();
        });
    };

    $scope.removeProd = function(prod){
        adminFactory.remProd(prod,$scope.whichProd).then(function(data){
            console.log('Removed: '+data)
            $scope.getAllProds($scope.whichProd);
        });
    };
});