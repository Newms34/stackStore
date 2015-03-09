'use strict';
app.config(function ($stateProvider) {

    // Register our *about* state.
    $stateProvider.state('reviews', {
        url: '/reviews/:id',
        controller: 'reviewController',
        templateUrl: 'js/reviews/reviews.html'
    });
});


app.controller('reviewController', function($scope){
    $scope.item = "hello";
});

// app.controller('profileController', function ($scope, $state,  AuthService, profileFactory) {

//     profileFactory.getProfile().then(function(data){
//         $scope.userinfo = data[0];
//         $scope.email = data[0].email;
//         // $scope.useremail = data[0].email;
//     })
// });
