'use strict';
app.config(function ($stateProvider) {

    // Register our *about* state.
    $stateProvider.state('signup', {
        url: '/signup',
        controller: 'signUpController',
        templateUrl: 'js/signup/signup.html'
    });

});

app.controller('signUpController', function ($scope, $window, $location, signupFactory) {
	$scope.user = {
        email: "",
        password: ""
	};

    $scope.newUserSignUp = function(newUser){
        signupFactory.addNewUser(newUser).then(function(data){
            if(data !== null) 
            $window.location.href = '/login';
        });
    };

    $scope.login = function (){
        $window.location.href = '/auth/google';
    };
    $scope.loginfb = function (){
        $window.location.href = '/auth/facebook';
    };
});

