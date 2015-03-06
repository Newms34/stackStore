'use strict';
app.config(function ($stateProvider) {

    // Register our *about* state.
    $stateProvider.state('profile', {
        url: '/profile',
        controller: 'profileController',
        templateUrl: 'js/profile/profile.html'
    });
});

app.controller('profileController', function ($scope, $state,  AuthService, profileFactory) {

    profileFactory.getProfile().then(function(data){
        console.log("Userdata :", data);
        $scope.userinfo = data;
    })
});
