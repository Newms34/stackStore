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
    })

});
