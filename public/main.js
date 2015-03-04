'use strict';
var app = angular.module('FullstackGeneratedApp', ['ui.router', 'fsaPreBuilt', 'ngCookies']);

app.controller('MainController', function ($scope, $cookies, $cookieStore) {


    console.log($window);
    
    console.log($cookieStore, 'this is cookie store');
    $cookieStore.put('cart', 'temp');
    console.log($cookies, 'this is cookie');


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
    getCoffeeDb: function() {
      return $http.get('/api/coffee').then(function(response) {
        return response.data;
      });
    },
    getMintsDb: function() {
      return $http.get('/api/mints').then(function(response) {
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

  $scope.showCoffee = function() {
    ProductFactory.getCoffeeDb().then(function(data) {
      $scope.coffee = data;
    });
  };

  $scope.showMints = function() {
    ProductFactory.getMintsDb().then(function(data) {
      $scope.mints = data;
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

app.factory('AddToCart', function() {

            var cartcontent = {
                user: req.body.cookies.cart;
                products: []

            };

            return {

                selecting: function(productinfo) {
                    var thisclick = {};
                    thisclick.prodId = productinfo._id;
                    thisclick.Price = productinfo.price;
                    thisclick.Quantity = productinfo.howMany;

                    cartcontent.products.push(thisclick);
                },


       
                addedToCart: function() {
                    return selecting(clickinfo);
                }


            }

        });

"use strict";
app.factory('signupFactory', function($http){
	return {
		addNewUser : function (user) {
			return $http.post('/newUser', user);
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
app.directive('stack', function () {
    return {
        restrict: 'E',
        templateUrl: 'js/common/directives/stackStoreLogo/stackStoreLogo.html'
    };
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC5qcyIsImFib3V0L2Fib3V0LmpzIiwiY2FydC9jYXJ0LmpzIiwiZnNhL2ZzYS1wcmUtYnVpbHQuanMiLCJob21lL2hvbWUuanMiLCJwcm9kZGV0YWlsL3Byb2RkZXRhaWwuanMiLCJwcm9kdWN0bGlzdGluZy9wcm9kdWN0ZmFjdG9yeS5qcyIsInByb2R1Y3RsaXN0aW5nL3Byb2R1Y3RsaXN0aW5nLmpzIiwic2lnbnVwL3NpZ251cC5qcyIsImNvbW1vbi9mYWN0b3JpZXMvUmFuZG9tR3JlZXRpbmdzLmpzIiwiY29tbW9uL2ZhY3Rvcmllcy9Tb2NrZXQuanMiLCJjb21tb24vZmFjdG9yaWVzL2NhcnRmYWN0b3J5LmpzIiwiY29tbW9uL2ZhY3Rvcmllcy9zaWdudXBGYWN0b3J5LmpzIiwiY29tbW9uL2RpcmVjdGl2ZXMvbmF2YmFyL25hdmJhci5qcyIsImNvbW1vbi9kaXJlY3RpdmVzL3JhbmRvLWdyZWV0aW5nL3JhbmRvLWdyZWV0aW5nLmpzIiwiY29tbW9uL2RpcmVjdGl2ZXMvc3RhY2tTdG9yZUxvZ28vc3RhY2tTdG9yZUxvZ28uanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDL0NBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUN6QkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDbERBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ2pIQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ2ZBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ2hDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDaEJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDOUJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDakNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDeEJBO0FBQ0E7QUNEQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUM3QkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDUkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUNUQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUNYQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsImZpbGUiOiJtYWluLmpzIiwic291cmNlc0NvbnRlbnQiOlsiJ3VzZSBzdHJpY3QnO1xudmFyIGFwcCA9IGFuZ3VsYXIubW9kdWxlKCdGdWxsc3RhY2tHZW5lcmF0ZWRBcHAnLCBbJ3VpLnJvdXRlcicsICdmc2FQcmVCdWlsdCcsICduZ0Nvb2tpZXMnXSk7XG5cbmFwcC5jb250cm9sbGVyKCdNYWluQ29udHJvbGxlcicsIGZ1bmN0aW9uICgkc2NvcGUsICRjb29raWVzLCAkY29va2llU3RvcmUpIHtcblxuXG4gICAgY29uc29sZS5sb2coJHdpbmRvdyk7XG4gICAgXG4gICAgY29uc29sZS5sb2coJGNvb2tpZVN0b3JlLCAndGhpcyBpcyBjb29raWUgc3RvcmUnKTtcbiAgICAkY29va2llU3RvcmUucHV0KCdjYXJ0JywgJ3RlbXAnKTtcbiAgICBjb25zb2xlLmxvZygkY29va2llcywgJ3RoaXMgaXMgY29va2llJyk7XG5cblxuYXBwLmNvbnRyb2xsZXIoJ01haW5Db250cm9sbGVyJywgZnVuY3Rpb24oJHNjb3BlKSB7XG5cbiAgLy8gR2l2ZW4gdG8gdGhlIDxuYXZiYXI+IGRpcmVjdGl2ZSB0byBzaG93IHRoZSBtZW51LlxuICAkc2NvcGUubWVudUl0ZW1zID0gW3tcbiAgICBsYWJlbDogJ0hvbWUnLFxuICAgIHN0YXRlOiAnaG9tZSdcbiAgfSwge1xuICAgIGxhYmVsOiAnQ29mZmVlJyxcbiAgICBzdGF0ZTogJ2NvZmZlZSdcbiAgfSwge1xuICAgIGxhYmVsOiAnTWludCcsXG4gICAgc3RhdGU6ICdtaW50J1xuICB9LCB7XG4gICAgbGFiZWw6ICdBYm91dCcsXG4gICAgc3RhdGU6ICdhYm91dCdcbiAgfSwge1xuICAgIGxhYmVsOiAnU2lnblVwJyxcbiAgICBzdGF0ZTogJ3NpZ251cCdcbiAgfSwge1xuICAgIGxhYmVsOiAnU2lnbiBJbicsXG4gICAgc3RhdGU6ICdzaWduSW4nXG4gIH0sIHtcbiAgICBsYWJlbDogJ0NhcnQnLFxuICAgIHN0YXRlOiAnY2FydCdcbiAgfV07XG59KTtcblxuXG5hcHAuY29uZmlnKGZ1bmN0aW9uKCR1cmxSb3V0ZXJQcm92aWRlciwgJGxvY2F0aW9uUHJvdmlkZXIpIHtcbiAgLy8gVGhpcyB0dXJucyBvZmYgaGFzaGJhbmcgdXJscyAoLyNhYm91dCkgYW5kIGNoYW5nZXMgaXQgdG8gc29tZXRoaW5nIG5vcm1hbCAoL2Fib3V0KVxuICAkbG9jYXRpb25Qcm92aWRlci5odG1sNU1vZGUodHJ1ZSk7XG4gIC8vIElmIHdlIGdvIHRvIGEgVVJMIHRoYXQgdWktcm91dGVyIGRvZXNuJ3QgaGF2ZSByZWdpc3RlcmVkLCBnbyB0byB0aGUgXCIvXCIgdXJsLlxuICAkdXJsUm91dGVyUHJvdmlkZXIub3RoZXJ3aXNlKCcvJyk7XG59KTtcbiIsIid1c2Ugc3RyaWN0JztcbmFwcC5jb25maWcoZnVuY3Rpb24oJHN0YXRlUHJvdmlkZXIpIHtcblxuICAvLyBSZWdpc3RlciBvdXIgKmFib3V0KiBzdGF0ZS5cbiAgJHN0YXRlUHJvdmlkZXIuc3RhdGUoJ2Fib3V0Jywge1xuICAgIHVybDogJy9hYm91dCcsXG4gICAgY29udHJvbGxlcjogJ0Fib3V0Q29udHJvbGxlcicsXG4gICAgdGVtcGxhdGVVcmw6ICdqcy9hYm91dC9hYm91dC5odG1sJ1xuICB9KTtcblxufSk7XG5cbmFwcC5jb250cm9sbGVyKCdBYm91dENvbnRyb2xsZXInLCBmdW5jdGlvbigkc2NvcGUpIHtcblxuICAvLyBJbWFnZXMgb2YgYmVhdXRpZnVsIEZ1bGxzdGFjayBwZW9wbGUuXG4gICRzY29wZS5pbWFnZXMgPSBbXG4gICAgJ2h0dHBzOi8vcGJzLnR3aW1nLmNvbS9tZWRpYS9CN2dCWHVsQ0FBQVhRY0UuanBnOmxhcmdlJyxcbiAgICAnaHR0cHM6Ly9mYmNkbi1zcGhvdG9zLWMtYS5ha2FtYWloZC5uZXQvaHBob3Rvcy1hay14YXAxL3QzMS4wLTgvMTA4NjI0NTFfMTAyMDU2MjI5OTAzNTkyNDFfODAyNzE2ODg0MzMxMjg0MTEzN19vLmpwZycsXG4gICAgJ2h0dHBzOi8vcGJzLnR3aW1nLmNvbS9tZWRpYS9CLUxLVXNoSWdBRXk5U0suanBnJyxcbiAgICAnaHR0cHM6Ly9wYnMudHdpbWcuY29tL21lZGlhL0I3OS1YN29DTUFBa3c3eS5qcGcnLFxuICAgICdodHRwczovL3Bicy50d2ltZy5jb20vbWVkaWEvQi1VajlDT0lJQUlGQWgwLmpwZzpsYXJnZScsXG4gICAgJ2h0dHBzOi8vcGJzLnR3aW1nLmNvbS9tZWRpYS9CNnlJeUZpQ0VBQXFsMTIuanBnOmxhcmdlJ1xuICBdO1xuXG59KTtcbiIsIid1c2Ugc3RyaWN0JztcbmFwcC5jb25maWcoZnVuY3Rpb24oJHN0YXRlUHJvdmlkZXIpIHtcblxuICAgICRzdGF0ZVByb3ZpZGVyLnN0YXRlKCdjYXJ0Jywge1xuICAgICAgICB1cmw6ICcvY2FydCcsXG4gICAgICAgIGNvbnRyb2xsZXI6ICdjYXJ0Q3RybCcsXG4gICAgICAgIHRlbXBsYXRlVXJsOiAnanMvY2FydC9jYXJ0Lmh0bWwnXG4gICAgfSk7XG5cbn0pO1xuXG5hcHAuY29udHJvbGxlcignY2FydEN0cmwnLCBmdW5jdGlvbigkc2NvcGUpIHtcblxuICAgIC8vVEVNUE9SQVJZISBGT1IgVEVTVElOR1xuICAgIC8vdGhpcyByZW5kZXJzIHRoZSBjYXJ0XG4gICAgJHNjb3BlLnNlc2hPcmRlcnMgPSBbe1xuICAgICAgICB0aXRsZTogJ1Rlc3QgSXRlbSAwMScsXG4gICAgICAgIGRlc2NyaXB0aW9uOiAnQWxtb3N0IGFzIGdvb2QgYXMgVGVzdCBJdGVtIDAyIScsXG4gICAgICAgIHByaWNlOiAzOTk5LFxuICAgICAgICBob3dNYW55OiA1XG4gICAgfSwge1xuICAgICAgICB0aXRsZTogJ1Rlc3QgSXRlbSAwMicsXG4gICAgICAgIGRlc2NyaXB0aW9uOiAnTmV3IGFuZCBJbXByb3ZlZCEhJyxcbiAgICAgICAgcHJpY2U6IDQyOTksXG4gICAgICAgIGhvd01hbnk6IDNcbiAgICB9LCB7XG4gICAgICAgIHRpdGxlOiAnVGVzdCBJdGVtIDAzJyxcbiAgICAgICAgZGVzY3JpcHRpb246ICdCYXJnYWluIFRlc3QgSXRlbSEnLFxuICAgICAgICBwcmljZTogMTk5OSxcbiAgICAgICAgaG93TWFueTogNlxuICAgIH0sIHtcbiAgICAgICAgdGl0bGU6ICdUZXN0IEl0ZW0gMDQnLFxuICAgICAgICBkZXNjcmlwdGlvbjogJ0ZhbWlseSBTaXplZCBUZXN0IGl0ZW0hJyxcbiAgICAgICAgcHJpY2U6IDc5OTksXG4gICAgICAgIGhvd01hbnk6IDFcbiAgICB9XVxuXG4gICAgJHNjb3BlLnNlc2hPcmRlcnMubWFwKGZ1bmN0aW9uKGVsKSB7XG4gICAgICAgIGVsLnByaWNlT3V0ID0gJyQnICsgZWwucHJpY2UgLyAxMDA7XG4gICAgICAgIGVsLnNUb3QgPSAnJCcgKyAoKGVsLnByaWNlICogZWwuaG93TWFueSkgLyAxMDApO1xuICAgIH0pXG5cbiAgICAkc2NvcGUudG90YWwgPSAwO1xuXG4gICAgJHNjb3BlLnNlc2hPcmRlcnMuZm9yRWFjaChmdW5jdGlvbihlbCkge1xuICAgICAgICAkc2NvcGUudG90YWwgKz0gZWwucHJpY2UgKiBlbC5ob3dNYW55O1xuICAgIH0pO1xuXG4gICAgJHNjb3BlLnRvdGFsID0gJyQnICsgJHNjb3BlLnRvdGFsLzEwMFxuXG59KTsiLCIoZnVuY3Rpb24gKCkge1xuXG4gICAgJ3VzZSBzdHJpY3QnO1xuXG4gICAgLy8gSG9wZSB5b3UgZGlkbid0IGZvcmdldCBBbmd1bGFyISBEdWgtZG95LlxuICAgIGlmICghd2luZG93LmFuZ3VsYXIpIHRocm93IG5ldyBFcnJvcignSSBjYW5cXCd0IGZpbmQgQW5ndWxhciEnKTtcblxuICAgIHZhciBhcHAgPSBhbmd1bGFyLm1vZHVsZSgnZnNhUHJlQnVpbHQnLCBbXSk7XG5cbiAgICBhcHAuZmFjdG9yeSgnU29ja2V0JywgZnVuY3Rpb24gKCRsb2NhdGlvbikge1xuXG4gICAgICAgIGlmICghd2luZG93LmlvKSB0aHJvdyBuZXcgRXJyb3IoJ3NvY2tldC5pbyBub3QgZm91bmQhJyk7XG5cbiAgICAgICAgdmFyIHNvY2tldDtcblxuICAgICAgICBpZiAoJGxvY2F0aW9uLiQkcG9ydCkge1xuICAgICAgICAgICAgc29ja2V0ID0gaW8oJ2h0dHA6Ly9sb2NhbGhvc3Q6MTMzNycpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgc29ja2V0ID0gaW8oJy8nKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBzb2NrZXQ7XG5cbiAgICB9KTtcblxuICAgIGFwcC5jb25zdGFudCgnQVVUSF9FVkVOVFMnLCB7XG4gICAgICAgIGxvZ2luU3VjY2VzczogJ2F1dGgtbG9naW4tc3VjY2VzcycsXG4gICAgICAgIGxvZ2luRmFpbGVkOiAnYXV0aC1sb2dpbi1mYWlsZWQnLFxuICAgICAgICBsb2dvdXRTdWNjZXNzOiAnYXV0aC1sb2dvdXQtc3VjY2VzcycsXG4gICAgICAgIHNlc3Npb25UaW1lb3V0OiAnYXV0aC1zZXNzaW9uLXRpbWVvdXQnLFxuICAgICAgICBub3RBdXRoZW50aWNhdGVkOiAnYXV0aC1ub3QtYXV0aGVudGljYXRlZCcsXG4gICAgICAgIG5vdEF1dGhvcml6ZWQ6ICdhdXRoLW5vdC1hdXRob3JpemVkJ1xuICAgIH0pO1xuXG4gICAgYXBwLmNvbmZpZyhmdW5jdGlvbiAoJGh0dHBQcm92aWRlcikge1xuICAgICAgICAkaHR0cFByb3ZpZGVyLmludGVyY2VwdG9ycy5wdXNoKFtcbiAgICAgICAgICAgICckaW5qZWN0b3InLFxuICAgICAgICAgICAgZnVuY3Rpb24gKCRpbmplY3Rvcikge1xuICAgICAgICAgICAgICAgIHJldHVybiAkaW5qZWN0b3IuZ2V0KCdBdXRoSW50ZXJjZXB0b3InKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgXSk7XG4gICAgfSk7XG5cbiAgICBhcHAuZmFjdG9yeSgnQXV0aEludGVyY2VwdG9yJywgZnVuY3Rpb24gKCRyb290U2NvcGUsICRxLCBBVVRIX0VWRU5UUykge1xuICAgICAgICB2YXIgc3RhdHVzRGljdCA9IHtcbiAgICAgICAgICAgIDQwMTogQVVUSF9FVkVOVFMubm90QXV0aGVudGljYXRlZCxcbiAgICAgICAgICAgIDQwMzogQVVUSF9FVkVOVFMubm90QXV0aG9yaXplZCxcbiAgICAgICAgICAgIDQxOTogQVVUSF9FVkVOVFMuc2Vzc2lvblRpbWVvdXQsXG4gICAgICAgICAgICA0NDA6IEFVVEhfRVZFTlRTLnNlc3Npb25UaW1lb3V0XG4gICAgICAgIH07XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICByZXNwb25zZUVycm9yOiBmdW5jdGlvbiAocmVzcG9uc2UpIHtcbiAgICAgICAgICAgICAgICAkcm9vdFNjb3BlLiRicm9hZGNhc3Qoc3RhdHVzRGljdFtyZXNwb25zZS5zdGF0dXNdLCByZXNwb25zZSk7XG4gICAgICAgICAgICAgICAgcmV0dXJuICRxLnJlamVjdChyZXNwb25zZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH07XG4gICAgfSk7XG5cbiAgICBhcHAuc2VydmljZSgnQXV0aFNlcnZpY2UnLCBmdW5jdGlvbiAoJGh0dHAsIFNlc3Npb24sICRyb290U2NvcGUsIEFVVEhfRVZFTlRTLCAkcSkge1xuXG4gICAgICAgIHZhciBvblN1Y2Nlc3NmdWxMb2dpbiA9IGZ1bmN0aW9uIChyZXNwb25zZSkge1xuICAgICAgICAgICAgdmFyIGRhdGEgPSByZXNwb25zZS5kYXRhO1xuICAgICAgICAgICAgU2Vzc2lvbi5jcmVhdGUoZGF0YS5pZCwgZGF0YS51c2VyKTtcbiAgICAgICAgICAgICRyb290U2NvcGUuJGJyb2FkY2FzdChBVVRIX0VWRU5UUy5sb2dpblN1Y2Nlc3MpO1xuICAgICAgICAgICAgcmV0dXJuIGRhdGEudXNlcjtcbiAgICAgICAgfTtcblxuICAgICAgICB0aGlzLmdldExvZ2dlZEluVXNlciA9IGZ1bmN0aW9uICgpIHtcblxuICAgICAgICAgICAgaWYgKHRoaXMuaXNBdXRoZW50aWNhdGVkKCkpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gJHEud2hlbih7IHVzZXI6IFNlc3Npb24udXNlciB9KTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgcmV0dXJuICRodHRwLmdldCgnL3Nlc3Npb24nKS50aGVuKG9uU3VjY2Vzc2Z1bExvZ2luKS5jYXRjaChmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICAgICAgICB9KTtcblxuICAgICAgICB9O1xuXG4gICAgICAgIHRoaXMubG9naW4gPSBmdW5jdGlvbiAoY3JlZGVudGlhbHMpIHtcbiAgICAgICAgICAgIHJldHVybiAkaHR0cC5wb3N0KCcvbG9naW4nLCBjcmVkZW50aWFscykudGhlbihvblN1Y2Nlc3NmdWxMb2dpbik7XG4gICAgICAgIH07XG5cbiAgICAgICAgdGhpcy5sb2dvdXQgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICByZXR1cm4gJGh0dHAuZ2V0KCcvbG9nb3V0JykudGhlbihmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgU2Vzc2lvbi5kZXN0cm95KCk7XG4gICAgICAgICAgICAgICAgJHJvb3RTY29wZS4kYnJvYWRjYXN0KEFVVEhfRVZFTlRTLmxvZ291dFN1Y2Nlc3MpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH07XG5cbiAgICAgICAgdGhpcy5pc0F1dGhlbnRpY2F0ZWQgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICByZXR1cm4gISFTZXNzaW9uLnVzZXI7XG4gICAgICAgIH07XG5cbiAgICB9KTtcblxuICAgIGFwcC5zZXJ2aWNlKCdTZXNzaW9uJywgZnVuY3Rpb24gKCRyb290U2NvcGUsIEFVVEhfRVZFTlRTKSB7XG5cbiAgICAgICAgJHJvb3RTY29wZS4kb24oQVVUSF9FVkVOVFMubm90QXV0aGVudGljYXRlZCwgdGhpcy5kZXN0cm95KTtcbiAgICAgICAgJHJvb3RTY29wZS4kb24oQVVUSF9FVkVOVFMuc2Vzc2lvblRpbWVvdXQsIHRoaXMuZGVzdHJveSk7XG5cbiAgICAgICAgdGhpcy5jcmVhdGUgPSBmdW5jdGlvbiAoc2Vzc2lvbklkLCB1c2VyKSB7XG4gICAgICAgICAgICB0aGlzLmlkID0gc2Vzc2lvbklkO1xuICAgICAgICAgICAgdGhpcy51c2VyID0gdXNlcjtcbiAgICAgICAgfTtcblxuICAgICAgICB0aGlzLmRlc3Ryb3kgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICB0aGlzLmlkID0gbnVsbDtcbiAgICAgICAgICAgIHRoaXMudXNlciA9IG51bGw7XG4gICAgICAgIH07XG5cbiAgICB9KTtcblxufSkoKTsiLCIndXNlIHN0cmljdCc7XG5hcHAuY29uZmlnKGZ1bmN0aW9uICgkc3RhdGVQcm92aWRlcikge1xuXG4gICAgJHN0YXRlUHJvdmlkZXIuc3RhdGUoJ2hvbWUnLCB7XG4gICAgICAgIHVybDogJy8nLFxuICAgICAgICBjb250cm9sbGVyOiAnSG9tZUN0cmwnLFxuICAgICAgICB0ZW1wbGF0ZVVybDogJ2pzL2hvbWUvaG9tZS5odG1sJ1xuICAgIH0pO1xuXG59KTtcblxuYXBwLmNvbnRyb2xsZXIoJ0hvbWVDdHJsJywgZnVuY3Rpb24gKCRzY29wZSkge1xuXG5cblx0XG59KTsiLCIndXNlIHN0cmljdCc7XG5hcHAuY29uZmlnKGZ1bmN0aW9uKCRzdGF0ZVByb3ZpZGVyKSB7XG5cbiAgICAkc3RhdGVQcm92aWRlci5zdGF0ZSgncHJvZERldGFpbCcsIHtcbiAgICAgICAgdXJsOiAnL3Byb2R1Y3QvOnByb2R1JyxcbiAgICAgICAgY29udHJvbGxlcjogJ3Byb2REZXRhaWxDdHJsJyxcbiAgICAgICAgdGVtcGxhdGVVcmw6ICdqcy9wcm9kZGV0YWlsL3Byb2RkZXRhaWwuaHRtbCdcbiAgICB9KTtcblxufSk7XG5cbmFwcC5jb250cm9sbGVyKCdwcm9kRGV0YWlsQ3RybCcsIGZ1bmN0aW9uKCRzY29wZSwkc3RhdGVQYXJhbXMpIHtcbiAgICAvL1RFTVBPUkFSWSEgRk9SIFRFU1RJTkdcbiAgICBjb25zb2xlLmxvZygkc3RhdGVQYXJhbXMpO1xuICAgICRzY29wZS5wcm9kID0ge1xuICAgICAgICB0aXRsZTogJ1NhbXBsZSBQcm9kdWN0JyxcbiAgICAgICAgZGVzY3JpcHRpb246ICdUaGlzIHByb2R1Y3QgaXMgc28gYXdlc29tZSEgSXRcXCdzIHRhc3R5LicsXG4gICAgICAgIHByaWNlOiAzOTk5LFxuICAgICAgICBpc0NvZmZlZTogZmFsc2UsXG4gICAgICAgIGNhdGVnb3J5OiBbJ3Rhc3R5JywgJ2JlYW5zJywgJ21tbScsICdzcnNseSBpIGdvdCBub3RoaW4nXSxcbiAgICAgICAgcGhvdG86J25vbmUnXG4gICAgfTtcblxuICAgICRzY29wZS5wcm9kLnBob3RvID0gJ2ltYWdlcy8nICsgJHNjb3BlLnByb2QucGhvdG87XG4gICAgaWYgKCRzY29wZS5wcm9kLmlzQ29mZmVlICYmICRzY29wZS5wcm9kLnBob3RvID09PSAnaW1hZ2VzL25vbmUnKSB7XG4gICAgICAgIGNvbnNvbGUubG9nKCdiZWFucycpXG4gICAgICAgICRzY29wZS5wcm9kLnBob3RvID0gJ2ltYWdlcy9wbGFjZWhvbGRlckNvZi5qcGcnO1xuICAgIH0gZWxzZSBpZiAoISRzY29wZS5wcm9kLmlzQ29mZmVlICYmICRzY29wZS5wcm9kLnBob3RvID09PSAnaW1hZ2VzL25vbmUnKSB7XG4gICAgICAgICRzY29wZS5wcm9kLnBob3RvID0gJ2ltYWdlcy9wbGFjZWhvbGRlck1pbnQucG5nJztcbiAgICB9XG4gICAgJHNjb3BlLnByb2QucHJpY2VPdXQgPSAnJCcrKCRzY29wZS5wcm9kLnByaWNlLzEwMCk7XG5cbn0pOyIsIid1c2Ugc3RyaWN0JztcblxuYXBwLmZhY3RvcnkoJ1Byb2R1Y3RGYWN0b3J5JywgZnVuY3Rpb24oJGh0dHApIHtcbiAgcmV0dXJuIHtcbiAgICBnZXRDb2ZmZWVEYjogZnVuY3Rpb24oKSB7XG4gICAgICByZXR1cm4gJGh0dHAuZ2V0KCcvYXBpL2NvZmZlZScpLnRoZW4oZnVuY3Rpb24ocmVzcG9uc2UpIHtcbiAgICAgICAgcmV0dXJuIHJlc3BvbnNlLmRhdGE7XG4gICAgICB9KTtcbiAgICB9LFxuICAgIGdldE1pbnRzRGI6IGZ1bmN0aW9uKCkge1xuICAgICAgcmV0dXJuICRodHRwLmdldCgnL2FwaS9taW50cycpLnRoZW4oZnVuY3Rpb24ocmVzcG9uc2UpIHtcbiAgICAgICAgcmV0dXJuIHJlc3BvbnNlLmRhdGE7XG4gICAgICB9KTtcbiAgICB9XG4gIH07XG59KTtcbiIsIid1c2Ugc3RyaWN0JztcbmFwcC5jb25maWcoZnVuY3Rpb24oJHN0YXRlUHJvdmlkZXIpIHtcblxuICAkc3RhdGVQcm92aWRlci5zdGF0ZSgnY29mZmVlJywge1xuICAgIHVybDogJy9wcm9kdWN0L2NvZmZlZScsXG4gICAgY29udHJvbGxlcjogJ1Byb2R1Y3RDdHJsJyxcbiAgICB0ZW1wbGF0ZVVybDogJ2pzL3Byb2R1Y3RsaXN0aW5nL2NvZmZlZS5odG1sJ1xuICB9KTtcblxuICAkc3RhdGVQcm92aWRlci5zdGF0ZSgnbWludCcsIHtcbiAgICB1cmw6ICcvcHJvZHVjdC9taW50JyxcbiAgICBjb250cm9sbGVyOiAnUHJvZHVjdEN0cmwnLFxuICAgIHRlbXBsYXRlVXJsOiAnanMvcHJvZHVjdGxpc3RpbmcvbWludC5odG1sJ1xuICB9KTtcbn0pO1xuXG5hcHAuY29udHJvbGxlcignUHJvZHVjdEN0cmwnLCBmdW5jdGlvbigkc2NvcGUsIFByb2R1Y3RGYWN0b3J5KSB7XG5cbiAgJHNjb3BlLnNob3dDb2ZmZWUgPSBmdW5jdGlvbigpIHtcbiAgICBQcm9kdWN0RmFjdG9yeS5nZXRDb2ZmZWVEYigpLnRoZW4oZnVuY3Rpb24oZGF0YSkge1xuICAgICAgJHNjb3BlLmNvZmZlZSA9IGRhdGE7XG4gICAgfSk7XG4gIH07XG5cbiAgJHNjb3BlLnNob3dNaW50cyA9IGZ1bmN0aW9uKCkge1xuICAgIFByb2R1Y3RGYWN0b3J5LmdldE1pbnRzRGIoKS50aGVuKGZ1bmN0aW9uKGRhdGEpIHtcbiAgICAgICRzY29wZS5taW50cyA9IGRhdGE7XG4gICAgfSk7XG4gIH07XG59KTtcbiIsIid1c2Ugc3RyaWN0JztcbmFwcC5jb25maWcoZnVuY3Rpb24gKCRzdGF0ZVByb3ZpZGVyKSB7XG5cbiAgICAvLyBSZWdpc3RlciBvdXIgKmFib3V0KiBzdGF0ZS5cbiAgICAkc3RhdGVQcm92aWRlci5zdGF0ZSgnc2lnbnVwJywge1xuICAgICAgICB1cmw6ICcvc2lnbnVwJyxcbiAgICAgICAgY29udHJvbGxlcjogJ3NpZ25VcENvbnRyb2xsZXInLFxuICAgICAgICB0ZW1wbGF0ZVVybDogJ2pzL3NpZ251cC9zaWdudXAuaHRtbCdcbiAgICB9KTtcblxufSk7XG5cbmFwcC5jb250cm9sbGVyKCdzaWduVXBDb250cm9sbGVyJywgZnVuY3Rpb24gKCRzY29wZSwgJHdpbmRvdywgJGxvY2F0aW9uKSB7XG5cblx0JHNjb3BlLnVzZXIgPSB7XG5cblx0fVxuICAgIC8vICRzY29wZS5zaWduVXBGb3JtID0gZnVuY3Rpb24gKHVzZXIpe1xuICAgIC8vIFx0c2lnbnVwRmFjdG9yeS5hZGROZXdVc2VyKHVzZXIpLnRoZW4oZnVuY3Rpb24oKXtcbiAgICAvLyBcdH0pO1xuICAgIC8vIH07XG5cbiAgICAkc2NvcGUubG9naW4gPSBmdW5jdGlvbiAoKXtcbiAgICAgICAgJHdpbmRvdy5sb2NhdGlvbi5ocmVmID0gJy9hdXRoL2dvb2dsZSc7XG4gICAgfTtcblxuICAgICRzY29wZS5sb2dpbmZiID0gZnVuY3Rpb24gKCl7XG4gICAgICAgICR3aW5kb3cubG9jYXRpb24uaHJlZiA9ICcvYXV0aC9mYWNlYm9vayc7XG4gICAgfTtcblxuICAgIFxufSk7XG5cbiIsIid1c2Ugc3RyaWN0JztcbmFwcC5mYWN0b3J5KCdSYW5kb21HcmVldGluZ3MnLCBmdW5jdGlvbiAoKSB7XG5cbiAgICB2YXIgZ2V0UmFuZG9tRnJvbUFycmF5ID0gZnVuY3Rpb24gKGFycikge1xuICAgICAgICByZXR1cm4gYXJyW01hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIGFyci5sZW5ndGgpXTtcbiAgICB9O1xuXG4gICAgdmFyIGdyZWV0aW5ncyA9IFtcbiAgICAgICAgJ0kga25vdyB0aGF0IHlvdSBqdXN0IGRyYW5rIHNvbWUgY29mZmVlLi4uIGhhdmUgYSBtaW50Li4uJyxcbiAgICAgICAgJ1VtbW0uLi4uLi4gWW91IG5lZWQgYSBtaW50Li4uJyxcbiAgICAgICAgJ0hlbGxvLCBzbWVsbHkgaHVtYW4uJyxcbiAgICAgICAgJ1NvLi4uIGhvdyBkbyB5b3UgZmVlbCBhYm91dCBoYXZpbmcgYSBtaW50IHJpZ2h0IG5vdz8nLFxuICAgICAgICAnRHVkZS4gWW91IGNhbm5vdCBlYXQgZWdnIHNhbGFkIHdpdGggY29mZmVlIHVubGVzcyB5b3UgdGFrZSBhIG1pbnQuJyxcbiAgICAgICAgJ1NlcmlvdXNseS4gQ29mZmVlIHdpdGggc2FsbW9uIHNhbGFkPyBUYWtlIGEgbWludC4nLCBcbiAgICAgICAgJ1doYXRcXCdzIHlvdXIgcHJvYmxlbSB3aXRoIG1pbnRzPyBZb3UgbmVlZCBvbmUuJ1xuICAgIF07XG5cbiAgICByZXR1cm4ge1xuICAgICAgICBncmVldGluZ3M6IGdyZWV0aW5ncyxcbiAgICAgICAgZ2V0UmFuZG9tR3JlZXRpbmc6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHJldHVybiBnZXRSYW5kb21Gcm9tQXJyYXkoZ3JlZXRpbmdzKTtcbiAgICAgICAgfVxuICAgIH07XG5cbn0pOyIsIid1c2Ugc3RyaWN0JztcbiIsImFwcC5mYWN0b3J5KCdBZGRUb0NhcnQnLCBmdW5jdGlvbigpIHtcblxuICAgICAgICAgICAgdmFyIGNhcnRjb250ZW50ID0ge1xuICAgICAgICAgICAgICAgIHVzZXI6IHJlcS5ib2R5LmNvb2tpZXMuY2FydDtcbiAgICAgICAgICAgICAgICBwcm9kdWN0czogW11cblxuICAgICAgICAgICAgfTtcblxuICAgICAgICAgICAgcmV0dXJuIHtcblxuICAgICAgICAgICAgICAgIHNlbGVjdGluZzogZnVuY3Rpb24ocHJvZHVjdGluZm8pIHtcbiAgICAgICAgICAgICAgICAgICAgdmFyIHRoaXNjbGljayA9IHt9O1xuICAgICAgICAgICAgICAgICAgICB0aGlzY2xpY2sucHJvZElkID0gcHJvZHVjdGluZm8uX2lkO1xuICAgICAgICAgICAgICAgICAgICB0aGlzY2xpY2suUHJpY2UgPSBwcm9kdWN0aW5mby5wcmljZTtcbiAgICAgICAgICAgICAgICAgICAgdGhpc2NsaWNrLlF1YW50aXR5ID0gcHJvZHVjdGluZm8uaG93TWFueTtcblxuICAgICAgICAgICAgICAgICAgICBjYXJ0Y29udGVudC5wcm9kdWN0cy5wdXNoKHRoaXNjbGljayk7XG4gICAgICAgICAgICAgICAgfSxcblxuXG4gICAgICAgXG4gICAgICAgICAgICAgICAgYWRkZWRUb0NhcnQ6IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gc2VsZWN0aW5nKGNsaWNraW5mbyk7XG4gICAgICAgICAgICAgICAgfVxuXG5cbiAgICAgICAgICAgIH1cblxuICAgICAgICB9KTtcbiIsIlwidXNlIHN0cmljdFwiO1xuYXBwLmZhY3RvcnkoJ3NpZ251cEZhY3RvcnknLCBmdW5jdGlvbigkaHR0cCl7XG5cdHJldHVybiB7XG5cdFx0YWRkTmV3VXNlciA6IGZ1bmN0aW9uICh1c2VyKSB7XG5cdFx0XHRyZXR1cm4gJGh0dHAucG9zdCgnL25ld1VzZXInLCB1c2VyKTtcblx0XHR9XG5cdH07XG59KTtcbiIsIid1c2Ugc3RyaWN0JztcbmFwcC5kaXJlY3RpdmUoJ25hdmJhcicsIGZ1bmN0aW9uICgpIHtcbiAgICByZXR1cm4ge1xuICAgICAgICByZXN0cmljdDogJ0UnLFxuICAgICAgICBzY29wZToge1xuICAgICAgICAgIGl0ZW1zOiAnPSdcbiAgICAgICAgfSwgXG4gICAgICAgIHRlbXBsYXRlVXJsOiAnanMvY29tbW9uL2RpcmVjdGl2ZXMvbmF2YmFyL25hdmJhci5odG1sJ1xuICAgIH07XG59KTsiLCIndXNlIHN0cmljdCc7XG5hcHAuZGlyZWN0aXZlKCdyYW5kb0dyZWV0aW5nJywgZnVuY3Rpb24gKFJhbmRvbUdyZWV0aW5ncykge1xuXG4gICAgcmV0dXJuIHtcbiAgICAgICAgcmVzdHJpY3Q6ICdFJyxcbiAgICAgICAgdGVtcGxhdGVVcmw6ICdqcy9jb21tb24vZGlyZWN0aXZlcy9yYW5kby1ncmVldGluZy9yYW5kby1ncmVldGluZy5odG1sJyxcbiAgICAgICAgbGluazogZnVuY3Rpb24gKHNjb3BlKSB7XG4gICAgICAgICAgICBzY29wZS5ncmVldGluZyA9IFJhbmRvbUdyZWV0aW5ncy5nZXRSYW5kb21HcmVldGluZygpO1xuICAgICAgICB9XG4gICAgfTtcblxufSk7IiwiJ3VzZSBzdHJpY3QnO1xuYXBwLmRpcmVjdGl2ZSgnc3RhY2snLCBmdW5jdGlvbiAoKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgICAgcmVzdHJpY3Q6ICdFJyxcbiAgICAgICAgdGVtcGxhdGVVcmw6ICdqcy9jb21tb24vZGlyZWN0aXZlcy9zdGFja1N0b3JlTG9nby9zdGFja1N0b3JlTG9nby5odG1sJ1xuICAgIH07XG59KTsiXSwic291cmNlUm9vdCI6Ii9zb3VyY2UvIn0=