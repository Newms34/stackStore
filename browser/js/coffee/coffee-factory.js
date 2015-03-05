'use strict';

app.factory('CoffeeFactory', function($http) {
  return {
    getCoffeeDb: function() {
      return $http.get('/api/coffee').then(function(response) {
        return response.data;
      });
    },
  };
});

