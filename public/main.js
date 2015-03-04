'use strict';
var app = angular.module('FullstackGeneratedApp', ['ui.router', 'fsaPreBuilt']);

app.controller('MainController', function($scope) {

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
    label: 'SignUp',
    state: 'signup'
  }, {
    label: 'Sign In',
    state: 'signIn'
  }, {
    label: 'Cart',
    state: 'cart'
  }];

});


app.config(function($urlRouterProvider, $locationProvider) {
  // This turns off hashbang urls (/#about) and changes it to something normal (/about)
  $locationProvider.html5Mode(true);
  // If we go to a URL that ui-router doesn't have registered, go to the "/" url.
  $urlRouterProvider.otherwise('/');
});

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
    'https://pbs.twimg.com/media/B7gBXulCAAAXQcE.jpg:large',
    'https://fbcdn-sphotos-c-a.akamaihd.net/hphotos-ak-xap1/t31.0-8/10862451_10205622990359241_8027168843312841137_o.jpg',
    'https://pbs.twimg.com/media/B-LKUshIgAEy9SK.jpg',
    'https://pbs.twimg.com/media/B79-X7oCMAAkw7y.jpg',
    'https://pbs.twimg.com/media/B-Uj9COIIAIFAh0.jpg:large',
    'https://pbs.twimg.com/media/B6yIyFiCEAAql12.jpg:large'
  ];

});

'use strict';
app.config(function($stateProvider) {

    $stateProvider.state('cart', {
        url: '/cart',
        controller: 'cartCtrl',
        templateUrl: 'js/cart/cart.html'
    });

});

app.controller('cartCtrl', function($scope) {
    //TEMPORARY! FOR TESTING
    //this renders the cart
    $scope.seshOrders = [{
        title: 'Test Item 01',
        description: 'Almost as good as Test Item 02!',
        price: 3999,
        howMany: 5
    }, {
        title: 'Test Item 02',
        description: 'New and Improved!!',
        price: 4299,
        howMany: 3
    }, {
        title: 'Test Item 03',
        description: 'Bargain Test Item!',
        price: 1999,
        howMany: 6
    }, {
        title: 'Test Item 04',
        description: 'Family Sized Test item!',
        price: 7999,
        howMany: 1
    }]

    $scope.seshOrders.map(function(el) {
        el.priceOut = '$' + el.price / 100;
        el.sTot = '$' + ((el.price * el.howMany) / 100);
    })

    $scope.total = 0;

    $scope.seshOrders.forEach(function(el) {
        $scope.total += el.price * el.howMany;
    });

    $scope.total = '$' + $scope.total/100
});
(function () {

    'use strict';

    // Hope you didn't forget Angular! Duh-doy.
    if (!window.angular) throw new Error('I can\'t find Angular!');

    var app = angular.module('fsaPreBuilt', []);

    app.factory('Socket', function ($location) {

        if (!window.io) throw new Error('socket.io not found!');

        var socket;

        if ($location.$$port) {
            socket = io('http://localhost:1337');
        } else {
            socket = io('/');
        }

        return socket;

    });

    app.constant('AUTH_EVENTS', {
        loginSuccess: 'auth-login-success',
        loginFailed: 'auth-login-failed',
        logoutSuccess: 'auth-logout-success',
        sessionTimeout: 'auth-session-timeout',
        notAuthenticated: 'auth-not-authenticated',
        notAuthorized: 'auth-not-authorized'
    });

    app.config(function ($httpProvider) {
        $httpProvider.interceptors.push([
            '$injector',
            function ($injector) {
                return $injector.get('AuthInterceptor');
            }
        ]);
    });

    app.factory('AuthInterceptor', function ($rootScope, $q, AUTH_EVENTS) {
        var statusDict = {
            401: AUTH_EVENTS.notAuthenticated,
            403: AUTH_EVENTS.notAuthorized,
            419: AUTH_EVENTS.sessionTimeout,
            440: AUTH_EVENTS.sessionTimeout
        };
        return {
            responseError: function (response) {
                $rootScope.$broadcast(statusDict[response.status], response);
                return $q.reject(response);
            }
        };
    });

    app.service('AuthService', function ($http, Session, $rootScope, AUTH_EVENTS, $q) {

        var onSuccessfulLogin = function (response) {
            var data = response.data;
            Session.create(data.id, data.user);
            $rootScope.$broadcast(AUTH_EVENTS.loginSuccess);
            return data.user;
        };

        this.getLoggedInUser = function () {

            if (this.isAuthenticated()) {
                return $q.when({ user: Session.user });
            }

            return $http.get('/session').then(onSuccessfulLogin).catch(function () {
                return null;
            });

        };

        this.login = function (credentials) {
            return $http.post('/login', credentials).then(onSuccessfulLogin);
        };

        this.logout = function () {
            return $http.get('/logout').then(function () {
                Session.destroy();
                $rootScope.$broadcast(AUTH_EVENTS.logoutSuccess);
            });
        };

        this.isAuthenticated = function () {
            return !!Session.user;
        };

    });

    app.service('Session', function ($rootScope, AUTH_EVENTS) {

        $rootScope.$on(AUTH_EVENTS.notAuthenticated, this.destroy);
        $rootScope.$on(AUTH_EVENTS.sessionTimeout, this.destroy);

        this.create = function (sessionId, user) {
            this.id = sessionId;
            this.user = user;
        };

        this.destroy = function () {
            this.id = null;
            this.user = null;
        };

    });

})();
'use strict';
app.config(function ($stateProvider) {

    $stateProvider.state('home', {
        url: '/',
        controller: 'HomeCtrl',
        templateUrl: 'js/home/home.html'
    });

});

