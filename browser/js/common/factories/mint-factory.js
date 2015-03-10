'use strict';

app.factory('MintFactory', function($http) {
  return {
    getMintsDb: function() {
      return $http.get('/api/mints').then(function(response) {
        return response.data;
      });
    },
    getOneMintDb: function (id){
    	return $http.get('/api/mints/' + id).then(function(response){
    		return response.data;
    	});
    }
  };
});
