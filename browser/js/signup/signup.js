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

    $scope.getCreatedUser = function(){
        signupFactory.getUser().then(function(data){
            $scope.user = data;
        });
    };

    $scope.newUserSignUp = function(newUser){
        signupFactory.addNewUser(newUser).then(function(data){
            if (data.success === true)
            console.log("success");
        });
    };

    $scope.login = function (){
        $window.location.href = '/auth/google';
    };
    $scope.loginfb = function (){
        $window.location.href = '/auth/facebook';
    };
});

