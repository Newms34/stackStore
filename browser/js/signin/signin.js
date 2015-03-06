'use strict';
app.config(function ($stateProvider) {

    // Register our *about* state.
    $stateProvider.state('signin', {
        url: '/signin',
        controller: 'signInController',
        templateUrl: 'js/signin/signin.html'
    });

});

app.controller('signInController', function ($scope, $window, $location, signinFactory) {
	$scope.user = {
        email: "",
        password: ""
	};


    $scope.userSignIn = function(newUser){
        signinFactory.getUser(newUser).then(function(){
            console.log("success");
            $window.location.href = '/';
        });
    };

    $scope.login = function (){
        $window.location.href = '/auth/google';
    };
    $scope.loginfb = function (){
        $window.location.href = '/auth/facebook';
    };
});
