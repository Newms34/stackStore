'use strict';
app.config(function($stateProvider) {

    $stateProvider.state('cart', {
        url: '/cart',
        controller: 'cartCtrl',
        templateUrl: 'js/cart/cart.html'
    });

});

app.controller('cartCtrl', function($scope, $cookies, $http, removeitem, clearcart, CoffeeFactory) {

    console.log($cookies, 'this is cookies from cartCtrl');

    // this is the seshOrders array
    $scope.seshOrders = [];

    // 1 - for each product in cookies.products
    // 2 - fetch from the server, info about about that product (it could be coffee or mints)
    // 3 - previous fetch will retrun a promise
    // 4 - add that promise to an array [promise1, promise2]
    // 5 - when all promises resolve (Promise.all(promiseArray).then(function(arrayOfProductInfo) {}))
    // 6 - add those resolve promise data to the seshOrders

    // 1 - create /api/coffee/:id
    // 2 - create /api/mints/:id


    $scope.seshOrdersCreate = function() {

        // how did this get into the cookie
        var prods = JSON.parse($cookies.products);

        // creating an prod object
        var prod;
        var coffeepromisearr = [];
        for (var i = 0; i < prods.length; i++) {
            debugger;
            console.log("Product ID", prods[i]);
            // prods[i].type being true means we're getting coffee
            if (prods[i].type === true) {
                var coffeepromise = CoffeeFactory.getOneCoffeeDb(prods[i].id)
                coffeepromisearr.push(coffeepromise);
            }
        }

        Promise.all(coffeepromisearr).then(function(coffeeDataArray) {
            console.log("Result of coffee promises:", coffeeDataArray);
            $scope.seshOrders = coffeeDataArray;
            $scope.$apply();
        });

    };

    $scope.seshOrdersCreate();

    console.log($scope.seshOrders, 'this is scopeseshorders');


    // $scope.seshOrders = [{
    //     title: 'Test Item 01',
    //     description: 'Almost as good as Test Item 02!',
    //     price: 3999,
    //     howMany: 5
    // }, {
    //     title: 'Test Item 02',
    //     description: 'New and Improved!!',
    //     price: 4299,
    //     howMany: 3
    // }, {
    //     title: 'Test Item 03',
    //     description: 'Bargain Test Item!',
    //     price: 1999,
    //     howMany: 6
    // }, {
    //     title: 'Test Item 04',
    //     description: 'Family Sized Test item!',
    //     price: 8999,
    //     howMany: 1
    // }];

    $scope.seshOrders.map(function(el) {
        el.priceOut = '$' + el.price / 100;
        el.sTot = '$' + ((el.price * el.howMany) / 100);
    });

    $scope.total = 0;

    $scope.seshOrders.forEach(function(el) {
        $scope.total += el.price * el.howMany;
    });

    $scope.total = '$' + $scope.total / 100;
    $scope.goPay = function() {
        sessionStorage.thisCart = angular.toJson($scope.seshOrders);
        $state.go('pay');
    };

    $scope.deleteitem = function(data) {
        removeitem.removefromcart(data)
    }

    $scope.clearthecart = function(info) {
        clearcart.clearoutcart(info);
    }

});
