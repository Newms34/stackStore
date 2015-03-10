"use strict";
app.factory('ReviewsFactory', function($http){
  return {
    getMintReviewsDb: function(productId){
      return $http.get('/api/reviews/mint/' + productId).then(function(response) {
        return response.data;
      });
    },

    getCoffeeReviewsDb: function(productId){
      return $http.get('/api/reviews/coffee/' + productId).then(function(response) {
        return response.data;
      });
    },

    addReviewsDb: function (review, productId, starValue) {
      var reviewObj = {
        review: review,
        user: sessionStorage.loggedinUser,
        product: productId,
        stars: starValue
      }
      return $http.post('/api/reviews', reviewObj).then(function(response) {
        return response.data;
      });
    }
  };
});
