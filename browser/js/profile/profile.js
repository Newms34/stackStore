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
        $scope.userinfo = data[0];
        $scope.email = data[0].email;
        // $scope.useremail = data[0].email;
    })
});
