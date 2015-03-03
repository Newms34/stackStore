'use strict';
app.config(function ($stateProvider) {

    $stateProvider.state('cart', {
        url: '/',
        controller: 'cartCtrl',
        templateUrl: 'js/cart/cart.html'
    });

});

app.controller('cartCtrl', function ($scope) {


	
});