app.controller('HomeCtrl', function ($scope) {


	
});
'use strict';
app.config(function($stateProvider) {

    $stateProvider.state('prodDetail', {
        url: '/product/:produ',
        controller: 'prodDetailCtrl',
        templateUrl: 'js/proddetail/proddetail.html'
    });

});

app.controller('prodDetailCtrl', function($scope,$stateParams) {
    //TEMPORARY! FOR TESTING
    console.log($stateParams);
    $scope.prod = {
        title: 'Sample Product',
        description: 'This product is so awesome! It\'s tasty.',
        price: 3999,
        isCoffee: false,
        category: ['tasty', 'beans', 'mmm', 'srsly i got nothin'],
        photo:'none'
    };

    $scope.prod.photo = 'images/' + $scope.prod.photo;
    if ($scope.prod.isCoffee && $scope.prod.photo === 'images/none') {
        console.log('beans')
        $scope.prod.photo = 'images/placeholderCof.jpg';
    } else if (!$scope.prod.isCoffee && $scope.prod.photo === 'images/none') {
        $scope.prod.photo = 'images/placeholderMint.png';
    }
    $scope.prod.priceOut = '$'+($scope.prod.price/100);

});
'use strict';

app.factory('ProductFactory', function($http) {
  return {
    getProductsDb: function() {
      return $http.get('/api/products').then(function(response) {
        return response.data;
      });
    }
  };
});

'use strict';
app.config(function($stateProvider) {

  $stateProvider.state('coffee', {
    url: '/product/coffee',
    controller: 'ProductCtrl',
    templateUrl: 'js/productlisting/coffee.html'
  });

  $stateProvider.state('mint', {
    url: '/product/mint',
    controller: 'ProductCtrl',
    templateUrl: 'js/productlisting/mint.html'
  });
});

app.controller('ProductCtrl', function($scope, ProductFactory) {

  $scope.showProducts = function() {
    ProductFactory.getProductsDb().then(function(data) {
      $scope.products = data;
    });
  };
});

'use strict';
app.config(function ($stateProvider) {

    // Register our *about* state.
    $stateProvider.state('signup', {
        url: '/signup',
        controller: 'signUpController',
        templateUrl: 'js/signup/signup.html'
    });

});

app.controller('signUpController', function ($scope, $window, $location) {

	$scope.user = {

	}
    // $scope.signUpForm = function (user){
    // 	signupFactory.addNewUser(user).then(function(){
    // 	});
    // };

    $scope.login = function (){
        $window.location.href = '/auth/google';
    };

    $scope.loginfb = function (){
        $window.location.href = '/auth/facebook';
    };

    
});


'use strict';
app.factory('RandomGreetings', function () {

    var getRandomFromArray = function (arr) {
        return arr[Math.floor(Math.random() * arr.length)];
    };

    var greetings = [
        'I know that you just drank some coffee... have a mint...',
        'Ummm...... You need a mint...',
        'Hello, smelly human.',
        'So... how do you feel about having a mint right now?',
        'Dude. You cannot eat egg salad with coffee unless you take a mint.',
        'Seriously. Coffee with salmon salad? Take a mint.', 
        'What\'s your problem with mints? You need one.'
    ];

    return {
        greetings: greetings,
        getRandomGreeting: function () {
            return getRandomFromArray(greetings);
        }
    };

});
'use strict';

"use strict";
app.factory('signupFactory', function($http){
	return {
		addNewUser : function (user) {
			return $http.post('/newUser', user);
		}
	};
});

