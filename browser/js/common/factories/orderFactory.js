'use strict';

app.factory('orderFactory', function($http) {
  return {
    getOrder: function() {
      return $http.get('/api/profile/order').then(function(response) {
        return response.data;
      });
    },
  };
});
