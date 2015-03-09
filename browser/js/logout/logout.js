'use strict'

app.config(function ($stateProvider){
	$stateProvider.state('logout', {
		url: '/logout',
		controller: 'logoutController',
		templateUrl: 'js/logout/logout.html'
	});
});

app.controller('logoutController', function ($scope, $window, $location){
	// share code btw controllers? so that we can change nav-bar when logout 
	// maincontroller in browser/js/app.js

	// $scope.loggedIn = sessionStorage.loggedinUser || undefined;
	// if ($scope.loggedIn) $scope.menuItems.splice(5, 2);
	// else $scope.menuItems.splice(7, 2);


	// sessionStorage.loggedinUser = undefined;
	$scope.menuItems.splice(5, 2);


	window.setTimeout(function() {
		sessionStorage.loggedinUser = undefined;
    	window.location.href = '/';
	}, 5000);
});