'use strict';
app.directive('randoGreeting', function (RandomGreetings) {

    return {
        restrict: 'E',
        templateUrl: 'js/common/directives/rando-greeting/rando-greeting.html',
        link: function (scope) {
            scope.greeting = RandomGreetings.getRandomGreeting();
        }
    };

});
'use strict';
app.directive('navbar', function () {
    return {
        restrict: 'E',
        scope: {
          items: '='
        }, 
        templateUrl: 'js/common/directives/navbar/navbar.html'
    };
});
'use strict';
app.directive('stack', function () {
    return {
        restrict: 'E',
        templateUrl: 'js/common/directives/stackStoreLogo/stackStoreLogo.html'
    };
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC5qcyIsImFib3V0L2Fib3V0LmpzIiwiY2FydC9jYXJ0LmpzIiwiZnNhL2ZzYS1wcmUtYnVpbHQuanMiLCJob21lL2hvbWUuanMiLCJwcm9kZGV0YWlsL3Byb2RkZXRhaWwuanMiLCJwcm9kdWN0bGlzdGluZy9wcm9kdWN0ZmFjdG9yeS5qcyIsInByb2R1Y3RsaXN0aW5nL3Byb2R1Y3RsaXN0aW5nLmpzIiwic2lnbnVwL3NpZ251cC5qcyIsImNvbW1vbi9mYWN0b3JpZXMvUmFuZG9tR3JlZXRpbmdzLmpzIiwiY29tbW9uL2ZhY3Rvcmllcy9Tb2NrZXQuanMiLCJjb21tb24vZmFjdG9yaWVzL3NpZ251cEZhY3RvcnkuanMiLCJjb21tb24vZGlyZWN0aXZlcy9yYW5kby1ncmVldGluZy9yYW5kby1ncmVldGluZy5qcyIsImNvbW1vbi9kaXJlY3RpdmVzL25hdmJhci9uYXZiYXIuanMiLCJjb21tb24vZGlyZWN0aXZlcy9zdGFja1N0b3JlTG9nby9zdGFja1N0b3JlTG9nby5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUN0Q0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ3pCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ2hEQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUNqSEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUNmQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUNoQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDWEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUN4QkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUNqQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUN4QkE7QUFDQTtBQ0RBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ1JBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ1hBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDVEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EiLCJmaWxlIjoibWFpbi5qcyIsInNvdXJjZXNDb250ZW50IjpbIid1c2Ugc3RyaWN0JztcbnZhciBhcHAgPSBhbmd1bGFyLm1vZHVsZSgnRnVsbHN0YWNrR2VuZXJhdGVkQXBwJywgWyd1aS5yb3V0ZXInLCAnZnNhUHJlQnVpbHQnXSk7XG5cbmFwcC5jb250cm9sbGVyKCdNYWluQ29udHJvbGxlcicsIGZ1bmN0aW9uKCRzY29wZSkge1xuXG4gIC8vIEdpdmVuIHRvIHRoZSA8bmF2YmFyPiBkaXJlY3RpdmUgdG8gc2hvdyB0aGUgbWVudS5cbiAgJHNjb3BlLm1lbnVJdGVtcyA9IFt7XG4gICAgbGFiZWw6ICdIb21lJyxcbiAgICBzdGF0ZTogJ2hvbWUnXG4gIH0sIHtcbiAgICBsYWJlbDogJ0NvZmZlZScsXG4gICAgc3RhdGU6ICdjb2ZmZWUnXG4gIH0sIHtcbiAgICBsYWJlbDogJ01pbnQnLFxuICAgIHN0YXRlOiAnbWludCdcbiAgfSwge1xuICAgIGxhYmVsOiAnQWJvdXQnLFxuICAgIHN0YXRlOiAnYWJvdXQnXG4gIH0sIHtcbiAgICBsYWJlbDogJ1NpZ25VcCcsXG4gICAgc3RhdGU6ICdzaWdudXAnXG4gIH0sIHtcbiAgICBsYWJlbDogJ1NpZ24gSW4nLFxuICAgIHN0YXRlOiAnc2lnbkluJ1xuICB9LCB7XG4gICAgbGFiZWw6ICdDYXJ0JyxcbiAgICBzdGF0ZTogJ2NhcnQnXG4gIH1dO1xuXG59KTtcblxuXG5hcHAuY29uZmlnKGZ1bmN0aW9uKCR1cmxSb3V0ZXJQcm92aWRlciwgJGxvY2F0aW9uUHJvdmlkZXIpIHtcbiAgLy8gVGhpcyB0dXJucyBvZmYgaGFzaGJhbmcgdXJscyAoLyNhYm91dCkgYW5kIGNoYW5nZXMgaXQgdG8gc29tZXRoaW5nIG5vcm1hbCAoL2Fib3V0KVxuICAkbG9jYXRpb25Qcm92aWRlci5odG1sNU1vZGUodHJ1ZSk7XG4gIC8vIElmIHdlIGdvIHRvIGEgVVJMIHRoYXQgdWktcm91dGVyIGRvZXNuJ3QgaGF2ZSByZWdpc3RlcmVkLCBnbyB0byB0aGUgXCIvXCIgdXJsLlxuICAkdXJsUm91dGVyUHJvdmlkZXIub3RoZXJ3aXNlKCcvJyk7XG59KTtcbiIsIid1c2Ugc3RyaWN0JztcbmFwcC5jb25maWcoZnVuY3Rpb24oJHN0YXRlUHJvdmlkZXIpIHtcblxuICAvLyBSZWdpc3RlciBvdXIgKmFib3V0KiBzdGF0ZS5cbiAgJHN0YXRlUHJvdmlkZXIuc3RhdGUoJ2Fib3V0Jywge1xuICAgIHVybDogJy9hYm91dCcsXG4gICAgY29udHJvbGxlcjogJ0Fib3V0Q29udHJvbGxlcicsXG4gICAgdGVtcGxhdGVVcmw6ICdqcy9hYm91dC9hYm91dC5odG1sJ1xuICB9KTtcblxufSk7XG5cbmFwcC5jb250cm9sbGVyKCdBYm91dENvbnRyb2xsZXInLCBmdW5jdGlvbigkc2NvcGUpIHtcblxuICAvLyBJbWFnZXMgb2YgYmVhdXRpZnVsIEZ1bGxzdGFjayBwZW9wbGUuXG4gICRzY29wZS5pbWFnZXMgPSBbXG4gICAgJ2h0dHBzOi8vcGJzLnR3aW1nLmNvbS9tZWRpYS9CN2dCWHVsQ0FBQVhRY0UuanBnOmxhcmdlJyxcbiAgICAnaHR0cHM6Ly9mYmNkbi1zcGhvdG9zLWMtYS5ha2FtYWloZC5uZXQvaHBob3Rvcy1hay14YXAxL3QzMS4wLTgvMTA4NjI0NTFfMTAyMDU2MjI5OTAzNTkyNDFfODAyNzE2ODg0MzMxMjg0MTEzN19vLmpwZycsXG4gICAgJ2h0dHBzOi8vcGJzLnR3aW1nLmNvbS9tZWRpYS9CLUxLVXNoSWdBRXk5U0suanBnJyxcbiAgICAnaHR0cHM6Ly9wYnMudHdpbWcuY29tL21lZGlhL0I3OS1YN29DTUFBa3c3eS5qcGcnLFxuICAgICdodHRwczovL3Bicy50d2ltZy5jb20vbWVkaWEvQi1VajlDT0lJQUlGQWgwLmpwZzpsYXJnZScsXG4gICAgJ2h0dHBzOi8vcGJzLnR3aW1nLmNvbS9tZWRpYS9CNnlJeUZpQ0VBQXFsMTIuanBnOmxhcmdlJ1xuICBdO1xuXG59KTtcbiIsIid1c2Ugc3RyaWN0JztcbmFwcC5jb25maWcoZnVuY3Rpb24oJHN0YXRlUHJvdmlkZXIpIHtcblxuICAgICRzdGF0ZVByb3ZpZGVyLnN0YXRlKCdjYXJ0Jywge1xuICAgICAgICB1cmw6ICcvY2FydCcsXG4gICAgICAgIGNvbnRyb2xsZXI6ICdjYXJ0Q3RybCcsXG4gICAgICAgIHRlbXBsYXRlVXJsOiAnanMvY2FydC9jYXJ0Lmh0bWwnXG4gICAgfSk7XG5cbn0pO1xuXG5hcHAuY29udHJvbGxlcignY2FydEN0cmwnLCBmdW5jdGlvbigkc2NvcGUpIHtcbiAgICAvL1RFTVBPUkFSWSEgRk9SIFRFU1RJTkdcbiAgICAvL3RoaXMgcmVuZGVycyB0aGUgY2FydFxuICAgICRzY29wZS5zZXNoT3JkZXJzID0gW3tcbiAgICAgICAgdGl0bGU6ICdUZXN0IEl0ZW0gMDEnLFxuICAgICAgICBkZXNjcmlwdGlvbjogJ0FsbW9zdCBhcyBnb29kIGFzIFRlc3QgSXRlbSAwMiEnLFxuICAgICAgICBwcmljZTogMzk5OSxcbiAgICAgICAgaG93TWFueTogNVxuICAgIH0sIHtcbiAgICAgICAgdGl0bGU6ICdUZXN0IEl0ZW0gMDInLFxuICAgICAgICBkZXNjcmlwdGlvbjogJ05ldyBhbmQgSW1wcm92ZWQhIScsXG4gICAgICAgIHByaWNlOiA0Mjk5LFxuICAgICAgICBob3dNYW55OiAzXG4gICAgfSwge1xuICAgICAgICB0aXRsZTogJ1Rlc3QgSXRlbSAwMycsXG4gICAgICAgIGRlc2NyaXB0aW9uOiAnQmFyZ2FpbiBUZXN0IEl0ZW0hJyxcbiAgICAgICAgcHJpY2U6IDE5OTksXG4gICAgICAgIGhvd01hbnk6IDZcbiAgICB9LCB7XG4gICAgICAgIHRpdGxlOiAnVGVzdCBJdGVtIDA0JyxcbiAgICAgICAgZGVzY3JpcHRpb246ICdGYW1pbHkgU2l6ZWQgVGVzdCBpdGVtIScsXG4gICAgICAgIHByaWNlOiA3OTk5LFxuICAgICAgICBob3dNYW55OiAxXG4gICAgfV1cblxuICAgICRzY29wZS5zZXNoT3JkZXJzLm1hcChmdW5jdGlvbihlbCkge1xuICAgICAgICBlbC5wcmljZU91dCA9ICckJyArIGVsLnByaWNlIC8gMTAwO1xuICAgICAgICBlbC5zVG90ID0gJyQnICsgKChlbC5wcmljZSAqIGVsLmhvd01hbnkpIC8gMTAwKTtcbiAgICB9KVxuXG4gICAgJHNjb3BlLnRvdGFsID0gMDtcblxuICAgICRzY29wZS5zZXNoT3JkZXJzLmZvckVhY2goZnVuY3Rpb24oZWwpIHtcbiAgICAgICAgJHNjb3BlLnRvdGFsICs9IGVsLnByaWNlICogZWwuaG93TWFueTtcbiAgICB9KTtcblxuICAgICRzY29wZS50b3RhbCA9ICckJyArICRzY29wZS50b3RhbC8xMDBcbn0pOyIsIihmdW5jdGlvbiAoKSB7XG5cbiAgICAndXNlIHN0cmljdCc7XG5cbiAgICAvLyBIb3BlIHlvdSBkaWRuJ3QgZm9yZ2V0IEFuZ3VsYXIhIER1aC1kb3kuXG4gICAgaWYgKCF3aW5kb3cuYW5ndWxhcikgdGhyb3cgbmV3IEVycm9yKCdJIGNhblxcJ3QgZmluZCBBbmd1bGFyIScpO1xuXG4gICAgdmFyIGFwcCA9IGFuZ3VsYXIubW9kdWxlKCdmc2FQcmVCdWlsdCcsIFtdKTtcblxuICAgIGFwcC5mYWN0b3J5KCdTb2NrZXQnLCBmdW5jdGlvbiAoJGxvY2F0aW9uKSB7XG5cbiAgICAgICAgaWYgKCF3aW5kb3cuaW8pIHRocm93IG5ldyBFcnJvcignc29ja2V0LmlvIG5vdCBmb3VuZCEnKTtcblxuICAgICAgICB2YXIgc29ja2V0O1xuXG4gICAgICAgIGlmICgkbG9jYXRpb24uJCRwb3J0KSB7XG4gICAgICAgICAgICBzb2NrZXQgPSBpbygnaHR0cDovL2xvY2FsaG9zdDoxMzM3Jyk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBzb2NrZXQgPSBpbygnLycpO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIHNvY2tldDtcblxuICAgIH0pO1xuXG4gICAgYXBwLmNvbnN0YW50KCdBVVRIX0VWRU5UUycsIHtcbiAgICAgICAgbG9naW5TdWNjZXNzOiAnYXV0aC1sb2dpbi1zdWNjZXNzJyxcbiAgICAgICAgbG9naW5GYWlsZWQ6ICdhdXRoLWxvZ2luLWZhaWxlZCcsXG4gICAgICAgIGxvZ291dFN1Y2Nlc3M6ICdhdXRoLWxvZ291dC1zdWNjZXNzJyxcbiAgICAgICAgc2Vzc2lvblRpbWVvdXQ6ICdhdXRoLXNlc3Npb24tdGltZW91dCcsXG4gICAgICAgIG5vdEF1dGhlbnRpY2F0ZWQ6ICdhdXRoLW5vdC1hdXRoZW50aWNhdGVkJyxcbiAgICAgICAgbm90QXV0aG9yaXplZDogJ2F1dGgtbm90LWF1dGhvcml6ZWQnXG4gICAgfSk7XG5cbiAgICBhcHAuY29uZmlnKGZ1bmN0aW9uICgkaHR0cFByb3ZpZGVyKSB7XG4gICAgICAgICRodHRwUHJvdmlkZXIuaW50ZXJjZXB0b3JzLnB1c2goW1xuICAgICAgICAgICAgJyRpbmplY3RvcicsXG4gICAgICAgICAgICBmdW5jdGlvbiAoJGluamVjdG9yKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuICRpbmplY3Rvci5nZXQoJ0F1dGhJbnRlcmNlcHRvcicpO1xuICAgICAgICAgICAgfVxuICAgICAgICBdKTtcbiAgICB9KTtcblxuICAgIGFwcC5mYWN0b3J5KCdBdXRoSW50ZXJjZXB0b3InLCBmdW5jdGlvbiAoJHJvb3RTY29wZSwgJHEsIEFVVEhfRVZFTlRTKSB7XG4gICAgICAgIHZhciBzdGF0dXNEaWN0ID0ge1xuICAgICAgICAgICAgNDAxOiBBVVRIX0VWRU5UUy5ub3RBdXRoZW50aWNhdGVkLFxuICAgICAgICAgICAgNDAzOiBBVVRIX0VWRU5UUy5ub3RBdXRob3JpemVkLFxuICAgICAgICAgICAgNDE5OiBBVVRIX0VWRU5UUy5zZXNzaW9uVGltZW91dCxcbiAgICAgICAgICAgIDQ0MDogQVVUSF9FVkVOVFMuc2Vzc2lvblRpbWVvdXRcbiAgICAgICAgfTtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIHJlc3BvbnNlRXJyb3I6IGZ1bmN0aW9uIChyZXNwb25zZSkge1xuICAgICAgICAgICAgICAgICRyb290U2NvcGUuJGJyb2FkY2FzdChzdGF0dXNEaWN0W3Jlc3BvbnNlLnN0YXR1c10sIHJlc3BvbnNlKTtcbiAgICAgICAgICAgICAgICByZXR1cm4gJHEucmVqZWN0KHJlc3BvbnNlKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfTtcbiAgICB9KTtcblxuICAgIGFwcC5zZXJ2aWNlKCdBdXRoU2VydmljZScsIGZ1bmN0aW9uICgkaHR0cCwgU2Vzc2lvbiwgJHJvb3RTY29wZSwgQVVUSF9FVkVOVFMsICRxKSB7XG5cbiAgICAgICAgdmFyIG9uU3VjY2Vzc2Z1bExvZ2luID0gZnVuY3Rpb24gKHJlc3BvbnNlKSB7XG4gICAgICAgICAgICB2YXIgZGF0YSA9IHJlc3BvbnNlLmRhdGE7XG4gICAgICAgICAgICBTZXNzaW9uLmNyZWF0ZShkYXRhLmlkLCBkYXRhLnVzZXIpO1xuICAgICAgICAgICAgJHJvb3RTY29wZS4kYnJvYWRjYXN0KEFVVEhfRVZFTlRTLmxvZ2luU3VjY2Vzcyk7XG4gICAgICAgICAgICByZXR1cm4gZGF0YS51c2VyO1xuICAgICAgICB9O1xuXG4gICAgICAgIHRoaXMuZ2V0TG9nZ2VkSW5Vc2VyID0gZnVuY3Rpb24gKCkge1xuXG4gICAgICAgICAgICBpZiAodGhpcy5pc0F1dGhlbnRpY2F0ZWQoKSkge1xuICAgICAgICAgICAgICAgIHJldHVybiAkcS53aGVuKHsgdXNlcjogU2Vzc2lvbi51c2VyIH0pO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICByZXR1cm4gJGh0dHAuZ2V0KCcvc2Vzc2lvbicpLnRoZW4ob25TdWNjZXNzZnVsTG9naW4pLmNhdGNoKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgIH07XG5cbiAgICAgICAgdGhpcy5sb2dpbiA9IGZ1bmN0aW9uIChjcmVkZW50aWFscykge1xuICAgICAgICAgICAgcmV0dXJuICRodHRwLnBvc3QoJy9sb2dpbicsIGNyZWRlbnRpYWxzKS50aGVuKG9uU3VjY2Vzc2Z1bExvZ2luKTtcbiAgICAgICAgfTtcblxuICAgICAgICB0aGlzLmxvZ291dCA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHJldHVybiAkaHR0cC5nZXQoJy9sb2dvdXQnKS50aGVuKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICBTZXNzaW9uLmRlc3Ryb3koKTtcbiAgICAgICAgICAgICAgICAkcm9vdFNjb3BlLiRicm9hZGNhc3QoQVVUSF9FVkVOVFMubG9nb3V0U3VjY2Vzcyk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfTtcblxuICAgICAgICB0aGlzLmlzQXV0aGVudGljYXRlZCA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHJldHVybiAhIVNlc3Npb24udXNlcjtcbiAgICAgICAgfTtcblxuICAgIH0pO1xuXG4gICAgYXBwLnNlcnZpY2UoJ1Nlc3Npb24nLCBmdW5jdGlvbiAoJHJvb3RTY29wZSwgQVVUSF9FVkVOVFMpIHtcblxuICAgICAgICAkcm9vdFNjb3BlLiRvbihBVVRIX0VWRU5UUy5ub3RBdXRoZW50aWNhdGVkLCB0aGlzLmRlc3Ryb3kpO1xuICAgICAgICAkcm9vdFNjb3BlLiRvbihBVVRIX0VWRU5UUy5zZXNzaW9uVGltZW91dCwgdGhpcy5kZXN0cm95KTtcblxuICAgICAgICB0aGlzLmNyZWF0ZSA9IGZ1bmN0aW9uIChzZXNzaW9uSWQsIHVzZXIpIHtcbiAgICAgICAgICAgIHRoaXMuaWQgPSBzZXNzaW9uSWQ7XG4gICAgICAgICAgICB0aGlzLnVzZXIgPSB1c2VyO1xuICAgICAgICB9O1xuXG4gICAgICAgIHRoaXMuZGVzdHJveSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHRoaXMuaWQgPSBudWxsO1xuICAgICAgICAgICAgdGhpcy51c2VyID0gbnVsbDtcbiAgICAgICAgfTtcblxuICAgIH0pO1xuXG59KSgpOyIsIid1c2Ugc3RyaWN0JztcbmFwcC5jb25maWcoZnVuY3Rpb24gKCRzdGF0ZVByb3ZpZGVyKSB7XG5cbiAgICAkc3RhdGVQcm92aWRlci5zdGF0ZSgnaG9tZScsIHtcbiAgICAgICAgdXJsOiAnLycsXG4gICAgICAgIGNvbnRyb2xsZXI6ICdIb21lQ3RybCcsXG4gICAgICAgIHRlbXBsYXRlVXJsOiAnanMvaG9tZS9ob21lLmh0bWwnXG4gICAgfSk7XG5cbn0pO1xuXG5hcHAuY29udHJvbGxlcignSG9tZUN0cmwnLCBmdW5jdGlvbiAoJHNjb3BlKSB7XG5cblxuXHRcbn0pOyIsIid1c2Ugc3RyaWN0JztcbmFwcC5jb25maWcoZnVuY3Rpb24oJHN0YXRlUHJvdmlkZXIpIHtcblxuICAgICRzdGF0ZVByb3ZpZGVyLnN0YXRlKCdwcm9kRGV0YWlsJywge1xuICAgICAgICB1cmw6ICcvcHJvZHVjdC86cHJvZHUnLFxuICAgICAgICBjb250cm9sbGVyOiAncHJvZERldGFpbEN0cmwnLFxuICAgICAgICB0ZW1wbGF0ZVVybDogJ2pzL3Byb2RkZXRhaWwvcHJvZGRldGFpbC5odG1sJ1xuICAgIH0pO1xuXG59KTtcblxuYXBwLmNvbnRyb2xsZXIoJ3Byb2REZXRhaWxDdHJsJywgZnVuY3Rpb24oJHNjb3BlLCRzdGF0ZVBhcmFtcykge1xuICAgIC8vVEVNUE9SQVJZISBGT1IgVEVTVElOR1xuICAgIGNvbnNvbGUubG9nKCRzdGF0ZVBhcmFtcyk7XG4gICAgJHNjb3BlLnByb2QgPSB7XG4gICAgICAgIHRpdGxlOiAnU2FtcGxlIFByb2R1Y3QnLFxuICAgICAgICBkZXNjcmlwdGlvbjogJ1RoaXMgcHJvZHVjdCBpcyBzbyBhd2Vzb21lISBJdFxcJ3MgdGFzdHkuJyxcbiAgICAgICAgcHJpY2U6IDM5OTksXG4gICAgICAgIGlzQ29mZmVlOiBmYWxzZSxcbiAgICAgICAgY2F0ZWdvcnk6IFsndGFzdHknLCAnYmVhbnMnLCAnbW1tJywgJ3Nyc2x5IGkgZ290IG5vdGhpbiddLFxuICAgICAgICBwaG90bzonbm9uZSdcbiAgICB9O1xuXG4gICAgJHNjb3BlLnByb2QucGhvdG8gPSAnaW1hZ2VzLycgKyAkc2NvcGUucHJvZC5waG90bztcbiAgICBpZiAoJHNjb3BlLnByb2QuaXNDb2ZmZWUgJiYgJHNjb3BlLnByb2QucGhvdG8gPT09ICdpbWFnZXMvbm9uZScpIHtcbiAgICAgICAgY29uc29sZS5sb2coJ2JlYW5zJylcbiAgICAgICAgJHNjb3BlLnByb2QucGhvdG8gPSAnaW1hZ2VzL3BsYWNlaG9sZGVyQ29mLmpwZyc7XG4gICAgfSBlbHNlIGlmICghJHNjb3BlLnByb2QuaXNDb2ZmZWUgJiYgJHNjb3BlLnByb2QucGhvdG8gPT09ICdpbWFnZXMvbm9uZScpIHtcbiAgICAgICAgJHNjb3BlLnByb2QucGhvdG8gPSAnaW1hZ2VzL3BsYWNlaG9sZGVyTWludC5wbmcnO1xuICAgIH1cbiAgICAkc2NvcGUucHJvZC5wcmljZU91dCA9ICckJysoJHNjb3BlLnByb2QucHJpY2UvMTAwKTtcblxufSk7IiwiJ3VzZSBzdHJpY3QnO1xuXG5hcHAuZmFjdG9yeSgnUHJvZHVjdEZhY3RvcnknLCBmdW5jdGlvbigkaHR0cCkge1xuICByZXR1cm4ge1xuICAgIGdldFByb2R1Y3RzRGI6IGZ1bmN0aW9uKCkge1xuICAgICAgcmV0dXJuICRodHRwLmdldCgnL2FwaS9wcm9kdWN0cycpLnRoZW4oZnVuY3Rpb24ocmVzcG9uc2UpIHtcbiAgICAgICAgcmV0dXJuIHJlc3BvbnNlLmRhdGE7XG4gICAgICB9KTtcbiAgICB9XG4gIH07XG59KTtcbiIsIid1c2Ugc3RyaWN0JztcbmFwcC5jb25maWcoZnVuY3Rpb24oJHN0YXRlUHJvdmlkZXIpIHtcblxuICAkc3RhdGVQcm92aWRlci5zdGF0ZSgnY29mZmVlJywge1xuICAgIHVybDogJy9wcm9kdWN0L2NvZmZlZScsXG4gICAgY29udHJvbGxlcjogJ1Byb2R1Y3RDdHJsJyxcbiAgICB0ZW1wbGF0ZVVybDogJ2pzL3Byb2R1Y3RsaXN0aW5nL2NvZmZlZS5odG1sJ1xuICB9KTtcblxuICAkc3RhdGVQcm92aWRlci5zdGF0ZSgnbWludCcsIHtcbiAgICB1cmw6ICcvcHJvZHVjdC9taW50JyxcbiAgICBjb250cm9sbGVyOiAnUHJvZHVjdEN0cmwnLFxuICAgIHRlbXBsYXRlVXJsOiAnanMvcHJvZHVjdGxpc3RpbmcvbWludC5odG1sJ1xuICB9KTtcbn0pO1xuXG5hcHAuY29udHJvbGxlcignUHJvZHVjdEN0cmwnLCBmdW5jdGlvbigkc2NvcGUsIFByb2R1Y3RGYWN0b3J5KSB7XG5cbiAgJHNjb3BlLnNob3dQcm9kdWN0cyA9IGZ1bmN0aW9uKCkge1xuICAgIFByb2R1Y3RGYWN0b3J5LmdldFByb2R1Y3RzRGIoKS50aGVuKGZ1bmN0aW9uKGRhdGEpIHtcbiAgICAgICRzY29wZS5wcm9kdWN0cyA9IGRhdGE7XG4gICAgfSk7XG4gIH07XG59KTtcbiIsIid1c2Ugc3RyaWN0JztcbmFwcC5jb25maWcoZnVuY3Rpb24gKCRzdGF0ZVByb3ZpZGVyKSB7XG5cbiAgICAvLyBSZWdpc3RlciBvdXIgKmFib3V0KiBzdGF0ZS5cbiAgICAkc3RhdGVQcm92aWRlci5zdGF0ZSgnc2lnbnVwJywge1xuICAgICAgICB1cmw6ICcvc2lnbnVwJyxcbiAgICAgICAgY29udHJvbGxlcjogJ3NpZ25VcENvbnRyb2xsZXInLFxuICAgICAgICB0ZW1wbGF0ZVVybDogJ2pzL3NpZ251cC9zaWdudXAuaHRtbCdcbiAgICB9KTtcblxufSk7XG5cbmFwcC5jb250cm9sbGVyKCdzaWduVXBDb250cm9sbGVyJywgZnVuY3Rpb24gKCRzY29wZSwgJHdpbmRvdywgJGxvY2F0aW9uKSB7XG5cblx0JHNjb3BlLnVzZXIgPSB7XG5cblx0fVxuICAgIC8vICRzY29wZS5zaWduVXBGb3JtID0gZnVuY3Rpb24gKHVzZXIpe1xuICAgIC8vIFx0c2lnbnVwRmFjdG9yeS5hZGROZXdVc2VyKHVzZXIpLnRoZW4oZnVuY3Rpb24oKXtcbiAgICAvLyBcdH0pO1xuICAgIC8vIH07XG5cbiAgICAkc2NvcGUubG9naW4gPSBmdW5jdGlvbiAoKXtcbiAgICAgICAgJHdpbmRvdy5sb2NhdGlvbi5ocmVmID0gJy9hdXRoL2dvb2dsZSc7XG4gICAgfTtcblxuICAgICRzY29wZS5sb2dpbmZiID0gZnVuY3Rpb24gKCl7XG4gICAgICAgICR3aW5kb3cubG9jYXRpb24uaHJlZiA9ICcvYXV0aC9mYWNlYm9vayc7XG4gICAgfTtcblxuICAgIFxufSk7XG5cbiIsIid1c2Ugc3RyaWN0JztcbmFwcC5mYWN0b3J5KCdSYW5kb21HcmVldGluZ3MnLCBmdW5jdGlvbiAoKSB7XG5cbiAgICB2YXIgZ2V0UmFuZG9tRnJvbUFycmF5ID0gZnVuY3Rpb24gKGFycikge1xuICAgICAgICByZXR1cm4gYXJyW01hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIGFyci5sZW5ndGgpXTtcbiAgICB9O1xuXG4gICAgdmFyIGdyZWV0aW5ncyA9IFtcbiAgICAgICAgJ0kga25vdyB0aGF0IHlvdSBqdXN0IGRyYW5rIHNvbWUgY29mZmVlLi4uIGhhdmUgYSBtaW50Li4uJyxcbiAgICAgICAgJ1VtbW0uLi4uLi4gWW91IG5lZWQgYSBtaW50Li4uJyxcbiAgICAgICAgJ0hlbGxvLCBzbWVsbHkgaHVtYW4uJyxcbiAgICAgICAgJ1NvLi4uIGhvdyBkbyB5b3UgZmVlbCBhYm91dCBoYXZpbmcgYSBtaW50IHJpZ2h0IG5vdz8nLFxuICAgICAgICAnRHVkZS4gWW91IGNhbm5vdCBlYXQgZWdnIHNhbGFkIHdpdGggY29mZmVlIHVubGVzcyB5b3UgdGFrZSBhIG1pbnQuJyxcbiAgICAgICAgJ1NlcmlvdXNseS4gQ29mZmVlIHdpdGggc2FsbW9uIHNhbGFkPyBUYWtlIGEgbWludC4nLCBcbiAgICAgICAgJ1doYXRcXCdzIHlvdXIgcHJvYmxlbSB3aXRoIG1pbnRzPyBZb3UgbmVlZCBvbmUuJ1xuICAgIF07XG5cbiAgICByZXR1cm4ge1xuICAgICAgICBncmVldGluZ3M6IGdyZWV0aW5ncyxcbiAgICAgICAgZ2V0UmFuZG9tR3JlZXRpbmc6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHJldHVybiBnZXRSYW5kb21Gcm9tQXJyYXkoZ3JlZXRpbmdzKTtcbiAgICAgICAgfVxuICAgIH07XG5cbn0pOyIsIid1c2Ugc3RyaWN0JztcbiIsIlwidXNlIHN0cmljdFwiO1xuYXBwLmZhY3RvcnkoJ3NpZ251cEZhY3RvcnknLCBmdW5jdGlvbigkaHR0cCl7XG5cdHJldHVybiB7XG5cdFx0YWRkTmV3VXNlciA6IGZ1bmN0aW9uICh1c2VyKSB7XG5cdFx0XHRyZXR1cm4gJGh0dHAucG9zdCgnL25ld1VzZXInLCB1c2VyKTtcblx0XHR9XG5cdH07XG59KTtcbiIsIid1c2Ugc3RyaWN0JztcbmFwcC5kaXJlY3RpdmUoJ3JhbmRvR3JlZXRpbmcnLCBmdW5jdGlvbiAoUmFuZG9tR3JlZXRpbmdzKSB7XG5cbiAgICByZXR1cm4ge1xuICAgICAgICByZXN0cmljdDogJ0UnLFxuICAgICAgICB0ZW1wbGF0ZVVybDogJ2pzL2NvbW1vbi9kaXJlY3RpdmVzL3JhbmRvLWdyZWV0aW5nL3JhbmRvLWdyZWV0aW5nLmh0bWwnLFxuICAgICAgICBsaW5rOiBmdW5jdGlvbiAoc2NvcGUpIHtcbiAgICAgICAgICAgIHNjb3BlLmdyZWV0aW5nID0gUmFuZG9tR3JlZXRpbmdzLmdldFJhbmRvbUdyZWV0aW5nKCk7XG4gICAgICAgIH1cbiAgICB9O1xuXG59KTsiLCIndXNlIHN0cmljdCc7XG5hcHAuZGlyZWN0aXZlKCduYXZiYXInLCBmdW5jdGlvbiAoKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgICAgcmVzdHJpY3Q6ICdFJyxcbiAgICAgICAgc2NvcGU6IHtcbiAgICAgICAgICBpdGVtczogJz0nXG4gICAgICAgIH0sIFxuICAgICAgICB0ZW1wbGF0ZVVybDogJ2pzL2NvbW1vbi9kaXJlY3RpdmVzL25hdmJhci9uYXZiYXIuaHRtbCdcbiAgICB9O1xufSk7IiwiJ3VzZSBzdHJpY3QnO1xuYXBwLmRpcmVjdGl2ZSgnc3RhY2snLCBmdW5jdGlvbiAoKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgICAgcmVzdHJpY3Q6ICdFJyxcbiAgICAgICAgdGVtcGxhdGVVcmw6ICdqcy9jb21tb24vZGlyZWN0aXZlcy9zdGFja1N0b3JlTG9nby9zdGFja1N0b3JlTG9nby5odG1sJ1xuICAgIH07XG59KTsiXSwic291cmNlUm9vdCI6Ii9zb3VyY2UvIn0=