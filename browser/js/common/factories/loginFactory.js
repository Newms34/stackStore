"use strict";
app.factory('loginFactory', function($http, AuthService){
	return {
		checkUser : function (users) {
			console.log("You are in login Factory!");
			return AuthService.login(users);
		}
	};
});
