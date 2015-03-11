'use strict';
app.config(function($stateProvider) {

  $stateProvider.state('reviews', {
    url: '/reviews/:productId/:productType',
    controller: 'ReviewCtrl',
    templateUrl: 'js/reviews/reviews.html'
  });
});

app.controller('ReviewCtrl', function($scope, $state, $stateParams, ReviewsFactory, $window) {
  console.log($stateParams)
    $scope.postReview = function(review){

    var ratings = document.getElementsByName('rating');
    var rate_value;
    for (var i = 0; i < ratings.length; i++){
      if(ratings[i].checked === true){
       rate_value = ~~ratings[i].value;
      }
    }



    ReviewsFactory.addReviewsDb(review, $stateParams.productId, rate_value).then(function(createdReview){
        console.log("Rate: ", rate_value)
        $window.location.href = '/product/' + $stateParams.productId + '/' + $stateParams.productType;
     });
    };
    // $scope.starValue = function
});

