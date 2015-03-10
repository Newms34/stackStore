'use strict';
// var stripe = require("stripe")("sk_test_WhzuBvvju6AKl7KyIKtdWiQf");
app.config(function($stateProvider) {
    $stateProvider.state('pay', {
        url: '/pay',
        controller: 'payCtrl',
        templateUrl: 'js/pay/pay.html'
    });

});

app.controller('payCtrl', function($scope, $stateParams, $state,$http, promoFactory) {
    $scope.cartToPay = angular.fromJson(sessionStorage.thisCart);
    $scope.codeLen = 0;
    $scope.validCode=0;
    console.log('Your cart: ', $scope.cartToPay);
    $scope.total = 0;
    $scope.proms = {};
    $scope.currPromo={
            item:'Mint',
            amount:0
        }

    //clear card data
    $scope.card = {
        name: "",
        num: 0,
        expmo: 0,
        expyr: 0,
        cvv: 0,
        total: 0,
        addr: "",
        city:"",
        state:"",
        zip:0
    }
    console.log('items buying: ', $scope.cartToPay);
    $scope.manifest = function() {
        var result = 'Bought:';
        $scope.cartToPay.forEach(function(el) {
            result += ' (' + el.howMany + ') ' + el.title;
        });
        return result;
    };

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
        var $form = $('cardForm');
        if (response.error) {
            console.log(response.error.message)
        } else {
            var token = response.id;
            //take the token (which contains the user's card details)
            //and submit it with the price
            $http.post('/api/subpay/payCard', {
                token: token,
                total: $scope.total,
                manifest: $scope.manifest()
            }).then(function(response) {
                $scope.recordOrder();
                console.log(response.data);
            });
        }
    }
    var prodsArr = [];
    $scope.recordOrder = function() {
        var status = 'paid';
        if (sessionStorage.loggedinUser) {
            //a logged in user
            $http.post('/api/subpay/getUserId', {
                name: sessionStorage.loggedinUser
            }).then(function(data) {
                var userId = data;
                //now send off info to orders db to record
            });
        } else {
            //not a logged in user. They'll just be user 'Anon N', where N is a number
            $http.get('/getNumUsers').then(function(data) {
                var userId = data;
            })
        }
    };
    $scope.getAllPromos = function() {
        promoFactory.getAllProms().then(function(data) {
            if (data != 'none') {
                $scope.proms = data;
            } else {
                $scope.proms = {};
            }
        })
    }
    $scope.getAllPromos();
    $scope.checkCode = function(){
        $scope.codeLen = $scope.card.promo.length;
        $scope.validCode=0;
        $scope.currPromo.item='Mint';
        //default back to mint. the code is in... mint condition
        //HUEHUEHUEHUEHUE
        $scope.currPromo.amount=0;
        $scope.proms.forEach(function(el){
            if (el.code==$scope.card.promo){
                $scope.validCode=1;
                $scope.currPromo.item=el.promotionOn;
                $scope.currPromo.amount=el.pricePerc;
            }
            $scope.adjustPrice();
        });
    }
    $scope.adjustPrice = function(){
        console.log($scope.cartToPay);
        $scope.total = 0;
        var discountedPricePerc = (100-$scope.currPromo.amount)/100;
        $scope.cartToPay.forEach(function(el){
            if (el.isCoffee && $scope.currPromo.item=='Coffee'){
                //promo on coffee! reduced price on all 1,3,7-Trimethylpurine-2,6-dione stimulants
                $scope.total += (el.price*discountedPricePerc*el.howMany);
            }
            else if (!el.isCoffee && $scope.currPromo.item=='Mint'){
                //promo on coffee! reduced price on all Methyl 2-hydroxybenzoate neurotoxins!
                $scope.total += (el.price*discountedPricePerc*el.howMany);
            }
            else{
                //I got nothin clever to say here
                $scope.total+=(el.howMany*el.price);
            }
        })
    }
    $scope.adjustPrice();

});