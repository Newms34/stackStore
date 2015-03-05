'use strict';
var app = angular.module('FullstackGeneratedApp', ['ui.router', 'fsaPreBuilt', 'ngCookies']);

app.controller('MainController', function ($scope, $cookies, $cookieStore) {

    $cookieStore.remove("products");

    console.log($cookieStore, 'this is cookie store');
    $cookieStore.put('products', []);
    console.log($cookies, 'this is cookie');
});

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
    }];

    $scope.seshOrders.map(function(el) {
        el.priceOut = '$' + el.price / 100;
        el.sTot = '$' + ((el.price * el.howMany) / 100);
    });

    $scope.total = 0;

    $scope.seshOrders.forEach(function(el) {
        $scope.total += el.price * el.howMany;
    });

    $scope.total = '$' + $scope.total/100;

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

<<<<<<< HEAD
app.controller('prodDetailCtrl', function($scope, $stateParams, addtocart) {
    //TEMPORARY! FOR TESTING
    console.log($stateParams.produ, 'this is produ');

    $scope.thistitle = $stateParams.produ;

    $scope.item = $stateParams.title;

=======
app.controller('prodDetailCtrl', function($scope,$stateParams) {
    //TEMPORARY! FOR TESTING
    console.log($stateParams);
>>>>>>> master
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
        $scope.prod.photo = 'images/placeholderCof.jpg';
    } else if (!$scope.prod.isCoffee && $scope.prod.photo === 'images/none') {
        $scope.prod.photo = 'images/placeholderMint.png';
    }
<<<<<<< HEAD
    $scope.prod.priceOut = '$' + ($scope.prod.price / 100);

    $scope.addtocart = function(data){
        addtocart.addtocart(data);
    }

    // $scope.addtocart = function(itemtoadd) {
    //     // two ways to grab the customer's data: $scope.cart.items / parameter to this function
    //     // $http.post({customerData}).success(function(result){
    //     //     $scope.customerCart = result; 
    //     // })

    //     console.log('this is first $cookies', $cookies.products);
    //     console.log('hit button this comes through', itemtoadd);
    //     var prodarr = $cookieStore.get('products');
    //     prodarr.push(itemtoadd);
    //     $cookieStore.put('products', prodarr);

    // };
=======
    $scope.prod.priceOut = '$'+($scope.prod.price/100);
>>>>>>> master

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

app.controller('signUpController', function ($scope, $window, $location, signupFactory) {
	$scope.user = {
        email: "",
        password: ""
	};

    $scope.getCreatedUser = function(){
        signupFactory.getUser().then(function(data){
            $scope.user = data;
        });
    };

    $scope.newUserSignUp = function(newUser){
        signupFactory.addNewUser(newUser).then(function(){
            console.log("success");
            res.redirect('/');
        });
    };

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

'use strict';
app.factory('addtocart', function($cookies, $cookieStore){
	return {
		addtocart: function(itemtoadd){

			console.log('this is first $cookies', $cookies.products);
        console.log('hit button this comes through', itemtoadd);
        var prodarr = $cookieStore.get('products');
        prodarr.push(itemtoadd);
        $cookieStore.put('products', prodarr);

		}
	}
})
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


  };

});

"use strict";
app.factory('signupFactory', function($http){
	return {
		getUser: function(){
			return $http.get('/api/newUser').then(function(response){
				return response.data;
			});
		},
		addNewUser : function (user) {
			return $http.post('/api/signup/newUser', user);
		}
	};
});



'use strict';
app.directive('navbar', function() {
  return {
    restrict: 'E',
    scope: {
      items: '='
    },
    templateUrl: 'js/common/directives/navbar/navbar.html'
  };
});

'use strict';
app.directive('stack', function() {
  return {
    restrict: 'E',
    templateUrl: 'js/common/directives/stackStoreLogo/stackStoreLogo.html'
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
<<<<<<< HEAD
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC5qcyIsImFib3V0L2Fib3V0LmpzIiwiY2FydC9jYXJ0LmpzIiwiZnNhL2ZzYS1wcmUtYnVpbHQuanMiLCJob21lL2hvbWUuanMiLCJwcm9kZGV0YWlsL3Byb2RkZXRhaWwuanMiLCJwcm9kdWN0bGlzdGluZy9wcm9kdWN0ZmFjdG9yeS5qcyIsInByb2R1Y3RsaXN0aW5nL3Byb2R1Y3RsaXN0aW5nLmpzIiwic2lnbnVwL3NpZ251cC5qcyIsImNvbW1vbi9mYWN0b3JpZXMvUmFuZG9tR3JlZXRpbmdzLmpzIiwiY29tbW9uL2ZhY3Rvcmllcy9Tb2NrZXQuanMiLCJjb21tb24vZmFjdG9yaWVzL2FkZHRvY2FydC5qcyIsImNvbW1vbi9mYWN0b3JpZXMvY2FydGZhY3RvcnkuanMiLCJjb21tb24vZmFjdG9yaWVzL3NpZ251cEZhY3RvcnkuanMiLCJjb21tb24vZGlyZWN0aXZlcy9uYXZiYXIvbmF2YmFyLmpzIiwiY29tbW9uL2RpcmVjdGl2ZXMvc3RhY2tTdG9yZUxvZ28vc3RhY2tTdG9yZUxvZ28uanMiLCJjb21tb24vZGlyZWN0aXZlcy9yYW5kby1ncmVldGluZy9yYW5kby1ncmVldGluZy5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQzdDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDekJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDbkRBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ2pIQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ2ZBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ3hEQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUNqQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDN0JBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDakNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDeEJBO0FBQ0E7QUNEQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDYkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUM5QkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDUkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ1ZBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUNQQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EiLCJmaWxlIjoibWFpbi5qcyIsInNvdXJjZXNDb250ZW50IjpbIid1c2Ugc3RyaWN0JztcbnZhciBhcHAgPSBhbmd1bGFyLm1vZHVsZSgnRnVsbHN0YWNrR2VuZXJhdGVkQXBwJywgWyd1aS5yb3V0ZXInLCAnZnNhUHJlQnVpbHQnLCAnbmdDb29raWVzJ10pO1xuXG5hcHAuY29udHJvbGxlcignTWFpbkNvbnRyb2xsZXInLCBmdW5jdGlvbiAoJHNjb3BlLCAkY29va2llcywgJGNvb2tpZVN0b3JlKSB7XG5cbiAgICAkY29va2llU3RvcmUucmVtb3ZlKFwiY291bnRlclwiKTtcbiAgICAkY29va2llU3RvcmUucmVtb3ZlKFwic2Vjb25kcHJvZHVjdFwiKTtcbiAgICAkY29va2llU3RvcmUucmVtb3ZlKFwicHJvZHVjdHNcIik7XG5cbiAgICBcbiAgICBjb25zb2xlLmxvZygkY29va2llU3RvcmUsICd0aGlzIGlzIGNvb2tpZSBzdG9yZScpO1xuICAgICRjb29raWVTdG9yZS5wdXQoJ3Byb2R1Y3RzJywgW10pO1xuICAgIGNvbnNvbGUubG9nKCRjb29raWVzLCAndGhpcyBpcyBjb29raWUnKTtcblxuICAvLyBHaXZlbiB0byB0aGUgPG5hdmJhcj4gZGlyZWN0aXZlIHRvIHNob3cgdGhlIG1lbnUuXG4gICRzY29wZS5tZW51SXRlbXMgPSBbe1xuICAgIGxhYmVsOiAnSG9tZScsXG4gICAgc3RhdGU6ICdob21lJ1xuICB9LCB7XG4gICAgbGFiZWw6ICdDb2ZmZWUnLFxuICAgIHN0YXRlOiAnY29mZmVlJ1xuICB9LCB7XG4gICAgbGFiZWw6ICdNaW50JyxcbiAgICBzdGF0ZTogJ21pbnQnXG4gIH0sIHtcbiAgICBsYWJlbDogJ0Fib3V0JyxcbiAgICBzdGF0ZTogJ2Fib3V0J1xuICB9LCB7XG4gICAgbGFiZWw6ICdTaWduVXAnLFxuICAgIHN0YXRlOiAnc2lnbnVwJ1xuICB9LCB7ICAgIGxhYmVsOiAnU2lnbiBJbicsXG4gICAgc3RhdGU6ICdzaWduSW4nXG4gIH0sIHtcbiAgICBsYWJlbDogJ0NhcnQnLFxuICAgIHN0YXRlOiAnY2FydCdcbiAgfV07XG59KTtcblxuXG5hcHAuY29uZmlnKGZ1bmN0aW9uKCR1cmxSb3V0ZXJQcm92aWRlciwgJGxvY2F0aW9uUHJvdmlkZXIpIHtcbiAgLy8gVGhpcyB0dXJucyBvZmYgaGFzaGJhbmcgdXJscyAoLyNhYm91dCkgYW5kIGNoYW5nZXMgaXQgdG8gc29tZXRoaW5nIG5vcm1hbCAoL2Fib3V0KVxuICAkbG9jYXRpb25Qcm92aWRlci5odG1sNU1vZGUodHJ1ZSk7XG4gIC8vIElmIHdlIGdvIHRvIGEgVVJMIHRoYXQgdWktcm91dGVyIGRvZXNuJ3QgaGF2ZSByZWdpc3RlcmVkLCBnbyB0byB0aGUgXCIvXCIgdXJsLlxuICAkdXJsUm91dGVyUHJvdmlkZXIub3RoZXJ3aXNlKCcvJyk7XG59KTtcbiIsIid1c2Ugc3RyaWN0JztcbmFwcC5jb25maWcoZnVuY3Rpb24oJHN0YXRlUHJvdmlkZXIpIHtcblxuICAvLyBSZWdpc3RlciBvdXIgKmFib3V0KiBzdGF0ZS5cbiAgJHN0YXRlUHJvdmlkZXIuc3RhdGUoJ2Fib3V0Jywge1xuICAgIHVybDogJy9hYm91dCcsXG4gICAgY29udHJvbGxlcjogJ0Fib3V0Q29udHJvbGxlcicsXG4gICAgdGVtcGxhdGVVcmw6ICdqcy9hYm91dC9hYm91dC5odG1sJ1xuICB9KTtcblxufSk7XG5cbmFwcC5jb250cm9sbGVyKCdBYm91dENvbnRyb2xsZXInLCBmdW5jdGlvbigkc2NvcGUpIHtcblxuICAvLyBJbWFnZXMgb2YgYmVhdXRpZnVsIEZ1bGxzdGFjayBwZW9wbGUuXG4gICRzY29wZS5pbWFnZXMgPSBbXG4gICAgJ2h0dHBzOi8vcGJzLnR3aW1nLmNvbS9tZWRpYS9CN2dCWHVsQ0FBQVhRY0UuanBnOmxhcmdlJyxcbiAgICAnaHR0cHM6Ly9mYmNkbi1zcGhvdG9zLWMtYS5ha2FtYWloZC5uZXQvaHBob3Rvcy1hay14YXAxL3QzMS4wLTgvMTA4NjI0NTFfMTAyMDU2MjI5OTAzNTkyNDFfODAyNzE2ODg0MzMxMjg0MTEzN19vLmpwZycsXG4gICAgJ2h0dHBzOi8vcGJzLnR3aW1nLmNvbS9tZWRpYS9CLUxLVXNoSWdBRXk5U0suanBnJyxcbiAgICAnaHR0cHM6Ly9wYnMudHdpbWcuY29tL21lZGlhL0I3OS1YN29DTUFBa3c3eS5qcGcnLFxuICAgICdodHRwczovL3Bicy50d2ltZy5jb20vbWVkaWEvQi1VajlDT0lJQUlGQWgwLmpwZzpsYXJnZScsXG4gICAgJ2h0dHBzOi8vcGJzLnR3aW1nLmNvbS9tZWRpYS9CNnlJeUZpQ0VBQXFsMTIuanBnOmxhcmdlJ1xuICBdO1xuXG59KTtcbiIsIid1c2Ugc3RyaWN0JztcbmFwcC5jb25maWcoZnVuY3Rpb24oJHN0YXRlUHJvdmlkZXIpIHtcblxuICAgICRzdGF0ZVByb3ZpZGVyLnN0YXRlKCdjYXJ0Jywge1xuICAgICAgICB1cmw6ICcvY2FydCcsXG4gICAgICAgIGNvbnRyb2xsZXI6ICdjYXJ0Q3RybCcsXG4gICAgICAgIHRlbXBsYXRlVXJsOiAnanMvY2FydC9jYXJ0Lmh0bWwnXG4gICAgfSk7XG5cbn0pO1xuXG5hcHAuY29udHJvbGxlcignY2FydEN0cmwnLCBmdW5jdGlvbigkc2NvcGUpIHtcblxuICAgIC8vVEVNUE9SQVJZISBGT1IgVEVTVElOR1xuICAgIC8vdGhpcyByZW5kZXJzIHRoZSBjYXJ0XG4gICAgJHNjb3BlLnNlc2hPcmRlcnMgPSBbe1xuICAgICAgICB0aXRsZTogJ1Rlc3QgSXRlbSAwMScsXG4gICAgICAgIGRlc2NyaXB0aW9uOiAnQWxtb3N0IGFzIGdvb2QgYXMgVGVzdCBJdGVtIDAyIScsXG4gICAgICAgIHByaWNlOiAzOTk5LFxuICAgICAgICBob3dNYW55OiA1XG4gICAgfSwge1xuICAgICAgICB0aXRsZTogJ1Rlc3QgSXRlbSAwMicsXG4gICAgICAgIGRlc2NyaXB0aW9uOiAnTmV3IGFuZCBJbXByb3ZlZCEhJyxcbiAgICAgICAgcHJpY2U6IDQyOTksXG4gICAgICAgIGhvd01hbnk6IDNcbiAgICB9LCB7XG4gICAgICAgIHRpdGxlOiAnVGVzdCBJdGVtIDAzJyxcbiAgICAgICAgZGVzY3JpcHRpb246ICdCYXJnYWluIFRlc3QgSXRlbSEnLFxuICAgICAgICBwcmljZTogMTk5OSxcbiAgICAgICAgaG93TWFueTogNlxuICAgIH0sIHtcbiAgICAgICAgdGl0bGU6ICdUZXN0IEl0ZW0gMDQnLFxuICAgICAgICBkZXNjcmlwdGlvbjogJ0ZhbWlseSBTaXplZCBUZXN0IGl0ZW0hJyxcbiAgICAgICAgcHJpY2U6IDc5OTksXG4gICAgICAgIGhvd01hbnk6IDFcbiAgICB9XTtcblxuICAgICRzY29wZS5zZXNoT3JkZXJzLm1hcChmdW5jdGlvbihlbCkge1xuICAgICAgICBlbC5wcmljZU91dCA9ICckJyArIGVsLnByaWNlIC8gMTAwO1xuICAgICAgICBlbC5zVG90ID0gJyQnICsgKChlbC5wcmljZSAqIGVsLmhvd01hbnkpIC8gMTAwKTtcbiAgICB9KTtcblxuICAgICRzY29wZS50b3RhbCA9IDA7XG5cbiAgICAkc2NvcGUuc2VzaE9yZGVycy5mb3JFYWNoKGZ1bmN0aW9uKGVsKSB7XG4gICAgICAgICRzY29wZS50b3RhbCArPSBlbC5wcmljZSAqIGVsLmhvd01hbnk7XG4gICAgfSk7XG5cbiAgICAkc2NvcGUudG90YWwgPSAnJCcgKyAkc2NvcGUudG90YWwvMTAwO1xuXG59KTtcbiIsIihmdW5jdGlvbiAoKSB7XG5cbiAgICAndXNlIHN0cmljdCc7XG5cbiAgICAvLyBIb3BlIHlvdSBkaWRuJ3QgZm9yZ2V0IEFuZ3VsYXIhIER1aC1kb3kuXG4gICAgaWYgKCF3aW5kb3cuYW5ndWxhcikgdGhyb3cgbmV3IEVycm9yKCdJIGNhblxcJ3QgZmluZCBBbmd1bGFyIScpO1xuXG4gICAgdmFyIGFwcCA9IGFuZ3VsYXIubW9kdWxlKCdmc2FQcmVCdWlsdCcsIFtdKTtcblxuICAgIGFwcC5mYWN0b3J5KCdTb2NrZXQnLCBmdW5jdGlvbiAoJGxvY2F0aW9uKSB7XG5cbiAgICAgICAgaWYgKCF3aW5kb3cuaW8pIHRocm93IG5ldyBFcnJvcignc29ja2V0LmlvIG5vdCBmb3VuZCEnKTtcblxuICAgICAgICB2YXIgc29ja2V0O1xuXG4gICAgICAgIGlmICgkbG9jYXRpb24uJCRwb3J0KSB7XG4gICAgICAgICAgICBzb2NrZXQgPSBpbygnaHR0cDovL2xvY2FsaG9zdDoxMzM3Jyk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBzb2NrZXQgPSBpbygnLycpO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIHNvY2tldDtcblxuICAgIH0pO1xuXG4gICAgYXBwLmNvbnN0YW50KCdBVVRIX0VWRU5UUycsIHtcbiAgICAgICAgbG9naW5TdWNjZXNzOiAnYXV0aC1sb2dpbi1zdWNjZXNzJyxcbiAgICAgICAgbG9naW5GYWlsZWQ6ICdhdXRoLWxvZ2luLWZhaWxlZCcsXG4gICAgICAgIGxvZ291dFN1Y2Nlc3M6ICdhdXRoLWxvZ291dC1zdWNjZXNzJyxcbiAgICAgICAgc2Vzc2lvblRpbWVvdXQ6ICdhdXRoLXNlc3Npb24tdGltZW91dCcsXG4gICAgICAgIG5vdEF1dGhlbnRpY2F0ZWQ6ICdhdXRoLW5vdC1hdXRoZW50aWNhdGVkJyxcbiAgICAgICAgbm90QXV0aG9yaXplZDogJ2F1dGgtbm90LWF1dGhvcml6ZWQnXG4gICAgfSk7XG5cbiAgICBhcHAuY29uZmlnKGZ1bmN0aW9uICgkaHR0cFByb3ZpZGVyKSB7XG4gICAgICAgICRodHRwUHJvdmlkZXIuaW50ZXJjZXB0b3JzLnB1c2goW1xuICAgICAgICAgICAgJyRpbmplY3RvcicsXG4gICAgICAgICAgICBmdW5jdGlvbiAoJGluamVjdG9yKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuICRpbmplY3Rvci5nZXQoJ0F1dGhJbnRlcmNlcHRvcicpO1xuICAgICAgICAgICAgfVxuICAgICAgICBdKTtcbiAgICB9KTtcblxuICAgIGFwcC5mYWN0b3J5KCdBdXRoSW50ZXJjZXB0b3InLCBmdW5jdGlvbiAoJHJvb3RTY29wZSwgJHEsIEFVVEhfRVZFTlRTKSB7XG4gICAgICAgIHZhciBzdGF0dXNEaWN0ID0ge1xuICAgICAgICAgICAgNDAxOiBBVVRIX0VWRU5UUy5ub3RBdXRoZW50aWNhdGVkLFxuICAgICAgICAgICAgNDAzOiBBVVRIX0VWRU5UUy5ub3RBdXRob3JpemVkLFxuICAgICAgICAgICAgNDE5OiBBVVRIX0VWRU5UUy5zZXNzaW9uVGltZW91dCxcbiAgICAgICAgICAgIDQ0MDogQVVUSF9FVkVOVFMuc2Vzc2lvblRpbWVvdXRcbiAgICAgICAgfTtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIHJlc3BvbnNlRXJyb3I6IGZ1bmN0aW9uIChyZXNwb25zZSkge1xuICAgICAgICAgICAgICAgICRyb290U2NvcGUuJGJyb2FkY2FzdChzdGF0dXNEaWN0W3Jlc3BvbnNlLnN0YXR1c10sIHJlc3BvbnNlKTtcbiAgICAgICAgICAgICAgICByZXR1cm4gJHEucmVqZWN0KHJlc3BvbnNlKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfTtcbiAgICB9KTtcblxuICAgIGFwcC5zZXJ2aWNlKCdBdXRoU2VydmljZScsIGZ1bmN0aW9uICgkaHR0cCwgU2Vzc2lvbiwgJHJvb3RTY29wZSwgQVVUSF9FVkVOVFMsICRxKSB7XG5cbiAgICAgICAgdmFyIG9uU3VjY2Vzc2Z1bExvZ2luID0gZnVuY3Rpb24gKHJlc3BvbnNlKSB7XG4gICAgICAgICAgICB2YXIgZGF0YSA9IHJlc3BvbnNlLmRhdGE7XG4gICAgICAgICAgICBTZXNzaW9uLmNyZWF0ZShkYXRhLmlkLCBkYXRhLnVzZXIpO1xuICAgICAgICAgICAgJHJvb3RTY29wZS4kYnJvYWRjYXN0KEFVVEhfRVZFTlRTLmxvZ2luU3VjY2Vzcyk7XG4gICAgICAgICAgICByZXR1cm4gZGF0YS51c2VyO1xuICAgICAgICB9O1xuXG4gICAgICAgIHRoaXMuZ2V0TG9nZ2VkSW5Vc2VyID0gZnVuY3Rpb24gKCkge1xuXG4gICAgICAgICAgICBpZiAodGhpcy5pc0F1dGhlbnRpY2F0ZWQoKSkge1xuICAgICAgICAgICAgICAgIHJldHVybiAkcS53aGVuKHsgdXNlcjogU2Vzc2lvbi51c2VyIH0pO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICByZXR1cm4gJGh0dHAuZ2V0KCcvc2Vzc2lvbicpLnRoZW4ob25TdWNjZXNzZnVsTG9naW4pLmNhdGNoKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgIH07XG5cbiAgICAgICAgdGhpcy5sb2dpbiA9IGZ1bmN0aW9uIChjcmVkZW50aWFscykge1xuICAgICAgICAgICAgcmV0dXJuICRodHRwLnBvc3QoJy9sb2dpbicsIGNyZWRlbnRpYWxzKS50aGVuKG9uU3VjY2Vzc2Z1bExvZ2luKTtcbiAgICAgICAgfTtcblxuICAgICAgICB0aGlzLmxvZ291dCA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHJldHVybiAkaHR0cC5nZXQoJy9sb2dvdXQnKS50aGVuKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICBTZXNzaW9uLmRlc3Ryb3koKTtcbiAgICAgICAgICAgICAgICAkcm9vdFNjb3BlLiRicm9hZGNhc3QoQVVUSF9FVkVOVFMubG9nb3V0U3VjY2Vzcyk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfTtcblxuICAgICAgICB0aGlzLmlzQXV0aGVudGljYXRlZCA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHJldHVybiAhIVNlc3Npb24udXNlcjtcbiAgICAgICAgfTtcblxuICAgIH0pO1xuXG4gICAgYXBwLnNlcnZpY2UoJ1Nlc3Npb24nLCBmdW5jdGlvbiAoJHJvb3RTY29wZSwgQVVUSF9FVkVOVFMpIHtcblxuICAgICAgICAkcm9vdFNjb3BlLiRvbihBVVRIX0VWRU5UUy5ub3RBdXRoZW50aWNhdGVkLCB0aGlzLmRlc3Ryb3kpO1xuICAgICAgICAkcm9vdFNjb3BlLiRvbihBVVRIX0VWRU5UUy5zZXNzaW9uVGltZW91dCwgdGhpcy5kZXN0cm95KTtcblxuICAgICAgICB0aGlzLmNyZWF0ZSA9IGZ1bmN0aW9uIChzZXNzaW9uSWQsIHVzZXIpIHtcbiAgICAgICAgICAgIHRoaXMuaWQgPSBzZXNzaW9uSWQ7XG4gICAgICAgICAgICB0aGlzLnVzZXIgPSB1c2VyO1xuICAgICAgICB9O1xuXG4gICAgICAgIHRoaXMuZGVzdHJveSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHRoaXMuaWQgPSBudWxsO1xuICAgICAgICAgICAgdGhpcy51c2VyID0gbnVsbDtcbiAgICAgICAgfTtcblxuICAgIH0pO1xuXG59KSgpOyIsIid1c2Ugc3RyaWN0JztcbmFwcC5jb25maWcoZnVuY3Rpb24gKCRzdGF0ZVByb3ZpZGVyKSB7XG5cbiAgICAkc3RhdGVQcm92aWRlci5zdGF0ZSgnaG9tZScsIHtcbiAgICAgICAgdXJsOiAnLycsXG4gICAgICAgIGNvbnRyb2xsZXI6ICdIb21lQ3RybCcsXG4gICAgICAgIHRlbXBsYXRlVXJsOiAnanMvaG9tZS9ob21lLmh0bWwnXG4gICAgfSk7XG5cbn0pO1xuXG5hcHAuY29udHJvbGxlcignSG9tZUN0cmwnLCBmdW5jdGlvbiAoJHNjb3BlKSB7XG5cblxuXHRcbn0pOyIsIid1c2Ugc3RyaWN0JztcbmFwcC5jb25maWcoZnVuY3Rpb24oJHN0YXRlUHJvdmlkZXIpIHtcblxuICAgICRzdGF0ZVByb3ZpZGVyLnN0YXRlKCdwcm9kRGV0YWlsJywge1xuICAgICAgICB1cmw6ICcvcHJvZHVjdC9hbnl0aGluZy86cHJvZHUnLFxuICAgICAgICBjb250cm9sbGVyOiAncHJvZERldGFpbEN0cmwnLFxuICAgICAgICB0ZW1wbGF0ZVVybDogJ2pzL3Byb2RkZXRhaWwvcHJvZGRldGFpbC5odG1sJ1xuICAgIH0pO1xuXG59KTtcblxuYXBwLmNvbnRyb2xsZXIoJ3Byb2REZXRhaWxDdHJsJywgZnVuY3Rpb24oJHNjb3BlLCAkc3RhdGVQYXJhbXMsIGFkZHRvY2FydCkge1xuICAgIC8vVEVNUE9SQVJZISBGT1IgVEVTVElOR1xuICAgIGNvbnNvbGUubG9nKCRzdGF0ZVBhcmFtcy5wcm9kdSwgJ3RoaXMgaXMgcHJvZHUnKTtcblxuICAgICRzY29wZS50aGlzdGl0bGUgPSAkc3RhdGVQYXJhbXMucHJvZHU7XG5cbiAgICAkc2NvcGUuaXRlbSA9ICRzdGF0ZVBhcmFtcy50aXRsZTtcblxuICAgICRzY29wZS5wcm9kID0ge1xuICAgICAgICB0aXRsZTogJ1NhbXBsZSBQcm9kdWN0JyxcbiAgICAgICAgZGVzY3JpcHRpb246ICdUaGlzIHByb2R1Y3QgaXMgc28gYXdlc29tZSEgSXRcXCdzIHRhc3R5LicsXG4gICAgICAgIHByaWNlOiAzOTk5LFxuICAgICAgICBpc0NvZmZlZTogZmFsc2UsXG4gICAgICAgIGNhdGVnb3J5OiBbJ3Rhc3R5JywgJ2JlYW5zJywgJ21tbScsICdzcnNseSBpIGdvdCBub3RoaW4nXSxcbiAgICAgICAgcGhvdG86ICdub25lJ1xuICAgIH07XG5cbiAgICAkc2NvcGUucHJvZC5waG90byA9ICdpbWFnZXMvJyArICRzY29wZS5wcm9kLnBob3RvO1xuICAgIGlmICgkc2NvcGUucHJvZC5pc0NvZmZlZSAmJiAkc2NvcGUucHJvZC5waG90byA9PT0gJ2ltYWdlcy9ub25lJykge1xuICAgICAgICBjb25zb2xlLmxvZygnYmVhbnMnKVxuICAgICAgICAkc2NvcGUucHJvZC5waG90byA9ICdpbWFnZXMvcGxhY2Vob2xkZXJDb2YuanBnJztcbiAgICB9IGVsc2UgaWYgKCEkc2NvcGUucHJvZC5pc0NvZmZlZSAmJiAkc2NvcGUucHJvZC5waG90byA9PT0gJ2ltYWdlcy9ub25lJykge1xuICAgICAgICAkc2NvcGUucHJvZC5waG90byA9ICdpbWFnZXMvcGxhY2Vob2xkZXJNaW50LnBuZyc7XG4gICAgfVxuICAgICRzY29wZS5wcm9kLnByaWNlT3V0ID0gJyQnICsgKCRzY29wZS5wcm9kLnByaWNlIC8gMTAwKTtcblxuICAgICRzY29wZS5hZGR0b2NhcnQgPSBmdW5jdGlvbihkYXRhKXtcbiAgICAgICAgYWRkdG9jYXJ0LmFkZHRvY2FydChkYXRhKTtcbiAgICB9XG5cbiAgICAvLyAkc2NvcGUuYWRkdG9jYXJ0ID0gZnVuY3Rpb24oaXRlbXRvYWRkKSB7XG4gICAgLy8gICAgIC8vIHR3byB3YXlzIHRvIGdyYWIgdGhlIGN1c3RvbWVyJ3MgZGF0YTogJHNjb3BlLmNhcnQuaXRlbXMgLyBwYXJhbWV0ZXIgdG8gdGhpcyBmdW5jdGlvblxuICAgIC8vICAgICAvLyAkaHR0cC5wb3N0KHtjdXN0b21lckRhdGF9KS5zdWNjZXNzKGZ1bmN0aW9uKHJlc3VsdCl7XG4gICAgLy8gICAgIC8vICAgICAkc2NvcGUuY3VzdG9tZXJDYXJ0ID0gcmVzdWx0OyBcbiAgICAvLyAgICAgLy8gfSlcblxuICAgIC8vICAgICBjb25zb2xlLmxvZygndGhpcyBpcyBmaXJzdCAkY29va2llcycsICRjb29raWVzLnByb2R1Y3RzKTtcbiAgICAvLyAgICAgY29uc29sZS5sb2coJ2hpdCBidXR0b24gdGhpcyBjb21lcyB0aHJvdWdoJywgaXRlbXRvYWRkKTtcbiAgICAvLyAgICAgdmFyIHByb2RhcnIgPSAkY29va2llU3RvcmUuZ2V0KCdwcm9kdWN0cycpO1xuICAgIC8vICAgICBwcm9kYXJyLnB1c2goaXRlbXRvYWRkKTtcbiAgICAvLyAgICAgJGNvb2tpZVN0b3JlLnB1dCgncHJvZHVjdHMnLCBwcm9kYXJyKTtcblxuICAgIC8vIH07XG5cbn0pO1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG5hcHAuZmFjdG9yeSgnUHJvZHVjdEZhY3RvcnknLCBmdW5jdGlvbigkaHR0cCkge1xuICByZXR1cm4ge1xuICAgIGdldENvZmZlZURiOiBmdW5jdGlvbigpIHtcbiAgICAgIHJldHVybiAkaHR0cC5nZXQoJy9hcGkvY29mZmVlJykudGhlbihmdW5jdGlvbihyZXNwb25zZSkge1xuICAgICAgICByZXR1cm4gcmVzcG9uc2UuZGF0YTtcbiAgICAgIH0pO1xuICAgIH0sXG4gICAgZ2V0TWludHNEYjogZnVuY3Rpb24oKSB7XG4gICAgICByZXR1cm4gJGh0dHAuZ2V0KCcvYXBpL21pbnRzJykudGhlbihmdW5jdGlvbihyZXNwb25zZSkge1xuICAgICAgICByZXR1cm4gcmVzcG9uc2UuZGF0YTtcbiAgICAgIH0pO1xuICAgIH1cbiAgfTtcbn0pO1xuXG4iLCIndXNlIHN0cmljdCc7XG5hcHAuY29uZmlnKGZ1bmN0aW9uKCRzdGF0ZVByb3ZpZGVyKSB7XG5cbiAgJHN0YXRlUHJvdmlkZXIuc3RhdGUoJ2NvZmZlZScsIHtcbiAgICB1cmw6ICcvcHJvZHVjdC9jb2ZmZWUnLFxuICAgIGNvbnRyb2xsZXI6ICdQcm9kdWN0Q3RybCcsXG4gICAgdGVtcGxhdGVVcmw6ICdqcy9wcm9kdWN0bGlzdGluZy9jb2ZmZWUuaHRtbCdcbiAgfSk7XG5cbiAgJHN0YXRlUHJvdmlkZXIuc3RhdGUoJ21pbnQnLCB7XG4gICAgdXJsOiAnL3Byb2R1Y3QvbWludCcsXG4gICAgY29udHJvbGxlcjogJ1Byb2R1Y3RDdHJsJyxcbiAgICB0ZW1wbGF0ZVVybDogJ2pzL3Byb2R1Y3RsaXN0aW5nL21pbnQuaHRtbCdcbiAgfSk7XG59KTtcblxuYXBwLmNvbnRyb2xsZXIoJ1Byb2R1Y3RDdHJsJywgZnVuY3Rpb24oJHNjb3BlLCBQcm9kdWN0RmFjdG9yeSkge1xuXG4gICRzY29wZS5zaG93Q29mZmVlID0gZnVuY3Rpb24oKSB7XG4gICAgUHJvZHVjdEZhY3RvcnkuZ2V0Q29mZmVlRGIoKS50aGVuKGZ1bmN0aW9uKGRhdGEpIHtcbiAgICAgICRzY29wZS5jb2ZmZWUgPSBkYXRhO1xuICAgIH0pO1xuICB9O1xuXG4gICRzY29wZS5zaG93TWludHMgPSBmdW5jdGlvbigpIHtcbiAgICBQcm9kdWN0RmFjdG9yeS5nZXRNaW50c0RiKCkudGhlbihmdW5jdGlvbihkYXRhKSB7XG4gICAgICAkc2NvcGUubWludHMgPSBkYXRhO1xuICAgIH0pO1xuICB9O1xufSk7IiwiJ3VzZSBzdHJpY3QnO1xuYXBwLmNvbmZpZyhmdW5jdGlvbiAoJHN0YXRlUHJvdmlkZXIpIHtcblxuICAgIC8vIFJlZ2lzdGVyIG91ciAqYWJvdXQqIHN0YXRlLlxuICAgICRzdGF0ZVByb3ZpZGVyLnN0YXRlKCdzaWdudXAnLCB7XG4gICAgICAgIHVybDogJy9zaWdudXAnLFxuICAgICAgICBjb250cm9sbGVyOiAnc2lnblVwQ29udHJvbGxlcicsXG4gICAgICAgIHRlbXBsYXRlVXJsOiAnanMvc2lnbnVwL3NpZ251cC5odG1sJ1xuICAgIH0pO1xuXG59KTtcblxuYXBwLmNvbnRyb2xsZXIoJ3NpZ25VcENvbnRyb2xsZXInLCBmdW5jdGlvbiAoJHNjb3BlLCAkd2luZG93LCAkbG9jYXRpb24pIHtcblxuXHQkc2NvcGUudXNlciA9IHtcblxuXHR9O1xuICAgIC8vICRzY29wZS5zaWduVXBGb3JtID0gZnVuY3Rpb24gKHVzZXIpe1xuICAgIC8vIFx0c2lnbnVwRmFjdG9yeS5hZGROZXdVc2VyKHVzZXIpLnRoZW4oZnVuY3Rpb24oKXtcbiAgICAvLyBcdH0pO1xuICAgIC8vIH07XG5cbiAgICAkc2NvcGUubG9naW4gPSBmdW5jdGlvbiAoKXtcbiAgICAgICAgJHdpbmRvdy5sb2NhdGlvbi5ocmVmID0gJy9hdXRoL2dvb2dsZSc7XG4gICAgfTtcblxuICAgICRzY29wZS5sb2dpbmZiID0gZnVuY3Rpb24gKCl7XG4gICAgICAgICR3aW5kb3cubG9jYXRpb24uaHJlZiA9ICcvYXV0aC9mYWNlYm9vayc7XG4gICAgfTtcblxuXG59KTtcblxuIiwiJ3VzZSBzdHJpY3QnO1xuYXBwLmZhY3RvcnkoJ1JhbmRvbUdyZWV0aW5ncycsIGZ1bmN0aW9uICgpIHtcblxuICAgIHZhciBnZXRSYW5kb21Gcm9tQXJyYXkgPSBmdW5jdGlvbiAoYXJyKSB7XG4gICAgICAgIHJldHVybiBhcnJbTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogYXJyLmxlbmd0aCldO1xuICAgIH07XG5cbiAgICB2YXIgZ3JlZXRpbmdzID0gW1xuICAgICAgICAnSSBrbm93IHRoYXQgeW91IGp1c3QgZHJhbmsgc29tZSBjb2ZmZWUuLi4gaGF2ZSBhIG1pbnQuLi4nLFxuICAgICAgICAnVW1tbS4uLi4uLiBZb3UgbmVlZCBhIG1pbnQuLi4nLFxuICAgICAgICAnSGVsbG8sIHNtZWxseSBodW1hbi4nLFxuICAgICAgICAnU28uLi4gaG93IGRvIHlvdSBmZWVsIGFib3V0IGhhdmluZyBhIG1pbnQgcmlnaHQgbm93PycsXG4gICAgICAgICdEdWRlLiBZb3UgY2Fubm90IGVhdCBlZ2cgc2FsYWQgd2l0aCBjb2ZmZWUgdW5sZXNzIHlvdSB0YWtlIGEgbWludC4nLFxuICAgICAgICAnU2VyaW91c2x5LiBDb2ZmZWUgd2l0aCBzYWxtb24gc2FsYWQ/IFRha2UgYSBtaW50LicsIFxuICAgICAgICAnV2hhdFxcJ3MgeW91ciBwcm9ibGVtIHdpdGggbWludHM/IFlvdSBuZWVkIG9uZS4nXG4gICAgXTtcblxuICAgIHJldHVybiB7XG4gICAgICAgIGdyZWV0aW5nczogZ3JlZXRpbmdzLFxuICAgICAgICBnZXRSYW5kb21HcmVldGluZzogZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgcmV0dXJuIGdldFJhbmRvbUZyb21BcnJheShncmVldGluZ3MpO1xuICAgICAgICB9XG4gICAgfTtcblxufSk7IiwiJ3VzZSBzdHJpY3QnO1xuIiwiJ3VzZSBzdHJpY3QnO1xuYXBwLmZhY3RvcnkoJ2FkZHRvY2FydCcsIGZ1bmN0aW9uKCRjb29raWVzLCAkY29va2llU3RvcmUpe1xuXHRyZXR1cm4ge1xuXHRcdGFkZHRvY2FydDogZnVuY3Rpb24oaXRlbXRvYWRkKXtcblxuXHRcdFx0Y29uc29sZS5sb2coJ3RoaXMgaXMgZmlyc3QgJGNvb2tpZXMnLCAkY29va2llcy5wcm9kdWN0cyk7XG4gICAgICAgIGNvbnNvbGUubG9nKCdoaXQgYnV0dG9uIHRoaXMgY29tZXMgdGhyb3VnaCcsIGl0ZW10b2FkZCk7XG4gICAgICAgIHZhciBwcm9kYXJyID0gJGNvb2tpZVN0b3JlLmdldCgncHJvZHVjdHMnKTtcbiAgICAgICAgcHJvZGFyci5wdXNoKGl0ZW10b2FkZCk7XG4gICAgICAgICRjb29raWVTdG9yZS5wdXQoJ3Byb2R1Y3RzJywgcHJvZGFycik7XG5cblx0XHR9XG5cdH1cbn0pIiwiJ3VzZSBzdHJpY3QnO1xuYXBwLmZhY3RvcnkoJ0FkZFRvQ2FydCcsIGZ1bmN0aW9uKCkge1xuXG4gICAgICAgICAgICB2YXIgY2FydGNvbnRlbnQgPSB7XG4gICAgICAgICAgICAgICAgdXNlcjogcmVxLmJvZHkuY29va2llcy5jYXJ0LFxuICAgICAgICAgICAgICAgIHByb2R1Y3RzOiBbXVxuXG4gIH07XG5cbiAgcmV0dXJuIHtcblxuICAgIHNlbGVjdGluZzogZnVuY3Rpb24ocHJvZHVjdGluZm8pIHtcbiAgICAgIHZhciB0aGlzY2xpY2sgPSB7fTtcbiAgICAgIHRoaXNjbGljay5wcm9kSWQgPSBwcm9kdWN0aW5mby5faWQ7XG4gICAgICB0aGlzY2xpY2suUHJpY2UgPSBwcm9kdWN0aW5mby5wcmljZTtcbiAgICAgIHRoaXNjbGljay5RdWFudGl0eSA9IHByb2R1Y3RpbmZvLmhvd01hbnk7XG5cbiAgICAgIGNhcnRjb250ZW50LnByb2R1Y3RzLnB1c2godGhpc2NsaWNrKTtcbiAgICB9LFxuXG5cblxuICAgIGFkZGVkVG9DYXJ0OiBmdW5jdGlvbigpIHtcbiAgICAgIHJldHVybiBzZWxlY3RpbmcoY2xpY2tpbmZvKTtcbiAgICB9XG5cblxuICB9O1xuXG59KTtcbiIsIlwidXNlIHN0cmljdFwiO1xuYXBwLmZhY3RvcnkoJ3NpZ251cEZhY3RvcnknLCBmdW5jdGlvbigkaHR0cCl7XG5cdHJldHVybiB7XG5cdFx0YWRkTmV3VXNlciA6IGZ1bmN0aW9uICh1c2VyKSB7XG5cdFx0XHRyZXR1cm4gJGh0dHAucG9zdCgnL25ld1VzZXInLCB1c2VyKTtcblx0XHR9XG5cdH07XG59KTtcbiIsIid1c2Ugc3RyaWN0JztcbmFwcC5kaXJlY3RpdmUoJ25hdmJhcicsIGZ1bmN0aW9uKCkge1xuICByZXR1cm4ge1xuICAgIHJlc3RyaWN0OiAnRScsXG4gICAgc2NvcGU6IHtcbiAgICAgIGl0ZW1zOiAnPSdcbiAgICB9LFxuICAgIHRlbXBsYXRlVXJsOiAnanMvY29tbW9uL2RpcmVjdGl2ZXMvbmF2YmFyL25hdmJhci5odG1sJ1xuICB9O1xufSk7XG4iLCIndXNlIHN0cmljdCc7XG5hcHAuZGlyZWN0aXZlKCdzdGFjaycsIGZ1bmN0aW9uKCkge1xuICByZXR1cm4ge1xuICAgIHJlc3RyaWN0OiAnRScsXG4gICAgdGVtcGxhdGVVcmw6ICdqcy9jb21tb24vZGlyZWN0aXZlcy9zdGFja1N0b3JlTG9nby9zdGFja1N0b3JlTG9nby5odG1sJ1xuICB9O1xufSk7XG4iLCIndXNlIHN0cmljdCc7XG5hcHAuZGlyZWN0aXZlKCdyYW5kb0dyZWV0aW5nJywgZnVuY3Rpb24gKFJhbmRvbUdyZWV0aW5ncykge1xuXG4gICAgcmV0dXJuIHtcbiAgICAgICAgcmVzdHJpY3Q6ICdFJyxcbiAgICAgICAgdGVtcGxhdGVVcmw6ICdqcy9jb21tb24vZGlyZWN0aXZlcy9yYW5kby1ncmVldGluZy9yYW5kby1ncmVldGluZy5odG1sJyxcbiAgICAgICAgbGluazogZnVuY3Rpb24gKHNjb3BlKSB7XG4gICAgICAgICAgICBzY29wZS5ncmVldGluZyA9IFJhbmRvbUdyZWV0aW5ncy5nZXRSYW5kb21HcmVldGluZygpO1xuICAgICAgICB9XG4gICAgfTtcblxufSk7Il0sInNvdXJjZVJvb3QiOiIvc291cmNlLyJ9
=======
'use strict';
app.directive('stack', function() {
  return {
    restrict: 'E',
    template: '<h1>hello</h1>'
  };
});

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC5qcyIsImFib3V0L2Fib3V0LmpzIiwiY2FydC9jYXJ0LmpzIiwiZnNhL2ZzYS1wcmUtYnVpbHQuanMiLCJob21lL2hvbWUuanMiLCJwcm9kZGV0YWlsL3Byb2RkZXRhaWwuanMiLCJwcm9kdWN0bGlzdGluZy9wcm9kdWN0ZmFjdG9yeS5qcyIsInByb2R1Y3RsaXN0aW5nL3Byb2R1Y3RsaXN0aW5nLmpzIiwic2lnbnVwL3NpZ251cC5qcyIsImNvbW1vbi9mYWN0b3JpZXMvUmFuZG9tR3JlZXRpbmdzLmpzIiwiY29tbW9uL2ZhY3Rvcmllcy9Tb2NrZXQuanMiLCJjb21tb24vZmFjdG9yaWVzL2NhcnRmYWN0b3J5LmpzIiwiY29tbW9uL2ZhY3Rvcmllcy9zaWdudXBGYWN0b3J5LmpzIiwiY29tbW9uL2RpcmVjdGl2ZXMvbmF2YmFyL25hdmJhci5qcyIsImNvbW1vbi9kaXJlY3RpdmVzL3JhbmRvLWdyZWV0aW5nL3JhbmRvLWdyZWV0aW5nLmpzIiwiY29tbW9uL2RpcmVjdGl2ZXMvc3RhY2tTdG9yZUxvZ28vc3RhY2tTdG9yZUxvZ28uanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDL0NBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUN6QkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUNuREE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDakhBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDZkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDaENBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUNoQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUM5QkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUN2Q0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUN4QkE7QUFDQTtBQ0RBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDOUJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDZkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ1ZBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ1hBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EiLCJmaWxlIjoibWFpbi5qcyIsInNvdXJjZXNDb250ZW50IjpbIid1c2Ugc3RyaWN0JztcbnZhciBhcHAgPSBhbmd1bGFyLm1vZHVsZSgnRnVsbHN0YWNrR2VuZXJhdGVkQXBwJywgWyd1aS5yb3V0ZXInLCAnZnNhUHJlQnVpbHQnLCAnbmdDb29raWVzJ10pO1xuXG5hcHAuY29udHJvbGxlcignTWFpbkNvbnRyb2xsZXInLCBmdW5jdGlvbiAoJHNjb3BlLCAkY29va2llcywgJGNvb2tpZVN0b3JlKSB7XG5cblxuICAgIGNvbnNvbGUubG9nKCR3aW5kb3cpO1xuXG4gICAgY29uc29sZS5sb2coJGNvb2tpZVN0b3JlLCAndGhpcyBpcyBjb29raWUgc3RvcmUnKTtcbiAgICAkY29va2llU3RvcmUucHV0KCdjYXJ0JywgJ3RlbXAnKTtcbiAgICBjb25zb2xlLmxvZygkY29va2llcywgJ3RoaXMgaXMgY29va2llJyk7XG59KTtcblxuYXBwLmNvbnRyb2xsZXIoJ01haW5Db250cm9sbGVyJywgZnVuY3Rpb24oJHNjb3BlKSB7XG5cbiAgLy8gR2l2ZW4gdG8gdGhlIDxuYXZiYXI+IGRpcmVjdGl2ZSB0byBzaG93IHRoZSBtZW51LlxuICAkc2NvcGUubWVudUl0ZW1zID0gW3tcbiAgICBsYWJlbDogJ0hvbWUnLFxuICAgIHN0YXRlOiAnaG9tZSdcbiAgfSwge1xuICAgIGxhYmVsOiAnQ29mZmVlJyxcbiAgICBzdGF0ZTogJ2NvZmZlZSdcbiAgfSwge1xuICAgIGxhYmVsOiAnTWludCcsXG4gICAgc3RhdGU6ICdtaW50J1xuICB9LCB7XG4gICAgbGFiZWw6ICdBYm91dCcsXG4gICAgc3RhdGU6ICdhYm91dCdcbiAgfSwge1xuICAgIGxhYmVsOiAnU2lnblVwJyxcbiAgICBzdGF0ZTogJ3NpZ251cCdcbiAgfSwge1xuICAgIGxhYmVsOiAnU2lnbiBJbicsXG4gICAgc3RhdGU6ICdzaWduSW4nXG4gIH0sIHtcbiAgICBsYWJlbDogJ0NhcnQnLFxuICAgIHN0YXRlOiAnY2FydCdcbiAgfV07XG59KTtcblxuXG5hcHAuY29uZmlnKGZ1bmN0aW9uKCR1cmxSb3V0ZXJQcm92aWRlciwgJGxvY2F0aW9uUHJvdmlkZXIpIHtcbiAgLy8gVGhpcyB0dXJucyBvZmYgaGFzaGJhbmcgdXJscyAoLyNhYm91dCkgYW5kIGNoYW5nZXMgaXQgdG8gc29tZXRoaW5nIG5vcm1hbCAoL2Fib3V0KVxuICAkbG9jYXRpb25Qcm92aWRlci5odG1sNU1vZGUodHJ1ZSk7XG4gIC8vIElmIHdlIGdvIHRvIGEgVVJMIHRoYXQgdWktcm91dGVyIGRvZXNuJ3QgaGF2ZSByZWdpc3RlcmVkLCBnbyB0byB0aGUgXCIvXCIgdXJsLlxuICAkdXJsUm91dGVyUHJvdmlkZXIub3RoZXJ3aXNlKCcvJyk7XG59KTtcbiIsIid1c2Ugc3RyaWN0JztcbmFwcC5jb25maWcoZnVuY3Rpb24oJHN0YXRlUHJvdmlkZXIpIHtcblxuICAvLyBSZWdpc3RlciBvdXIgKmFib3V0KiBzdGF0ZS5cbiAgJHN0YXRlUHJvdmlkZXIuc3RhdGUoJ2Fib3V0Jywge1xuICAgIHVybDogJy9hYm91dCcsXG4gICAgY29udHJvbGxlcjogJ0Fib3V0Q29udHJvbGxlcicsXG4gICAgdGVtcGxhdGVVcmw6ICdqcy9hYm91dC9hYm91dC5odG1sJ1xuICB9KTtcblxufSk7XG5cbmFwcC5jb250cm9sbGVyKCdBYm91dENvbnRyb2xsZXInLCBmdW5jdGlvbigkc2NvcGUpIHtcblxuICAvLyBJbWFnZXMgb2YgYmVhdXRpZnVsIEZ1bGxzdGFjayBwZW9wbGUuXG4gICRzY29wZS5pbWFnZXMgPSBbXG4gICAgJ2h0dHBzOi8vcGJzLnR3aW1nLmNvbS9tZWRpYS9CN2dCWHVsQ0FBQVhRY0UuanBnOmxhcmdlJyxcbiAgICAnaHR0cHM6Ly9mYmNkbi1zcGhvdG9zLWMtYS5ha2FtYWloZC5uZXQvaHBob3Rvcy1hay14YXAxL3QzMS4wLTgvMTA4NjI0NTFfMTAyMDU2MjI5OTAzNTkyNDFfODAyNzE2ODg0MzMxMjg0MTEzN19vLmpwZycsXG4gICAgJ2h0dHBzOi8vcGJzLnR3aW1nLmNvbS9tZWRpYS9CLUxLVXNoSWdBRXk5U0suanBnJyxcbiAgICAnaHR0cHM6Ly9wYnMudHdpbWcuY29tL21lZGlhL0I3OS1YN29DTUFBa3c3eS5qcGcnLFxuICAgICdodHRwczovL3Bicy50d2ltZy5jb20vbWVkaWEvQi1VajlDT0lJQUlGQWgwLmpwZzpsYXJnZScsXG4gICAgJ2h0dHBzOi8vcGJzLnR3aW1nLmNvbS9tZWRpYS9CNnlJeUZpQ0VBQXFsMTIuanBnOmxhcmdlJ1xuICBdO1xuXG59KTtcbiIsIid1c2Ugc3RyaWN0JztcbmFwcC5jb25maWcoZnVuY3Rpb24oJHN0YXRlUHJvdmlkZXIpIHtcblxuICAgICRzdGF0ZVByb3ZpZGVyLnN0YXRlKCdjYXJ0Jywge1xuICAgICAgICB1cmw6ICcvY2FydCcsXG4gICAgICAgIGNvbnRyb2xsZXI6ICdjYXJ0Q3RybCcsXG4gICAgICAgIHRlbXBsYXRlVXJsOiAnanMvY2FydC9jYXJ0Lmh0bWwnXG4gICAgfSk7XG5cbn0pO1xuXG5hcHAuY29udHJvbGxlcignY2FydEN0cmwnLCBmdW5jdGlvbigkc2NvcGUpIHtcblxuICAgIC8vVEVNUE9SQVJZISBGT1IgVEVTVElOR1xuICAgIC8vdGhpcyByZW5kZXJzIHRoZSBjYXJ0XG4gICAgJHNjb3BlLnNlc2hPcmRlcnMgPSBbe1xuICAgICAgICB0aXRsZTogJ1Rlc3QgSXRlbSAwMScsXG4gICAgICAgIGRlc2NyaXB0aW9uOiAnQWxtb3N0IGFzIGdvb2QgYXMgVGVzdCBJdGVtIDAyIScsXG4gICAgICAgIHByaWNlOiAzOTk5LFxuICAgICAgICBob3dNYW55OiA1XG4gICAgfSwge1xuICAgICAgICB0aXRsZTogJ1Rlc3QgSXRlbSAwMicsXG4gICAgICAgIGRlc2NyaXB0aW9uOiAnTmV3IGFuZCBJbXByb3ZlZCEhJyxcbiAgICAgICAgcHJpY2U6IDQyOTksXG4gICAgICAgIGhvd01hbnk6IDNcbiAgICB9LCB7XG4gICAgICAgIHRpdGxlOiAnVGVzdCBJdGVtIDAzJyxcbiAgICAgICAgZGVzY3JpcHRpb246ICdCYXJnYWluIFRlc3QgSXRlbSEnLFxuICAgICAgICBwcmljZTogMTk5OSxcbiAgICAgICAgaG93TWFueTogNlxuICAgIH0sIHtcbiAgICAgICAgdGl0bGU6ICdUZXN0IEl0ZW0gMDQnLFxuICAgICAgICBkZXNjcmlwdGlvbjogJ0ZhbWlseSBTaXplZCBUZXN0IGl0ZW0hJyxcbiAgICAgICAgcHJpY2U6IDc5OTksXG4gICAgICAgIGhvd01hbnk6IDFcbiAgICB9XTtcblxuICAgICRzY29wZS5zZXNoT3JkZXJzLm1hcChmdW5jdGlvbihlbCkge1xuICAgICAgICBlbC5wcmljZU91dCA9ICckJyArIGVsLnByaWNlIC8gMTAwO1xuICAgICAgICBlbC5zVG90ID0gJyQnICsgKChlbC5wcmljZSAqIGVsLmhvd01hbnkpIC8gMTAwKTtcbiAgICB9KTtcblxuICAgICRzY29wZS50b3RhbCA9IDA7XG5cbiAgICAkc2NvcGUuc2VzaE9yZGVycy5mb3JFYWNoKGZ1bmN0aW9uKGVsKSB7XG4gICAgICAgICRzY29wZS50b3RhbCArPSBlbC5wcmljZSAqIGVsLmhvd01hbnk7XG4gICAgfSk7XG5cbiAgICAkc2NvcGUudG90YWwgPSAnJCcgKyAkc2NvcGUudG90YWwvMTAwO1xuXG59KTtcbiIsIihmdW5jdGlvbiAoKSB7XG5cbiAgICAndXNlIHN0cmljdCc7XG5cbiAgICAvLyBIb3BlIHlvdSBkaWRuJ3QgZm9yZ2V0IEFuZ3VsYXIhIER1aC1kb3kuXG4gICAgaWYgKCF3aW5kb3cuYW5ndWxhcikgdGhyb3cgbmV3IEVycm9yKCdJIGNhblxcJ3QgZmluZCBBbmd1bGFyIScpO1xuXG4gICAgdmFyIGFwcCA9IGFuZ3VsYXIubW9kdWxlKCdmc2FQcmVCdWlsdCcsIFtdKTtcblxuICAgIGFwcC5mYWN0b3J5KCdTb2NrZXQnLCBmdW5jdGlvbiAoJGxvY2F0aW9uKSB7XG5cbiAgICAgICAgaWYgKCF3aW5kb3cuaW8pIHRocm93IG5ldyBFcnJvcignc29ja2V0LmlvIG5vdCBmb3VuZCEnKTtcblxuICAgICAgICB2YXIgc29ja2V0O1xuXG4gICAgICAgIGlmICgkbG9jYXRpb24uJCRwb3J0KSB7XG4gICAgICAgICAgICBzb2NrZXQgPSBpbygnaHR0cDovL2xvY2FsaG9zdDoxMzM3Jyk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBzb2NrZXQgPSBpbygnLycpO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIHNvY2tldDtcblxuICAgIH0pO1xuXG4gICAgYXBwLmNvbnN0YW50KCdBVVRIX0VWRU5UUycsIHtcbiAgICAgICAgbG9naW5TdWNjZXNzOiAnYXV0aC1sb2dpbi1zdWNjZXNzJyxcbiAgICAgICAgbG9naW5GYWlsZWQ6ICdhdXRoLWxvZ2luLWZhaWxlZCcsXG4gICAgICAgIGxvZ291dFN1Y2Nlc3M6ICdhdXRoLWxvZ291dC1zdWNjZXNzJyxcbiAgICAgICAgc2Vzc2lvblRpbWVvdXQ6ICdhdXRoLXNlc3Npb24tdGltZW91dCcsXG4gICAgICAgIG5vdEF1dGhlbnRpY2F0ZWQ6ICdhdXRoLW5vdC1hdXRoZW50aWNhdGVkJyxcbiAgICAgICAgbm90QXV0aG9yaXplZDogJ2F1dGgtbm90LWF1dGhvcml6ZWQnXG4gICAgfSk7XG5cbiAgICBhcHAuY29uZmlnKGZ1bmN0aW9uICgkaHR0cFByb3ZpZGVyKSB7XG4gICAgICAgICRodHRwUHJvdmlkZXIuaW50ZXJjZXB0b3JzLnB1c2goW1xuICAgICAgICAgICAgJyRpbmplY3RvcicsXG4gICAgICAgICAgICBmdW5jdGlvbiAoJGluamVjdG9yKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuICRpbmplY3Rvci5nZXQoJ0F1dGhJbnRlcmNlcHRvcicpO1xuICAgICAgICAgICAgfVxuICAgICAgICBdKTtcbiAgICB9KTtcblxuICAgIGFwcC5mYWN0b3J5KCdBdXRoSW50ZXJjZXB0b3InLCBmdW5jdGlvbiAoJHJvb3RTY29wZSwgJHEsIEFVVEhfRVZFTlRTKSB7XG4gICAgICAgIHZhciBzdGF0dXNEaWN0ID0ge1xuICAgICAgICAgICAgNDAxOiBBVVRIX0VWRU5UUy5ub3RBdXRoZW50aWNhdGVkLFxuICAgICAgICAgICAgNDAzOiBBVVRIX0VWRU5UUy5ub3RBdXRob3JpemVkLFxuICAgICAgICAgICAgNDE5OiBBVVRIX0VWRU5UUy5zZXNzaW9uVGltZW91dCxcbiAgICAgICAgICAgIDQ0MDogQVVUSF9FVkVOVFMuc2Vzc2lvblRpbWVvdXRcbiAgICAgICAgfTtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIHJlc3BvbnNlRXJyb3I6IGZ1bmN0aW9uIChyZXNwb25zZSkge1xuICAgICAgICAgICAgICAgICRyb290U2NvcGUuJGJyb2FkY2FzdChzdGF0dXNEaWN0W3Jlc3BvbnNlLnN0YXR1c10sIHJlc3BvbnNlKTtcbiAgICAgICAgICAgICAgICByZXR1cm4gJHEucmVqZWN0KHJlc3BvbnNlKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfTtcbiAgICB9KTtcblxuICAgIGFwcC5zZXJ2aWNlKCdBdXRoU2VydmljZScsIGZ1bmN0aW9uICgkaHR0cCwgU2Vzc2lvbiwgJHJvb3RTY29wZSwgQVVUSF9FVkVOVFMsICRxKSB7XG5cbiAgICAgICAgdmFyIG9uU3VjY2Vzc2Z1bExvZ2luID0gZnVuY3Rpb24gKHJlc3BvbnNlKSB7XG4gICAgICAgICAgICB2YXIgZGF0YSA9IHJlc3BvbnNlLmRhdGE7XG4gICAgICAgICAgICBTZXNzaW9uLmNyZWF0ZShkYXRhLmlkLCBkYXRhLnVzZXIpO1xuICAgICAgICAgICAgJHJvb3RTY29wZS4kYnJvYWRjYXN0KEFVVEhfRVZFTlRTLmxvZ2luU3VjY2Vzcyk7XG4gICAgICAgICAgICByZXR1cm4gZGF0YS51c2VyO1xuICAgICAgICB9O1xuXG4gICAgICAgIHRoaXMuZ2V0TG9nZ2VkSW5Vc2VyID0gZnVuY3Rpb24gKCkge1xuXG4gICAgICAgICAgICBpZiAodGhpcy5pc0F1dGhlbnRpY2F0ZWQoKSkge1xuICAgICAgICAgICAgICAgIHJldHVybiAkcS53aGVuKHsgdXNlcjogU2Vzc2lvbi51c2VyIH0pO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICByZXR1cm4gJGh0dHAuZ2V0KCcvc2Vzc2lvbicpLnRoZW4ob25TdWNjZXNzZnVsTG9naW4pLmNhdGNoKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgIH07XG5cbiAgICAgICAgdGhpcy5sb2dpbiA9IGZ1bmN0aW9uIChjcmVkZW50aWFscykge1xuICAgICAgICAgICAgcmV0dXJuICRodHRwLnBvc3QoJy9sb2dpbicsIGNyZWRlbnRpYWxzKS50aGVuKG9uU3VjY2Vzc2Z1bExvZ2luKTtcbiAgICAgICAgfTtcblxuICAgICAgICB0aGlzLmxvZ291dCA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHJldHVybiAkaHR0cC5nZXQoJy9sb2dvdXQnKS50aGVuKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICBTZXNzaW9uLmRlc3Ryb3koKTtcbiAgICAgICAgICAgICAgICAkcm9vdFNjb3BlLiRicm9hZGNhc3QoQVVUSF9FVkVOVFMubG9nb3V0U3VjY2Vzcyk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfTtcblxuICAgICAgICB0aGlzLmlzQXV0aGVudGljYXRlZCA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHJldHVybiAhIVNlc3Npb24udXNlcjtcbiAgICAgICAgfTtcblxuICAgIH0pO1xuXG4gICAgYXBwLnNlcnZpY2UoJ1Nlc3Npb24nLCBmdW5jdGlvbiAoJHJvb3RTY29wZSwgQVVUSF9FVkVOVFMpIHtcblxuICAgICAgICAkcm9vdFNjb3BlLiRvbihBVVRIX0VWRU5UUy5ub3RBdXRoZW50aWNhdGVkLCB0aGlzLmRlc3Ryb3kpO1xuICAgICAgICAkcm9vdFNjb3BlLiRvbihBVVRIX0VWRU5UUy5zZXNzaW9uVGltZW91dCwgdGhpcy5kZXN0cm95KTtcblxuICAgICAgICB0aGlzLmNyZWF0ZSA9IGZ1bmN0aW9uIChzZXNzaW9uSWQsIHVzZXIpIHtcbiAgICAgICAgICAgIHRoaXMuaWQgPSBzZXNzaW9uSWQ7XG4gICAgICAgICAgICB0aGlzLnVzZXIgPSB1c2VyO1xuICAgICAgICB9O1xuXG4gICAgICAgIHRoaXMuZGVzdHJveSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHRoaXMuaWQgPSBudWxsO1xuICAgICAgICAgICAgdGhpcy51c2VyID0gbnVsbDtcbiAgICAgICAgfTtcblxuICAgIH0pO1xuXG59KSgpOyIsIid1c2Ugc3RyaWN0JztcbmFwcC5jb25maWcoZnVuY3Rpb24gKCRzdGF0ZVByb3ZpZGVyKSB7XG5cbiAgICAkc3RhdGVQcm92aWRlci5zdGF0ZSgnaG9tZScsIHtcbiAgICAgICAgdXJsOiAnLycsXG4gICAgICAgIGNvbnRyb2xsZXI6ICdIb21lQ3RybCcsXG4gICAgICAgIHRlbXBsYXRlVXJsOiAnanMvaG9tZS9ob21lLmh0bWwnXG4gICAgfSk7XG5cbn0pO1xuXG5hcHAuY29udHJvbGxlcignSG9tZUN0cmwnLCBmdW5jdGlvbiAoJHNjb3BlKSB7XG5cblxuXHRcbn0pOyIsIid1c2Ugc3RyaWN0JztcbmFwcC5jb25maWcoZnVuY3Rpb24oJHN0YXRlUHJvdmlkZXIpIHtcblxuICAgICRzdGF0ZVByb3ZpZGVyLnN0YXRlKCdwcm9kRGV0YWlsJywge1xuICAgICAgICB1cmw6ICcvcHJvZHVjdC86cHJvZHUnLFxuICAgICAgICBjb250cm9sbGVyOiAncHJvZERldGFpbEN0cmwnLFxuICAgICAgICB0ZW1wbGF0ZVVybDogJ2pzL3Byb2RkZXRhaWwvcHJvZGRldGFpbC5odG1sJ1xuICAgIH0pO1xuXG59KTtcblxuYXBwLmNvbnRyb2xsZXIoJ3Byb2REZXRhaWxDdHJsJywgZnVuY3Rpb24oJHNjb3BlLCRzdGF0ZVBhcmFtcykge1xuICAgIC8vVEVNUE9SQVJZISBGT1IgVEVTVElOR1xuICAgIGNvbnNvbGUubG9nKCRzdGF0ZVBhcmFtcyk7XG4gICAgJHNjb3BlLnByb2QgPSB7XG4gICAgICAgIHRpdGxlOiAnU2FtcGxlIFByb2R1Y3QnLFxuICAgICAgICBkZXNjcmlwdGlvbjogJ1RoaXMgcHJvZHVjdCBpcyBzbyBhd2Vzb21lISBJdFxcJ3MgdGFzdHkuJyxcbiAgICAgICAgcHJpY2U6IDM5OTksXG4gICAgICAgIGlzQ29mZmVlOiBmYWxzZSxcbiAgICAgICAgY2F0ZWdvcnk6IFsndGFzdHknLCAnYmVhbnMnLCAnbW1tJywgJ3Nyc2x5IGkgZ290IG5vdGhpbiddLFxuICAgICAgICBwaG90bzonbm9uZSdcbiAgICB9O1xuXG4gICAgJHNjb3BlLnByb2QucGhvdG8gPSAnaW1hZ2VzLycgKyAkc2NvcGUucHJvZC5waG90bztcbiAgICBpZiAoJHNjb3BlLnByb2QuaXNDb2ZmZWUgJiYgJHNjb3BlLnByb2QucGhvdG8gPT09ICdpbWFnZXMvbm9uZScpIHtcbiAgICAgICAgJHNjb3BlLnByb2QucGhvdG8gPSAnaW1hZ2VzL3BsYWNlaG9sZGVyQ29mLmpwZyc7XG4gICAgfSBlbHNlIGlmICghJHNjb3BlLnByb2QuaXNDb2ZmZWUgJiYgJHNjb3BlLnByb2QucGhvdG8gPT09ICdpbWFnZXMvbm9uZScpIHtcbiAgICAgICAgJHNjb3BlLnByb2QucGhvdG8gPSAnaW1hZ2VzL3BsYWNlaG9sZGVyTWludC5wbmcnO1xuICAgIH1cbiAgICAkc2NvcGUucHJvZC5wcmljZU91dCA9ICckJysoJHNjb3BlLnByb2QucHJpY2UvMTAwKTtcblxufSk7XG4iLCIndXNlIHN0cmljdCc7XG5cbmFwcC5mYWN0b3J5KCdQcm9kdWN0RmFjdG9yeScsIGZ1bmN0aW9uKCRodHRwKSB7XG4gIHJldHVybiB7XG4gICAgZ2V0Q29mZmVlRGI6IGZ1bmN0aW9uKCkge1xuICAgICAgcmV0dXJuICRodHRwLmdldCgnL2FwaS9jb2ZmZWUnKS50aGVuKGZ1bmN0aW9uKHJlc3BvbnNlKSB7XG4gICAgICAgIHJldHVybiByZXNwb25zZS5kYXRhO1xuICAgICAgfSk7XG4gICAgfSxcbiAgICBnZXRNaW50c0RiOiBmdW5jdGlvbigpIHtcbiAgICAgIHJldHVybiAkaHR0cC5nZXQoJy9hcGkvbWludHMnKS50aGVuKGZ1bmN0aW9uKHJlc3BvbnNlKSB7XG4gICAgICAgIHJldHVybiByZXNwb25zZS5kYXRhO1xuICAgICAgfSk7XG4gICAgfVxuICB9O1xufSk7XG4iLCIndXNlIHN0cmljdCc7XG5hcHAuY29uZmlnKGZ1bmN0aW9uKCRzdGF0ZVByb3ZpZGVyKSB7XG5cbiAgJHN0YXRlUHJvdmlkZXIuc3RhdGUoJ2NvZmZlZScsIHtcbiAgICB1cmw6ICcvcHJvZHVjdC9jb2ZmZWUnLFxuICAgIGNvbnRyb2xsZXI6ICdQcm9kdWN0Q3RybCcsXG4gICAgdGVtcGxhdGVVcmw6ICdqcy9wcm9kdWN0bGlzdGluZy9jb2ZmZWUuaHRtbCdcbiAgfSk7XG5cbiAgJHN0YXRlUHJvdmlkZXIuc3RhdGUoJ21pbnQnLCB7XG4gICAgdXJsOiAnL3Byb2R1Y3QvbWludCcsXG4gICAgY29udHJvbGxlcjogJ1Byb2R1Y3RDdHJsJyxcbiAgICB0ZW1wbGF0ZVVybDogJ2pzL3Byb2R1Y3RsaXN0aW5nL21pbnQuaHRtbCdcbiAgfSk7XG59KTtcblxuYXBwLmNvbnRyb2xsZXIoJ1Byb2R1Y3RDdHJsJywgZnVuY3Rpb24oJHNjb3BlLCBQcm9kdWN0RmFjdG9yeSkge1xuXG4gICRzY29wZS5zaG93Q29mZmVlID0gZnVuY3Rpb24oKSB7XG4gICAgUHJvZHVjdEZhY3RvcnkuZ2V0Q29mZmVlRGIoKS50aGVuKGZ1bmN0aW9uKGRhdGEpIHtcbiAgICAgICRzY29wZS5jb2ZmZWUgPSBkYXRhO1xuICAgIH0pO1xuICB9O1xuXG4gICRzY29wZS5zaG93TWludHMgPSBmdW5jdGlvbigpIHtcbiAgICBQcm9kdWN0RmFjdG9yeS5nZXRNaW50c0RiKCkudGhlbihmdW5jdGlvbihkYXRhKSB7XG4gICAgICAkc2NvcGUubWludHMgPSBkYXRhO1xuICAgIH0pO1xuICB9O1xufSk7XG4iLCIndXNlIHN0cmljdCc7XG5hcHAuY29uZmlnKGZ1bmN0aW9uICgkc3RhdGVQcm92aWRlcikge1xuXG4gICAgLy8gUmVnaXN0ZXIgb3VyICphYm91dCogc3RhdGUuXG4gICAgJHN0YXRlUHJvdmlkZXIuc3RhdGUoJ3NpZ251cCcsIHtcbiAgICAgICAgdXJsOiAnL3NpZ251cCcsXG4gICAgICAgIGNvbnRyb2xsZXI6ICdzaWduVXBDb250cm9sbGVyJyxcbiAgICAgICAgdGVtcGxhdGVVcmw6ICdqcy9zaWdudXAvc2lnbnVwLmh0bWwnXG4gICAgfSk7XG5cbn0pO1xuXG5hcHAuY29udHJvbGxlcignc2lnblVwQ29udHJvbGxlcicsIGZ1bmN0aW9uICgkc2NvcGUsICR3aW5kb3csICRsb2NhdGlvbiwgc2lnbnVwRmFjdG9yeSkge1xuXHQkc2NvcGUudXNlciA9IHtcbiAgICAgICAgZW1haWw6IFwiXCIsXG4gICAgICAgIHBhc3N3b3JkOiBcIlwiXG5cdH07XG5cbiAgICAkc2NvcGUuZ2V0Q3JlYXRlZFVzZXIgPSBmdW5jdGlvbigpe1xuICAgICAgICBzaWdudXBGYWN0b3J5LmdldFVzZXIoKS50aGVuKGZ1bmN0aW9uKGRhdGEpe1xuICAgICAgICAgICAgJHNjb3BlLnVzZXIgPSBkYXRhO1xuICAgICAgICB9KTtcbiAgICB9O1xuXG4gICAgJHNjb3BlLm5ld1VzZXJTaWduVXAgPSBmdW5jdGlvbihuZXdVc2VyKXtcbiAgICAgICAgc2lnbnVwRmFjdG9yeS5hZGROZXdVc2VyKG5ld1VzZXIpLnRoZW4oZnVuY3Rpb24oKXtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFwic3VjY2Vzc1wiKTtcbiAgICAgICAgICAgIHJlcy5yZWRpcmVjdCgnLycpO1xuICAgICAgICB9KTtcbiAgICB9O1xuXG4gICAgJHNjb3BlLmxvZ2luID0gZnVuY3Rpb24gKCl7XG4gICAgICAgICR3aW5kb3cubG9jYXRpb24uaHJlZiA9ICcvYXV0aC9nb29nbGUnO1xuICAgIH07XG4gICAgJHNjb3BlLmxvZ2luZmIgPSBmdW5jdGlvbiAoKXtcbiAgICAgICAgJHdpbmRvdy5sb2NhdGlvbi5ocmVmID0gJy9hdXRoL2ZhY2Vib29rJztcbiAgICB9O1xufSk7XG5cbiIsIid1c2Ugc3RyaWN0JztcbmFwcC5mYWN0b3J5KCdSYW5kb21HcmVldGluZ3MnLCBmdW5jdGlvbiAoKSB7XG5cbiAgICB2YXIgZ2V0UmFuZG9tRnJvbUFycmF5ID0gZnVuY3Rpb24gKGFycikge1xuICAgICAgICByZXR1cm4gYXJyW01hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIGFyci5sZW5ndGgpXTtcbiAgICB9O1xuXG4gICAgdmFyIGdyZWV0aW5ncyA9IFtcbiAgICAgICAgJ0kga25vdyB0aGF0IHlvdSBqdXN0IGRyYW5rIHNvbWUgY29mZmVlLi4uIGhhdmUgYSBtaW50Li4uJyxcbiAgICAgICAgJ1VtbW0uLi4uLi4gWW91IG5lZWQgYSBtaW50Li4uJyxcbiAgICAgICAgJ0hlbGxvLCBzbWVsbHkgaHVtYW4uJyxcbiAgICAgICAgJ1NvLi4uIGhvdyBkbyB5b3UgZmVlbCBhYm91dCBoYXZpbmcgYSBtaW50IHJpZ2h0IG5vdz8nLFxuICAgICAgICAnRHVkZS4gWW91IGNhbm5vdCBlYXQgZWdnIHNhbGFkIHdpdGggY29mZmVlIHVubGVzcyB5b3UgdGFrZSBhIG1pbnQuJyxcbiAgICAgICAgJ1NlcmlvdXNseS4gQ29mZmVlIHdpdGggc2FsbW9uIHNhbGFkPyBUYWtlIGEgbWludC4nLCBcbiAgICAgICAgJ1doYXRcXCdzIHlvdXIgcHJvYmxlbSB3aXRoIG1pbnRzPyBZb3UgbmVlZCBvbmUuJ1xuICAgIF07XG5cbiAgICByZXR1cm4ge1xuICAgICAgICBncmVldGluZ3M6IGdyZWV0aW5ncyxcbiAgICAgICAgZ2V0UmFuZG9tR3JlZXRpbmc6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHJldHVybiBnZXRSYW5kb21Gcm9tQXJyYXkoZ3JlZXRpbmdzKTtcbiAgICAgICAgfVxuICAgIH07XG5cbn0pOyIsIid1c2Ugc3RyaWN0JztcbiIsIid1c2Ugc3RyaWN0JztcbmFwcC5mYWN0b3J5KCdBZGRUb0NhcnQnLCBmdW5jdGlvbigpIHtcblxuICB2YXIgY2FydGNvbnRlbnQgPSB7XG4gICAgdXNlcjogcmVxLmJvZHkuY29va2llcy5jYXJ0LFxuICAgIHByb2R1Y3RzOiBbXVxuXG4gIH07XG5cbiAgcmV0dXJuIHtcblxuICAgIHNlbGVjdGluZzogZnVuY3Rpb24ocHJvZHVjdGluZm8pIHtcbiAgICAgIHZhciB0aGlzY2xpY2sgPSB7fTtcbiAgICAgIHRoaXNjbGljay5wcm9kSWQgPSBwcm9kdWN0aW5mby5faWQ7XG4gICAgICB0aGlzY2xpY2suUHJpY2UgPSBwcm9kdWN0aW5mby5wcmljZTtcbiAgICAgIHRoaXNjbGljay5RdWFudGl0eSA9IHByb2R1Y3RpbmZvLmhvd01hbnk7XG5cbiAgICAgIGNhcnRjb250ZW50LnByb2R1Y3RzLnB1c2godGhpc2NsaWNrKTtcbiAgICB9LFxuXG5cblxuICAgIGFkZGVkVG9DYXJ0OiBmdW5jdGlvbigpIHtcbiAgICAgIHJldHVybiBzZWxlY3RpbmcoY2xpY2tpbmZvKTtcbiAgICB9XG5cblxuICB9O1xuXG59KTtcbiIsIlwidXNlIHN0cmljdFwiO1xuYXBwLmZhY3RvcnkoJ3NpZ251cEZhY3RvcnknLCBmdW5jdGlvbigkaHR0cCl7XG5cdHJldHVybiB7XG5cdFx0Z2V0VXNlcjogZnVuY3Rpb24oKXtcblx0XHRcdHJldHVybiAkaHR0cC5nZXQoJy9hcGkvbmV3VXNlcicpLnRoZW4oZnVuY3Rpb24ocmVzcG9uc2Upe1xuXHRcdFx0XHRyZXR1cm4gcmVzcG9uc2UuZGF0YTtcblx0XHRcdH0pO1xuXHRcdH0sXG5cdFx0YWRkTmV3VXNlciA6IGZ1bmN0aW9uICh1c2VyKSB7XG5cdFx0XHRyZXR1cm4gJGh0dHAucG9zdCgnL2FwaS9zaWdudXAvbmV3VXNlcicsIHVzZXIpO1xuXHRcdH1cblx0fTtcbn0pO1xuXG5cbiIsIid1c2Ugc3RyaWN0JztcbmFwcC5kaXJlY3RpdmUoJ25hdmJhcicsIGZ1bmN0aW9uKCkge1xuICByZXR1cm4ge1xuICAgIHJlc3RyaWN0OiAnRScsXG4gICAgc2NvcGU6IHtcbiAgICAgIGl0ZW1zOiAnPSdcbiAgICB9LFxuICAgIHRlbXBsYXRlVXJsOiAnanMvY29tbW9uL2RpcmVjdGl2ZXMvbmF2YmFyL25hdmJhci5odG1sJ1xuICB9O1xufSk7XG4iLCIndXNlIHN0cmljdCc7XG5hcHAuZGlyZWN0aXZlKCdyYW5kb0dyZWV0aW5nJywgZnVuY3Rpb24gKFJhbmRvbUdyZWV0aW5ncykge1xuXG4gICAgcmV0dXJuIHtcbiAgICAgICAgcmVzdHJpY3Q6ICdFJyxcbiAgICAgICAgdGVtcGxhdGVVcmw6ICdqcy9jb21tb24vZGlyZWN0aXZlcy9yYW5kby1ncmVldGluZy9yYW5kby1ncmVldGluZy5odG1sJyxcbiAgICAgICAgbGluazogZnVuY3Rpb24gKHNjb3BlKSB7XG4gICAgICAgICAgICBzY29wZS5ncmVldGluZyA9IFJhbmRvbUdyZWV0aW5ncy5nZXRSYW5kb21HcmVldGluZygpO1xuICAgICAgICB9XG4gICAgfTtcblxufSk7IiwiJ3VzZSBzdHJpY3QnO1xuYXBwLmRpcmVjdGl2ZSgnc3RhY2snLCBmdW5jdGlvbigpIHtcbiAgcmV0dXJuIHtcbiAgICByZXN0cmljdDogJ0UnLFxuICAgIHRlbXBsYXRlOiAnPGgxPmhlbGxvPC9oMT4nXG4gIH07XG59KTtcbiJdLCJzb3VyY2VSb290IjoiL3NvdXJjZS8ifQ==
>>>>>>> master
