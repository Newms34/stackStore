'use strict';
var app = angular.module('FullstackGeneratedApp', ['ui.router', 'fsaPreBuilt', 'ngCookies']);

app.controller('MainController', function ($scope, $cookies, $cookieStore) {

    $cookieStore.remove("products");
    

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

app.controller('cartCtrl', function($scope, removeitem, clearcart) {

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

    $scope.deleteitem = function(data){
        removeitem.removefromcart(data)
    } 

    $scope.clearthecart = function(info){
        clearcart.clearoutcart(info);
    }

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

    $stateProvider.state('pay', {
        url: '/pay',
        controller: 'payCtrl',
        templateUrl: 'js/pay/pay.html'
    });

});

app.controller('payCtrl', function($scope) {

    //TEMPORARY! FOR TESTING
    //this renders the list of ordered items
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

    $scope.total = 0;//it's a total. hooray money

    $scope.seshOrders.forEach(function(el) {
        $scope.total += el.price * el.howMany;
    });

    $scope.totalFormatted = '$' + $scope.total / 100;

});
'use strict';
app.config(function($stateProvider) {

    $stateProvider.state('prodDetail', {
        url: '/product/anything/:produ',
        controller: 'prodDetailCtrl',
        templateUrl: 'js/proddetail/proddetail.html'
    });

});

app.controller('prodDetailCtrl', function($scope, $stateParams, addtocart) {
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

    $scope.addtocart = function(data){
        addtocart.addtocart(data);
    }


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
app.factory('clearcart', function($cookies, $cookieStore){
	return {
		clearoutcart: function(fullcart){
			console.log($cookies.products);

			var workingarray = $cookieStore.get('products');
			workingarray = [];
			var products = workingarray;
			$cookieStore.put('products');
			console.log($cookies.products, 'this is cookies.products from empty cart');
		}
	}
})
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
app.factory('removeitem', function($cookies, $cookieStore){
	return {
		removefromcart: function(itemtogo){
			console.log(itemtogo);
			var workarray = $cookieStore.get('products');
			console.log(workarray, 'this is workarray');

			for (var i=0; i<workarray.length; i++){
				if (workarray[i] === itemtogo){
					var removed = workarray.splice(i, 1);
					var products = workarray;
					$cookieStore.put('products');
				} else 
				alert('You do not have this item in your cart');

			} 
			
			console.log($cookies.products, 'this is cookies.products from remove one item');
		}
	}
})


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
app.directive('stack', function() {
  return {
    restrict: 'E',
    templateUrl: 'js/common/directives/stackStoreLogo/stackStoreLogo.html'
  };
});

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC5qcyIsImFib3V0L2Fib3V0LmpzIiwiY2FydC9jYXJ0LmpzIiwiZnNhL2ZzYS1wcmUtYnVpbHQuanMiLCJob21lL2hvbWUuanMiLCJwYXkvcGF5LmpzIiwicHJvZGRldGFpbC9wcm9kZGV0YWlsLmpzIiwicHJvZHVjdGxpc3RpbmcvcHJvZHVjdGZhY3RvcnkuanMiLCJwcm9kdWN0bGlzdGluZy9wcm9kdWN0bGlzdGluZy5qcyIsInNpZ251cC9zaWdudXAuanMiLCJjb21tb24vZmFjdG9yaWVzL0NsZWFyY2FydC5qcyIsImNvbW1vbi9mYWN0b3JpZXMvUmFuZG9tR3JlZXRpbmdzLmpzIiwiY29tbW9uL2ZhY3Rvcmllcy9SZW1vdmVpdGVtcy5qcyIsImNvbW1vbi9mYWN0b3JpZXMvU29ja2V0LmpzIiwiY29tbW9uL2ZhY3Rvcmllcy9hZGR0b2NhcnQuanMiLCJjb21tb24vZmFjdG9yaWVzL2NhcnRmYWN0b3J5LmpzIiwiY29tbW9uL2ZhY3Rvcmllcy9zaWdudXBGYWN0b3J5LmpzIiwiY29tbW9uL2RpcmVjdGl2ZXMvbmF2YmFyL25hdmJhci5qcyIsImNvbW1vbi9kaXJlY3RpdmVzL3JhbmRvLWdyZWV0aW5nL3JhbmRvLWdyZWV0aW5nLmpzIiwiY29tbW9uL2RpcmVjdGl2ZXMvc3RhY2tTdG9yZUxvZ28vc3RhY2tTdG9yZUxvZ28uanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUMxQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ3pCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUMzREE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDakhBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDZkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUM3Q0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQzNDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUNqQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDN0JBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDdkNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUNiQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ3hCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUN2QkE7QUFDQTtBQ0RBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUNiQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQzlCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ2ZBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUNWQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUNYQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBIiwiZmlsZSI6Im1haW4uanMiLCJzb3VyY2VzQ29udGVudCI6WyIndXNlIHN0cmljdCc7XG52YXIgYXBwID0gYW5ndWxhci5tb2R1bGUoJ0Z1bGxzdGFja0dlbmVyYXRlZEFwcCcsIFsndWkucm91dGVyJywgJ2ZzYVByZUJ1aWx0JywgJ25nQ29va2llcyddKTtcblxuYXBwLmNvbnRyb2xsZXIoJ01haW5Db250cm9sbGVyJywgZnVuY3Rpb24gKCRzY29wZSwgJGNvb2tpZXMsICRjb29raWVTdG9yZSkge1xuXG4gICAgJGNvb2tpZVN0b3JlLnJlbW92ZShcInByb2R1Y3RzXCIpO1xuICAgIFxuXG4gICAgJGNvb2tpZVN0b3JlLnB1dCgncHJvZHVjdHMnLCBbXSk7XG4gICAgY29uc29sZS5sb2coJGNvb2tpZXMsICd0aGlzIGlzIGNvb2tpZScpO1xuXG4gIC8vIEdpdmVuIHRvIHRoZSA8bmF2YmFyPiBkaXJlY3RpdmUgdG8gc2hvdyB0aGUgbWVudS5cbiAgJHNjb3BlLm1lbnVJdGVtcyA9IFt7XG4gICAgbGFiZWw6ICdIb21lJyxcbiAgICBzdGF0ZTogJ2hvbWUnXG4gIH0sIHtcbiAgICBsYWJlbDogJ0NvZmZlZScsXG4gICAgc3RhdGU6ICdjb2ZmZWUnXG4gIH0sIHtcbiAgICBsYWJlbDogJ01pbnQnLFxuICAgIHN0YXRlOiAnbWludCdcbiAgfSwge1xuICAgIGxhYmVsOiAnQWJvdXQnLFxuICAgIHN0YXRlOiAnYWJvdXQnXG4gIH0sIHtcbiAgICBsYWJlbDogJ1NpZ25VcCcsXG4gICAgc3RhdGU6ICdzaWdudXAnXG4gIH0sIHsgICAgbGFiZWw6ICdTaWduIEluJyxcbiAgICBzdGF0ZTogJ3NpZ25JbidcbiAgfSwge1xuICAgIGxhYmVsOiAnQ2FydCcsXG4gICAgc3RhdGU6ICdjYXJ0J1xuICB9XTtcbn0pO1xuXG5cbmFwcC5jb25maWcoZnVuY3Rpb24oJHVybFJvdXRlclByb3ZpZGVyLCAkbG9jYXRpb25Qcm92aWRlcikge1xuICAvLyBUaGlzIHR1cm5zIG9mZiBoYXNoYmFuZyB1cmxzICgvI2Fib3V0KSBhbmQgY2hhbmdlcyBpdCB0byBzb21ldGhpbmcgbm9ybWFsICgvYWJvdXQpXG4gICRsb2NhdGlvblByb3ZpZGVyLmh0bWw1TW9kZSh0cnVlKTtcbiAgLy8gSWYgd2UgZ28gdG8gYSBVUkwgdGhhdCB1aS1yb3V0ZXIgZG9lc24ndCBoYXZlIHJlZ2lzdGVyZWQsIGdvIHRvIHRoZSBcIi9cIiB1cmwuXG4gICR1cmxSb3V0ZXJQcm92aWRlci5vdGhlcndpc2UoJy8nKTtcbn0pO1xuIiwiJ3VzZSBzdHJpY3QnO1xuYXBwLmNvbmZpZyhmdW5jdGlvbigkc3RhdGVQcm92aWRlcikge1xuXG4gIC8vIFJlZ2lzdGVyIG91ciAqYWJvdXQqIHN0YXRlLlxuICAkc3RhdGVQcm92aWRlci5zdGF0ZSgnYWJvdXQnLCB7XG4gICAgdXJsOiAnL2Fib3V0JyxcbiAgICBjb250cm9sbGVyOiAnQWJvdXRDb250cm9sbGVyJyxcbiAgICB0ZW1wbGF0ZVVybDogJ2pzL2Fib3V0L2Fib3V0Lmh0bWwnXG4gIH0pO1xuXG59KTtcblxuYXBwLmNvbnRyb2xsZXIoJ0Fib3V0Q29udHJvbGxlcicsIGZ1bmN0aW9uKCRzY29wZSkge1xuXG4gIC8vIEltYWdlcyBvZiBiZWF1dGlmdWwgRnVsbHN0YWNrIHBlb3BsZS5cbiAgJHNjb3BlLmltYWdlcyA9IFtcbiAgICAnaHR0cHM6Ly9wYnMudHdpbWcuY29tL21lZGlhL0I3Z0JYdWxDQUFBWFFjRS5qcGc6bGFyZ2UnLFxuICAgICdodHRwczovL2ZiY2RuLXNwaG90b3MtYy1hLmFrYW1haWhkLm5ldC9ocGhvdG9zLWFrLXhhcDEvdDMxLjAtOC8xMDg2MjQ1MV8xMDIwNTYyMjk5MDM1OTI0MV84MDI3MTY4ODQzMzEyODQxMTM3X28uanBnJyxcbiAgICAnaHR0cHM6Ly9wYnMudHdpbWcuY29tL21lZGlhL0ItTEtVc2hJZ0FFeTlTSy5qcGcnLFxuICAgICdodHRwczovL3Bicy50d2ltZy5jb20vbWVkaWEvQjc5LVg3b0NNQUFrdzd5LmpwZycsXG4gICAgJ2h0dHBzOi8vcGJzLnR3aW1nLmNvbS9tZWRpYS9CLVVqOUNPSUlBSUZBaDAuanBnOmxhcmdlJyxcbiAgICAnaHR0cHM6Ly9wYnMudHdpbWcuY29tL21lZGlhL0I2eUl5RmlDRUFBcWwxMi5qcGc6bGFyZ2UnXG4gIF07XG5cbn0pO1xuIiwiJ3VzZSBzdHJpY3QnO1xuYXBwLmNvbmZpZyhmdW5jdGlvbigkc3RhdGVQcm92aWRlcikge1xuXG4gICAgJHN0YXRlUHJvdmlkZXIuc3RhdGUoJ2NhcnQnLCB7XG4gICAgICAgIHVybDogJy9jYXJ0JyxcbiAgICAgICAgY29udHJvbGxlcjogJ2NhcnRDdHJsJyxcbiAgICAgICAgdGVtcGxhdGVVcmw6ICdqcy9jYXJ0L2NhcnQuaHRtbCdcbiAgICB9KTtcblxufSk7XG5cbmFwcC5jb250cm9sbGVyKCdjYXJ0Q3RybCcsIGZ1bmN0aW9uKCRzY29wZSwgcmVtb3ZlaXRlbSwgY2xlYXJjYXJ0KSB7XG5cbiAgICAvL1RFTVBPUkFSWSEgRk9SIFRFU1RJTkdcbiAgICAvL3RoaXMgcmVuZGVycyB0aGUgY2FydFxuICAgICRzY29wZS5zZXNoT3JkZXJzID0gW3tcbiAgICAgICAgdGl0bGU6ICdUZXN0IEl0ZW0gMDEnLFxuICAgICAgICBkZXNjcmlwdGlvbjogJ0FsbW9zdCBhcyBnb29kIGFzIFRlc3QgSXRlbSAwMiEnLFxuICAgICAgICBwcmljZTogMzk5OSxcbiAgICAgICAgaG93TWFueTogNVxuICAgIH0sIHtcbiAgICAgICAgdGl0bGU6ICdUZXN0IEl0ZW0gMDInLFxuICAgICAgICBkZXNjcmlwdGlvbjogJ05ldyBhbmQgSW1wcm92ZWQhIScsXG4gICAgICAgIHByaWNlOiA0Mjk5LFxuICAgICAgICBob3dNYW55OiAzXG4gICAgfSwge1xuICAgICAgICB0aXRsZTogJ1Rlc3QgSXRlbSAwMycsXG4gICAgICAgIGRlc2NyaXB0aW9uOiAnQmFyZ2FpbiBUZXN0IEl0ZW0hJyxcbiAgICAgICAgcHJpY2U6IDE5OTksXG4gICAgICAgIGhvd01hbnk6IDZcbiAgICB9LCB7XG4gICAgICAgIHRpdGxlOiAnVGVzdCBJdGVtIDA0JyxcbiAgICAgICAgZGVzY3JpcHRpb246ICdGYW1pbHkgU2l6ZWQgVGVzdCBpdGVtIScsXG4gICAgICAgIHByaWNlOiA3OTk5LFxuICAgICAgICBob3dNYW55OiAxXG4gICAgfV07XG5cbiAgICAkc2NvcGUuc2VzaE9yZGVycy5tYXAoZnVuY3Rpb24oZWwpIHtcbiAgICAgICAgZWwucHJpY2VPdXQgPSAnJCcgKyBlbC5wcmljZSAvIDEwMDtcbiAgICAgICAgZWwuc1RvdCA9ICckJyArICgoZWwucHJpY2UgKiBlbC5ob3dNYW55KSAvIDEwMCk7XG4gICAgfSk7XG5cbiAgICAkc2NvcGUudG90YWwgPSAwO1xuXG4gICAgJHNjb3BlLnNlc2hPcmRlcnMuZm9yRWFjaChmdW5jdGlvbihlbCkge1xuICAgICAgICAkc2NvcGUudG90YWwgKz0gZWwucHJpY2UgKiBlbC5ob3dNYW55O1xuICAgIH0pO1xuXG4gICAgJHNjb3BlLnRvdGFsID0gJyQnICsgJHNjb3BlLnRvdGFsLzEwMDtcblxuICAgICRzY29wZS5kZWxldGVpdGVtID0gZnVuY3Rpb24oZGF0YSl7XG4gICAgICAgIHJlbW92ZWl0ZW0ucmVtb3ZlZnJvbWNhcnQoZGF0YSlcbiAgICB9IFxuXG4gICAgJHNjb3BlLmNsZWFydGhlY2FydCA9IGZ1bmN0aW9uKGluZm8pe1xuICAgICAgICBjbGVhcmNhcnQuY2xlYXJvdXRjYXJ0KGluZm8pO1xuICAgIH1cblxufSk7XG4iLCIoZnVuY3Rpb24gKCkge1xuXG4gICAgJ3VzZSBzdHJpY3QnO1xuXG4gICAgLy8gSG9wZSB5b3UgZGlkbid0IGZvcmdldCBBbmd1bGFyISBEdWgtZG95LlxuICAgIGlmICghd2luZG93LmFuZ3VsYXIpIHRocm93IG5ldyBFcnJvcignSSBjYW5cXCd0IGZpbmQgQW5ndWxhciEnKTtcblxuICAgIHZhciBhcHAgPSBhbmd1bGFyLm1vZHVsZSgnZnNhUHJlQnVpbHQnLCBbXSk7XG5cbiAgICBhcHAuZmFjdG9yeSgnU29ja2V0JywgZnVuY3Rpb24gKCRsb2NhdGlvbikge1xuXG4gICAgICAgIGlmICghd2luZG93LmlvKSB0aHJvdyBuZXcgRXJyb3IoJ3NvY2tldC5pbyBub3QgZm91bmQhJyk7XG5cbiAgICAgICAgdmFyIHNvY2tldDtcblxuICAgICAgICBpZiAoJGxvY2F0aW9uLiQkcG9ydCkge1xuICAgICAgICAgICAgc29ja2V0ID0gaW8oJ2h0dHA6Ly9sb2NhbGhvc3Q6MTMzNycpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgc29ja2V0ID0gaW8oJy8nKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBzb2NrZXQ7XG5cbiAgICB9KTtcblxuICAgIGFwcC5jb25zdGFudCgnQVVUSF9FVkVOVFMnLCB7XG4gICAgICAgIGxvZ2luU3VjY2VzczogJ2F1dGgtbG9naW4tc3VjY2VzcycsXG4gICAgICAgIGxvZ2luRmFpbGVkOiAnYXV0aC1sb2dpbi1mYWlsZWQnLFxuICAgICAgICBsb2dvdXRTdWNjZXNzOiAnYXV0aC1sb2dvdXQtc3VjY2VzcycsXG4gICAgICAgIHNlc3Npb25UaW1lb3V0OiAnYXV0aC1zZXNzaW9uLXRpbWVvdXQnLFxuICAgICAgICBub3RBdXRoZW50aWNhdGVkOiAnYXV0aC1ub3QtYXV0aGVudGljYXRlZCcsXG4gICAgICAgIG5vdEF1dGhvcml6ZWQ6ICdhdXRoLW5vdC1hdXRob3JpemVkJ1xuICAgIH0pO1xuXG4gICAgYXBwLmNvbmZpZyhmdW5jdGlvbiAoJGh0dHBQcm92aWRlcikge1xuICAgICAgICAkaHR0cFByb3ZpZGVyLmludGVyY2VwdG9ycy5wdXNoKFtcbiAgICAgICAgICAgICckaW5qZWN0b3InLFxuICAgICAgICAgICAgZnVuY3Rpb24gKCRpbmplY3Rvcikge1xuICAgICAgICAgICAgICAgIHJldHVybiAkaW5qZWN0b3IuZ2V0KCdBdXRoSW50ZXJjZXB0b3InKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgXSk7XG4gICAgfSk7XG5cbiAgICBhcHAuZmFjdG9yeSgnQXV0aEludGVyY2VwdG9yJywgZnVuY3Rpb24gKCRyb290U2NvcGUsICRxLCBBVVRIX0VWRU5UUykge1xuICAgICAgICB2YXIgc3RhdHVzRGljdCA9IHtcbiAgICAgICAgICAgIDQwMTogQVVUSF9FVkVOVFMubm90QXV0aGVudGljYXRlZCxcbiAgICAgICAgICAgIDQwMzogQVVUSF9FVkVOVFMubm90QXV0aG9yaXplZCxcbiAgICAgICAgICAgIDQxOTogQVVUSF9FVkVOVFMuc2Vzc2lvblRpbWVvdXQsXG4gICAgICAgICAgICA0NDA6IEFVVEhfRVZFTlRTLnNlc3Npb25UaW1lb3V0XG4gICAgICAgIH07XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICByZXNwb25zZUVycm9yOiBmdW5jdGlvbiAocmVzcG9uc2UpIHtcbiAgICAgICAgICAgICAgICAkcm9vdFNjb3BlLiRicm9hZGNhc3Qoc3RhdHVzRGljdFtyZXNwb25zZS5zdGF0dXNdLCByZXNwb25zZSk7XG4gICAgICAgICAgICAgICAgcmV0dXJuICRxLnJlamVjdChyZXNwb25zZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH07XG4gICAgfSk7XG5cbiAgICBhcHAuc2VydmljZSgnQXV0aFNlcnZpY2UnLCBmdW5jdGlvbiAoJGh0dHAsIFNlc3Npb24sICRyb290U2NvcGUsIEFVVEhfRVZFTlRTLCAkcSkge1xuXG4gICAgICAgIHZhciBvblN1Y2Nlc3NmdWxMb2dpbiA9IGZ1bmN0aW9uIChyZXNwb25zZSkge1xuICAgICAgICAgICAgdmFyIGRhdGEgPSByZXNwb25zZS5kYXRhO1xuICAgICAgICAgICAgU2Vzc2lvbi5jcmVhdGUoZGF0YS5pZCwgZGF0YS51c2VyKTtcbiAgICAgICAgICAgICRyb290U2NvcGUuJGJyb2FkY2FzdChBVVRIX0VWRU5UUy5sb2dpblN1Y2Nlc3MpO1xuICAgICAgICAgICAgcmV0dXJuIGRhdGEudXNlcjtcbiAgICAgICAgfTtcblxuICAgICAgICB0aGlzLmdldExvZ2dlZEluVXNlciA9IGZ1bmN0aW9uICgpIHtcblxuICAgICAgICAgICAgaWYgKHRoaXMuaXNBdXRoZW50aWNhdGVkKCkpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gJHEud2hlbih7IHVzZXI6IFNlc3Npb24udXNlciB9KTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgcmV0dXJuICRodHRwLmdldCgnL3Nlc3Npb24nKS50aGVuKG9uU3VjY2Vzc2Z1bExvZ2luKS5jYXRjaChmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICAgICAgICB9KTtcblxuICAgICAgICB9O1xuXG4gICAgICAgIHRoaXMubG9naW4gPSBmdW5jdGlvbiAoY3JlZGVudGlhbHMpIHtcbiAgICAgICAgICAgIHJldHVybiAkaHR0cC5wb3N0KCcvbG9naW4nLCBjcmVkZW50aWFscykudGhlbihvblN1Y2Nlc3NmdWxMb2dpbik7XG4gICAgICAgIH07XG5cbiAgICAgICAgdGhpcy5sb2dvdXQgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICByZXR1cm4gJGh0dHAuZ2V0KCcvbG9nb3V0JykudGhlbihmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgU2Vzc2lvbi5kZXN0cm95KCk7XG4gICAgICAgICAgICAgICAgJHJvb3RTY29wZS4kYnJvYWRjYXN0KEFVVEhfRVZFTlRTLmxvZ291dFN1Y2Nlc3MpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH07XG5cbiAgICAgICAgdGhpcy5pc0F1dGhlbnRpY2F0ZWQgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICByZXR1cm4gISFTZXNzaW9uLnVzZXI7XG4gICAgICAgIH07XG5cbiAgICB9KTtcblxuICAgIGFwcC5zZXJ2aWNlKCdTZXNzaW9uJywgZnVuY3Rpb24gKCRyb290U2NvcGUsIEFVVEhfRVZFTlRTKSB7XG5cbiAgICAgICAgJHJvb3RTY29wZS4kb24oQVVUSF9FVkVOVFMubm90QXV0aGVudGljYXRlZCwgdGhpcy5kZXN0cm95KTtcbiAgICAgICAgJHJvb3RTY29wZS4kb24oQVVUSF9FVkVOVFMuc2Vzc2lvblRpbWVvdXQsIHRoaXMuZGVzdHJveSk7XG5cbiAgICAgICAgdGhpcy5jcmVhdGUgPSBmdW5jdGlvbiAoc2Vzc2lvbklkLCB1c2VyKSB7XG4gICAgICAgICAgICB0aGlzLmlkID0gc2Vzc2lvbklkO1xuICAgICAgICAgICAgdGhpcy51c2VyID0gdXNlcjtcbiAgICAgICAgfTtcblxuICAgICAgICB0aGlzLmRlc3Ryb3kgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICB0aGlzLmlkID0gbnVsbDtcbiAgICAgICAgICAgIHRoaXMudXNlciA9IG51bGw7XG4gICAgICAgIH07XG5cbiAgICB9KTtcblxufSkoKTsiLCIndXNlIHN0cmljdCc7XG5hcHAuY29uZmlnKGZ1bmN0aW9uICgkc3RhdGVQcm92aWRlcikge1xuXG4gICAgJHN0YXRlUHJvdmlkZXIuc3RhdGUoJ2hvbWUnLCB7XG4gICAgICAgIHVybDogJy8nLFxuICAgICAgICBjb250cm9sbGVyOiAnSG9tZUN0cmwnLFxuICAgICAgICB0ZW1wbGF0ZVVybDogJ2pzL2hvbWUvaG9tZS5odG1sJ1xuICAgIH0pO1xuXG59KTtcblxuYXBwLmNvbnRyb2xsZXIoJ0hvbWVDdHJsJywgZnVuY3Rpb24gKCRzY29wZSkge1xuXG5cblx0XG59KTsiLCIndXNlIHN0cmljdCc7XG5hcHAuY29uZmlnKGZ1bmN0aW9uKCRzdGF0ZVByb3ZpZGVyKSB7XG5cbiAgICAkc3RhdGVQcm92aWRlci5zdGF0ZSgncGF5Jywge1xuICAgICAgICB1cmw6ICcvcGF5JyxcbiAgICAgICAgY29udHJvbGxlcjogJ3BheUN0cmwnLFxuICAgICAgICB0ZW1wbGF0ZVVybDogJ2pzL3BheS9wYXkuaHRtbCdcbiAgICB9KTtcblxufSk7XG5cbmFwcC5jb250cm9sbGVyKCdwYXlDdHJsJywgZnVuY3Rpb24oJHNjb3BlKSB7XG5cbiAgICAvL1RFTVBPUkFSWSEgRk9SIFRFU1RJTkdcbiAgICAvL3RoaXMgcmVuZGVycyB0aGUgbGlzdCBvZiBvcmRlcmVkIGl0ZW1zXG4gICAgJHNjb3BlLnNlc2hPcmRlcnMgPSBbe1xuICAgICAgICB0aXRsZTogJ1Rlc3QgSXRlbSAwMScsXG4gICAgICAgIGRlc2NyaXB0aW9uOiAnQWxtb3N0IGFzIGdvb2QgYXMgVGVzdCBJdGVtIDAyIScsXG4gICAgICAgIHByaWNlOiAzOTk5LFxuICAgICAgICBob3dNYW55OiA1XG4gICAgfSwge1xuICAgICAgICB0aXRsZTogJ1Rlc3QgSXRlbSAwMicsXG4gICAgICAgIGRlc2NyaXB0aW9uOiAnTmV3IGFuZCBJbXByb3ZlZCEhJyxcbiAgICAgICAgcHJpY2U6IDQyOTksXG4gICAgICAgIGhvd01hbnk6IDNcbiAgICB9LCB7XG4gICAgICAgIHRpdGxlOiAnVGVzdCBJdGVtIDAzJyxcbiAgICAgICAgZGVzY3JpcHRpb246ICdCYXJnYWluIFRlc3QgSXRlbSEnLFxuICAgICAgICBwcmljZTogMTk5OSxcbiAgICAgICAgaG93TWFueTogNlxuICAgIH0sIHtcbiAgICAgICAgdGl0bGU6ICdUZXN0IEl0ZW0gMDQnLFxuICAgICAgICBkZXNjcmlwdGlvbjogJ0ZhbWlseSBTaXplZCBUZXN0IGl0ZW0hJyxcbiAgICAgICAgcHJpY2U6IDc5OTksXG4gICAgICAgIGhvd01hbnk6IDFcbiAgICB9XTtcblxuICAgICRzY29wZS50b3RhbCA9IDA7Ly9pdCdzIGEgdG90YWwuIGhvb3JheSBtb25leVxuXG4gICAgJHNjb3BlLnNlc2hPcmRlcnMuZm9yRWFjaChmdW5jdGlvbihlbCkge1xuICAgICAgICAkc2NvcGUudG90YWwgKz0gZWwucHJpY2UgKiBlbC5ob3dNYW55O1xuICAgIH0pO1xuXG4gICAgJHNjb3BlLnRvdGFsRm9ybWF0dGVkID0gJyQnICsgJHNjb3BlLnRvdGFsIC8gMTAwO1xuXG59KTsiLCIndXNlIHN0cmljdCc7XG5hcHAuY29uZmlnKGZ1bmN0aW9uKCRzdGF0ZVByb3ZpZGVyKSB7XG5cbiAgICAkc3RhdGVQcm92aWRlci5zdGF0ZSgncHJvZERldGFpbCcsIHtcbiAgICAgICAgdXJsOiAnL3Byb2R1Y3QvYW55dGhpbmcvOnByb2R1JyxcbiAgICAgICAgY29udHJvbGxlcjogJ3Byb2REZXRhaWxDdHJsJyxcbiAgICAgICAgdGVtcGxhdGVVcmw6ICdqcy9wcm9kZGV0YWlsL3Byb2RkZXRhaWwuaHRtbCdcbiAgICB9KTtcblxufSk7XG5cbmFwcC5jb250cm9sbGVyKCdwcm9kRGV0YWlsQ3RybCcsIGZ1bmN0aW9uKCRzY29wZSwgJHN0YXRlUGFyYW1zLCBhZGR0b2NhcnQpIHtcbiAgICAvL1RFTVBPUkFSWSEgRk9SIFRFU1RJTkdcbiAgICBjb25zb2xlLmxvZygkc3RhdGVQYXJhbXMucHJvZHUsICd0aGlzIGlzIHByb2R1Jyk7XG5cbiAgICAkc2NvcGUudGhpc3RpdGxlID0gJHN0YXRlUGFyYW1zLnByb2R1O1xuXG4gICAgJHNjb3BlLml0ZW0gPSAkc3RhdGVQYXJhbXMudGl0bGU7XG5cbiAgICAkc2NvcGUucHJvZCA9IHtcbiAgICAgICAgdGl0bGU6ICdTYW1wbGUgUHJvZHVjdCcsXG4gICAgICAgIGRlc2NyaXB0aW9uOiAnVGhpcyBwcm9kdWN0IGlzIHNvIGF3ZXNvbWUhIEl0XFwncyB0YXN0eS4nLFxuICAgICAgICBwcmljZTogMzk5OSxcbiAgICAgICAgaXNDb2ZmZWU6IGZhbHNlLFxuICAgICAgICBjYXRlZ29yeTogWyd0YXN0eScsICdiZWFucycsICdtbW0nLCAnc3JzbHkgaSBnb3Qgbm90aGluJ10sXG4gICAgICAgIHBob3RvOiAnbm9uZSdcbiAgICB9O1xuXG4gICAgJHNjb3BlLnByb2QucGhvdG8gPSAnaW1hZ2VzLycgKyAkc2NvcGUucHJvZC5waG90bztcbiAgICBpZiAoJHNjb3BlLnByb2QuaXNDb2ZmZWUgJiYgJHNjb3BlLnByb2QucGhvdG8gPT09ICdpbWFnZXMvbm9uZScpIHtcbiAgICAgICAgY29uc29sZS5sb2coJ2JlYW5zJylcbiAgICAgICAgJHNjb3BlLnByb2QucGhvdG8gPSAnaW1hZ2VzL3BsYWNlaG9sZGVyQ29mLmpwZyc7XG4gICAgfSBlbHNlIGlmICghJHNjb3BlLnByb2QuaXNDb2ZmZWUgJiYgJHNjb3BlLnByb2QucGhvdG8gPT09ICdpbWFnZXMvbm9uZScpIHtcbiAgICAgICAgJHNjb3BlLnByb2QucGhvdG8gPSAnaW1hZ2VzL3BsYWNlaG9sZGVyTWludC5wbmcnO1xuICAgIH1cbiAgICAkc2NvcGUucHJvZC5wcmljZU91dCA9ICckJyArICgkc2NvcGUucHJvZC5wcmljZSAvIDEwMCk7XG5cbiAgICAkc2NvcGUuYWRkdG9jYXJ0ID0gZnVuY3Rpb24oZGF0YSl7XG4gICAgICAgIGFkZHRvY2FydC5hZGR0b2NhcnQoZGF0YSk7XG4gICAgfVxuXG5cbn0pO1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG5hcHAuZmFjdG9yeSgnUHJvZHVjdEZhY3RvcnknLCBmdW5jdGlvbigkaHR0cCkge1xuICByZXR1cm4ge1xuICAgIGdldENvZmZlZURiOiBmdW5jdGlvbigpIHtcbiAgICAgIHJldHVybiAkaHR0cC5nZXQoJy9hcGkvY29mZmVlJykudGhlbihmdW5jdGlvbihyZXNwb25zZSkge1xuICAgICAgICByZXR1cm4gcmVzcG9uc2UuZGF0YTtcbiAgICAgIH0pO1xuICAgIH0sXG4gICAgZ2V0TWludHNEYjogZnVuY3Rpb24oKSB7XG4gICAgICByZXR1cm4gJGh0dHAuZ2V0KCcvYXBpL21pbnRzJykudGhlbihmdW5jdGlvbihyZXNwb25zZSkge1xuICAgICAgICByZXR1cm4gcmVzcG9uc2UuZGF0YTtcbiAgICAgIH0pO1xuICAgIH1cbiAgfTtcbn0pO1xuXG4iLCIndXNlIHN0cmljdCc7XG5hcHAuY29uZmlnKGZ1bmN0aW9uKCRzdGF0ZVByb3ZpZGVyKSB7XG5cbiAgJHN0YXRlUHJvdmlkZXIuc3RhdGUoJ2NvZmZlZScsIHtcbiAgICB1cmw6ICcvcHJvZHVjdC9jb2ZmZWUnLFxuICAgIGNvbnRyb2xsZXI6ICdQcm9kdWN0Q3RybCcsXG4gICAgdGVtcGxhdGVVcmw6ICdqcy9wcm9kdWN0bGlzdGluZy9jb2ZmZWUuaHRtbCdcbiAgfSk7XG5cbiAgJHN0YXRlUHJvdmlkZXIuc3RhdGUoJ21pbnQnLCB7XG4gICAgdXJsOiAnL3Byb2R1Y3QvbWludCcsXG4gICAgY29udHJvbGxlcjogJ1Byb2R1Y3RDdHJsJyxcbiAgICB0ZW1wbGF0ZVVybDogJ2pzL3Byb2R1Y3RsaXN0aW5nL21pbnQuaHRtbCdcbiAgfSk7XG59KTtcblxuYXBwLmNvbnRyb2xsZXIoJ1Byb2R1Y3RDdHJsJywgZnVuY3Rpb24oJHNjb3BlLCBQcm9kdWN0RmFjdG9yeSkge1xuXG4gICRzY29wZS5zaG93Q29mZmVlID0gZnVuY3Rpb24oKSB7XG4gICAgUHJvZHVjdEZhY3RvcnkuZ2V0Q29mZmVlRGIoKS50aGVuKGZ1bmN0aW9uKGRhdGEpIHtcbiAgICAgICRzY29wZS5jb2ZmZWUgPSBkYXRhO1xuICAgIH0pO1xuICB9O1xuXG4gICRzY29wZS5zaG93TWludHMgPSBmdW5jdGlvbigpIHtcbiAgICBQcm9kdWN0RmFjdG9yeS5nZXRNaW50c0RiKCkudGhlbihmdW5jdGlvbihkYXRhKSB7XG4gICAgICAkc2NvcGUubWludHMgPSBkYXRhO1xuICAgIH0pO1xuICB9O1xufSk7IiwiJ3VzZSBzdHJpY3QnO1xuYXBwLmNvbmZpZyhmdW5jdGlvbiAoJHN0YXRlUHJvdmlkZXIpIHtcblxuICAgIC8vIFJlZ2lzdGVyIG91ciAqYWJvdXQqIHN0YXRlLlxuICAgICRzdGF0ZVByb3ZpZGVyLnN0YXRlKCdzaWdudXAnLCB7XG4gICAgICAgIHVybDogJy9zaWdudXAnLFxuICAgICAgICBjb250cm9sbGVyOiAnc2lnblVwQ29udHJvbGxlcicsXG4gICAgICAgIHRlbXBsYXRlVXJsOiAnanMvc2lnbnVwL3NpZ251cC5odG1sJ1xuICAgIH0pO1xuXG59KTtcblxuYXBwLmNvbnRyb2xsZXIoJ3NpZ25VcENvbnRyb2xsZXInLCBmdW5jdGlvbiAoJHNjb3BlLCAkd2luZG93LCAkbG9jYXRpb24sIHNpZ251cEZhY3RvcnkpIHtcblx0JHNjb3BlLnVzZXIgPSB7XG4gICAgICAgIGVtYWlsOiBcIlwiLFxuICAgICAgICBwYXNzd29yZDogXCJcIlxuXHR9O1xuXG4gICAgJHNjb3BlLmdldENyZWF0ZWRVc2VyID0gZnVuY3Rpb24oKXtcbiAgICAgICAgc2lnbnVwRmFjdG9yeS5nZXRVc2VyKCkudGhlbihmdW5jdGlvbihkYXRhKXtcbiAgICAgICAgICAgICRzY29wZS51c2VyID0gZGF0YTtcbiAgICAgICAgfSk7XG4gICAgfTtcblxuICAgICRzY29wZS5uZXdVc2VyU2lnblVwID0gZnVuY3Rpb24obmV3VXNlcil7XG4gICAgICAgIHNpZ251cEZhY3RvcnkuYWRkTmV3VXNlcihuZXdVc2VyKS50aGVuKGZ1bmN0aW9uKCl7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcInN1Y2Nlc3NcIik7XG4gICAgICAgICAgICByZXMucmVkaXJlY3QoJy8nKTtcbiAgICAgICAgfSk7XG4gICAgfTtcblxuICAgICRzY29wZS5sb2dpbiA9IGZ1bmN0aW9uICgpe1xuICAgICAgICAkd2luZG93LmxvY2F0aW9uLmhyZWYgPSAnL2F1dGgvZ29vZ2xlJztcbiAgICB9O1xuICAgICRzY29wZS5sb2dpbmZiID0gZnVuY3Rpb24gKCl7XG4gICAgICAgICR3aW5kb3cubG9jYXRpb24uaHJlZiA9ICcvYXV0aC9mYWNlYm9vayc7XG4gICAgfTtcbn0pO1xuXG4iLCIndXNlIHN0cmljdCc7XG5hcHAuZmFjdG9yeSgnY2xlYXJjYXJ0JywgZnVuY3Rpb24oJGNvb2tpZXMsICRjb29raWVTdG9yZSl7XG5cdHJldHVybiB7XG5cdFx0Y2xlYXJvdXRjYXJ0OiBmdW5jdGlvbihmdWxsY2FydCl7XG5cdFx0XHRjb25zb2xlLmxvZygkY29va2llcy5wcm9kdWN0cyk7XG5cblx0XHRcdHZhciB3b3JraW5nYXJyYXkgPSAkY29va2llU3RvcmUuZ2V0KCdwcm9kdWN0cycpO1xuXHRcdFx0d29ya2luZ2FycmF5ID0gW107XG5cdFx0XHR2YXIgcHJvZHVjdHMgPSB3b3JraW5nYXJyYXk7XG5cdFx0XHQkY29va2llU3RvcmUucHV0KCdwcm9kdWN0cycpO1xuXHRcdFx0Y29uc29sZS5sb2coJGNvb2tpZXMucHJvZHVjdHMsICd0aGlzIGlzIGNvb2tpZXMucHJvZHVjdHMgZnJvbSBlbXB0eSBjYXJ0Jyk7XG5cdFx0fVxuXHR9XG59KSIsIid1c2Ugc3RyaWN0JztcbmFwcC5mYWN0b3J5KCdSYW5kb21HcmVldGluZ3MnLCBmdW5jdGlvbiAoKSB7XG5cbiAgICB2YXIgZ2V0UmFuZG9tRnJvbUFycmF5ID0gZnVuY3Rpb24gKGFycikge1xuICAgICAgICByZXR1cm4gYXJyW01hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIGFyci5sZW5ndGgpXTtcbiAgICB9O1xuXG4gICAgdmFyIGdyZWV0aW5ncyA9IFtcbiAgICAgICAgJ0kga25vdyB0aGF0IHlvdSBqdXN0IGRyYW5rIHNvbWUgY29mZmVlLi4uIGhhdmUgYSBtaW50Li4uJyxcbiAgICAgICAgJ1VtbW0uLi4uLi4gWW91IG5lZWQgYSBtaW50Li4uJyxcbiAgICAgICAgJ0hlbGxvLCBzbWVsbHkgaHVtYW4uJyxcbiAgICAgICAgJ1NvLi4uIGhvdyBkbyB5b3UgZmVlbCBhYm91dCBoYXZpbmcgYSBtaW50IHJpZ2h0IG5vdz8nLFxuICAgICAgICAnRHVkZS4gWW91IGNhbm5vdCBlYXQgZWdnIHNhbGFkIHdpdGggY29mZmVlIHVubGVzcyB5b3UgdGFrZSBhIG1pbnQuJyxcbiAgICAgICAgJ1NlcmlvdXNseS4gQ29mZmVlIHdpdGggc2FsbW9uIHNhbGFkPyBUYWtlIGEgbWludC4nLCBcbiAgICAgICAgJ1doYXRcXCdzIHlvdXIgcHJvYmxlbSB3aXRoIG1pbnRzPyBZb3UgbmVlZCBvbmUuJ1xuICAgIF07XG5cbiAgICByZXR1cm4ge1xuICAgICAgICBncmVldGluZ3M6IGdyZWV0aW5ncyxcbiAgICAgICAgZ2V0UmFuZG9tR3JlZXRpbmc6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHJldHVybiBnZXRSYW5kb21Gcm9tQXJyYXkoZ3JlZXRpbmdzKTtcbiAgICAgICAgfVxuICAgIH07XG5cbn0pOyIsIid1c2Ugc3RyaWN0JztcbmFwcC5mYWN0b3J5KCdyZW1vdmVpdGVtJywgZnVuY3Rpb24oJGNvb2tpZXMsICRjb29raWVTdG9yZSl7XG5cdHJldHVybiB7XG5cdFx0cmVtb3ZlZnJvbWNhcnQ6IGZ1bmN0aW9uKGl0ZW10b2dvKXtcblx0XHRcdGNvbnNvbGUubG9nKGl0ZW10b2dvKTtcblx0XHRcdHZhciB3b3JrYXJyYXkgPSAkY29va2llU3RvcmUuZ2V0KCdwcm9kdWN0cycpO1xuXHRcdFx0Y29uc29sZS5sb2cod29ya2FycmF5LCAndGhpcyBpcyB3b3JrYXJyYXknKTtcblxuXHRcdFx0Zm9yICh2YXIgaT0wOyBpPHdvcmthcnJheS5sZW5ndGg7IGkrKyl7XG5cdFx0XHRcdGlmICh3b3JrYXJyYXlbaV0gPT09IGl0ZW10b2dvKXtcblx0XHRcdFx0XHR2YXIgcmVtb3ZlZCA9IHdvcmthcnJheS5zcGxpY2UoaSwgMSk7XG5cdFx0XHRcdFx0dmFyIHByb2R1Y3RzID0gd29ya2FycmF5O1xuXHRcdFx0XHRcdCRjb29raWVTdG9yZS5wdXQoJ3Byb2R1Y3RzJyk7XG5cdFx0XHRcdH0gZWxzZSBcblx0XHRcdFx0YWxlcnQoJ1lvdSBkbyBub3QgaGF2ZSB0aGlzIGl0ZW0gaW4geW91ciBjYXJ0Jyk7XG5cblx0XHRcdH0gXG5cdFx0XHRcblx0XHRcdGNvbnNvbGUubG9nKCRjb29raWVzLnByb2R1Y3RzLCAndGhpcyBpcyBjb29raWVzLnByb2R1Y3RzIGZyb20gcmVtb3ZlIG9uZSBpdGVtJyk7XG5cdFx0fVxuXHR9XG59KVxuXG4iLCIndXNlIHN0cmljdCc7XG4iLCIndXNlIHN0cmljdCc7XG5hcHAuZmFjdG9yeSgnYWRkdG9jYXJ0JywgZnVuY3Rpb24oJGNvb2tpZXMsICRjb29raWVTdG9yZSl7XG5cdHJldHVybiB7XG5cdFx0YWRkdG9jYXJ0OiBmdW5jdGlvbihpdGVtdG9hZGQpe1xuXG5cdFx0XHRjb25zb2xlLmxvZygndGhpcyBpcyBmaXJzdCAkY29va2llcycsICRjb29raWVzLnByb2R1Y3RzKTtcbiAgICAgICAgY29uc29sZS5sb2coJ2hpdCBidXR0b24gdGhpcyBjb21lcyB0aHJvdWdoJywgaXRlbXRvYWRkKTtcbiAgICAgICAgdmFyIHByb2RhcnIgPSAkY29va2llU3RvcmUuZ2V0KCdwcm9kdWN0cycpO1xuICAgICAgICBwcm9kYXJyLnB1c2goaXRlbXRvYWRkKTtcbiAgICAgICAgJGNvb2tpZVN0b3JlLnB1dCgncHJvZHVjdHMnLCBwcm9kYXJyKTtcblxuXHRcdH1cblx0fVxufSkiLCIndXNlIHN0cmljdCc7XG5hcHAuZmFjdG9yeSgnQWRkVG9DYXJ0JywgZnVuY3Rpb24oKSB7XG5cbiAgICAgICAgICAgIHZhciBjYXJ0Y29udGVudCA9IHtcbiAgICAgICAgICAgICAgICB1c2VyOiByZXEuYm9keS5jb29raWVzLmNhcnQsXG4gICAgICAgICAgICAgICAgcHJvZHVjdHM6IFtdXG5cbiAgfTtcblxuICByZXR1cm4ge1xuXG4gICAgc2VsZWN0aW5nOiBmdW5jdGlvbihwcm9kdWN0aW5mbykge1xuICAgICAgdmFyIHRoaXNjbGljayA9IHt9O1xuICAgICAgdGhpc2NsaWNrLnByb2RJZCA9IHByb2R1Y3RpbmZvLl9pZDtcbiAgICAgIHRoaXNjbGljay5QcmljZSA9IHByb2R1Y3RpbmZvLnByaWNlO1xuICAgICAgdGhpc2NsaWNrLlF1YW50aXR5ID0gcHJvZHVjdGluZm8uaG93TWFueTtcblxuICAgICAgY2FydGNvbnRlbnQucHJvZHVjdHMucHVzaCh0aGlzY2xpY2spO1xuICAgIH0sXG5cblxuXG4gICAgYWRkZWRUb0NhcnQ6IGZ1bmN0aW9uKCkge1xuICAgICAgcmV0dXJuIHNlbGVjdGluZyhjbGlja2luZm8pO1xuICAgIH1cblxuXG4gIH07XG5cbn0pO1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5hcHAuZmFjdG9yeSgnc2lnbnVwRmFjdG9yeScsIGZ1bmN0aW9uKCRodHRwKXtcblx0cmV0dXJuIHtcblx0XHRnZXRVc2VyOiBmdW5jdGlvbigpe1xuXHRcdFx0cmV0dXJuICRodHRwLmdldCgnL2FwaS9uZXdVc2VyJykudGhlbihmdW5jdGlvbihyZXNwb25zZSl7XG5cdFx0XHRcdHJldHVybiByZXNwb25zZS5kYXRhO1xuXHRcdFx0fSk7XG5cdFx0fSxcblx0XHRhZGROZXdVc2VyIDogZnVuY3Rpb24gKHVzZXIpIHtcblx0XHRcdHJldHVybiAkaHR0cC5wb3N0KCcvYXBpL3NpZ251cC9uZXdVc2VyJywgdXNlcik7XG5cdFx0fVxuXHR9O1xufSk7XG5cblxuIiwiJ3VzZSBzdHJpY3QnO1xuYXBwLmRpcmVjdGl2ZSgnbmF2YmFyJywgZnVuY3Rpb24oKSB7XG4gIHJldHVybiB7XG4gICAgcmVzdHJpY3Q6ICdFJyxcbiAgICBzY29wZToge1xuICAgICAgaXRlbXM6ICc9J1xuICAgIH0sXG4gICAgdGVtcGxhdGVVcmw6ICdqcy9jb21tb24vZGlyZWN0aXZlcy9uYXZiYXIvbmF2YmFyLmh0bWwnXG4gIH07XG59KTtcbiIsIid1c2Ugc3RyaWN0JztcbmFwcC5kaXJlY3RpdmUoJ3JhbmRvR3JlZXRpbmcnLCBmdW5jdGlvbiAoUmFuZG9tR3JlZXRpbmdzKSB7XG5cbiAgICByZXR1cm4ge1xuICAgICAgICByZXN0cmljdDogJ0UnLFxuICAgICAgICB0ZW1wbGF0ZVVybDogJ2pzL2NvbW1vbi9kaXJlY3RpdmVzL3JhbmRvLWdyZWV0aW5nL3JhbmRvLWdyZWV0aW5nLmh0bWwnLFxuICAgICAgICBsaW5rOiBmdW5jdGlvbiAoc2NvcGUpIHtcbiAgICAgICAgICAgIHNjb3BlLmdyZWV0aW5nID0gUmFuZG9tR3JlZXRpbmdzLmdldFJhbmRvbUdyZWV0aW5nKCk7XG4gICAgICAgIH1cbiAgICB9O1xuXG59KTsiLCIndXNlIHN0cmljdCc7XG5hcHAuZGlyZWN0aXZlKCdzdGFjaycsIGZ1bmN0aW9uKCkge1xuICByZXR1cm4ge1xuICAgIHJlc3RyaWN0OiAnRScsXG4gICAgdGVtcGxhdGVVcmw6ICdqcy9jb21tb24vZGlyZWN0aXZlcy9zdGFja1N0b3JlTG9nby9zdGFja1N0b3JlTG9nby5odG1sJ1xuICB9O1xufSk7XG4iXSwic291cmNlUm9vdCI6Ii9zb3VyY2UvIn0=