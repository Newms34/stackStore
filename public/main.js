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
    state: 'signin'
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

    // Register our *about* state.
    $stateProvider.state('admin', {
        url: '/admin',
        controller: 'adminController',
        templateUrl: 'js/admin/admin.html'
    });

});

app.controller('adminController', function($scope, adminFactory) {
    $scope.users = {};
    adminFactory.getUsers().then(function(data) {
        $scope.users = data;
    });
    $scope.adminify = function(name){
        adminFactory.adminUser(name).then(function(data){
            console.log('done!')
        });
    };
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
        price: 8999,
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
    $scope.goPay = function(){
        sessionStorage.thisCart = angular.toJson($scope.seshOrders);
        $state.go('pay');
    };

    $scope.deleteitem = function(data){
        removeitem.removefromcart(data)
    } 

    $scope.clearthecart = function(info){
        clearcart.clearoutcart(info);
    }

});

'use strict';
app.config(function($stateProvider) {

  $stateProvider.state('coffee', {
    url: '/product/coffee',
    controller: 'CoffeeCtrl',
    templateUrl: 'js/coffee/coffee.html'
  });
});

'use strict';
app.controller('CoffeeCtrl', function($scope, CoffeeFactory) {
  CoffeeFactory.getCoffeeDb().then(function(data) {
    $scope.coffee = data;
  });
});

'use strict';

app.factory('CoffeeFactory', function($http) {
  return {
    getCoffeeDb: function() {
      return $http.get('/api/coffee').then(function(response) {
        return response.data;
      });
    },
  };
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

  $stateProvider.state('mint', {
    url: '/product/mint',
    controller: 'MintCtrl',
    templateUrl: 'js/mint/mint.html'
  });
});



'use strict';
app.controller('MintCtrl', function($scope, MintFactory) {
  MintFactory.getMintsDb().then(function(data) {
    $scope.mints = data;
  });
});

'use strict';

app.factory('MintFactory', function($http) {
  return {
    getMintsDb: function() {
      return $http.get('/api/mints').then(function(response) {
        return response.data;
      });
    },
  };
});

'use strict';
// var stripe = require("stripe")("sk_test_WhzuBvvju6AKl7KyIKtdWiQf");
app.config(function($stateProvider) {

    $stateProvider.state('pay', {
        url: '/pay',
        controller: 'payCtrl',
        templateUrl: 'js/pay/pay.html'
    });

});

