'use strict';
app.config(function ($stateProvider) {

    // Register our *about* state.
    $stateProvider.state('login', {
        url: '/login',
        controller: 'loginController',
        templateUrl: 'js/login/login.html'
    });

});

app.controller('loginController', function ($scope, $state, $location, AuthService, loginFactory) {
	// $scope.user = {
 //        email: "",
 //        password: ""
	// };

    $scope.userLogin = function(users){
        console.log("users: ", users);
        loginFactory.checkUser(users).then(function(loggedin){
            sessionStorage.loggedinUser = loggedin.email;
            $state.go('home');
        });
    };
});
