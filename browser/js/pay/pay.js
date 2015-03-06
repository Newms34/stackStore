'use strict';
// var stripe = require("stripe")("sk_test_WhzuBvvju6AKl7KyIKtdWiQf");
app.config(function($stateProvider) {

    $stateProvider.state('pay', {
        url: '/pay',
        controller: 'payCtrl',
        templateUrl: 'js/pay/pay.html'
    });

});

app.controller('payCtrl', function($scope, $stateParams, $http) {
    $scope.cartToPay = angular.fromJson(sessionStorage.thisCart)
        //TEMPORARY! FOR TESTING
    console.log('Your cart: ', $scope.cartToPay);
    $scope.total = 0;
    $scope.cartToPay.forEach(function(el) {
        $scope.total += (el.price) * (el.howMany);
    })
    $scope.totalOut = '$' + ($scope.total / 100);
    //clear card data
    $scope.card = {
        name:"",
        num: 0,
        expmo: 0,
        expyr:0,
        cvv: 0,
        total:0
    }
    $scope.submitCard = function(card) {
        console.log('card: ',card)
        card.total = $scope.total;
        $http.post('/api/subpay',card);
    };

});