'use strict';
app.config(function($stateProvider) {

  $stateProvider.state('profile', {
    url: '/product/profile',
    controller: 'ProfileCtrl',
    templateUrl: 'js/profile/profile.html'
  });
});


