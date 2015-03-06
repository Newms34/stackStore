"use strict";
app.factory('signinFactory', function($http){
	return {
		getUser: function(){
			return $http.post('/api/signin/newUser').then(function(response){
				return response.data;
			});
		},
		addNewUser : function (user) {
			return $http.post('/api/signup/newUser', user);
		}
	};
});
