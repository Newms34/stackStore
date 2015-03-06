'use strict';
app.config(function($stateProvider) {

  $stateProvider.state('coffee', {
    url: '/product/coffee',
    controller: 'CoffeeCtrl',
    templateUrl: 'js/coffee/coffee.html'
  });
});
