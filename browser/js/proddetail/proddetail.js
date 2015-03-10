'use strict';
app.config(function($stateProvider) {

  $stateProvider.state('prodDetail', {
    url: '/product/:productId/:productType',
    controller: 'prodDetailCtrl',
    templateUrl: 'js/proddetail/proddetail.html'
  });

});


app.controller('prodDetailCtrl', function($scope, $state, $stateParams, CoffeeFactory, MintFactory, addtocart, ReviewsFactory) {

  $scope.productId = $stateParams.productId;
  $scope.item = $stateParams.title;
  var total = 0;

  if ($stateParams.productType !== "true") {

    MintFactory.getOneMintDb($stateParams.productId).then(function(data) {
      $scope.thisItem = data;
    });

    ReviewsFactory.getMintReviewsDb($stateParams.productId).then(function(reviewArray) {

      $scope.reviews = reviewArray;

      var starTotal = function() {
        reviewArray.forEach(function(elem) {
          total += elem.stars;
        })
        return total;
      }

      $scope.average = Math.round(starTotal() / reviewArray.length);

      var ratings = document.getElementsByName('rating');
      for (var i = 0; i < ratings.length; i++) {
        ratings[i].disabled = true;
        if (ratings[i].value === $scope.average.toString()) {
          ratings[i].setAttribute('checked', 'checked');
        }
      }
    });
  } else {

    CoffeeFactory.getOneCoffeeDb($stateParams.productId).then(function(data) {
      $scope.thisItem = data;
    });

    ReviewsFactory.getCoffeeReviewsDb($stateParams.productId).then(function(reviewArray) {

      $scope.reviews = reviewArray;

      var starTotal = function() {
        reviewArray.forEach(function(elem) {
          total += elem.stars;
        });
        return total;
      }

      $scope.average = Math.round(starTotal() / reviewArray.length);

      var ratings = document.getElementsByName('rating');
      for (var i = 0; i < ratings.length; i++) {
        ratings[i].disabled = true;
        if (ratings[i].value === $scope.average.toString()) {
          ratings[i].setAttribute('checked', 'checked');
        }
      }
    });
  }

  $scope.addtocart = function(id, isCoffee) {
    addtocart.addtocart(id, isCoffee);
  }

});
