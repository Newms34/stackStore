'use strict';

app.factory('ProductFactory', function($http) {
  return {
    getProductsDb: function() {
      return $http.get('/api/products').then(function(response) {
        return response.data;
      });
    }
  };
});
