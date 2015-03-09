'use strict';
var app = angular.module('FullstackGeneratedApp', ['ui.router', 'fsaPreBuilt', 'ngCookies']);

app.controller('MainController', function($scope, $cookies, $cookieStore, $window) {

  $cookieStore.remove("products");

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
  }];



  // removes tabs based on login state ++ removed logout link in navbar from navbar.html and added logout state  

  $scope.newMenuItems = $scope.menuItems;

  if (!$scope.loggedIn) $scope.newMenuItems = $scope.menuItems;
  else {
    $scope.newMenuItems[5] = {
    label: 'Profile',
    state: 'profile'
   };
   $scope.newMenuItems[6] = {
    label: 'Log Out',
    state: 'logout'
   };
  };
});

app.config(function($urlRouterProvider, $locationProvider) {
  // This turns off hashbang urls (/#about) and changes it to something normal (/about)
  $locationProvider.html5Mode(true);
  // If we go to a URL that ui-router doesn't have registered, go to the "/" url.
  $urlRouterProvider.otherwise('/');
});
