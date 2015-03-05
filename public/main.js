'use strict';
var app = angular.module('FullstackGeneratedApp', ['ui.router', 'fsaPreBuilt', 'ngCookies']);

app.controller('MainController', function ($scope, $cookies, $cookieStore) {
    
    console.log($cookieStore, 'this is cookie store');
    $cookieStore.put('cart', 'temp');
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
    label: 'SignUp',
    state: 'signup'
  }, {    label: 'Sign In',
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
        url: '/product/anything/:produ',
        controller: 'prodDetailCtrl',
        templateUrl: 'js/proddetail/proddetail.html'
    });

});

app.controller('prodDetailCtrl', function($scope, $stateParams, $cookies, $cookieStore) {
    //TEMPORARY! FOR TESTING
    console.log($stateParams.produ, 'this is produ');

    $scope.thistitle = $stateParams.produ;

    $scope.item = $stateParams.title;



    $scope.prod = {
        title: 'Sample Product',
        description: 'This product is so awesome! It\'s tasty.',
        price: 3999,
        isCoffee: false,
        category: ['tasty', 'beans', 'mmm', 'srsly i got nothin'],
        photo: 'none'
    };

    $scope.prod.photo = 'images/' + $scope.prod.photo;
    if ($scope.prod.isCoffee && $scope.prod.photo === 'images/none') {
        console.log('beans')
        $scope.prod.photo = 'images/placeholderCof.jpg';
    } else if (!$scope.prod.isCoffee && $scope.prod.photo === 'images/none') {
        $scope.prod.photo = 'images/placeholderMint.png';
    }
    $scope.prod.priceOut = '$' + ($scope.prod.price / 100);

    $scope.addtocart = function(itemtoadd) {
        // two ways to grab the customer's data: $scope.cart.items / parameter to this function

        // $http.post({customerData}).success(function(result){
        //     $scope.customerCart = result; 

        // })

console.log('this is first $cookies', $cookies.products);
        console.log('hit button this comes through', itemtoadd);
        if ($cookies.products === null) {

            $cookieStore.put('products', itemtoadd);
            console.log('cookie', $cookies);
        } else

            $cookieStore.put('secondproduct', itemtoadd);
        console.log($cookies, 'this is second cookies');

    };

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

app.factory('AddToCart', function() {

            var cartcontent = {
                user: req.body.cookies.cart,
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC5qcyIsImFib3V0L2Fib3V0LmpzIiwiY2FydC9jYXJ0LmpzIiwiZnNhL2ZzYS1wcmUtYnVpbHQuanMiLCJob21lL2hvbWUuanMiLCJwcm9kZGV0YWlsL3Byb2RkZXRhaWwuanMiLCJwcm9kdWN0bGlzdGluZy9wcm9kdWN0ZmFjdG9yeS5qcyIsInByb2R1Y3RsaXN0aW5nL3Byb2R1Y3RsaXN0aW5nLmpzIiwic2lnbnVwL3NpZ251cC5qcyIsImNvbW1vbi9mYWN0b3JpZXMvUmFuZG9tR3JlZXRpbmdzLmpzIiwiY29tbW9uL2ZhY3Rvcmllcy9Tb2NrZXQuanMiLCJjb21tb24vZmFjdG9yaWVzL2NhcnRmYWN0b3J5LmpzIiwiY29tbW9uL2ZhY3Rvcmllcy9zaWdudXBGYWN0b3J5LmpzIiwiY29tbW9uL2RpcmVjdGl2ZXMvbmF2YmFyL25hdmJhci5qcyIsImNvbW1vbi9kaXJlY3RpdmVzL3JhbmRvLWdyZWV0aW5nL3JhbmRvLWdyZWV0aW5nLmpzIiwiY29tbW9uL2RpcmVjdGl2ZXMvc3RhY2tTdG9yZUxvZ28vc3RhY2tTdG9yZUxvZ28uanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ3hDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDekJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ2xEQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUNqSEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUNmQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDN0RBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ1hBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDeEJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDakNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDeEJBO0FBQ0E7QUNEQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUM3QkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDUkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUNUQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUNYQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsImZpbGUiOiJtYWluLmpzIiwic291cmNlc0NvbnRlbnQiOlsiJ3VzZSBzdHJpY3QnO1xudmFyIGFwcCA9IGFuZ3VsYXIubW9kdWxlKCdGdWxsc3RhY2tHZW5lcmF0ZWRBcHAnLCBbJ3VpLnJvdXRlcicsICdmc2FQcmVCdWlsdCcsICduZ0Nvb2tpZXMnXSk7XG5cbmFwcC5jb250cm9sbGVyKCdNYWluQ29udHJvbGxlcicsIGZ1bmN0aW9uICgkc2NvcGUsICRjb29raWVzLCAkY29va2llU3RvcmUpIHtcbiAgICBcbiAgICBjb25zb2xlLmxvZygkY29va2llU3RvcmUsICd0aGlzIGlzIGNvb2tpZSBzdG9yZScpO1xuICAgICRjb29raWVTdG9yZS5wdXQoJ2NhcnQnLCAndGVtcCcpO1xuICAgIGNvbnNvbGUubG9nKCRjb29raWVzLCAndGhpcyBpcyBjb29raWUnKTtcblxuICAvLyBHaXZlbiB0byB0aGUgPG5hdmJhcj4gZGlyZWN0aXZlIHRvIHNob3cgdGhlIG1lbnUuXG4gICRzY29wZS5tZW51SXRlbXMgPSBbe1xuICAgIGxhYmVsOiAnSG9tZScsXG4gICAgc3RhdGU6ICdob21lJ1xuICB9LCB7XG4gICAgbGFiZWw6ICdDb2ZmZWUnLFxuICAgIHN0YXRlOiAnY29mZmVlJ1xuICB9LCB7XG4gICAgbGFiZWw6ICdNaW50JyxcbiAgICBzdGF0ZTogJ21pbnQnXG4gIH0sIHtcbiAgICBsYWJlbDogJ0Fib3V0JyxcbiAgICBzdGF0ZTogJ2Fib3V0J1xuICB9LCB7XG4gICAgbGFiZWw6ICdTaWduVXAnLFxuICAgIHN0YXRlOiAnc2lnbnVwJ1xuICB9LCB7ICAgIGxhYmVsOiAnU2lnbiBJbicsXG4gICAgc3RhdGU6ICdzaWduSW4nXG4gIH0sIHtcbiAgICBsYWJlbDogJ0NhcnQnLFxuICAgIHN0YXRlOiAnY2FydCdcbiAgfV07XG59KTtcblxuXG5hcHAuY29uZmlnKGZ1bmN0aW9uKCR1cmxSb3V0ZXJQcm92aWRlciwgJGxvY2F0aW9uUHJvdmlkZXIpIHtcbiAgLy8gVGhpcyB0dXJucyBvZmYgaGFzaGJhbmcgdXJscyAoLyNhYm91dCkgYW5kIGNoYW5nZXMgaXQgdG8gc29tZXRoaW5nIG5vcm1hbCAoL2Fib3V0KVxuICAkbG9jYXRpb25Qcm92aWRlci5odG1sNU1vZGUodHJ1ZSk7XG4gIC8vIElmIHdlIGdvIHRvIGEgVVJMIHRoYXQgdWktcm91dGVyIGRvZXNuJ3QgaGF2ZSByZWdpc3RlcmVkLCBnbyB0byB0aGUgXCIvXCIgdXJsLlxuICAkdXJsUm91dGVyUHJvdmlkZXIub3RoZXJ3aXNlKCcvJyk7XG59KTtcbiIsIid1c2Ugc3RyaWN0JztcbmFwcC5jb25maWcoZnVuY3Rpb24oJHN0YXRlUHJvdmlkZXIpIHtcblxuICAvLyBSZWdpc3RlciBvdXIgKmFib3V0KiBzdGF0ZS5cbiAgJHN0YXRlUHJvdmlkZXIuc3RhdGUoJ2Fib3V0Jywge1xuICAgIHVybDogJy9hYm91dCcsXG4gICAgY29udHJvbGxlcjogJ0Fib3V0Q29udHJvbGxlcicsXG4gICAgdGVtcGxhdGVVcmw6ICdqcy9hYm91dC9hYm91dC5odG1sJ1xuICB9KTtcblxufSk7XG5cbmFwcC5jb250cm9sbGVyKCdBYm91dENvbnRyb2xsZXInLCBmdW5jdGlvbigkc2NvcGUpIHtcblxuICAvLyBJbWFnZXMgb2YgYmVhdXRpZnVsIEZ1bGxzdGFjayBwZW9wbGUuXG4gICRzY29wZS5pbWFnZXMgPSBbXG4gICAgJ2h0dHBzOi8vcGJzLnR3aW1nLmNvbS9tZWRpYS9CN2dCWHVsQ0FBQVhRY0UuanBnOmxhcmdlJyxcbiAgICAnaHR0cHM6Ly9mYmNkbi1zcGhvdG9zLWMtYS5ha2FtYWloZC5uZXQvaHBob3Rvcy1hay14YXAxL3QzMS4wLTgvMTA4NjI0NTFfMTAyMDU2MjI5OTAzNTkyNDFfODAyNzE2ODg0MzMxMjg0MTEzN19vLmpwZycsXG4gICAgJ2h0dHBzOi8vcGJzLnR3aW1nLmNvbS9tZWRpYS9CLUxLVXNoSWdBRXk5U0suanBnJyxcbiAgICAnaHR0cHM6Ly9wYnMudHdpbWcuY29tL21lZGlhL0I3OS1YN29DTUFBa3c3eS5qcGcnLFxuICAgICdodHRwczovL3Bicy50d2ltZy5jb20vbWVkaWEvQi1VajlDT0lJQUlGQWgwLmpwZzpsYXJnZScsXG4gICAgJ2h0dHBzOi8vcGJzLnR3aW1nLmNvbS9tZWRpYS9CNnlJeUZpQ0VBQXFsMTIuanBnOmxhcmdlJ1xuICBdO1xuXG59KTtcbiIsIid1c2Ugc3RyaWN0JztcbmFwcC5jb25maWcoZnVuY3Rpb24oJHN0YXRlUHJvdmlkZXIpIHtcblxuICAgICRzdGF0ZVByb3ZpZGVyLnN0YXRlKCdjYXJ0Jywge1xuICAgICAgICB1cmw6ICcvY2FydCcsXG4gICAgICAgIGNvbnRyb2xsZXI6ICdjYXJ0Q3RybCcsXG4gICAgICAgIHRlbXBsYXRlVXJsOiAnanMvY2FydC9jYXJ0Lmh0bWwnXG4gICAgfSk7XG5cbn0pO1xuXG5hcHAuY29udHJvbGxlcignY2FydEN0cmwnLCBmdW5jdGlvbigkc2NvcGUpIHtcblxuICAgIC8vVEVNUE9SQVJZISBGT1IgVEVTVElOR1xuICAgIC8vdGhpcyByZW5kZXJzIHRoZSBjYXJ0XG4gICAgJHNjb3BlLnNlc2hPcmRlcnMgPSBbe1xuICAgICAgICB0aXRsZTogJ1Rlc3QgSXRlbSAwMScsXG4gICAgICAgIGRlc2NyaXB0aW9uOiAnQWxtb3N0IGFzIGdvb2QgYXMgVGVzdCBJdGVtIDAyIScsXG4gICAgICAgIHByaWNlOiAzOTk5LFxuICAgICAgICBob3dNYW55OiA1XG4gICAgfSwge1xuICAgICAgICB0aXRsZTogJ1Rlc3QgSXRlbSAwMicsXG4gICAgICAgIGRlc2NyaXB0aW9uOiAnTmV3IGFuZCBJbXByb3ZlZCEhJyxcbiAgICAgICAgcHJpY2U6IDQyOTksXG4gICAgICAgIGhvd01hbnk6IDNcbiAgICB9LCB7XG4gICAgICAgIHRpdGxlOiAnVGVzdCBJdGVtIDAzJyxcbiAgICAgICAgZGVzY3JpcHRpb246ICdCYXJnYWluIFRlc3QgSXRlbSEnLFxuICAgICAgICBwcmljZTogMTk5OSxcbiAgICAgICAgaG93TWFueTogNlxuICAgIH0sIHtcbiAgICAgICAgdGl0bGU6ICdUZXN0IEl0ZW0gMDQnLFxuICAgICAgICBkZXNjcmlwdGlvbjogJ0ZhbWlseSBTaXplZCBUZXN0IGl0ZW0hJyxcbiAgICAgICAgcHJpY2U6IDc5OTksXG4gICAgICAgIGhvd01hbnk6IDFcbiAgICB9XVxuXG4gICAgJHNjb3BlLnNlc2hPcmRlcnMubWFwKGZ1bmN0aW9uKGVsKSB7XG4gICAgICAgIGVsLnByaWNlT3V0ID0gJyQnICsgZWwucHJpY2UgLyAxMDA7XG4gICAgICAgIGVsLnNUb3QgPSAnJCcgKyAoKGVsLnByaWNlICogZWwuaG93TWFueSkgLyAxMDApO1xuICAgIH0pXG5cbiAgICAkc2NvcGUudG90YWwgPSAwO1xuXG4gICAgJHNjb3BlLnNlc2hPcmRlcnMuZm9yRWFjaChmdW5jdGlvbihlbCkge1xuICAgICAgICAkc2NvcGUudG90YWwgKz0gZWwucHJpY2UgKiBlbC5ob3dNYW55O1xuICAgIH0pO1xuXG4gICAgJHNjb3BlLnRvdGFsID0gJyQnICsgJHNjb3BlLnRvdGFsLzEwMFxuXG59KTsiLCIoZnVuY3Rpb24gKCkge1xuXG4gICAgJ3VzZSBzdHJpY3QnO1xuXG4gICAgLy8gSG9wZSB5b3UgZGlkbid0IGZvcmdldCBBbmd1bGFyISBEdWgtZG95LlxuICAgIGlmICghd2luZG93LmFuZ3VsYXIpIHRocm93IG5ldyBFcnJvcignSSBjYW5cXCd0IGZpbmQgQW5ndWxhciEnKTtcblxuICAgIHZhciBhcHAgPSBhbmd1bGFyLm1vZHVsZSgnZnNhUHJlQnVpbHQnLCBbXSk7XG5cbiAgICBhcHAuZmFjdG9yeSgnU29ja2V0JywgZnVuY3Rpb24gKCRsb2NhdGlvbikge1xuXG4gICAgICAgIGlmICghd2luZG93LmlvKSB0aHJvdyBuZXcgRXJyb3IoJ3NvY2tldC5pbyBub3QgZm91bmQhJyk7XG5cbiAgICAgICAgdmFyIHNvY2tldDtcblxuICAgICAgICBpZiAoJGxvY2F0aW9uLiQkcG9ydCkge1xuICAgICAgICAgICAgc29ja2V0ID0gaW8oJ2h0dHA6Ly9sb2NhbGhvc3Q6MTMzNycpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgc29ja2V0ID0gaW8oJy8nKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBzb2NrZXQ7XG5cbiAgICB9KTtcblxuICAgIGFwcC5jb25zdGFudCgnQVVUSF9FVkVOVFMnLCB7XG4gICAgICAgIGxvZ2luU3VjY2VzczogJ2F1dGgtbG9naW4tc3VjY2VzcycsXG4gICAgICAgIGxvZ2luRmFpbGVkOiAnYXV0aC1sb2dpbi1mYWlsZWQnLFxuICAgICAgICBsb2dvdXRTdWNjZXNzOiAnYXV0aC1sb2dvdXQtc3VjY2VzcycsXG4gICAgICAgIHNlc3Npb25UaW1lb3V0OiAnYXV0aC1zZXNzaW9uLXRpbWVvdXQnLFxuICAgICAgICBub3RBdXRoZW50aWNhdGVkOiAnYXV0aC1ub3QtYXV0aGVudGljYXRlZCcsXG4gICAgICAgIG5vdEF1dGhvcml6ZWQ6ICdhdXRoLW5vdC1hdXRob3JpemVkJ1xuICAgIH0pO1xuXG4gICAgYXBwLmNvbmZpZyhmdW5jdGlvbiAoJGh0dHBQcm92aWRlcikge1xuICAgICAgICAkaHR0cFByb3ZpZGVyLmludGVyY2VwdG9ycy5wdXNoKFtcbiAgICAgICAgICAgICckaW5qZWN0b3InLFxuICAgICAgICAgICAgZnVuY3Rpb24gKCRpbmplY3Rvcikge1xuICAgICAgICAgICAgICAgIHJldHVybiAkaW5qZWN0b3IuZ2V0KCdBdXRoSW50ZXJjZXB0b3InKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgXSk7XG4gICAgfSk7XG5cbiAgICBhcHAuZmFjdG9yeSgnQXV0aEludGVyY2VwdG9yJywgZnVuY3Rpb24gKCRyb290U2NvcGUsICRxLCBBVVRIX0VWRU5UUykge1xuICAgICAgICB2YXIgc3RhdHVzRGljdCA9IHtcbiAgICAgICAgICAgIDQwMTogQVVUSF9FVkVOVFMubm90QXV0aGVudGljYXRlZCxcbiAgICAgICAgICAgIDQwMzogQVVUSF9FVkVOVFMubm90QXV0aG9yaXplZCxcbiAgICAgICAgICAgIDQxOTogQVVUSF9FVkVOVFMuc2Vzc2lvblRpbWVvdXQsXG4gICAgICAgICAgICA0NDA6IEFVVEhfRVZFTlRTLnNlc3Npb25UaW1lb3V0XG4gICAgICAgIH07XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICByZXNwb25zZUVycm9yOiBmdW5jdGlvbiAocmVzcG9uc2UpIHtcbiAgICAgICAgICAgICAgICAkcm9vdFNjb3BlLiRicm9hZGNhc3Qoc3RhdHVzRGljdFtyZXNwb25zZS5zdGF0dXNdLCByZXNwb25zZSk7XG4gICAgICAgICAgICAgICAgcmV0dXJuICRxLnJlamVjdChyZXNwb25zZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH07XG4gICAgfSk7XG5cbiAgICBhcHAuc2VydmljZSgnQXV0aFNlcnZpY2UnLCBmdW5jdGlvbiAoJGh0dHAsIFNlc3Npb24sICRyb290U2NvcGUsIEFVVEhfRVZFTlRTLCAkcSkge1xuXG4gICAgICAgIHZhciBvblN1Y2Nlc3NmdWxMb2dpbiA9IGZ1bmN0aW9uIChyZXNwb25zZSkge1xuICAgICAgICAgICAgdmFyIGRhdGEgPSByZXNwb25zZS5kYXRhO1xuICAgICAgICAgICAgU2Vzc2lvbi5jcmVhdGUoZGF0YS5pZCwgZGF0YS51c2VyKTtcbiAgICAgICAgICAgICRyb290U2NvcGUuJGJyb2FkY2FzdChBVVRIX0VWRU5UUy5sb2dpblN1Y2Nlc3MpO1xuICAgICAgICAgICAgcmV0dXJuIGRhdGEudXNlcjtcbiAgICAgICAgfTtcblxuICAgICAgICB0aGlzLmdldExvZ2dlZEluVXNlciA9IGZ1bmN0aW9uICgpIHtcblxuICAgICAgICAgICAgaWYgKHRoaXMuaXNBdXRoZW50aWNhdGVkKCkpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gJHEud2hlbih7IHVzZXI6IFNlc3Npb24udXNlciB9KTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgcmV0dXJuICRodHRwLmdldCgnL3Nlc3Npb24nKS50aGVuKG9uU3VjY2Vzc2Z1bExvZ2luKS5jYXRjaChmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICAgICAgICB9KTtcblxuICAgICAgICB9O1xuXG4gICAgICAgIHRoaXMubG9naW4gPSBmdW5jdGlvbiAoY3JlZGVudGlhbHMpIHtcbiAgICAgICAgICAgIHJldHVybiAkaHR0cC5wb3N0KCcvbG9naW4nLCBjcmVkZW50aWFscykudGhlbihvblN1Y2Nlc3NmdWxMb2dpbik7XG4gICAgICAgIH07XG5cbiAgICAgICAgdGhpcy5sb2dvdXQgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICByZXR1cm4gJGh0dHAuZ2V0KCcvbG9nb3V0JykudGhlbihmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgU2Vzc2lvbi5kZXN0cm95KCk7XG4gICAgICAgICAgICAgICAgJHJvb3RTY29wZS4kYnJvYWRjYXN0KEFVVEhfRVZFTlRTLmxvZ291dFN1Y2Nlc3MpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH07XG5cbiAgICAgICAgdGhpcy5pc0F1dGhlbnRpY2F0ZWQgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICByZXR1cm4gISFTZXNzaW9uLnVzZXI7XG4gICAgICAgIH07XG5cbiAgICB9KTtcblxuICAgIGFwcC5zZXJ2aWNlKCdTZXNzaW9uJywgZnVuY3Rpb24gKCRyb290U2NvcGUsIEFVVEhfRVZFTlRTKSB7XG5cbiAgICAgICAgJHJvb3RTY29wZS4kb24oQVVUSF9FVkVOVFMubm90QXV0aGVudGljYXRlZCwgdGhpcy5kZXN0cm95KTtcbiAgICAgICAgJHJvb3RTY29wZS4kb24oQVVUSF9FVkVOVFMuc2Vzc2lvblRpbWVvdXQsIHRoaXMuZGVzdHJveSk7XG5cbiAgICAgICAgdGhpcy5jcmVhdGUgPSBmdW5jdGlvbiAoc2Vzc2lvbklkLCB1c2VyKSB7XG4gICAgICAgICAgICB0aGlzLmlkID0gc2Vzc2lvbklkO1xuICAgICAgICAgICAgdGhpcy51c2VyID0gdXNlcjtcbiAgICAgICAgfTtcblxuICAgICAgICB0aGlzLmRlc3Ryb3kgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICB0aGlzLmlkID0gbnVsbDtcbiAgICAgICAgICAgIHRoaXMudXNlciA9IG51bGw7XG4gICAgICAgIH07XG5cbiAgICB9KTtcblxufSkoKTsiLCIndXNlIHN0cmljdCc7XG5hcHAuY29uZmlnKGZ1bmN0aW9uICgkc3RhdGVQcm92aWRlcikge1xuXG4gICAgJHN0YXRlUHJvdmlkZXIuc3RhdGUoJ2hvbWUnLCB7XG4gICAgICAgIHVybDogJy8nLFxuICAgICAgICBjb250cm9sbGVyOiAnSG9tZUN0cmwnLFxuICAgICAgICB0ZW1wbGF0ZVVybDogJ2pzL2hvbWUvaG9tZS5odG1sJ1xuICAgIH0pO1xuXG59KTtcblxuYXBwLmNvbnRyb2xsZXIoJ0hvbWVDdHJsJywgZnVuY3Rpb24gKCRzY29wZSkge1xuXG5cblx0XG59KTsiLCIndXNlIHN0cmljdCc7XG5hcHAuY29uZmlnKGZ1bmN0aW9uKCRzdGF0ZVByb3ZpZGVyKSB7XG5cbiAgICAkc3RhdGVQcm92aWRlci5zdGF0ZSgncHJvZERldGFpbCcsIHtcbiAgICAgICAgdXJsOiAnL3Byb2R1Y3QvYW55dGhpbmcvOnByb2R1JyxcbiAgICAgICAgY29udHJvbGxlcjogJ3Byb2REZXRhaWxDdHJsJyxcbiAgICAgICAgdGVtcGxhdGVVcmw6ICdqcy9wcm9kZGV0YWlsL3Byb2RkZXRhaWwuaHRtbCdcbiAgICB9KTtcblxufSk7XG5cbmFwcC5jb250cm9sbGVyKCdwcm9kRGV0YWlsQ3RybCcsIGZ1bmN0aW9uKCRzY29wZSwgJHN0YXRlUGFyYW1zLCAkY29va2llcywgJGNvb2tpZVN0b3JlKSB7XG4gICAgLy9URU1QT1JBUlkhIEZPUiBURVNUSU5HXG4gICAgY29uc29sZS5sb2coJHN0YXRlUGFyYW1zLnByb2R1LCAndGhpcyBpcyBwcm9kdScpO1xuXG4gICAgJHNjb3BlLnRoaXN0aXRsZSA9ICRzdGF0ZVBhcmFtcy5wcm9kdTtcblxuICAgICRzY29wZS5pdGVtID0gJHN0YXRlUGFyYW1zLnRpdGxlO1xuXG5cblxuICAgICRzY29wZS5wcm9kID0ge1xuICAgICAgICB0aXRsZTogJ1NhbXBsZSBQcm9kdWN0JyxcbiAgICAgICAgZGVzY3JpcHRpb246ICdUaGlzIHByb2R1Y3QgaXMgc28gYXdlc29tZSEgSXRcXCdzIHRhc3R5LicsXG4gICAgICAgIHByaWNlOiAzOTk5LFxuICAgICAgICBpc0NvZmZlZTogZmFsc2UsXG4gICAgICAgIGNhdGVnb3J5OiBbJ3Rhc3R5JywgJ2JlYW5zJywgJ21tbScsICdzcnNseSBpIGdvdCBub3RoaW4nXSxcbiAgICAgICAgcGhvdG86ICdub25lJ1xuICAgIH07XG5cbiAgICAkc2NvcGUucHJvZC5waG90byA9ICdpbWFnZXMvJyArICRzY29wZS5wcm9kLnBob3RvO1xuICAgIGlmICgkc2NvcGUucHJvZC5pc0NvZmZlZSAmJiAkc2NvcGUucHJvZC5waG90byA9PT0gJ2ltYWdlcy9ub25lJykge1xuICAgICAgICBjb25zb2xlLmxvZygnYmVhbnMnKVxuICAgICAgICAkc2NvcGUucHJvZC5waG90byA9ICdpbWFnZXMvcGxhY2Vob2xkZXJDb2YuanBnJztcbiAgICB9IGVsc2UgaWYgKCEkc2NvcGUucHJvZC5pc0NvZmZlZSAmJiAkc2NvcGUucHJvZC5waG90byA9PT0gJ2ltYWdlcy9ub25lJykge1xuICAgICAgICAkc2NvcGUucHJvZC5waG90byA9ICdpbWFnZXMvcGxhY2Vob2xkZXJNaW50LnBuZyc7XG4gICAgfVxuICAgICRzY29wZS5wcm9kLnByaWNlT3V0ID0gJyQnICsgKCRzY29wZS5wcm9kLnByaWNlIC8gMTAwKTtcblxuICAgICRzY29wZS5hZGR0b2NhcnQgPSBmdW5jdGlvbihpdGVtdG9hZGQpIHtcbiAgICAgICAgLy8gdHdvIHdheXMgdG8gZ3JhYiB0aGUgY3VzdG9tZXIncyBkYXRhOiAkc2NvcGUuY2FydC5pdGVtcyAvIHBhcmFtZXRlciB0byB0aGlzIGZ1bmN0aW9uXG5cbiAgICAgICAgLy8gJGh0dHAucG9zdCh7Y3VzdG9tZXJEYXRhfSkuc3VjY2VzcyhmdW5jdGlvbihyZXN1bHQpe1xuICAgICAgICAvLyAgICAgJHNjb3BlLmN1c3RvbWVyQ2FydCA9IHJlc3VsdDsgXG5cbiAgICAgICAgLy8gfSlcblxuY29uc29sZS5sb2coJ3RoaXMgaXMgZmlyc3QgJGNvb2tpZXMnLCAkY29va2llcy5wcm9kdWN0cyk7XG4gICAgICAgIGNvbnNvbGUubG9nKCdoaXQgYnV0dG9uIHRoaXMgY29tZXMgdGhyb3VnaCcsIGl0ZW10b2FkZCk7XG4gICAgICAgIGlmICgkY29va2llcy5wcm9kdWN0cyA9PT0gbnVsbCkge1xuXG4gICAgICAgICAgICAkY29va2llU3RvcmUucHV0KCdwcm9kdWN0cycsIGl0ZW10b2FkZCk7XG4gICAgICAgICAgICBjb25zb2xlLmxvZygnY29va2llJywgJGNvb2tpZXMpO1xuICAgICAgICB9IGVsc2VcblxuICAgICAgICAgICAgJGNvb2tpZVN0b3JlLnB1dCgnc2Vjb25kcHJvZHVjdCcsIGl0ZW10b2FkZCk7XG4gICAgICAgIGNvbnNvbGUubG9nKCRjb29raWVzLCAndGhpcyBpcyBzZWNvbmQgY29va2llcycpO1xuXG4gICAgfTtcblxufSk7XG4iLCIndXNlIHN0cmljdCc7XG5cbmFwcC5mYWN0b3J5KCdQcm9kdWN0RmFjdG9yeScsIGZ1bmN0aW9uKCRodHRwKSB7XG4gIHJldHVybiB7XG4gICAgZ2V0UHJvZHVjdHNEYjogZnVuY3Rpb24oKSB7XG4gICAgICByZXR1cm4gJGh0dHAuZ2V0KCcvYXBpL3Byb2R1Y3RzJykudGhlbihmdW5jdGlvbihyZXNwb25zZSkge1xuICAgICAgICByZXR1cm4gcmVzcG9uc2UuZGF0YTtcbiAgICAgIH0pO1xuICAgIH1cbiAgfTtcbn0pO1xuIiwiJ3VzZSBzdHJpY3QnO1xuYXBwLmNvbmZpZyhmdW5jdGlvbigkc3RhdGVQcm92aWRlcikge1xuXG4gICRzdGF0ZVByb3ZpZGVyLnN0YXRlKCdjb2ZmZWUnLCB7XG4gICAgdXJsOiAnL3Byb2R1Y3QvY29mZmVlJyxcbiAgICBjb250cm9sbGVyOiAnUHJvZHVjdEN0cmwnLFxuICAgIHRlbXBsYXRlVXJsOiAnanMvcHJvZHVjdGxpc3RpbmcvY29mZmVlLmh0bWwnXG4gIH0pO1xuXG4gICRzdGF0ZVByb3ZpZGVyLnN0YXRlKCdtaW50Jywge1xuICAgIHVybDogJy9wcm9kdWN0L21pbnQnLFxuICAgIGNvbnRyb2xsZXI6ICdQcm9kdWN0Q3RybCcsXG4gICAgdGVtcGxhdGVVcmw6ICdqcy9wcm9kdWN0bGlzdGluZy9taW50Lmh0bWwnXG4gIH0pO1xufSk7XG5cbmFwcC5jb250cm9sbGVyKCdQcm9kdWN0Q3RybCcsIGZ1bmN0aW9uKCRzY29wZSwgUHJvZHVjdEZhY3RvcnkpIHtcblxuICAkc2NvcGUuc2hvd1Byb2R1Y3RzID0gZnVuY3Rpb24oKSB7XG4gICAgUHJvZHVjdEZhY3RvcnkuZ2V0UHJvZHVjdHNEYigpLnRoZW4oZnVuY3Rpb24oZGF0YSkge1xuICAgICAgJHNjb3BlLnByb2R1Y3RzID0gZGF0YTtcbiAgICB9KTtcbiAgfTtcbn0pO1xuIiwiJ3VzZSBzdHJpY3QnO1xuYXBwLmNvbmZpZyhmdW5jdGlvbiAoJHN0YXRlUHJvdmlkZXIpIHtcblxuICAgIC8vIFJlZ2lzdGVyIG91ciAqYWJvdXQqIHN0YXRlLlxuICAgICRzdGF0ZVByb3ZpZGVyLnN0YXRlKCdzaWdudXAnLCB7XG4gICAgICAgIHVybDogJy9zaWdudXAnLFxuICAgICAgICBjb250cm9sbGVyOiAnc2lnblVwQ29udHJvbGxlcicsXG4gICAgICAgIHRlbXBsYXRlVXJsOiAnanMvc2lnbnVwL3NpZ251cC5odG1sJ1xuICAgIH0pO1xuXG59KTtcblxuYXBwLmNvbnRyb2xsZXIoJ3NpZ25VcENvbnRyb2xsZXInLCBmdW5jdGlvbiAoJHNjb3BlLCAkd2luZG93LCAkbG9jYXRpb24pIHtcblxuXHQkc2NvcGUudXNlciA9IHtcblxuXHR9XG4gICAgLy8gJHNjb3BlLnNpZ25VcEZvcm0gPSBmdW5jdGlvbiAodXNlcil7XG4gICAgLy8gXHRzaWdudXBGYWN0b3J5LmFkZE5ld1VzZXIodXNlcikudGhlbihmdW5jdGlvbigpe1xuICAgIC8vIFx0fSk7XG4gICAgLy8gfTtcblxuICAgICRzY29wZS5sb2dpbiA9IGZ1bmN0aW9uICgpe1xuICAgICAgICAkd2luZG93LmxvY2F0aW9uLmhyZWYgPSAnL2F1dGgvZ29vZ2xlJztcbiAgICB9O1xuXG4gICAgJHNjb3BlLmxvZ2luZmIgPSBmdW5jdGlvbiAoKXtcbiAgICAgICAgJHdpbmRvdy5sb2NhdGlvbi5ocmVmID0gJy9hdXRoL2ZhY2Vib29rJztcbiAgICB9O1xuXG4gICAgXG59KTtcblxuIiwiJ3VzZSBzdHJpY3QnO1xuYXBwLmZhY3RvcnkoJ1JhbmRvbUdyZWV0aW5ncycsIGZ1bmN0aW9uICgpIHtcblxuICAgIHZhciBnZXRSYW5kb21Gcm9tQXJyYXkgPSBmdW5jdGlvbiAoYXJyKSB7XG4gICAgICAgIHJldHVybiBhcnJbTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogYXJyLmxlbmd0aCldO1xuICAgIH07XG5cbiAgICB2YXIgZ3JlZXRpbmdzID0gW1xuICAgICAgICAnSSBrbm93IHRoYXQgeW91IGp1c3QgZHJhbmsgc29tZSBjb2ZmZWUuLi4gaGF2ZSBhIG1pbnQuLi4nLFxuICAgICAgICAnVW1tbS4uLi4uLiBZb3UgbmVlZCBhIG1pbnQuLi4nLFxuICAgICAgICAnSGVsbG8sIHNtZWxseSBodW1hbi4nLFxuICAgICAgICAnU28uLi4gaG93IGRvIHlvdSBmZWVsIGFib3V0IGhhdmluZyBhIG1pbnQgcmlnaHQgbm93PycsXG4gICAgICAgICdEdWRlLiBZb3UgY2Fubm90IGVhdCBlZ2cgc2FsYWQgd2l0aCBjb2ZmZWUgdW5sZXNzIHlvdSB0YWtlIGEgbWludC4nLFxuICAgICAgICAnU2VyaW91c2x5LiBDb2ZmZWUgd2l0aCBzYWxtb24gc2FsYWQ/IFRha2UgYSBtaW50LicsIFxuICAgICAgICAnV2hhdFxcJ3MgeW91ciBwcm9ibGVtIHdpdGggbWludHM/IFlvdSBuZWVkIG9uZS4nXG4gICAgXTtcblxuICAgIHJldHVybiB7XG4gICAgICAgIGdyZWV0aW5nczogZ3JlZXRpbmdzLFxuICAgICAgICBnZXRSYW5kb21HcmVldGluZzogZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgcmV0dXJuIGdldFJhbmRvbUZyb21BcnJheShncmVldGluZ3MpO1xuICAgICAgICB9XG4gICAgfTtcblxufSk7IiwiJ3VzZSBzdHJpY3QnO1xuIiwiYXBwLmZhY3RvcnkoJ0FkZFRvQ2FydCcsIGZ1bmN0aW9uKCkge1xuXG4gICAgICAgICAgICB2YXIgY2FydGNvbnRlbnQgPSB7XG4gICAgICAgICAgICAgICAgdXNlcjogcmVxLmJvZHkuY29va2llcy5jYXJ0LFxuICAgICAgICAgICAgICAgIHByb2R1Y3RzOiBbXVxuXG4gICAgICAgICAgICB9O1xuXG4gICAgICAgICAgICByZXR1cm4ge1xuXG4gICAgICAgICAgICAgICAgc2VsZWN0aW5nOiBmdW5jdGlvbihwcm9kdWN0aW5mbykge1xuICAgICAgICAgICAgICAgICAgICB2YXIgdGhpc2NsaWNrID0ge307XG4gICAgICAgICAgICAgICAgICAgIHRoaXNjbGljay5wcm9kSWQgPSBwcm9kdWN0aW5mby5faWQ7XG4gICAgICAgICAgICAgICAgICAgIHRoaXNjbGljay5QcmljZSA9IHByb2R1Y3RpbmZvLnByaWNlO1xuICAgICAgICAgICAgICAgICAgICB0aGlzY2xpY2suUXVhbnRpdHkgPSBwcm9kdWN0aW5mby5ob3dNYW55O1xuXG4gICAgICAgICAgICAgICAgICAgIGNhcnRjb250ZW50LnByb2R1Y3RzLnB1c2godGhpc2NsaWNrKTtcbiAgICAgICAgICAgICAgICB9LFxuXG5cbiAgICAgICBcbiAgICAgICAgICAgICAgICBhZGRlZFRvQ2FydDogZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBzZWxlY3RpbmcoY2xpY2tpbmZvKTtcbiAgICAgICAgICAgICAgICB9XG5cblxuICAgICAgICAgICAgfVxuXG4gICAgICAgIH0pO1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5hcHAuZmFjdG9yeSgnc2lnbnVwRmFjdG9yeScsIGZ1bmN0aW9uKCRodHRwKXtcblx0cmV0dXJuIHtcblx0XHRhZGROZXdVc2VyIDogZnVuY3Rpb24gKHVzZXIpIHtcblx0XHRcdHJldHVybiAkaHR0cC5wb3N0KCcvbmV3VXNlcicsIHVzZXIpO1xuXHRcdH1cblx0fTtcbn0pO1xuIiwiJ3VzZSBzdHJpY3QnO1xuYXBwLmRpcmVjdGl2ZSgnbmF2YmFyJywgZnVuY3Rpb24gKCkge1xuICAgIHJldHVybiB7XG4gICAgICAgIHJlc3RyaWN0OiAnRScsXG4gICAgICAgIHNjb3BlOiB7XG4gICAgICAgICAgaXRlbXM6ICc9J1xuICAgICAgICB9LCBcbiAgICAgICAgdGVtcGxhdGVVcmw6ICdqcy9jb21tb24vZGlyZWN0aXZlcy9uYXZiYXIvbmF2YmFyLmh0bWwnXG4gICAgfTtcbn0pOyIsIid1c2Ugc3RyaWN0JztcbmFwcC5kaXJlY3RpdmUoJ3JhbmRvR3JlZXRpbmcnLCBmdW5jdGlvbiAoUmFuZG9tR3JlZXRpbmdzKSB7XG5cbiAgICByZXR1cm4ge1xuICAgICAgICByZXN0cmljdDogJ0UnLFxuICAgICAgICB0ZW1wbGF0ZVVybDogJ2pzL2NvbW1vbi9kaXJlY3RpdmVzL3JhbmRvLWdyZWV0aW5nL3JhbmRvLWdyZWV0aW5nLmh0bWwnLFxuICAgICAgICBsaW5rOiBmdW5jdGlvbiAoc2NvcGUpIHtcbiAgICAgICAgICAgIHNjb3BlLmdyZWV0aW5nID0gUmFuZG9tR3JlZXRpbmdzLmdldFJhbmRvbUdyZWV0aW5nKCk7XG4gICAgICAgIH1cbiAgICB9O1xuXG59KTsiLCIndXNlIHN0cmljdCc7XG5hcHAuZGlyZWN0aXZlKCdzdGFjaycsIGZ1bmN0aW9uICgpIHtcbiAgICByZXR1cm4ge1xuICAgICAgICByZXN0cmljdDogJ0UnLFxuICAgICAgICB0ZW1wbGF0ZVVybDogJ2pzL2NvbW1vbi9kaXJlY3RpdmVzL3N0YWNrU3RvcmVMb2dvL3N0YWNrU3RvcmVMb2dvLmh0bWwnXG4gICAgfTtcbn0pOyJdLCJzb3VyY2VSb290IjoiL3NvdXJjZS8ifQ==