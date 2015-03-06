'use strict';
app.config(function($stateProvider) {

  // Register our *about* state.
  $stateProvider.state('about', {
    url: '/about',
    controller: 'AboutController',
    templateUrl: 'js/about/about.html'
  });

});

app.controller('AboutController', function($scope) {

  // Images of beautiful Fullstack people.
  $scope.images = [
    'http://www.itsugar.com/media/catalog/product/cache/1/image/9df78eab33525d08d6e5fb8d27136e95/g/r/grumpy_cat_you_need_a_mint.jpg',
    'http://www.itsugar.com/media/catalog/product/cache/1/image/9df78eab33525d08d6e5fb8d27136e95/g/r/grumpy_cat_you_need_a_mint.jpg',
    'http://www.itsugar.com/media/catalog/product/cache/1/image/9df78eab33525d08d6e5fb8d27136e95/g/r/grumpy_cat_you_need_a_mint.jpg',
    'http://www.itsugar.com/media/catalog/product/cache/1/image/9df78eab33525d08d6e5fb8d27136e95/g/r/grumpy_cat_you_need_a_mint.jpg',
    'http://www.itsugar.com/media/catalog/product/cache/1/image/9df78eab33525d08d6e5fb8d27136e95/g/r/grumpy_cat_you_need_a_mint.jpg',
    'http://www.itsugar.com/media/catalog/product/cache/1/image/9df78eab33525d08d6e5fb8d27136e95/g/r/grumpy_cat_you_need_a_mint.jpg'
  ];

});
