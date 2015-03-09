"use strict";
app.factory('ReviewsFactory', function($http){
  return {
    getReviews: function(id){
      return $http.get('/api/reviews/' + id, function(response) {
        return response.data;
      });
    },
    addReviews: function (user) {
      return $http.post('/api/signup/newUser', user);
    }
  };
});
