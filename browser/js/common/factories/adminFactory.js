"use strict";
app.factory('adminFactory', function($http){
	return {
		getUsers: function(){
			return $http.get('/api/admin/allUsers').then(function(response){
				return response.data;
			});
		},
		adminUser : function (user) {
			return $http.post('/api/admin/adminUser', {email:user});
		}
	};
});


