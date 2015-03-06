"use strict";
app.factory('signinFactory', function($http){
	return {
		getUsers: function(user){
			console.log("getuser: ", getUser);
			return $http.post('/api/signin/users', user);
		},
		addNewUser : function (user) {
			return $http.post('/api/signup/newUser', user);
		}
	};
});
