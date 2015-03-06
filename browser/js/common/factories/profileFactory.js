'use strict';

app.factory('profileFactory', function($http) {
  return {
    getProfile: function() {
      return $http.get('/api/profile').then(function(response) {
        return response.data;
      });
    },
  };
});
