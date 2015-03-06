'use strict';
app.directive('navbar', function() {
  return {
    restrict: 'E',
    scope: {
      items: '=',
      stuffs: '=',
      profile: '='
    },
    templateUrl: 'js/common/directives/navbar/navbar.html'
  };
});
