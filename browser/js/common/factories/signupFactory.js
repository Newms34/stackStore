"use strict";
app.factory('signupFactory', function($http){
	return {
		getUser: function(){
			return $http.get('/api/user/newUser').then(function(response){
				return response.data;
			});
		},
		addNewUser : function (user) {
			return $http.post('/api/signup/newUser', user);
		}
	};
});