app.controller('payCtrl', function($scope, $stateParams, $http) {
    $scope.cartToPay = angular.fromJson(sessionStorage.thisCart)
        //TEMPORARY! FOR TESTING
    console.log('Your cart: ', $scope.cartToPay);
    $scope.total = 0;
    $scope.cartToPay.forEach(function(el) {
        $scope.total += (el.price) * (el.howMany);
    })
    $scope.totalOut = '$' + ($scope.total / 100);
    //clear card data
    $scope.card = {
        name:"",
        num: 0,
        expmo: 0,
        expyr:0,
        cvv: 0,
        total:0
    }
    $scope.submitCard = function(card) {
        console.log('card: ',card)
        card.total = $scope.total;
        $http.post('/api/subpay',card);
    };

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
app.config(function ($stateProvider) {

    // Register our *about* state.
    $stateProvider.state('signin', {
        url: '/signin',
        controller: 'signInController',
        templateUrl: 'js/signin/signin.html'
    });

});

app.controller('signInController', function ($scope, $window, $location, signinFactory) {
	$scope.user = {
        email: "",
        password: ""
	};


    $scope.userSignIn = function(newUser){
        signinFactory.getUser(newUser).then(function(){
            console.log("success");
            $window.location.href = '/';
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
            $window.location.href = '/';
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
"use strict";
app.factory('adminFactory', function($http){
	return {
		getUsers: function(){
			return $http.get('/api/admin/allUsers').then(function(response){
				return response.data;
			});
		},
		adminUser : function (user) {
			return $http.post('/api/admin/adminUser', {email:user});
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


  };

});

"use strict";
app.factory('signinFactory', function($http){
	return {
		getUser: function(){
			return $http.post('/api/signin/newUser').then(function(response){
				return response.data;
			});
		},
		addNewUser : function (user) {
			return $http.post('/api/signup/newUser', user);
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC5qcyIsImFib3V0L2Fib3V0LmpzIiwiYWRtaW4vYWRtaW4uanMiLCJjYXJ0L2NhcnQuanMiLCJjb2ZmZWUvY29mZmVlLWNvbmZpZy5qcyIsImNvZmZlZS9jb2ZmZWUtY29udHJvbGxlci5qcyIsImNvZmZlZS9jb2ZmZWUtZmFjdG9yeS5qcyIsImZzYS9mc2EtcHJlLWJ1aWx0LmpzIiwiaG9tZS9ob21lLmpzIiwibWludC9taW50LWNvbmZpZy5qcyIsIm1pbnQvbWludC1jb250cm9sbGVyLmpzIiwibWludC9taW50LWZhY3RvcnkuanMiLCJwYXkvcGF5LmpzIiwicHJvZGRldGFpbC9wcm9kZGV0YWlsLmpzIiwic2lnbmluL3NpZ25pbi5qcyIsInNpZ251cC9zaWdudXAuanMiLCJjb21tb24vZmFjdG9yaWVzL0NsZWFyY2FydC5qcyIsImNvbW1vbi9mYWN0b3JpZXMvUmFuZG9tR3JlZXRpbmdzLmpzIiwiY29tbW9uL2ZhY3Rvcmllcy9SZW1vdmVpdGVtcy5qcyIsImNvbW1vbi9mYWN0b3JpZXMvU29ja2V0LmpzIiwiY29tbW9uL2ZhY3Rvcmllcy9hZGR0b2NhcnQuanMiLCJjb21tb24vZmFjdG9yaWVzL2FkbWluRmFjdG9yeS5qcyIsImNvbW1vbi9mYWN0b3JpZXMvY2FydGZhY3RvcnkuanMiLCJjb21tb24vZmFjdG9yaWVzL3NpZ25pbkZhY3RvcnkuanMiLCJjb21tb24vZmFjdG9yaWVzL3NpZ251cEZhY3RvcnkuanMiLCJjb21tb24vZGlyZWN0aXZlcy9uYXZiYXIvbmF2YmFyLmpzIiwiY29tbW9uL2RpcmVjdGl2ZXMvcmFuZG8tZ3JlZXRpbmcvcmFuZG8tZ3JlZXRpbmcuanMiLCJjb21tb24vZGlyZWN0aXZlcy9zdGFja1N0b3JlTG9nby9zdGFja1N0b3JlTG9nby5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQzFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDekJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDeEJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDL0RBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDVEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUNOQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ1pBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ2pIQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ2ZBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ1hBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDTkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDWEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUNwQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQzNDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ2pDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ3ZDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDYkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUN4QkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDdkJBO0FBQ0E7QUNEQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDYkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUNmQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQzlCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDYkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUNmQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDVkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDWEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsImZpbGUiOiJtYWluLmpzIiwic291cmNlc0NvbnRlbnQiOlsiJ3VzZSBzdHJpY3QnO1xudmFyIGFwcCA9IGFuZ3VsYXIubW9kdWxlKCdGdWxsc3RhY2tHZW5lcmF0ZWRBcHAnLCBbJ3VpLnJvdXRlcicsICdmc2FQcmVCdWlsdCcsICduZ0Nvb2tpZXMnXSk7XG5cbmFwcC5jb250cm9sbGVyKCdNYWluQ29udHJvbGxlcicsIGZ1bmN0aW9uICgkc2NvcGUsICRjb29raWVzLCAkY29va2llU3RvcmUpIHtcblxuICAgICRjb29raWVTdG9yZS5yZW1vdmUoXCJwcm9kdWN0c1wiKTtcbiAgICBcblxuICAgICRjb29raWVTdG9yZS5wdXQoJ3Byb2R1Y3RzJywgW10pO1xuICAgIGNvbnNvbGUubG9nKCRjb29raWVzLCAndGhpcyBpcyBjb29raWUnKTtcblxuICAvLyBHaXZlbiB0byB0aGUgPG5hdmJhcj4gZGlyZWN0aXZlIHRvIHNob3cgdGhlIG1lbnUuXG4gICRzY29wZS5tZW51SXRlbXMgPSBbe1xuICAgIGxhYmVsOiAnSG9tZScsXG4gICAgc3RhdGU6ICdob21lJ1xuICB9LCB7XG4gICAgbGFiZWw6ICdDb2ZmZWUnLFxuICAgIHN0YXRlOiAnY29mZmVlJ1xuICB9LCB7XG4gICAgbGFiZWw6ICdNaW50JyxcbiAgICBzdGF0ZTogJ21pbnQnXG4gIH0sIHtcbiAgICBsYWJlbDogJ0Fib3V0JyxcbiAgICBzdGF0ZTogJ2Fib3V0J1xuICB9LCB7XG4gICAgbGFiZWw6ICdTaWduVXAnLFxuICAgIHN0YXRlOiAnc2lnbnVwJ1xuICB9LCB7ICAgIGxhYmVsOiAnU2lnbiBJbicsXG4gICAgc3RhdGU6ICdzaWduaW4nXG4gIH0sIHtcbiAgICBsYWJlbDogJ0NhcnQnLFxuICAgIHN0YXRlOiAnY2FydCdcbiAgfV07XG59KTtcblxuXG5hcHAuY29uZmlnKGZ1bmN0aW9uKCR1cmxSb3V0ZXJQcm92aWRlciwgJGxvY2F0aW9uUHJvdmlkZXIpIHtcbiAgLy8gVGhpcyB0dXJucyBvZmYgaGFzaGJhbmcgdXJscyAoLyNhYm91dCkgYW5kIGNoYW5nZXMgaXQgdG8gc29tZXRoaW5nIG5vcm1hbCAoL2Fib3V0KVxuICAkbG9jYXRpb25Qcm92aWRlci5odG1sNU1vZGUodHJ1ZSk7XG4gIC8vIElmIHdlIGdvIHRvIGEgVVJMIHRoYXQgdWktcm91dGVyIGRvZXNuJ3QgaGF2ZSByZWdpc3RlcmVkLCBnbyB0byB0aGUgXCIvXCIgdXJsLlxuICAkdXJsUm91dGVyUHJvdmlkZXIub3RoZXJ3aXNlKCcvJyk7XG59KTtcbiIsIid1c2Ugc3RyaWN0JztcbmFwcC5jb25maWcoZnVuY3Rpb24oJHN0YXRlUHJvdmlkZXIpIHtcblxuICAvLyBSZWdpc3RlciBvdXIgKmFib3V0KiBzdGF0ZS5cbiAgJHN0YXRlUHJvdmlkZXIuc3RhdGUoJ2Fib3V0Jywge1xuICAgIHVybDogJy9hYm91dCcsXG4gICAgY29udHJvbGxlcjogJ0Fib3V0Q29udHJvbGxlcicsXG4gICAgdGVtcGxhdGVVcmw6ICdqcy9hYm91dC9hYm91dC5odG1sJ1xuICB9KTtcblxufSk7XG5cbmFwcC5jb250cm9sbGVyKCdBYm91dENvbnRyb2xsZXInLCBmdW5jdGlvbigkc2NvcGUpIHtcblxuICAvLyBJbWFnZXMgb2YgYmVhdXRpZnVsIEZ1bGxzdGFjayBwZW9wbGUuXG4gICRzY29wZS5pbWFnZXMgPSBbXG4gICAgJ2h0dHBzOi8vcGJzLnR3aW1nLmNvbS9tZWRpYS9CN2dCWHVsQ0FBQVhRY0UuanBnOmxhcmdlJyxcbiAgICAnaHR0cHM6Ly9mYmNkbi1zcGhvdG9zLWMtYS5ha2FtYWloZC5uZXQvaHBob3Rvcy1hay14YXAxL3QzMS4wLTgvMTA4NjI0NTFfMTAyMDU2MjI5OTAzNTkyNDFfODAyNzE2ODg0MzMxMjg0MTEzN19vLmpwZycsXG4gICAgJ2h0dHBzOi8vcGJzLnR3aW1nLmNvbS9tZWRpYS9CLUxLVXNoSWdBRXk5U0suanBnJyxcbiAgICAnaHR0cHM6Ly9wYnMudHdpbWcuY29tL21lZGlhL0I3OS1YN29DTUFBa3c3eS5qcGcnLFxuICAgICdodHRwczovL3Bicy50d2ltZy5jb20vbWVkaWEvQi1VajlDT0lJQUlGQWgwLmpwZzpsYXJnZScsXG4gICAgJ2h0dHBzOi8vcGJzLnR3aW1nLmNvbS9tZWRpYS9CNnlJeUZpQ0VBQXFsMTIuanBnOmxhcmdlJ1xuICBdO1xuXG59KTtcbiIsIid1c2Ugc3RyaWN0JztcbmFwcC5jb25maWcoZnVuY3Rpb24oJHN0YXRlUHJvdmlkZXIpIHtcblxuICAgIC8vIFJlZ2lzdGVyIG91ciAqYWJvdXQqIHN0YXRlLlxuICAgICRzdGF0ZVByb3ZpZGVyLnN0YXRlKCdhZG1pbicsIHtcbiAgICAgICAgdXJsOiAnL2FkbWluJyxcbiAgICAgICAgY29udHJvbGxlcjogJ2FkbWluQ29udHJvbGxlcicsXG4gICAgICAgIHRlbXBsYXRlVXJsOiAnanMvYWRtaW4vYWRtaW4uaHRtbCdcbiAgICB9KTtcblxufSk7XG5cbmFwcC5jb250cm9sbGVyKCdhZG1pbkNvbnRyb2xsZXInLCBmdW5jdGlvbigkc2NvcGUsIGFkbWluRmFjdG9yeSkge1xuICAgICRzY29wZS51c2VycyA9IHt9O1xuICAgIGFkbWluRmFjdG9yeS5nZXRVc2VycygpLnRoZW4oZnVuY3Rpb24oZGF0YSkge1xuICAgICAgICAkc2NvcGUudXNlcnMgPSBkYXRhO1xuICAgIH0pO1xuICAgICRzY29wZS5hZG1pbmlmeSA9IGZ1bmN0aW9uKG5hbWUpe1xuICAgICAgICBhZG1pbkZhY3RvcnkuYWRtaW5Vc2VyKG5hbWUpLnRoZW4oZnVuY3Rpb24oZGF0YSl7XG4gICAgICAgICAgICBjb25zb2xlLmxvZygnZG9uZSEnKVxuICAgICAgICB9KTtcbiAgICB9O1xufSk7XG5cbiIsIid1c2Ugc3RyaWN0JztcbmFwcC5jb25maWcoZnVuY3Rpb24oJHN0YXRlUHJvdmlkZXIpIHtcblxuICAgICRzdGF0ZVByb3ZpZGVyLnN0YXRlKCdjYXJ0Jywge1xuICAgICAgICB1cmw6ICcvY2FydCcsXG4gICAgICAgIGNvbnRyb2xsZXI6ICdjYXJ0Q3RybCcsXG4gICAgICAgIHRlbXBsYXRlVXJsOiAnanMvY2FydC9jYXJ0Lmh0bWwnXG4gICAgfSk7XG5cbn0pO1xuXG5hcHAuY29udHJvbGxlcignY2FydEN0cmwnLCBmdW5jdGlvbigkc2NvcGUsIHJlbW92ZWl0ZW0sIGNsZWFyY2FydCkge1xuXG4gICAgLy9URU1QT1JBUlkhIEZPUiBURVNUSU5HXG4gICAgLy90aGlzIHJlbmRlcnMgdGhlIGNhcnRcbiAgICAkc2NvcGUuc2VzaE9yZGVycyA9IFt7XG4gICAgICAgIHRpdGxlOiAnVGVzdCBJdGVtIDAxJyxcbiAgICAgICAgZGVzY3JpcHRpb246ICdBbG1vc3QgYXMgZ29vZCBhcyBUZXN0IEl0ZW0gMDIhJyxcbiAgICAgICAgcHJpY2U6IDM5OTksXG4gICAgICAgIGhvd01hbnk6IDVcbiAgICB9LCB7XG4gICAgICAgIHRpdGxlOiAnVGVzdCBJdGVtIDAyJyxcbiAgICAgICAgZGVzY3JpcHRpb246ICdOZXcgYW5kIEltcHJvdmVkISEnLFxuICAgICAgICBwcmljZTogNDI5OSxcbiAgICAgICAgaG93TWFueTogM1xuICAgIH0sIHtcbiAgICAgICAgdGl0bGU6ICdUZXN0IEl0ZW0gMDMnLFxuICAgICAgICBkZXNjcmlwdGlvbjogJ0JhcmdhaW4gVGVzdCBJdGVtIScsXG4gICAgICAgIHByaWNlOiAxOTk5LFxuICAgICAgICBob3dNYW55OiA2XG4gICAgfSwge1xuICAgICAgICB0aXRsZTogJ1Rlc3QgSXRlbSAwNCcsXG4gICAgICAgIGRlc2NyaXB0aW9uOiAnRmFtaWx5IFNpemVkIFRlc3QgaXRlbSEnLFxuICAgICAgICBwcmljZTogODk5OSxcbiAgICAgICAgaG93TWFueTogMVxuICAgIH1dO1xuXG4gICAgJHNjb3BlLnNlc2hPcmRlcnMubWFwKGZ1bmN0aW9uKGVsKSB7XG4gICAgICAgIGVsLnByaWNlT3V0ID0gJyQnICsgZWwucHJpY2UgLyAxMDA7XG4gICAgICAgIGVsLnNUb3QgPSAnJCcgKyAoKGVsLnByaWNlICogZWwuaG93TWFueSkgLyAxMDApO1xuICAgIH0pO1xuXG4gICAgJHNjb3BlLnRvdGFsID0gMDtcblxuICAgICRzY29wZS5zZXNoT3JkZXJzLmZvckVhY2goZnVuY3Rpb24oZWwpIHtcbiAgICAgICAgJHNjb3BlLnRvdGFsICs9IGVsLnByaWNlICogZWwuaG93TWFueTtcbiAgICB9KTtcblxuICAgICRzY29wZS50b3RhbCA9ICckJyArICRzY29wZS50b3RhbC8xMDA7XG4gICAgJHNjb3BlLmdvUGF5ID0gZnVuY3Rpb24oKXtcbiAgICAgICAgc2Vzc2lvblN0b3JhZ2UudGhpc0NhcnQgPSBhbmd1bGFyLnRvSnNvbigkc2NvcGUuc2VzaE9yZGVycyk7XG4gICAgICAgICRzdGF0ZS5nbygncGF5Jyk7XG4gICAgfTtcblxuICAgICRzY29wZS5kZWxldGVpdGVtID0gZnVuY3Rpb24oZGF0YSl7XG4gICAgICAgIHJlbW92ZWl0ZW0ucmVtb3ZlZnJvbWNhcnQoZGF0YSlcbiAgICB9IFxuXG4gICAgJHNjb3BlLmNsZWFydGhlY2FydCA9IGZ1bmN0aW9uKGluZm8pe1xuICAgICAgICBjbGVhcmNhcnQuY2xlYXJvdXRjYXJ0KGluZm8pO1xuICAgIH1cblxufSk7XG4iLCIndXNlIHN0cmljdCc7XG5hcHAuY29uZmlnKGZ1bmN0aW9uKCRzdGF0ZVByb3ZpZGVyKSB7XG5cbiAgJHN0YXRlUHJvdmlkZXIuc3RhdGUoJ2NvZmZlZScsIHtcbiAgICB1cmw6ICcvcHJvZHVjdC9jb2ZmZWUnLFxuICAgIGNvbnRyb2xsZXI6ICdDb2ZmZWVDdHJsJyxcbiAgICB0ZW1wbGF0ZVVybDogJ2pzL2NvZmZlZS9jb2ZmZWUuaHRtbCdcbiAgfSk7XG59KTtcbiIsIid1c2Ugc3RyaWN0JztcbmFwcC5jb250cm9sbGVyKCdDb2ZmZWVDdHJsJywgZnVuY3Rpb24oJHNjb3BlLCBDb2ZmZWVGYWN0b3J5KSB7XG4gIENvZmZlZUZhY3RvcnkuZ2V0Q29mZmVlRGIoKS50aGVuKGZ1bmN0aW9uKGRhdGEpIHtcbiAgICAkc2NvcGUuY29mZmVlID0gZGF0YTtcbiAgfSk7XG59KTtcbiIsIid1c2Ugc3RyaWN0JztcblxuYXBwLmZhY3RvcnkoJ0NvZmZlZUZhY3RvcnknLCBmdW5jdGlvbigkaHR0cCkge1xuICByZXR1cm4ge1xuICAgIGdldENvZmZlZURiOiBmdW5jdGlvbigpIHtcbiAgICAgIHJldHVybiAkaHR0cC5nZXQoJy9hcGkvY29mZmVlJykudGhlbihmdW5jdGlvbihyZXNwb25zZSkge1xuICAgICAgICByZXR1cm4gcmVzcG9uc2UuZGF0YTtcbiAgICAgIH0pO1xuICAgIH0sXG4gIH07XG59KTtcblxuIiwiKGZ1bmN0aW9uICgpIHtcblxuICAgICd1c2Ugc3RyaWN0JztcblxuICAgIC8vIEhvcGUgeW91IGRpZG4ndCBmb3JnZXQgQW5ndWxhciEgRHVoLWRveS5cbiAgICBpZiAoIXdpbmRvdy5hbmd1bGFyKSB0aHJvdyBuZXcgRXJyb3IoJ0kgY2FuXFwndCBmaW5kIEFuZ3VsYXIhJyk7XG5cbiAgICB2YXIgYXBwID0gYW5ndWxhci5tb2R1bGUoJ2ZzYVByZUJ1aWx0JywgW10pO1xuXG4gICAgYXBwLmZhY3RvcnkoJ1NvY2tldCcsIGZ1bmN0aW9uICgkbG9jYXRpb24pIHtcblxuICAgICAgICBpZiAoIXdpbmRvdy5pbykgdGhyb3cgbmV3IEVycm9yKCdzb2NrZXQuaW8gbm90IGZvdW5kIScpO1xuXG4gICAgICAgIHZhciBzb2NrZXQ7XG5cbiAgICAgICAgaWYgKCRsb2NhdGlvbi4kJHBvcnQpIHtcbiAgICAgICAgICAgIHNvY2tldCA9IGlvKCdodHRwOi8vbG9jYWxob3N0OjEzMzcnKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHNvY2tldCA9IGlvKCcvJyk7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gc29ja2V0O1xuXG4gICAgfSk7XG5cbiAgICBhcHAuY29uc3RhbnQoJ0FVVEhfRVZFTlRTJywge1xuICAgICAgICBsb2dpblN1Y2Nlc3M6ICdhdXRoLWxvZ2luLXN1Y2Nlc3MnLFxuICAgICAgICBsb2dpbkZhaWxlZDogJ2F1dGgtbG9naW4tZmFpbGVkJyxcbiAgICAgICAgbG9nb3V0U3VjY2VzczogJ2F1dGgtbG9nb3V0LXN1Y2Nlc3MnLFxuICAgICAgICBzZXNzaW9uVGltZW91dDogJ2F1dGgtc2Vzc2lvbi10aW1lb3V0JyxcbiAgICAgICAgbm90QXV0aGVudGljYXRlZDogJ2F1dGgtbm90LWF1dGhlbnRpY2F0ZWQnLFxuICAgICAgICBub3RBdXRob3JpemVkOiAnYXV0aC1ub3QtYXV0aG9yaXplZCdcbiAgICB9KTtcblxuICAgIGFwcC5jb25maWcoZnVuY3Rpb24gKCRodHRwUHJvdmlkZXIpIHtcbiAgICAgICAgJGh0dHBQcm92aWRlci5pbnRlcmNlcHRvcnMucHVzaChbXG4gICAgICAgICAgICAnJGluamVjdG9yJyxcbiAgICAgICAgICAgIGZ1bmN0aW9uICgkaW5qZWN0b3IpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gJGluamVjdG9yLmdldCgnQXV0aEludGVyY2VwdG9yJyk7XG4gICAgICAgICAgICB9XG4gICAgICAgIF0pO1xuICAgIH0pO1xuXG4gICAgYXBwLmZhY3RvcnkoJ0F1dGhJbnRlcmNlcHRvcicsIGZ1bmN0aW9uICgkcm9vdFNjb3BlLCAkcSwgQVVUSF9FVkVOVFMpIHtcbiAgICAgICAgdmFyIHN0YXR1c0RpY3QgPSB7XG4gICAgICAgICAgICA0MDE6IEFVVEhfRVZFTlRTLm5vdEF1dGhlbnRpY2F0ZWQsXG4gICAgICAgICAgICA0MDM6IEFVVEhfRVZFTlRTLm5vdEF1dGhvcml6ZWQsXG4gICAgICAgICAgICA0MTk6IEFVVEhfRVZFTlRTLnNlc3Npb25UaW1lb3V0LFxuICAgICAgICAgICAgNDQwOiBBVVRIX0VWRU5UUy5zZXNzaW9uVGltZW91dFxuICAgICAgICB9O1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgcmVzcG9uc2VFcnJvcjogZnVuY3Rpb24gKHJlc3BvbnNlKSB7XG4gICAgICAgICAgICAgICAgJHJvb3RTY29wZS4kYnJvYWRjYXN0KHN0YXR1c0RpY3RbcmVzcG9uc2Uuc3RhdHVzXSwgcmVzcG9uc2UpO1xuICAgICAgICAgICAgICAgIHJldHVybiAkcS5yZWplY3QocmVzcG9uc2UpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9O1xuICAgIH0pO1xuXG4gICAgYXBwLnNlcnZpY2UoJ0F1dGhTZXJ2aWNlJywgZnVuY3Rpb24gKCRodHRwLCBTZXNzaW9uLCAkcm9vdFNjb3BlLCBBVVRIX0VWRU5UUywgJHEpIHtcblxuICAgICAgICB2YXIgb25TdWNjZXNzZnVsTG9naW4gPSBmdW5jdGlvbiAocmVzcG9uc2UpIHtcbiAgICAgICAgICAgIHZhciBkYXRhID0gcmVzcG9uc2UuZGF0YTtcbiAgICAgICAgICAgIFNlc3Npb24uY3JlYXRlKGRhdGEuaWQsIGRhdGEudXNlcik7XG4gICAgICAgICAgICAkcm9vdFNjb3BlLiRicm9hZGNhc3QoQVVUSF9FVkVOVFMubG9naW5TdWNjZXNzKTtcbiAgICAgICAgICAgIHJldHVybiBkYXRhLnVzZXI7XG4gICAgICAgIH07XG5cbiAgICAgICAgdGhpcy5nZXRMb2dnZWRJblVzZXIgPSBmdW5jdGlvbiAoKSB7XG5cbiAgICAgICAgICAgIGlmICh0aGlzLmlzQXV0aGVudGljYXRlZCgpKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuICRxLndoZW4oeyB1c2VyOiBTZXNzaW9uLnVzZXIgfSk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHJldHVybiAkaHR0cC5nZXQoJy9zZXNzaW9uJykudGhlbihvblN1Y2Nlc3NmdWxMb2dpbikuY2F0Y2goZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgIHJldHVybiBudWxsO1xuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgfTtcblxuICAgICAgICB0aGlzLmxvZ2luID0gZnVuY3Rpb24gKGNyZWRlbnRpYWxzKSB7XG4gICAgICAgICAgICByZXR1cm4gJGh0dHAucG9zdCgnL2xvZ2luJywgY3JlZGVudGlhbHMpLnRoZW4ob25TdWNjZXNzZnVsTG9naW4pO1xuICAgICAgICB9O1xuXG4gICAgICAgIHRoaXMubG9nb3V0ID0gZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgcmV0dXJuICRodHRwLmdldCgnL2xvZ291dCcpLnRoZW4oZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgIFNlc3Npb24uZGVzdHJveSgpO1xuICAgICAgICAgICAgICAgICRyb290U2NvcGUuJGJyb2FkY2FzdChBVVRIX0VWRU5UUy5sb2dvdXRTdWNjZXNzKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9O1xuXG4gICAgICAgIHRoaXMuaXNBdXRoZW50aWNhdGVkID0gZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgcmV0dXJuICEhU2Vzc2lvbi51c2VyO1xuICAgICAgICB9O1xuXG4gICAgfSk7XG5cbiAgICBhcHAuc2VydmljZSgnU2Vzc2lvbicsIGZ1bmN0aW9uICgkcm9vdFNjb3BlLCBBVVRIX0VWRU5UUykge1xuXG4gICAgICAgICRyb290U2NvcGUuJG9uKEFVVEhfRVZFTlRTLm5vdEF1dGhlbnRpY2F0ZWQsIHRoaXMuZGVzdHJveSk7XG4gICAgICAgICRyb290U2NvcGUuJG9uKEFVVEhfRVZFTlRTLnNlc3Npb25UaW1lb3V0LCB0aGlzLmRlc3Ryb3kpO1xuXG4gICAgICAgIHRoaXMuY3JlYXRlID0gZnVuY3Rpb24gKHNlc3Npb25JZCwgdXNlcikge1xuICAgICAgICAgICAgdGhpcy5pZCA9IHNlc3Npb25JZDtcbiAgICAgICAgICAgIHRoaXMudXNlciA9IHVzZXI7XG4gICAgICAgIH07XG5cbiAgICAgICAgdGhpcy5kZXN0cm95ID0gZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgdGhpcy5pZCA9IG51bGw7XG4gICAgICAgICAgICB0aGlzLnVzZXIgPSBudWxsO1xuICAgICAgICB9O1xuXG4gICAgfSk7XG5cbn0pKCk7IiwiJ3VzZSBzdHJpY3QnO1xuYXBwLmNvbmZpZyhmdW5jdGlvbiAoJHN0YXRlUHJvdmlkZXIpIHtcblxuICAgICRzdGF0ZVByb3ZpZGVyLnN0YXRlKCdob21lJywge1xuICAgICAgICB1cmw6ICcvJyxcbiAgICAgICAgY29udHJvbGxlcjogJ0hvbWVDdHJsJyxcbiAgICAgICAgdGVtcGxhdGVVcmw6ICdqcy9ob21lL2hvbWUuaHRtbCdcbiAgICB9KTtcblxufSk7XG5cbmFwcC5jb250cm9sbGVyKCdIb21lQ3RybCcsIGZ1bmN0aW9uICgkc2NvcGUpIHtcblxuXG5cdFxufSk7IiwiJ3VzZSBzdHJpY3QnO1xuYXBwLmNvbmZpZyhmdW5jdGlvbigkc3RhdGVQcm92aWRlcikge1xuXG4gICRzdGF0ZVByb3ZpZGVyLnN0YXRlKCdtaW50Jywge1xuICAgIHVybDogJy9wcm9kdWN0L21pbnQnLFxuICAgIGNvbnRyb2xsZXI6ICdNaW50Q3RybCcsXG4gICAgdGVtcGxhdGVVcmw6ICdqcy9taW50L21pbnQuaHRtbCdcbiAgfSk7XG59KTtcblxuXG4iLCIndXNlIHN0cmljdCc7XG5hcHAuY29udHJvbGxlcignTWludEN0cmwnLCBmdW5jdGlvbigkc2NvcGUsIE1pbnRGYWN0b3J5KSB7XG4gIE1pbnRGYWN0b3J5LmdldE1pbnRzRGIoKS50aGVuKGZ1bmN0aW9uKGRhdGEpIHtcbiAgICAkc2NvcGUubWludHMgPSBkYXRhO1xuICB9KTtcbn0pO1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG5hcHAuZmFjdG9yeSgnTWludEZhY3RvcnknLCBmdW5jdGlvbigkaHR0cCkge1xuICByZXR1cm4ge1xuICAgIGdldE1pbnRzRGI6IGZ1bmN0aW9uKCkge1xuICAgICAgcmV0dXJuICRodHRwLmdldCgnL2FwaS9taW50cycpLnRoZW4oZnVuY3Rpb24ocmVzcG9uc2UpIHtcbiAgICAgICAgcmV0dXJuIHJlc3BvbnNlLmRhdGE7XG4gICAgICB9KTtcbiAgICB9LFxuICB9O1xufSk7XG4iLCIndXNlIHN0cmljdCc7XG4vLyB2YXIgc3RyaXBlID0gcmVxdWlyZShcInN0cmlwZVwiKShcInNrX3Rlc3RfV2h6dUJ2dmp1NkFLbDdLeUlLdGRXaVFmXCIpO1xuYXBwLmNvbmZpZyhmdW5jdGlvbigkc3RhdGVQcm92aWRlcikge1xuXG4gICAgJHN0YXRlUHJvdmlkZXIuc3RhdGUoJ3BheScsIHtcbiAgICAgICAgdXJsOiAnL3BheScsXG4gICAgICAgIGNvbnRyb2xsZXI6ICdwYXlDdHJsJyxcbiAgICAgICAgdGVtcGxhdGVVcmw6ICdqcy9wYXkvcGF5Lmh0bWwnXG4gICAgfSk7XG5cbn0pO1xuXG5hcHAuY29udHJvbGxlcigncGF5Q3RybCcsIGZ1bmN0aW9uKCRzY29wZSwgJHN0YXRlUGFyYW1zLCAkaHR0cCkge1xuICAgICRzY29wZS5jYXJ0VG9QYXkgPSBhbmd1bGFyLmZyb21Kc29uKHNlc3Npb25TdG9yYWdlLnRoaXNDYXJ0KVxuICAgICAgICAvL1RFTVBPUkFSWSEgRk9SIFRFU1RJTkdcbiAgICBjb25zb2xlLmxvZygnWW91ciBjYXJ0OiAnLCAkc2NvcGUuY2FydFRvUGF5KTtcbiAgICAkc2NvcGUudG90YWwgPSAwO1xuICAgICRzY29wZS5jYXJ0VG9QYXkuZm9yRWFjaChmdW5jdGlvbihlbCkge1xuICAgICAgICAkc2NvcGUudG90YWwgKz0gKGVsLnByaWNlKSAqIChlbC5ob3dNYW55KTtcbiAgICB9KVxuICAgICRzY29wZS50b3RhbE91dCA9ICckJyArICgkc2NvcGUudG90YWwgLyAxMDApO1xuICAgIC8vY2xlYXIgY2FyZCBkYXRhXG4gICAgJHNjb3BlLmNhcmQgPSB7XG4gICAgICAgIG5hbWU6XCJcIixcbiAgICAgICAgbnVtOiAwLFxuICAgICAgICBleHBtbzogMCxcbiAgICAgICAgZXhweXI6MCxcbiAgICAgICAgY3Z2OiAwLFxuICAgICAgICB0b3RhbDowXG4gICAgfVxuICAgICRzY29wZS5zdWJtaXRDYXJkID0gZnVuY3Rpb24oY2FyZCkge1xuICAgICAgICBjb25zb2xlLmxvZygnY2FyZDogJyxjYXJkKVxuICAgICAgICBjYXJkLnRvdGFsID0gJHNjb3BlLnRvdGFsO1xuICAgICAgICAkaHR0cC5wb3N0KCcvYXBpL3N1YnBheScsY2FyZCk7XG4gICAgfTtcblxufSk7IiwiJ3VzZSBzdHJpY3QnO1xuYXBwLmNvbmZpZyhmdW5jdGlvbigkc3RhdGVQcm92aWRlcikge1xuXG4gICAgJHN0YXRlUHJvdmlkZXIuc3RhdGUoJ3Byb2REZXRhaWwnLCB7XG4gICAgICAgIHVybDogJy9wcm9kdWN0L2FueXRoaW5nLzpwcm9kdScsXG4gICAgICAgIGNvbnRyb2xsZXI6ICdwcm9kRGV0YWlsQ3RybCcsXG4gICAgICAgIHRlbXBsYXRlVXJsOiAnanMvcHJvZGRldGFpbC9wcm9kZGV0YWlsLmh0bWwnXG4gICAgfSk7XG5cbn0pO1xuXG5hcHAuY29udHJvbGxlcigncHJvZERldGFpbEN0cmwnLCBmdW5jdGlvbigkc2NvcGUsICRzdGF0ZVBhcmFtcywgYWRkdG9jYXJ0KSB7XG4gICAgLy9URU1QT1JBUlkhIEZPUiBURVNUSU5HXG4gICAgY29uc29sZS5sb2coJHN0YXRlUGFyYW1zLnByb2R1LCAndGhpcyBpcyBwcm9kdScpO1xuXG4gICAgJHNjb3BlLnRoaXN0aXRsZSA9ICRzdGF0ZVBhcmFtcy5wcm9kdTtcblxuICAgICRzY29wZS5pdGVtID0gJHN0YXRlUGFyYW1zLnRpdGxlO1xuXG4gICAgJHNjb3BlLnByb2QgPSB7XG4gICAgICAgIHRpdGxlOiAnU2FtcGxlIFByb2R1Y3QnLFxuICAgICAgICBkZXNjcmlwdGlvbjogJ1RoaXMgcHJvZHVjdCBpcyBzbyBhd2Vzb21lISBJdFxcJ3MgdGFzdHkuJyxcbiAgICAgICAgcHJpY2U6IDM5OTksXG4gICAgICAgIGlzQ29mZmVlOiBmYWxzZSxcbiAgICAgICAgY2F0ZWdvcnk6IFsndGFzdHknLCAnYmVhbnMnLCAnbW1tJywgJ3Nyc2x5IGkgZ290IG5vdGhpbiddLFxuICAgICAgICBwaG90bzogJ25vbmUnXG4gICAgfTtcblxuICAgICRzY29wZS5wcm9kLnBob3RvID0gJ2ltYWdlcy8nICsgJHNjb3BlLnByb2QucGhvdG87XG4gICAgaWYgKCRzY29wZS5wcm9kLmlzQ29mZmVlICYmICRzY29wZS5wcm9kLnBob3RvID09PSAnaW1hZ2VzL25vbmUnKSB7XG4gICAgICAgIGNvbnNvbGUubG9nKCdiZWFucycpXG4gICAgICAgICRzY29wZS5wcm9kLnBob3RvID0gJ2ltYWdlcy9wbGFjZWhvbGRlckNvZi5qcGcnO1xuICAgIH0gZWxzZSBpZiAoISRzY29wZS5wcm9kLmlzQ29mZmVlICYmICRzY29wZS5wcm9kLnBob3RvID09PSAnaW1hZ2VzL25vbmUnKSB7XG4gICAgICAgICRzY29wZS5wcm9kLnBob3RvID0gJ2ltYWdlcy9wbGFjZWhvbGRlck1pbnQucG5nJztcbiAgICB9XG4gICAgJHNjb3BlLnByb2QucHJpY2VPdXQgPSAnJCcgKyAoJHNjb3BlLnByb2QucHJpY2UgLyAxMDApO1xuXG4gICAgJHNjb3BlLmFkZHRvY2FydCA9IGZ1bmN0aW9uKGRhdGEpe1xuICAgICAgICBhZGR0b2NhcnQuYWRkdG9jYXJ0KGRhdGEpO1xuICAgIH1cblxuXG59KTtcbiIsIid1c2Ugc3RyaWN0JztcbmFwcC5jb25maWcoZnVuY3Rpb24gKCRzdGF0ZVByb3ZpZGVyKSB7XG5cbiAgICAvLyBSZWdpc3RlciBvdXIgKmFib3V0KiBzdGF0ZS5cbiAgICAkc3RhdGVQcm92aWRlci5zdGF0ZSgnc2lnbmluJywge1xuICAgICAgICB1cmw6ICcvc2lnbmluJyxcbiAgICAgICAgY29udHJvbGxlcjogJ3NpZ25JbkNvbnRyb2xsZXInLFxuICAgICAgICB0ZW1wbGF0ZVVybDogJ2pzL3NpZ25pbi9zaWduaW4uaHRtbCdcbiAgICB9KTtcblxufSk7XG5cbmFwcC5jb250cm9sbGVyKCdzaWduSW5Db250cm9sbGVyJywgZnVuY3Rpb24gKCRzY29wZSwgJHdpbmRvdywgJGxvY2F0aW9uLCBzaWduaW5GYWN0b3J5KSB7XG5cdCRzY29wZS51c2VyID0ge1xuICAgICAgICBlbWFpbDogXCJcIixcbiAgICAgICAgcGFzc3dvcmQ6IFwiXCJcblx0fTtcblxuXG4gICAgJHNjb3BlLnVzZXJTaWduSW4gPSBmdW5jdGlvbihuZXdVc2VyKXtcbiAgICAgICAgc2lnbmluRmFjdG9yeS5nZXRVc2VyKG5ld1VzZXIpLnRoZW4oZnVuY3Rpb24oKXtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFwic3VjY2Vzc1wiKTtcbiAgICAgICAgICAgICR3aW5kb3cubG9jYXRpb24uaHJlZiA9ICcvJztcbiAgICAgICAgfSk7XG4gICAgfTtcblxuICAgICRzY29wZS5sb2dpbiA9IGZ1bmN0aW9uICgpe1xuICAgICAgICAkd2luZG93LmxvY2F0aW9uLmhyZWYgPSAnL2F1dGgvZ29vZ2xlJztcbiAgICB9O1xuICAgICRzY29wZS5sb2dpbmZiID0gZnVuY3Rpb24gKCl7XG4gICAgICAgICR3aW5kb3cubG9jYXRpb24uaHJlZiA9ICcvYXV0aC9mYWNlYm9vayc7XG4gICAgfTtcbn0pO1xuIiwiJ3VzZSBzdHJpY3QnO1xuYXBwLmNvbmZpZyhmdW5jdGlvbiAoJHN0YXRlUHJvdmlkZXIpIHtcblxuICAgIC8vIFJlZ2lzdGVyIG91ciAqYWJvdXQqIHN0YXRlLlxuICAgICRzdGF0ZVByb3ZpZGVyLnN0YXRlKCdzaWdudXAnLCB7XG4gICAgICAgIHVybDogJy9zaWdudXAnLFxuICAgICAgICBjb250cm9sbGVyOiAnc2lnblVwQ29udHJvbGxlcicsXG4gICAgICAgIHRlbXBsYXRlVXJsOiAnanMvc2lnbnVwL3NpZ251cC5odG1sJ1xuICAgIH0pO1xuXG59KTtcblxuYXBwLmNvbnRyb2xsZXIoJ3NpZ25VcENvbnRyb2xsZXInLCBmdW5jdGlvbiAoJHNjb3BlLCAkd2luZG93LCAkbG9jYXRpb24sIHNpZ251cEZhY3RvcnkpIHtcblx0JHNjb3BlLnVzZXIgPSB7XG4gICAgICAgIGVtYWlsOiBcIlwiLFxuICAgICAgICBwYXNzd29yZDogXCJcIlxuXHR9O1xuXG4gICAgJHNjb3BlLmdldENyZWF0ZWRVc2VyID0gZnVuY3Rpb24oKXtcbiAgICAgICAgc2lnbnVwRmFjdG9yeS5nZXRVc2VyKCkudGhlbihmdW5jdGlvbihkYXRhKXtcbiAgICAgICAgICAgICRzY29wZS51c2VyID0gZGF0YTtcbiAgICAgICAgfSk7XG4gICAgfTtcblxuICAgICRzY29wZS5uZXdVc2VyU2lnblVwID0gZnVuY3Rpb24obmV3VXNlcil7XG4gICAgICAgIHNpZ251cEZhY3RvcnkuYWRkTmV3VXNlcihuZXdVc2VyKS50aGVuKGZ1bmN0aW9uKCl7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcInN1Y2Nlc3NcIik7XG4gICAgICAgICAgICAkd2luZG93LmxvY2F0aW9uLmhyZWYgPSAnLyc7XG4gICAgICAgIH0pO1xuICAgIH07XG5cbiAgICAkc2NvcGUubG9naW4gPSBmdW5jdGlvbiAoKXtcbiAgICAgICAgJHdpbmRvdy5sb2NhdGlvbi5ocmVmID0gJy9hdXRoL2dvb2dsZSc7XG4gICAgfTtcbiAgICAkc2NvcGUubG9naW5mYiA9IGZ1bmN0aW9uICgpe1xuICAgICAgICAkd2luZG93LmxvY2F0aW9uLmhyZWYgPSAnL2F1dGgvZmFjZWJvb2snO1xuICAgIH07XG59KTtcblxuIiwiJ3VzZSBzdHJpY3QnO1xuYXBwLmZhY3RvcnkoJ2NsZWFyY2FydCcsIGZ1bmN0aW9uKCRjb29raWVzLCAkY29va2llU3RvcmUpe1xuXHRyZXR1cm4ge1xuXHRcdGNsZWFyb3V0Y2FydDogZnVuY3Rpb24oZnVsbGNhcnQpe1xuXHRcdFx0Y29uc29sZS5sb2coJGNvb2tpZXMucHJvZHVjdHMpO1xuXG5cdFx0XHR2YXIgd29ya2luZ2FycmF5ID0gJGNvb2tpZVN0b3JlLmdldCgncHJvZHVjdHMnKTtcblx0XHRcdHdvcmtpbmdhcnJheSA9IFtdO1xuXHRcdFx0dmFyIHByb2R1Y3RzID0gd29ya2luZ2FycmF5O1xuXHRcdFx0JGNvb2tpZVN0b3JlLnB1dCgncHJvZHVjdHMnKTtcblx0XHRcdGNvbnNvbGUubG9nKCRjb29raWVzLnByb2R1Y3RzLCAndGhpcyBpcyBjb29raWVzLnByb2R1Y3RzIGZyb20gZW1wdHkgY2FydCcpO1xuXHRcdH1cblx0fVxufSkiLCIndXNlIHN0cmljdCc7XG5hcHAuZmFjdG9yeSgnUmFuZG9tR3JlZXRpbmdzJywgZnVuY3Rpb24gKCkge1xuXG4gICAgdmFyIGdldFJhbmRvbUZyb21BcnJheSA9IGZ1bmN0aW9uIChhcnIpIHtcbiAgICAgICAgcmV0dXJuIGFycltNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiBhcnIubGVuZ3RoKV07XG4gICAgfTtcblxuICAgIHZhciBncmVldGluZ3MgPSBbXG4gICAgICAgICdJIGtub3cgdGhhdCB5b3UganVzdCBkcmFuayBzb21lIGNvZmZlZS4uLiBoYXZlIGEgbWludC4uLicsXG4gICAgICAgICdVbW1tLi4uLi4uIFlvdSBuZWVkIGEgbWludC4uLicsXG4gICAgICAgICdIZWxsbywgc21lbGx5IGh1bWFuLicsXG4gICAgICAgICdTby4uLiBob3cgZG8geW91IGZlZWwgYWJvdXQgaGF2aW5nIGEgbWludCByaWdodCBub3c/JyxcbiAgICAgICAgJ0R1ZGUuIFlvdSBjYW5ub3QgZWF0IGVnZyBzYWxhZCB3aXRoIGNvZmZlZSB1bmxlc3MgeW91IHRha2UgYSBtaW50LicsXG4gICAgICAgICdTZXJpb3VzbHkuIENvZmZlZSB3aXRoIHNhbG1vbiBzYWxhZD8gVGFrZSBhIG1pbnQuJywgXG4gICAgICAgICdXaGF0XFwncyB5b3VyIHByb2JsZW0gd2l0aCBtaW50cz8gWW91IG5lZWQgb25lLidcbiAgICBdO1xuXG4gICAgcmV0dXJuIHtcbiAgICAgICAgZ3JlZXRpbmdzOiBncmVldGluZ3MsXG4gICAgICAgIGdldFJhbmRvbUdyZWV0aW5nOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICByZXR1cm4gZ2V0UmFuZG9tRnJvbUFycmF5KGdyZWV0aW5ncyk7XG4gICAgICAgIH1cbiAgICB9O1xuXG59KTsiLCIndXNlIHN0cmljdCc7XG5hcHAuZmFjdG9yeSgncmVtb3ZlaXRlbScsIGZ1bmN0aW9uKCRjb29raWVzLCAkY29va2llU3RvcmUpe1xuXHRyZXR1cm4ge1xuXHRcdHJlbW92ZWZyb21jYXJ0OiBmdW5jdGlvbihpdGVtdG9nbyl7XG5cdFx0XHRjb25zb2xlLmxvZyhpdGVtdG9nbyk7XG5cdFx0XHR2YXIgd29ya2FycmF5ID0gJGNvb2tpZVN0b3JlLmdldCgncHJvZHVjdHMnKTtcblx0XHRcdGNvbnNvbGUubG9nKHdvcmthcnJheSwgJ3RoaXMgaXMgd29ya2FycmF5Jyk7XG5cblx0XHRcdGZvciAodmFyIGk9MDsgaTx3b3JrYXJyYXkubGVuZ3RoOyBpKyspe1xuXHRcdFx0XHRpZiAod29ya2FycmF5W2ldID09PSBpdGVtdG9nbyl7XG5cdFx0XHRcdFx0dmFyIHJlbW92ZWQgPSB3b3JrYXJyYXkuc3BsaWNlKGksIDEpO1xuXHRcdFx0XHRcdHZhciBwcm9kdWN0cyA9IHdvcmthcnJheTtcblx0XHRcdFx0XHQkY29va2llU3RvcmUucHV0KCdwcm9kdWN0cycpO1xuXHRcdFx0XHR9IGVsc2UgXG5cdFx0XHRcdGFsZXJ0KCdZb3UgZG8gbm90IGhhdmUgdGhpcyBpdGVtIGluIHlvdXIgY2FydCcpO1xuXG5cdFx0XHR9IFxuXHRcdFx0XG5cdFx0XHRjb25zb2xlLmxvZygkY29va2llcy5wcm9kdWN0cywgJ3RoaXMgaXMgY29va2llcy5wcm9kdWN0cyBmcm9tIHJlbW92ZSBvbmUgaXRlbScpO1xuXHRcdH1cblx0fVxufSlcblxuIiwiJ3VzZSBzdHJpY3QnO1xuIiwiJ3VzZSBzdHJpY3QnO1xuYXBwLmZhY3RvcnkoJ2FkZHRvY2FydCcsIGZ1bmN0aW9uKCRjb29raWVzLCAkY29va2llU3RvcmUpe1xuXHRyZXR1cm4ge1xuXHRcdGFkZHRvY2FydDogZnVuY3Rpb24oaXRlbXRvYWRkKXtcblxuXHRcdFx0Y29uc29sZS5sb2coJ3RoaXMgaXMgZmlyc3QgJGNvb2tpZXMnLCAkY29va2llcy5wcm9kdWN0cyk7XG4gICAgICAgIGNvbnNvbGUubG9nKCdoaXQgYnV0dG9uIHRoaXMgY29tZXMgdGhyb3VnaCcsIGl0ZW10b2FkZCk7XG4gICAgICAgIHZhciBwcm9kYXJyID0gJGNvb2tpZVN0b3JlLmdldCgncHJvZHVjdHMnKTtcbiAgICAgICAgcHJvZGFyci5wdXNoKGl0ZW10b2FkZCk7XG4gICAgICAgICRjb29raWVTdG9yZS5wdXQoJ3Byb2R1Y3RzJywgcHJvZGFycik7XG5cblx0XHR9XG5cdH1cbn0pIiwiXCJ1c2Ugc3RyaWN0XCI7XG5hcHAuZmFjdG9yeSgnYWRtaW5GYWN0b3J5JywgZnVuY3Rpb24oJGh0dHApe1xuXHRyZXR1cm4ge1xuXHRcdGdldFVzZXJzOiBmdW5jdGlvbigpe1xuXHRcdFx0cmV0dXJuICRodHRwLmdldCgnL2FwaS9hZG1pbi9hbGxVc2VycycpLnRoZW4oZnVuY3Rpb24ocmVzcG9uc2Upe1xuXHRcdFx0XHRyZXR1cm4gcmVzcG9uc2UuZGF0YTtcblx0XHRcdH0pO1xuXHRcdH0sXG5cdFx0YWRtaW5Vc2VyIDogZnVuY3Rpb24gKHVzZXIpIHtcblx0XHRcdHJldHVybiAkaHR0cC5wb3N0KCcvYXBpL2FkbWluL2FkbWluVXNlcicsIHtlbWFpbDp1c2VyfSk7XG5cdFx0fVxuXHR9O1xufSk7XG5cblxuIiwiJ3VzZSBzdHJpY3QnO1xuYXBwLmZhY3RvcnkoJ0FkZFRvQ2FydCcsIGZ1bmN0aW9uKCkge1xuXG4gICAgICAgICAgICB2YXIgY2FydGNvbnRlbnQgPSB7XG4gICAgICAgICAgICAgICAgdXNlcjogcmVxLmJvZHkuY29va2llcy5jYXJ0LFxuICAgICAgICAgICAgICAgIHByb2R1Y3RzOiBbXVxuXG4gIH07XG5cbiAgcmV0dXJuIHtcblxuICAgIHNlbGVjdGluZzogZnVuY3Rpb24ocHJvZHVjdGluZm8pIHtcbiAgICAgIHZhciB0aGlzY2xpY2sgPSB7fTtcbiAgICAgIHRoaXNjbGljay5wcm9kSWQgPSBwcm9kdWN0aW5mby5faWQ7XG4gICAgICB0aGlzY2xpY2suUHJpY2UgPSBwcm9kdWN0aW5mby5wcmljZTtcbiAgICAgIHRoaXNjbGljay5RdWFudGl0eSA9IHByb2R1Y3RpbmZvLmhvd01hbnk7XG5cbiAgICAgIGNhcnRjb250ZW50LnByb2R1Y3RzLnB1c2godGhpc2NsaWNrKTtcbiAgICB9LFxuXG5cblxuICAgIGFkZGVkVG9DYXJ0OiBmdW5jdGlvbigpIHtcbiAgICAgIHJldHVybiBzZWxlY3RpbmcoY2xpY2tpbmZvKTtcbiAgICB9XG5cblxuICB9O1xuXG59KTtcbiIsIlwidXNlIHN0cmljdFwiO1xuYXBwLmZhY3RvcnkoJ3NpZ25pbkZhY3RvcnknLCBmdW5jdGlvbigkaHR0cCl7XG5cdHJldHVybiB7XG5cdFx0Z2V0VXNlcjogZnVuY3Rpb24oKXtcblx0XHRcdHJldHVybiAkaHR0cC5wb3N0KCcvYXBpL3NpZ25pbi9uZXdVc2VyJykudGhlbihmdW5jdGlvbihyZXNwb25zZSl7XG5cdFx0XHRcdHJldHVybiByZXNwb25zZS5kYXRhO1xuXHRcdFx0fSk7XG5cdFx0fSxcblx0XHRhZGROZXdVc2VyIDogZnVuY3Rpb24gKHVzZXIpIHtcblx0XHRcdHJldHVybiAkaHR0cC5wb3N0KCcvYXBpL3NpZ251cC9uZXdVc2VyJywgdXNlcik7XG5cdFx0fVxuXHR9O1xufSk7XG4iLCJcInVzZSBzdHJpY3RcIjtcbmFwcC5mYWN0b3J5KCdzaWdudXBGYWN0b3J5JywgZnVuY3Rpb24oJGh0dHApe1xuXHRyZXR1cm4ge1xuXHRcdGdldFVzZXI6IGZ1bmN0aW9uKCl7XG5cdFx0XHRyZXR1cm4gJGh0dHAuZ2V0KCcvYXBpL25ld1VzZXInKS50aGVuKGZ1bmN0aW9uKHJlc3BvbnNlKXtcblx0XHRcdFx0cmV0dXJuIHJlc3BvbnNlLmRhdGE7XG5cdFx0XHR9KTtcblx0XHR9LFxuXHRcdGFkZE5ld1VzZXIgOiBmdW5jdGlvbiAodXNlcikge1xuXHRcdFx0cmV0dXJuICRodHRwLnBvc3QoJy9hcGkvc2lnbnVwL25ld1VzZXInLCB1c2VyKTtcblx0XHR9XG5cdH07XG59KTtcblxuXG4iLCIndXNlIHN0cmljdCc7XG5hcHAuZGlyZWN0aXZlKCduYXZiYXInLCBmdW5jdGlvbigpIHtcbiAgcmV0dXJuIHtcbiAgICByZXN0cmljdDogJ0UnLFxuICAgIHNjb3BlOiB7XG4gICAgICBpdGVtczogJz0nXG4gICAgfSxcbiAgICB0ZW1wbGF0ZVVybDogJ2pzL2NvbW1vbi9kaXJlY3RpdmVzL25hdmJhci9uYXZiYXIuaHRtbCdcbiAgfTtcbn0pO1xuIiwiJ3VzZSBzdHJpY3QnO1xuYXBwLmRpcmVjdGl2ZSgncmFuZG9HcmVldGluZycsIGZ1bmN0aW9uIChSYW5kb21HcmVldGluZ3MpIHtcblxuICAgIHJldHVybiB7XG4gICAgICAgIHJlc3RyaWN0OiAnRScsXG4gICAgICAgIHRlbXBsYXRlVXJsOiAnanMvY29tbW9uL2RpcmVjdGl2ZXMvcmFuZG8tZ3JlZXRpbmcvcmFuZG8tZ3JlZXRpbmcuaHRtbCcsXG4gICAgICAgIGxpbms6IGZ1bmN0aW9uIChzY29wZSkge1xuICAgICAgICAgICAgc2NvcGUuZ3JlZXRpbmcgPSBSYW5kb21HcmVldGluZ3MuZ2V0UmFuZG9tR3JlZXRpbmcoKTtcbiAgICAgICAgfVxuICAgIH07XG5cbn0pOyIsIid1c2Ugc3RyaWN0JztcbmFwcC5kaXJlY3RpdmUoJ3N0YWNrJywgZnVuY3Rpb24oKSB7XG4gIHJldHVybiB7XG4gICAgcmVzdHJpY3Q6ICdFJyxcbiAgICB0ZW1wbGF0ZVVybDogJ2pzL2NvbW1vbi9kaXJlY3RpdmVzL3N0YWNrU3RvcmVMb2dvL3N0YWNrU3RvcmVMb2dvLmh0bWwnXG4gIH07XG59KTtcbiJdLCJzb3VyY2VSb290IjoiL3NvdXJjZS8ifQ==