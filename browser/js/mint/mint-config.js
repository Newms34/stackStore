'use strict';
app.config(function($stateProvider) {

  $stateProvider.state('mint', {
    url: '/product/mint',
    controller: 'MintCtrl',
    templateUrl: 'js/mint/mint.html'
  });
});


