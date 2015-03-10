'use strict';

app.factory('CoffeeFactory', function($http) {
  return {
    getCoffeeDb: function() {

      return $http.get('/api/coffee').then(function(response) {
        return response.data;
      });
    },

    getOneCoffeeDb: function (id){
    	return $http.get('/api/coffee/' + id).then(function(response){
    		return response.data;
    	});
    }
  };
});


