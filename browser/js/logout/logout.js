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


	window.setTimeout(function() {
		sessionStorage.clear();
    	window.location.href = '/';
	}, 3000);
});