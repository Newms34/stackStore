'use strict';
app.config(function($stateProvider) {

    $stateProvider.state('cart', {
        url: '/cart',
        controller: 'cartCtrl',
        templateUrl: 'js/cart/cart.html'
    });

});

app.controller('cartCtrl', function($scope, $cookies, $http, removeitem, clearcart, CoffeeFactory, MintFactory) {

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

                console.log('this is prods', prods)
                for (var i = 0; i < prods.length; i++) {
                    // prods[i].type being true means we're getting coffee
                    if (prods[i].type === true) {

                        var coffeepromise = CoffeeFactory.getOneCoffeeDb(prods[i].id)
                        coffeepromisearr.push(coffeepromise);
                        console.log(prods[i].quant, 'this is prods quant');
                    } else if (prods[i].type === false) {
                        var mintpromise = MintFactory.getOneMintDb(prods[i].id);
                        coffeepromisearr.push(mintpromise);
                    }
                }

                Promise.all(coffeepromisearr).then(function(coffeeDataArray) {
                    $scope.seshOrders = coffeeDataArray;


                    pricequant();
                    $scope.$apply();

                });

            };

            $scope.seshOrdersCreate();

            function pricequant() {
                console.log($scope.seshOrders, 'this is scopeseshorders');

                

                    $scope.seshOrders.map(function(obj, index) {
                            obj.howMany = 1;
                            
                            for (var i = 0; i < $scope.seshOrders.length; i++) {
                               if (i === index) continue;
                            if (obj._id === $scope.seshOrders[i]._id) {
                                console.log('this is obj.id', obj._id, 'this is seshordid', $scope.seshOrders[i]._id);
                                    obj.howMany += 1;
                                    $scope.seshOrders.splice(i, 1);
                                    i--;

                                } 

                                console.log(obj.howMany, 'this is obj howmany');
                            }
                        })
                

                        

                        $scope.seshOrders.map(function(el) {
                            el.priceOut = '$' + el.price / 100;
                            el.sTot = '$' + ((el.price * el.howMany) / 100);
                        });



                        $scope.total = 0;

                        $scope.seshOrders.forEach(function(el) {
                           
                            $scope.total += el.price * el.howMany;
                        });

                        $scope.total = '$' + $scope.total / 100;
                    }


                    $scope.goPay = function() {
                        sessionStorage.thisCart = angular.toJson($scope.seshOrders);
                        $state.go('pay');
                    };

                    $scope.deleteitem = function(data) {
                        removeitem.removefromcart(data)
                        $scope.seshOrdersCreate()
                    }

                    $scope.clearthecart = function(info) {
                        clearcart.clearoutcart(info);
                        $scope.seshOrdersCreate();
                    }

                });
