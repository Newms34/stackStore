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
        name: "",
        num: 0,
        expmo: 0,
        expyr: 0,
        cvv: 0,
        total: 0
    }
    $scope.manifest = 'Nothing bought right now!';

    jQuery(function($) {
      $('#cardForm').submit(function(e) {
        var $form = $(this);

        // Disable the submit button to prevent repeated clicks
        $form.find('button').prop('disabled', true);

        Stripe.card.createToken($form, stripeResponseHandler);

        // Prevent the form from submitting with the default action
        return false;
      });
    });

    function stripeResponseHandler(status, response) {
        var $form =$('cardForm');
        if (response.error) {
            console.log(response.error.message)
        } else {
            var token = response.id;
            $http.post('/api/subpay/payCard', {
                token: token,
                total: $scope.total,
                manifest: $scope.manifest
            }).then(function(response) {
                console.log(response.data)
            });
        }
    }

});