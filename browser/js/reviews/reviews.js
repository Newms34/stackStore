'use strict';
app.config(function($stateProvider) {

  $stateProvider.state('reviews', {
    url: '/reviews/:reviewId',
    controller: 'ReviewCtrl',
    templateUrl: 'js/reviews/reviews.html'
  });
});

app.controller('ReviewCtrl', function($scope, $state, $stateParams, CoffeeFactory, MintFactory) {
  console.log('Hello');
});
