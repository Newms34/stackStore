'use strict';
var app = angular.module('FullstackGeneratedApp', ['ui.router', 'fsaPreBuilt', 'ngCookies']);

app.controller('MainController', function($scope, $cookies, $cookieStore, $window) {

  $cookieStore.remove('products');

  $scope.loggedIn = sessionStorage.loggedinUser || undefined;

  $cookieStore.put('products', []);
  console.log($cookies, 'this is cookie');

  // Given to the <navbar> directive to show the menu.
  $scope.menuItems = [{
    label: 'Home',
    state: 'home'
  }, {
    label: 'Coffee',
    state: 'coffee'
  }, {
    label: 'Mint',
    state: 'mint'
  }, {
    label: 'About',
    state: 'about'
  }, {
    label: 'Cart',
    state: 'cart'
  }, {
    label: 'Sign Up',
    state: 'signup'
  }, {
    label: 'Log In',
    state: 'login'
  }, {
    label: 'Profile',
    state: 'profile'
  }, {
    label: 'Log Out',
    state: 'logout'
  }];

  // removes tabs based on login state ++ removed logout link in navbar from navbar.html and added logout state
  if ($scope.loggedIn) $scope.menuItems.splice(5, 2);
  else $scope.menuItems.splice(7, 2);


});


app.config(function($urlRouterProvider, $locationProvider) {
  // This turns off hashbang urls (/#about) and changes it to something normal (/about)
  $locationProvider.html5Mode(true);
  // If we go to a URL that ui-router doesn't have registered, go to the "/" url.
  $urlRouterProvider.otherwise('/');
});
