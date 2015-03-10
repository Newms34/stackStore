'use strict';
app.config(function ($stateProvider) {

    // Register our *about* state.
    $stateProvider.state('profile', {
        url: '/profile',
        controller: 'profileController',
        templateUrl: 'js/profile/profile.html'
    });
});

app.controller('profileController', function ($scope, $state,  AuthService, profileFactory, orderFactory) {

    profileFactory.getProfile().then(function(data){
        $scope.userinfo = data[0];
        $scope.email = data[0].email;
        $scope.pastorder = data[0].pastOrder;
        // $scope.useremail = data[0].email;
    })

    orderFactory.getOrder().then(function(data){

        $scope.orders = data;
        $scope.order = data[0];

        var price = function(){
            var sum = 0;
            var sumArray = [];
            data.forEach(function(elem){
                elem.products.forEach(function(element){
                    sum += element.Price;
                })
                sumArray.push(sum);
            })
            return sumArray;
        }
        var element = price();
        for(var i = 0; i < $scope.orders.length; i++){
            $scope.orders[i].totalPrice = element[i]
        };


    })

});
