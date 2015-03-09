'use strict';
app.config(function ($stateProvider) {

    // Register our *about* state.
    $stateProvider.state('login', {
        url: '/login',
        controller: 'loginController',
        templateUrl: 'js/login/login.html'
    });

});

app.controller('loginController', function ($scope, $window, $state, $location, AuthService, loginFactory)

    { $scope.userLogin = function(users){
        loginFactory.checkUser(users).then(function(loggedin){
            sessionStorage.loggedinUser = loggedin.email;
            $window.location.href = '/';
        }).catch(function(e){
            console.log("your password and id do not match");
        });
    };

     $scope.login = function (){
        $window.location.href = '/auth/google';
    };
    $scope.loginfb = function (){
        $window.location.href = '/auth/facebook';
    };
});
