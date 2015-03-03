'use strict';
app.config(function ($stateProvider) {

    // Register our *about* state.
    $stateProvider.state('signup', {
        url: '/signup',
        controller: 'signUpController',
        templateUrl: 'js/signup/signup.html'
    });

});

app.controller('signUpController', function ($scope) {

	$scope.user = {

	}
    
    // $scope.signUpForm = function (user){
    // 	signupFactory.addNewUser(user).then(function(){

    // 	});
    // };
});
