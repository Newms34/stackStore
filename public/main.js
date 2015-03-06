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
    'http://www.itsugar.com/media/catalog/product/cache/1/image/9df78eab33525d08d6e5fb8d27136e95/g/r/grumpy_cat_you_need_a_mint.jpg',
    'http://www.itsugar.com/media/catalog/product/cache/1/image/9df78eab33525d08d6e5fb8d27136e95/g/r/grumpy_cat_you_need_a_mint.jpg',
    'http://www.itsugar.com/media/catalog/product/cache/1/image/9df78eab33525d08d6e5fb8d27136e95/g/r/grumpy_cat_you_need_a_mint.jpg',
    'http://www.itsugar.com/media/catalog/product/cache/1/image/9df78eab33525d08d6e5fb8d27136e95/g/r/grumpy_cat_you_need_a_mint.jpg',
    'http://www.itsugar.com/media/catalog/product/cache/1/image/9df78eab33525d08d6e5fb8d27136e95/g/r/grumpy_cat_you_need_a_mint.jpg',
    'http://www.itsugar.com/media/catalog/product/cache/1/image/9df78eab33525d08d6e5fb8d27136e95/g/r/grumpy_cat_you_need_a_mint.jpg'
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


'use strict';
app.config(function ($stateProvider) {

    $stateProvider.state('home', {
        url: '/',
        controller: 'HomeCtrl',
        templateUrl: 'js/home/home.html'
    });

});

app.controller('HomeCtrl', function($scope, CoffeeFactory, MintFactory) {

  CoffeeFactory.getCoffeeDb().then(function(coffeeData) {
    MintFactory.getMintsDb().then(function(mintData) {
      $scope.products = shuffleArray(coffeeData.concat(mintData));
    });
  });

  function shuffleArray(array) {
    for (var i = array.length - 1; i > 0; i--) {
      var j = Math.floor(Math.random() * (i + 1));
      var temp = array[i];
      array[i] = array[j];
      array[j] = temp;
    }
    return array;
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
        signupFactory.addNewUser(newUser).then(function(data){
            if (data.success === true)
            console.log("success");
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
        'What\'s your problem with mints? You need one.',
        'Your breath stinks.'
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
			return $http.get('/api/user/').then(function(response){
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC5qcyIsImFib3V0L2Fib3V0LmpzIiwiYWRtaW4vYWRtaW4uanMiLCJjYXJ0L2NhcnQuanMiLCJjb2ZmZWUvY29mZmVlLWNvbmZpZy5qcyIsImNvZmZlZS9jb2ZmZWUtY29udHJvbGxlci5qcyIsImNvZmZlZS9jb2ZmZWUtZmFjdG9yeS5qcyIsImhvbWUvaG9tZS1jb25maWcuanMiLCJob21lL2hvbWUtY29udHJvbGxlci5qcyIsImZzYS9mc2EtcHJlLWJ1aWx0LmpzIiwibWludC9taW50LWNvbmZpZy5qcyIsIm1pbnQvbWludC1jb250cm9sbGVyLmpzIiwibWludC9taW50LWZhY3RvcnkuanMiLCJwYXkvcGF5LmpzIiwicHJvZGRldGFpbC9wcm9kZGV0YWlsLmpzIiwic2lnbmluL3NpZ25pbi5qcyIsInNpZ251cC9zaWdudXAuanMiLCJjb21tb24vZmFjdG9yaWVzL0NsZWFyY2FydC5qcyIsImNvbW1vbi9mYWN0b3JpZXMvUmFuZG9tR3JlZXRpbmdzLmpzIiwiY29tbW9uL2ZhY3Rvcmllcy9SZW1vdmVpdGVtcy5qcyIsImNvbW1vbi9mYWN0b3JpZXMvYWRkdG9jYXJ0LmpzIiwiY29tbW9uL2ZhY3Rvcmllcy9hZG1pbkZhY3RvcnkuanMiLCJjb21tb24vZmFjdG9yaWVzL2NhcnRmYWN0b3J5LmpzIiwiY29tbW9uL2ZhY3Rvcmllcy9zaWduaW5GYWN0b3J5LmpzIiwiY29tbW9uL2ZhY3Rvcmllcy9zaWdudXBGYWN0b3J5LmpzIiwiY29tbW9uL2RpcmVjdGl2ZXMvbmF2YmFyL25hdmJhci5qcyIsImNvbW1vbi9kaXJlY3RpdmVzL3JhbmRvLWdyZWV0aW5nL3JhbmRvLWdyZWV0aW5nLmpzIiwiY29tbW9uL2RpcmVjdGl2ZXMvc3RhY2tTdG9yZUxvZ28vc3RhY2tTdG9yZUxvZ28uanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUMxQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ3pCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ3hCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQy9EQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ1RBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDTkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUNaQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDVkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUNsQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDakhBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ1hBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDTkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDWEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUNwQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQzNDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ2pDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ3ZDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDYkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDMUJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ3ZCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDYkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUNmQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQzlCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDYkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUNmQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDVkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDWEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsImZpbGUiOiJtYWluLmpzIiwic291cmNlc0NvbnRlbnQiOlsiJ3VzZSBzdHJpY3QnO1xudmFyIGFwcCA9IGFuZ3VsYXIubW9kdWxlKCdGdWxsc3RhY2tHZW5lcmF0ZWRBcHAnLCBbJ3VpLnJvdXRlcicsICdmc2FQcmVCdWlsdCcsICduZ0Nvb2tpZXMnXSk7XG5cbmFwcC5jb250cm9sbGVyKCdNYWluQ29udHJvbGxlcicsIGZ1bmN0aW9uICgkc2NvcGUsICRjb29raWVzLCAkY29va2llU3RvcmUpIHtcblxuICAgICRjb29raWVTdG9yZS5yZW1vdmUoXCJwcm9kdWN0c1wiKTtcbiAgICBcblxuICAgICRjb29raWVTdG9yZS5wdXQoJ3Byb2R1Y3RzJywgW10pO1xuICAgIGNvbnNvbGUubG9nKCRjb29raWVzLCAndGhpcyBpcyBjb29raWUnKTtcblxuICAvLyBHaXZlbiB0byB0aGUgPG5hdmJhcj4gZGlyZWN0aXZlIHRvIHNob3cgdGhlIG1lbnUuXG4gICRzY29wZS5tZW51SXRlbXMgPSBbe1xuICAgIGxhYmVsOiAnSG9tZScsXG4gICAgc3RhdGU6ICdob21lJ1xuICB9LCB7XG4gICAgbGFiZWw6ICdDb2ZmZWUnLFxuICAgIHN0YXRlOiAnY29mZmVlJ1xuICB9LCB7XG4gICAgbGFiZWw6ICdNaW50JyxcbiAgICBzdGF0ZTogJ21pbnQnXG4gIH0sIHtcbiAgICBsYWJlbDogJ0Fib3V0JyxcbiAgICBzdGF0ZTogJ2Fib3V0J1xuICB9LCB7XG4gICAgbGFiZWw6ICdTaWduVXAnLFxuICAgIHN0YXRlOiAnc2lnbnVwJ1xuICB9LCB7ICAgIGxhYmVsOiAnU2lnbiBJbicsXG4gICAgc3RhdGU6ICdzaWduaW4nXG4gIH0sIHtcbiAgICBsYWJlbDogJ0NhcnQnLFxuICAgIHN0YXRlOiAnY2FydCdcbiAgfV07XG59KTtcblxuXG5hcHAuY29uZmlnKGZ1bmN0aW9uKCR1cmxSb3V0ZXJQcm92aWRlciwgJGxvY2F0aW9uUHJvdmlkZXIpIHtcbiAgLy8gVGhpcyB0dXJucyBvZmYgaGFzaGJhbmcgdXJscyAoLyNhYm91dCkgYW5kIGNoYW5nZXMgaXQgdG8gc29tZXRoaW5nIG5vcm1hbCAoL2Fib3V0KVxuICAkbG9jYXRpb25Qcm92aWRlci5odG1sNU1vZGUodHJ1ZSk7XG4gIC8vIElmIHdlIGdvIHRvIGEgVVJMIHRoYXQgdWktcm91dGVyIGRvZXNuJ3QgaGF2ZSByZWdpc3RlcmVkLCBnbyB0byB0aGUgXCIvXCIgdXJsLlxuICAkdXJsUm91dGVyUHJvdmlkZXIub3RoZXJ3aXNlKCcvJyk7XG59KTtcbiIsIid1c2Ugc3RyaWN0JztcbmFwcC5jb25maWcoZnVuY3Rpb24oJHN0YXRlUHJvdmlkZXIpIHtcblxuICAvLyBSZWdpc3RlciBvdXIgKmFib3V0KiBzdGF0ZS5cbiAgJHN0YXRlUHJvdmlkZXIuc3RhdGUoJ2Fib3V0Jywge1xuICAgIHVybDogJy9hYm91dCcsXG4gICAgY29udHJvbGxlcjogJ0Fib3V0Q29udHJvbGxlcicsXG4gICAgdGVtcGxhdGVVcmw6ICdqcy9hYm91dC9hYm91dC5odG1sJ1xuICB9KTtcblxufSk7XG5cbmFwcC5jb250cm9sbGVyKCdBYm91dENvbnRyb2xsZXInLCBmdW5jdGlvbigkc2NvcGUpIHtcblxuICAvLyBJbWFnZXMgb2YgYmVhdXRpZnVsIEZ1bGxzdGFjayBwZW9wbGUuXG4gICRzY29wZS5pbWFnZXMgPSBbXG4gICAgJ2h0dHA6Ly93d3cuaXRzdWdhci5jb20vbWVkaWEvY2F0YWxvZy9wcm9kdWN0L2NhY2hlLzEvaW1hZ2UvOWRmNzhlYWIzMzUyNWQwOGQ2ZTVmYjhkMjcxMzZlOTUvZy9yL2dydW1weV9jYXRfeW91X25lZWRfYV9taW50LmpwZycsXG4gICAgJ2h0dHA6Ly93d3cuaXRzdWdhci5jb20vbWVkaWEvY2F0YWxvZy9wcm9kdWN0L2NhY2hlLzEvaW1hZ2UvOWRmNzhlYWIzMzUyNWQwOGQ2ZTVmYjhkMjcxMzZlOTUvZy9yL2dydW1weV9jYXRfeW91X25lZWRfYV9taW50LmpwZycsXG4gICAgJ2h0dHA6Ly93d3cuaXRzdWdhci5jb20vbWVkaWEvY2F0YWxvZy9wcm9kdWN0L2NhY2hlLzEvaW1hZ2UvOWRmNzhlYWIzMzUyNWQwOGQ2ZTVmYjhkMjcxMzZlOTUvZy9yL2dydW1weV9jYXRfeW91X25lZWRfYV9taW50LmpwZycsXG4gICAgJ2h0dHA6Ly93d3cuaXRzdWdhci5jb20vbWVkaWEvY2F0YWxvZy9wcm9kdWN0L2NhY2hlLzEvaW1hZ2UvOWRmNzhlYWIzMzUyNWQwOGQ2ZTVmYjhkMjcxMzZlOTUvZy9yL2dydW1weV9jYXRfeW91X25lZWRfYV9taW50LmpwZycsXG4gICAgJ2h0dHA6Ly93d3cuaXRzdWdhci5jb20vbWVkaWEvY2F0YWxvZy9wcm9kdWN0L2NhY2hlLzEvaW1hZ2UvOWRmNzhlYWIzMzUyNWQwOGQ2ZTVmYjhkMjcxMzZlOTUvZy9yL2dydW1weV9jYXRfeW91X25lZWRfYV9taW50LmpwZycsXG4gICAgJ2h0dHA6Ly93d3cuaXRzdWdhci5jb20vbWVkaWEvY2F0YWxvZy9wcm9kdWN0L2NhY2hlLzEvaW1hZ2UvOWRmNzhlYWIzMzUyNWQwOGQ2ZTVmYjhkMjcxMzZlOTUvZy9yL2dydW1weV9jYXRfeW91X25lZWRfYV9taW50LmpwZydcbiAgXTtcblxufSk7XG4iLCIndXNlIHN0cmljdCc7XG5hcHAuY29uZmlnKGZ1bmN0aW9uKCRzdGF0ZVByb3ZpZGVyKSB7XG5cbiAgICAvLyBSZWdpc3RlciBvdXIgKmFib3V0KiBzdGF0ZS5cbiAgICAkc3RhdGVQcm92aWRlci5zdGF0ZSgnYWRtaW4nLCB7XG4gICAgICAgIHVybDogJy9hZG1pbicsXG4gICAgICAgIGNvbnRyb2xsZXI6ICdhZG1pbkNvbnRyb2xsZXInLFxuICAgICAgICB0ZW1wbGF0ZVVybDogJ2pzL2FkbWluL2FkbWluLmh0bWwnXG4gICAgfSk7XG5cbn0pO1xuXG5hcHAuY29udHJvbGxlcignYWRtaW5Db250cm9sbGVyJywgZnVuY3Rpb24oJHNjb3BlLCBhZG1pbkZhY3RvcnkpIHtcbiAgICAkc2NvcGUudXNlcnMgPSB7fTtcbiAgICBhZG1pbkZhY3RvcnkuZ2V0VXNlcnMoKS50aGVuKGZ1bmN0aW9uKGRhdGEpIHtcbiAgICAgICAgJHNjb3BlLnVzZXJzID0gZGF0YTtcbiAgICB9KTtcbiAgICAkc2NvcGUuYWRtaW5pZnkgPSBmdW5jdGlvbihuYW1lKXtcbiAgICAgICAgYWRtaW5GYWN0b3J5LmFkbWluVXNlcihuYW1lKS50aGVuKGZ1bmN0aW9uKGRhdGEpe1xuICAgICAgICAgICAgY29uc29sZS5sb2coJ2RvbmUhJylcbiAgICAgICAgfSk7XG4gICAgfTtcbn0pO1xuXG4iLCIndXNlIHN0cmljdCc7XG5hcHAuY29uZmlnKGZ1bmN0aW9uKCRzdGF0ZVByb3ZpZGVyKSB7XG5cbiAgICAkc3RhdGVQcm92aWRlci5zdGF0ZSgnY2FydCcsIHtcbiAgICAgICAgdXJsOiAnL2NhcnQnLFxuICAgICAgICBjb250cm9sbGVyOiAnY2FydEN0cmwnLFxuICAgICAgICB0ZW1wbGF0ZVVybDogJ2pzL2NhcnQvY2FydC5odG1sJ1xuICAgIH0pO1xuXG59KTtcblxuYXBwLmNvbnRyb2xsZXIoJ2NhcnRDdHJsJywgZnVuY3Rpb24oJHNjb3BlLCByZW1vdmVpdGVtLCBjbGVhcmNhcnQpIHtcblxuICAgIC8vVEVNUE9SQVJZISBGT1IgVEVTVElOR1xuICAgIC8vdGhpcyByZW5kZXJzIHRoZSBjYXJ0XG4gICAgJHNjb3BlLnNlc2hPcmRlcnMgPSBbe1xuICAgICAgICB0aXRsZTogJ1Rlc3QgSXRlbSAwMScsXG4gICAgICAgIGRlc2NyaXB0aW9uOiAnQWxtb3N0IGFzIGdvb2QgYXMgVGVzdCBJdGVtIDAyIScsXG4gICAgICAgIHByaWNlOiAzOTk5LFxuICAgICAgICBob3dNYW55OiA1XG4gICAgfSwge1xuICAgICAgICB0aXRsZTogJ1Rlc3QgSXRlbSAwMicsXG4gICAgICAgIGRlc2NyaXB0aW9uOiAnTmV3IGFuZCBJbXByb3ZlZCEhJyxcbiAgICAgICAgcHJpY2U6IDQyOTksXG4gICAgICAgIGhvd01hbnk6IDNcbiAgICB9LCB7XG4gICAgICAgIHRpdGxlOiAnVGVzdCBJdGVtIDAzJyxcbiAgICAgICAgZGVzY3JpcHRpb246ICdCYXJnYWluIFRlc3QgSXRlbSEnLFxuICAgICAgICBwcmljZTogMTk5OSxcbiAgICAgICAgaG93TWFueTogNlxuICAgIH0sIHtcbiAgICAgICAgdGl0bGU6ICdUZXN0IEl0ZW0gMDQnLFxuICAgICAgICBkZXNjcmlwdGlvbjogJ0ZhbWlseSBTaXplZCBUZXN0IGl0ZW0hJyxcbiAgICAgICAgcHJpY2U6IDg5OTksXG4gICAgICAgIGhvd01hbnk6IDFcbiAgICB9XTtcblxuICAgICRzY29wZS5zZXNoT3JkZXJzLm1hcChmdW5jdGlvbihlbCkge1xuICAgICAgICBlbC5wcmljZU91dCA9ICckJyArIGVsLnByaWNlIC8gMTAwO1xuICAgICAgICBlbC5zVG90ID0gJyQnICsgKChlbC5wcmljZSAqIGVsLmhvd01hbnkpIC8gMTAwKTtcbiAgICB9KTtcblxuICAgICRzY29wZS50b3RhbCA9IDA7XG5cbiAgICAkc2NvcGUuc2VzaE9yZGVycy5mb3JFYWNoKGZ1bmN0aW9uKGVsKSB7XG4gICAgICAgICRzY29wZS50b3RhbCArPSBlbC5wcmljZSAqIGVsLmhvd01hbnk7XG4gICAgfSk7XG5cbiAgICAkc2NvcGUudG90YWwgPSAnJCcgKyAkc2NvcGUudG90YWwvMTAwO1xuICAgICRzY29wZS5nb1BheSA9IGZ1bmN0aW9uKCl7XG4gICAgICAgIHNlc3Npb25TdG9yYWdlLnRoaXNDYXJ0ID0gYW5ndWxhci50b0pzb24oJHNjb3BlLnNlc2hPcmRlcnMpO1xuICAgICAgICAkc3RhdGUuZ28oJ3BheScpO1xuICAgIH07XG5cbiAgICAkc2NvcGUuZGVsZXRlaXRlbSA9IGZ1bmN0aW9uKGRhdGEpe1xuICAgICAgICByZW1vdmVpdGVtLnJlbW92ZWZyb21jYXJ0KGRhdGEpXG4gICAgfSBcblxuICAgICRzY29wZS5jbGVhcnRoZWNhcnQgPSBmdW5jdGlvbihpbmZvKXtcbiAgICAgICAgY2xlYXJjYXJ0LmNsZWFyb3V0Y2FydChpbmZvKTtcbiAgICB9XG5cbn0pO1xuIiwiJ3VzZSBzdHJpY3QnO1xuYXBwLmNvbmZpZyhmdW5jdGlvbigkc3RhdGVQcm92aWRlcikge1xuXG4gICRzdGF0ZVByb3ZpZGVyLnN0YXRlKCdjb2ZmZWUnLCB7XG4gICAgdXJsOiAnL3Byb2R1Y3QvY29mZmVlJyxcbiAgICBjb250cm9sbGVyOiAnQ29mZmVlQ3RybCcsXG4gICAgdGVtcGxhdGVVcmw6ICdqcy9jb2ZmZWUvY29mZmVlLmh0bWwnXG4gIH0pO1xufSk7XG4iLCIndXNlIHN0cmljdCc7XG5hcHAuY29udHJvbGxlcignQ29mZmVlQ3RybCcsIGZ1bmN0aW9uKCRzY29wZSwgQ29mZmVlRmFjdG9yeSkge1xuICBDb2ZmZWVGYWN0b3J5LmdldENvZmZlZURiKCkudGhlbihmdW5jdGlvbihkYXRhKSB7XG4gICAgJHNjb3BlLmNvZmZlZSA9IGRhdGE7XG4gIH0pO1xufSk7XG4iLCIndXNlIHN0cmljdCc7XG5cbmFwcC5mYWN0b3J5KCdDb2ZmZWVGYWN0b3J5JywgZnVuY3Rpb24oJGh0dHApIHtcbiAgcmV0dXJuIHtcbiAgICBnZXRDb2ZmZWVEYjogZnVuY3Rpb24oKSB7XG4gICAgICByZXR1cm4gJGh0dHAuZ2V0KCcvYXBpL2NvZmZlZScpLnRoZW4oZnVuY3Rpb24ocmVzcG9uc2UpIHtcbiAgICAgICAgcmV0dXJuIHJlc3BvbnNlLmRhdGE7XG4gICAgICB9KTtcbiAgICB9LFxuICB9O1xufSk7XG5cbiIsIid1c2Ugc3RyaWN0JztcbmFwcC5jb25maWcoZnVuY3Rpb24gKCRzdGF0ZVByb3ZpZGVyKSB7XG5cbiAgICAkc3RhdGVQcm92aWRlci5zdGF0ZSgnaG9tZScsIHtcbiAgICAgICAgdXJsOiAnLycsXG4gICAgICAgIGNvbnRyb2xsZXI6ICdIb21lQ3RybCcsXG4gICAgICAgIHRlbXBsYXRlVXJsOiAnanMvaG9tZS9ob21lLmh0bWwnXG4gICAgfSk7XG5cbn0pO1xuIiwiYXBwLmNvbnRyb2xsZXIoJ0hvbWVDdHJsJywgZnVuY3Rpb24oJHNjb3BlLCBDb2ZmZWVGYWN0b3J5LCBNaW50RmFjdG9yeSkge1xuXG4gIENvZmZlZUZhY3RvcnkuZ2V0Q29mZmVlRGIoKS50aGVuKGZ1bmN0aW9uKGNvZmZlZURhdGEpIHtcbiAgICBNaW50RmFjdG9yeS5nZXRNaW50c0RiKCkudGhlbihmdW5jdGlvbihtaW50RGF0YSkge1xuICAgICAgJHNjb3BlLnByb2R1Y3RzID0gc2h1ZmZsZUFycmF5KGNvZmZlZURhdGEuY29uY2F0KG1pbnREYXRhKSk7XG4gICAgfSk7XG4gIH0pO1xuXG4gIGZ1bmN0aW9uIHNodWZmbGVBcnJheShhcnJheSkge1xuICAgIGZvciAodmFyIGkgPSBhcnJheS5sZW5ndGggLSAxOyBpID4gMDsgaS0tKSB7XG4gICAgICB2YXIgaiA9IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIChpICsgMSkpO1xuICAgICAgdmFyIHRlbXAgPSBhcnJheVtpXTtcbiAgICAgIGFycmF5W2ldID0gYXJyYXlbal07XG4gICAgICBhcnJheVtqXSA9IHRlbXA7XG4gICAgfVxuICAgIHJldHVybiBhcnJheTtcbiAgfVxufSk7XG4iLCIoZnVuY3Rpb24gKCkge1xuXG4gICAgJ3VzZSBzdHJpY3QnO1xuXG4gICAgLy8gSG9wZSB5b3UgZGlkbid0IGZvcmdldCBBbmd1bGFyISBEdWgtZG95LlxuICAgIGlmICghd2luZG93LmFuZ3VsYXIpIHRocm93IG5ldyBFcnJvcignSSBjYW5cXCd0IGZpbmQgQW5ndWxhciEnKTtcblxuICAgIHZhciBhcHAgPSBhbmd1bGFyLm1vZHVsZSgnZnNhUHJlQnVpbHQnLCBbXSk7XG5cbiAgICBhcHAuZmFjdG9yeSgnU29ja2V0JywgZnVuY3Rpb24gKCRsb2NhdGlvbikge1xuXG4gICAgICAgIGlmICghd2luZG93LmlvKSB0aHJvdyBuZXcgRXJyb3IoJ3NvY2tldC5pbyBub3QgZm91bmQhJyk7XG5cbiAgICAgICAgdmFyIHNvY2tldDtcblxuICAgICAgICBpZiAoJGxvY2F0aW9uLiQkcG9ydCkge1xuICAgICAgICAgICAgc29ja2V0ID0gaW8oJ2h0dHA6Ly9sb2NhbGhvc3Q6MTMzNycpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgc29ja2V0ID0gaW8oJy8nKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBzb2NrZXQ7XG5cbiAgICB9KTtcblxuICAgIGFwcC5jb25zdGFudCgnQVVUSF9FVkVOVFMnLCB7XG4gICAgICAgIGxvZ2luU3VjY2VzczogJ2F1dGgtbG9naW4tc3VjY2VzcycsXG4gICAgICAgIGxvZ2luRmFpbGVkOiAnYXV0aC1sb2dpbi1mYWlsZWQnLFxuICAgICAgICBsb2dvdXRTdWNjZXNzOiAnYXV0aC1sb2dvdXQtc3VjY2VzcycsXG4gICAgICAgIHNlc3Npb25UaW1lb3V0OiAnYXV0aC1zZXNzaW9uLXRpbWVvdXQnLFxuICAgICAgICBub3RBdXRoZW50aWNhdGVkOiAnYXV0aC1ub3QtYXV0aGVudGljYXRlZCcsXG4gICAgICAgIG5vdEF1dGhvcml6ZWQ6ICdhdXRoLW5vdC1hdXRob3JpemVkJ1xuICAgIH0pO1xuXG4gICAgYXBwLmNvbmZpZyhmdW5jdGlvbiAoJGh0dHBQcm92aWRlcikge1xuICAgICAgICAkaHR0cFByb3ZpZGVyLmludGVyY2VwdG9ycy5wdXNoKFtcbiAgICAgICAgICAgICckaW5qZWN0b3InLFxuICAgICAgICAgICAgZnVuY3Rpb24gKCRpbmplY3Rvcikge1xuICAgICAgICAgICAgICAgIHJldHVybiAkaW5qZWN0b3IuZ2V0KCdBdXRoSW50ZXJjZXB0b3InKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgXSk7XG4gICAgfSk7XG5cbiAgICBhcHAuZmFjdG9yeSgnQXV0aEludGVyY2VwdG9yJywgZnVuY3Rpb24gKCRyb290U2NvcGUsICRxLCBBVVRIX0VWRU5UUykge1xuICAgICAgICB2YXIgc3RhdHVzRGljdCA9IHtcbiAgICAgICAgICAgIDQwMTogQVVUSF9FVkVOVFMubm90QXV0aGVudGljYXRlZCxcbiAgICAgICAgICAgIDQwMzogQVVUSF9FVkVOVFMubm90QXV0aG9yaXplZCxcbiAgICAgICAgICAgIDQxOTogQVVUSF9FVkVOVFMuc2Vzc2lvblRpbWVvdXQsXG4gICAgICAgICAgICA0NDA6IEFVVEhfRVZFTlRTLnNlc3Npb25UaW1lb3V0XG4gICAgICAgIH07XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICByZXNwb25zZUVycm9yOiBmdW5jdGlvbiAocmVzcG9uc2UpIHtcbiAgICAgICAgICAgICAgICAkcm9vdFNjb3BlLiRicm9hZGNhc3Qoc3RhdHVzRGljdFtyZXNwb25zZS5zdGF0dXNdLCByZXNwb25zZSk7XG4gICAgICAgICAgICAgICAgcmV0dXJuICRxLnJlamVjdChyZXNwb25zZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH07XG4gICAgfSk7XG5cbiAgICBhcHAuc2VydmljZSgnQXV0aFNlcnZpY2UnLCBmdW5jdGlvbiAoJGh0dHAsIFNlc3Npb24sICRyb290U2NvcGUsIEFVVEhfRVZFTlRTLCAkcSkge1xuXG4gICAgICAgIHZhciBvblN1Y2Nlc3NmdWxMb2dpbiA9IGZ1bmN0aW9uIChyZXNwb25zZSkge1xuICAgICAgICAgICAgdmFyIGRhdGEgPSByZXNwb25zZS5kYXRhO1xuICAgICAgICAgICAgU2Vzc2lvbi5jcmVhdGUoZGF0YS5pZCwgZGF0YS51c2VyKTtcbiAgICAgICAgICAgICRyb290U2NvcGUuJGJyb2FkY2FzdChBVVRIX0VWRU5UUy5sb2dpblN1Y2Nlc3MpO1xuICAgICAgICAgICAgcmV0dXJuIGRhdGEudXNlcjtcbiAgICAgICAgfTtcblxuICAgICAgICB0aGlzLmdldExvZ2dlZEluVXNlciA9IGZ1bmN0aW9uICgpIHtcblxuICAgICAgICAgICAgaWYgKHRoaXMuaXNBdXRoZW50aWNhdGVkKCkpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gJHEud2hlbih7IHVzZXI6IFNlc3Npb24udXNlciB9KTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgcmV0dXJuICRodHRwLmdldCgnL3Nlc3Npb24nKS50aGVuKG9uU3VjY2Vzc2Z1bExvZ2luKS5jYXRjaChmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICAgICAgICB9KTtcblxuICAgICAgICB9O1xuXG4gICAgICAgIHRoaXMubG9naW4gPSBmdW5jdGlvbiAoY3JlZGVudGlhbHMpIHtcbiAgICAgICAgICAgIHJldHVybiAkaHR0cC5wb3N0KCcvbG9naW4nLCBjcmVkZW50aWFscykudGhlbihvblN1Y2Nlc3NmdWxMb2dpbik7XG4gICAgICAgIH07XG5cbiAgICAgICAgdGhpcy5sb2dvdXQgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICByZXR1cm4gJGh0dHAuZ2V0KCcvbG9nb3V0JykudGhlbihmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgU2Vzc2lvbi5kZXN0cm95KCk7XG4gICAgICAgICAgICAgICAgJHJvb3RTY29wZS4kYnJvYWRjYXN0KEFVVEhfRVZFTlRTLmxvZ291dFN1Y2Nlc3MpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH07XG5cbiAgICAgICAgdGhpcy5pc0F1dGhlbnRpY2F0ZWQgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICByZXR1cm4gISFTZXNzaW9uLnVzZXI7XG4gICAgICAgIH07XG5cbiAgICB9KTtcblxuICAgIGFwcC5zZXJ2aWNlKCdTZXNzaW9uJywgZnVuY3Rpb24gKCRyb290U2NvcGUsIEFVVEhfRVZFTlRTKSB7XG5cbiAgICAgICAgJHJvb3RTY29wZS4kb24oQVVUSF9FVkVOVFMubm90QXV0aGVudGljYXRlZCwgdGhpcy5kZXN0cm95KTtcbiAgICAgICAgJHJvb3RTY29wZS4kb24oQVVUSF9FVkVOVFMuc2Vzc2lvblRpbWVvdXQsIHRoaXMuZGVzdHJveSk7XG5cbiAgICAgICAgdGhpcy5jcmVhdGUgPSBmdW5jdGlvbiAoc2Vzc2lvbklkLCB1c2VyKSB7XG4gICAgICAgICAgICB0aGlzLmlkID0gc2Vzc2lvbklkO1xuICAgICAgICAgICAgdGhpcy51c2VyID0gdXNlcjtcbiAgICAgICAgfTtcblxuICAgICAgICB0aGlzLmRlc3Ryb3kgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICB0aGlzLmlkID0gbnVsbDtcbiAgICAgICAgICAgIHRoaXMudXNlciA9IG51bGw7XG4gICAgICAgIH07XG5cbiAgICB9KTtcblxufSkoKTsiLCIndXNlIHN0cmljdCc7XG5hcHAuY29uZmlnKGZ1bmN0aW9uKCRzdGF0ZVByb3ZpZGVyKSB7XG5cbiAgJHN0YXRlUHJvdmlkZXIuc3RhdGUoJ21pbnQnLCB7XG4gICAgdXJsOiAnL3Byb2R1Y3QvbWludCcsXG4gICAgY29udHJvbGxlcjogJ01pbnRDdHJsJyxcbiAgICB0ZW1wbGF0ZVVybDogJ2pzL21pbnQvbWludC5odG1sJ1xuICB9KTtcbn0pO1xuXG5cbiIsIid1c2Ugc3RyaWN0JztcbmFwcC5jb250cm9sbGVyKCdNaW50Q3RybCcsIGZ1bmN0aW9uKCRzY29wZSwgTWludEZhY3RvcnkpIHtcbiAgTWludEZhY3RvcnkuZ2V0TWludHNEYigpLnRoZW4oZnVuY3Rpb24oZGF0YSkge1xuICAgICRzY29wZS5taW50cyA9IGRhdGE7XG4gIH0pO1xufSk7XG4iLCIndXNlIHN0cmljdCc7XG5cbmFwcC5mYWN0b3J5KCdNaW50RmFjdG9yeScsIGZ1bmN0aW9uKCRodHRwKSB7XG4gIHJldHVybiB7XG4gICAgZ2V0TWludHNEYjogZnVuY3Rpb24oKSB7XG4gICAgICByZXR1cm4gJGh0dHAuZ2V0KCcvYXBpL21pbnRzJykudGhlbihmdW5jdGlvbihyZXNwb25zZSkge1xuICAgICAgICByZXR1cm4gcmVzcG9uc2UuZGF0YTtcbiAgICAgIH0pO1xuICAgIH0sXG4gIH07XG59KTtcbiIsIid1c2Ugc3RyaWN0Jztcbi8vIHZhciBzdHJpcGUgPSByZXF1aXJlKFwic3RyaXBlXCIpKFwic2tfdGVzdF9XaHp1QnZ2anU2QUtsN0t5SUt0ZFdpUWZcIik7XG5hcHAuY29uZmlnKGZ1bmN0aW9uKCRzdGF0ZVByb3ZpZGVyKSB7XG5cbiAgICAkc3RhdGVQcm92aWRlci5zdGF0ZSgncGF5Jywge1xuICAgICAgICB1cmw6ICcvcGF5JyxcbiAgICAgICAgY29udHJvbGxlcjogJ3BheUN0cmwnLFxuICAgICAgICB0ZW1wbGF0ZVVybDogJ2pzL3BheS9wYXkuaHRtbCdcbiAgICB9KTtcblxufSk7XG5cbmFwcC5jb250cm9sbGVyKCdwYXlDdHJsJywgZnVuY3Rpb24oJHNjb3BlLCAkc3RhdGVQYXJhbXMsICRodHRwKSB7XG4gICAgJHNjb3BlLmNhcnRUb1BheSA9IGFuZ3VsYXIuZnJvbUpzb24oc2Vzc2lvblN0b3JhZ2UudGhpc0NhcnQpXG4gICAgICAgIC8vVEVNUE9SQVJZISBGT1IgVEVTVElOR1xuICAgIGNvbnNvbGUubG9nKCdZb3VyIGNhcnQ6ICcsICRzY29wZS5jYXJ0VG9QYXkpO1xuICAgICRzY29wZS50b3RhbCA9IDA7XG4gICAgJHNjb3BlLmNhcnRUb1BheS5mb3JFYWNoKGZ1bmN0aW9uKGVsKSB7XG4gICAgICAgICRzY29wZS50b3RhbCArPSAoZWwucHJpY2UpICogKGVsLmhvd01hbnkpO1xuICAgIH0pXG4gICAgJHNjb3BlLnRvdGFsT3V0ID0gJyQnICsgKCRzY29wZS50b3RhbCAvIDEwMCk7XG4gICAgLy9jbGVhciBjYXJkIGRhdGFcbiAgICAkc2NvcGUuY2FyZCA9IHtcbiAgICAgICAgbmFtZTpcIlwiLFxuICAgICAgICBudW06IDAsXG4gICAgICAgIGV4cG1vOiAwLFxuICAgICAgICBleHB5cjowLFxuICAgICAgICBjdnY6IDAsXG4gICAgICAgIHRvdGFsOjBcbiAgICB9XG4gICAgJHNjb3BlLnN1Ym1pdENhcmQgPSBmdW5jdGlvbihjYXJkKSB7XG4gICAgICAgIGNvbnNvbGUubG9nKCdjYXJkOiAnLGNhcmQpXG4gICAgICAgIGNhcmQudG90YWwgPSAkc2NvcGUudG90YWw7XG4gICAgICAgICRodHRwLnBvc3QoJy9hcGkvc3VicGF5JyxjYXJkKTtcbiAgICB9O1xuXG59KTsiLCIndXNlIHN0cmljdCc7XG5hcHAuY29uZmlnKGZ1bmN0aW9uKCRzdGF0ZVByb3ZpZGVyKSB7XG5cbiAgICAkc3RhdGVQcm92aWRlci5zdGF0ZSgncHJvZERldGFpbCcsIHtcbiAgICAgICAgdXJsOiAnL3Byb2R1Y3QvYW55dGhpbmcvOnByb2R1JyxcbiAgICAgICAgY29udHJvbGxlcjogJ3Byb2REZXRhaWxDdHJsJyxcbiAgICAgICAgdGVtcGxhdGVVcmw6ICdqcy9wcm9kZGV0YWlsL3Byb2RkZXRhaWwuaHRtbCdcbiAgICB9KTtcblxufSk7XG5cbmFwcC5jb250cm9sbGVyKCdwcm9kRGV0YWlsQ3RybCcsIGZ1bmN0aW9uKCRzY29wZSwgJHN0YXRlUGFyYW1zLCBhZGR0b2NhcnQpIHtcbiAgICAvL1RFTVBPUkFSWSEgRk9SIFRFU1RJTkdcbiAgICBjb25zb2xlLmxvZygkc3RhdGVQYXJhbXMucHJvZHUsICd0aGlzIGlzIHByb2R1Jyk7XG5cbiAgICAkc2NvcGUudGhpc3RpdGxlID0gJHN0YXRlUGFyYW1zLnByb2R1O1xuXG4gICAgJHNjb3BlLml0ZW0gPSAkc3RhdGVQYXJhbXMudGl0bGU7XG5cbiAgICAkc2NvcGUucHJvZCA9IHtcbiAgICAgICAgdGl0bGU6ICdTYW1wbGUgUHJvZHVjdCcsXG4gICAgICAgIGRlc2NyaXB0aW9uOiAnVGhpcyBwcm9kdWN0IGlzIHNvIGF3ZXNvbWUhIEl0XFwncyB0YXN0eS4nLFxuICAgICAgICBwcmljZTogMzk5OSxcbiAgICAgICAgaXNDb2ZmZWU6IGZhbHNlLFxuICAgICAgICBjYXRlZ29yeTogWyd0YXN0eScsICdiZWFucycsICdtbW0nLCAnc3JzbHkgaSBnb3Qgbm90aGluJ10sXG4gICAgICAgIHBob3RvOiAnbm9uZSdcbiAgICB9O1xuXG4gICAgJHNjb3BlLnByb2QucGhvdG8gPSAnaW1hZ2VzLycgKyAkc2NvcGUucHJvZC5waG90bztcbiAgICBpZiAoJHNjb3BlLnByb2QuaXNDb2ZmZWUgJiYgJHNjb3BlLnByb2QucGhvdG8gPT09ICdpbWFnZXMvbm9uZScpIHtcbiAgICAgICAgY29uc29sZS5sb2coJ2JlYW5zJylcbiAgICAgICAgJHNjb3BlLnByb2QucGhvdG8gPSAnaW1hZ2VzL3BsYWNlaG9sZGVyQ29mLmpwZyc7XG4gICAgfSBlbHNlIGlmICghJHNjb3BlLnByb2QuaXNDb2ZmZWUgJiYgJHNjb3BlLnByb2QucGhvdG8gPT09ICdpbWFnZXMvbm9uZScpIHtcbiAgICAgICAgJHNjb3BlLnByb2QucGhvdG8gPSAnaW1hZ2VzL3BsYWNlaG9sZGVyTWludC5wbmcnO1xuICAgIH1cbiAgICAkc2NvcGUucHJvZC5wcmljZU91dCA9ICckJyArICgkc2NvcGUucHJvZC5wcmljZSAvIDEwMCk7XG5cbiAgICAkc2NvcGUuYWRkdG9jYXJ0ID0gZnVuY3Rpb24oZGF0YSl7XG4gICAgICAgIGFkZHRvY2FydC5hZGR0b2NhcnQoZGF0YSk7XG4gICAgfVxuXG5cbn0pO1xuIiwiJ3VzZSBzdHJpY3QnO1xuYXBwLmNvbmZpZyhmdW5jdGlvbiAoJHN0YXRlUHJvdmlkZXIpIHtcblxuICAgIC8vIFJlZ2lzdGVyIG91ciAqYWJvdXQqIHN0YXRlLlxuICAgICRzdGF0ZVByb3ZpZGVyLnN0YXRlKCdzaWduaW4nLCB7XG4gICAgICAgIHVybDogJy9zaWduaW4nLFxuICAgICAgICBjb250cm9sbGVyOiAnc2lnbkluQ29udHJvbGxlcicsXG4gICAgICAgIHRlbXBsYXRlVXJsOiAnanMvc2lnbmluL3NpZ25pbi5odG1sJ1xuICAgIH0pO1xuXG59KTtcblxuYXBwLmNvbnRyb2xsZXIoJ3NpZ25JbkNvbnRyb2xsZXInLCBmdW5jdGlvbiAoJHNjb3BlLCAkd2luZG93LCAkbG9jYXRpb24sIHNpZ25pbkZhY3RvcnkpIHtcblx0JHNjb3BlLnVzZXIgPSB7XG4gICAgICAgIGVtYWlsOiBcIlwiLFxuICAgICAgICBwYXNzd29yZDogXCJcIlxuXHR9O1xuXG5cbiAgICAkc2NvcGUudXNlclNpZ25JbiA9IGZ1bmN0aW9uKG5ld1VzZXIpe1xuICAgICAgICBzaWduaW5GYWN0b3J5LmdldFVzZXIobmV3VXNlcikudGhlbihmdW5jdGlvbigpe1xuICAgICAgICAgICAgY29uc29sZS5sb2coXCJzdWNjZXNzXCIpO1xuICAgICAgICAgICAgJHdpbmRvdy5sb2NhdGlvbi5ocmVmID0gJy8nO1xuICAgICAgICB9KTtcbiAgICB9O1xuXG4gICAgJHNjb3BlLmxvZ2luID0gZnVuY3Rpb24gKCl7XG4gICAgICAgICR3aW5kb3cubG9jYXRpb24uaHJlZiA9ICcvYXV0aC9nb29nbGUnO1xuICAgIH07XG4gICAgJHNjb3BlLmxvZ2luZmIgPSBmdW5jdGlvbiAoKXtcbiAgICAgICAgJHdpbmRvdy5sb2NhdGlvbi5ocmVmID0gJy9hdXRoL2ZhY2Vib29rJztcbiAgICB9O1xufSk7XG4iLCIndXNlIHN0cmljdCc7XG5hcHAuY29uZmlnKGZ1bmN0aW9uICgkc3RhdGVQcm92aWRlcikge1xuXG4gICAgLy8gUmVnaXN0ZXIgb3VyICphYm91dCogc3RhdGUuXG4gICAgJHN0YXRlUHJvdmlkZXIuc3RhdGUoJ3NpZ251cCcsIHtcbiAgICAgICAgdXJsOiAnL3NpZ251cCcsXG4gICAgICAgIGNvbnRyb2xsZXI6ICdzaWduVXBDb250cm9sbGVyJyxcbiAgICAgICAgdGVtcGxhdGVVcmw6ICdqcy9zaWdudXAvc2lnbnVwLmh0bWwnXG4gICAgfSk7XG5cbn0pO1xuXG5hcHAuY29udHJvbGxlcignc2lnblVwQ29udHJvbGxlcicsIGZ1bmN0aW9uICgkc2NvcGUsICR3aW5kb3csICRsb2NhdGlvbiwgc2lnbnVwRmFjdG9yeSkge1xuXHQkc2NvcGUudXNlciA9IHtcbiAgICAgICAgZW1haWw6IFwiXCIsXG4gICAgICAgIHBhc3N3b3JkOiBcIlwiXG5cdH07XG5cbiAgICAkc2NvcGUuZ2V0Q3JlYXRlZFVzZXIgPSBmdW5jdGlvbigpe1xuICAgICAgICBzaWdudXBGYWN0b3J5LmdldFVzZXIoKS50aGVuKGZ1bmN0aW9uKGRhdGEpe1xuICAgICAgICAgICAgJHNjb3BlLnVzZXIgPSBkYXRhO1xuICAgICAgICB9KTtcbiAgICB9O1xuXG4gICAgJHNjb3BlLm5ld1VzZXJTaWduVXAgPSBmdW5jdGlvbihuZXdVc2VyKXtcbiAgICAgICAgc2lnbnVwRmFjdG9yeS5hZGROZXdVc2VyKG5ld1VzZXIpLnRoZW4oZnVuY3Rpb24oZGF0YSl7XG4gICAgICAgICAgICBpZiAoZGF0YS5zdWNjZXNzID09PSB0cnVlKVxuICAgICAgICAgICAgY29uc29sZS5sb2coXCJzdWNjZXNzXCIpO1xuICAgICAgICB9KTtcbiAgICB9O1xuXG4gICAgJHNjb3BlLmxvZ2luID0gZnVuY3Rpb24gKCl7XG4gICAgICAgICR3aW5kb3cubG9jYXRpb24uaHJlZiA9ICcvYXV0aC9nb29nbGUnO1xuICAgIH07XG4gICAgJHNjb3BlLmxvZ2luZmIgPSBmdW5jdGlvbiAoKXtcbiAgICAgICAgJHdpbmRvdy5sb2NhdGlvbi5ocmVmID0gJy9hdXRoL2ZhY2Vib29rJztcbiAgICB9O1xufSk7XG5cbiIsIid1c2Ugc3RyaWN0JztcbmFwcC5mYWN0b3J5KCdjbGVhcmNhcnQnLCBmdW5jdGlvbigkY29va2llcywgJGNvb2tpZVN0b3JlKXtcblx0cmV0dXJuIHtcblx0XHRjbGVhcm91dGNhcnQ6IGZ1bmN0aW9uKGZ1bGxjYXJ0KXtcblx0XHRcdGNvbnNvbGUubG9nKCRjb29raWVzLnByb2R1Y3RzKTtcblxuXHRcdFx0dmFyIHdvcmtpbmdhcnJheSA9ICRjb29raWVTdG9yZS5nZXQoJ3Byb2R1Y3RzJyk7XG5cdFx0XHR3b3JraW5nYXJyYXkgPSBbXTtcblx0XHRcdHZhciBwcm9kdWN0cyA9IHdvcmtpbmdhcnJheTtcblx0XHRcdCRjb29raWVTdG9yZS5wdXQoJ3Byb2R1Y3RzJyk7XG5cdFx0XHRjb25zb2xlLmxvZygkY29va2llcy5wcm9kdWN0cywgJ3RoaXMgaXMgY29va2llcy5wcm9kdWN0cyBmcm9tIGVtcHR5IGNhcnQnKTtcblx0XHR9XG5cdH1cbn0pIiwiJ3VzZSBzdHJpY3QnO1xuYXBwLmZhY3RvcnkoJ1JhbmRvbUdyZWV0aW5ncycsIGZ1bmN0aW9uICgpIHtcblxuICAgIHZhciBnZXRSYW5kb21Gcm9tQXJyYXkgPSBmdW5jdGlvbiAoYXJyKSB7XG4gICAgICAgIHJldHVybiBhcnJbTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogYXJyLmxlbmd0aCldO1xuICAgIH07XG5cbiAgICB2YXIgZ3JlZXRpbmdzID0gW1xuICAgICAgICAnSSBrbm93IHRoYXQgeW91IGp1c3QgZHJhbmsgc29tZSBjb2ZmZWUuLi4gaGF2ZSBhIG1pbnQuLi4nLFxuICAgICAgICAnVW1tbS4uLi4uLiBZb3UgbmVlZCBhIG1pbnQuLi4nLFxuICAgICAgICAnSGVsbG8sIHNtZWxseSBodW1hbi4nLFxuICAgICAgICAnU28uLi4gaG93IGRvIHlvdSBmZWVsIGFib3V0IGhhdmluZyBhIG1pbnQgcmlnaHQgbm93PycsXG4gICAgICAgICdEdWRlLiBZb3UgY2Fubm90IGVhdCBlZ2cgc2FsYWQgd2l0aCBjb2ZmZWUgdW5sZXNzIHlvdSB0YWtlIGEgbWludC4nLFxuICAgICAgICAnU2VyaW91c2x5LiBDb2ZmZWUgd2l0aCBzYWxtb24gc2FsYWQ/IFRha2UgYSBtaW50LicsXG4gICAgICAgICdXaGF0XFwncyB5b3VyIHByb2JsZW0gd2l0aCBtaW50cz8gWW91IG5lZWQgb25lLicsXG4gICAgICAgICdZb3VyIGJyZWF0aCBzdGlua3MuJ1xuICAgIF07XG5cbiAgICByZXR1cm4ge1xuICAgICAgICBncmVldGluZ3M6IGdyZWV0aW5ncyxcbiAgICAgICAgZ2V0UmFuZG9tR3JlZXRpbmc6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHJldHVybiBnZXRSYW5kb21Gcm9tQXJyYXkoZ3JlZXRpbmdzKTtcbiAgICAgICAgfVxuICAgIH07XG5cbn0pO1xuIiwiJ3VzZSBzdHJpY3QnO1xuYXBwLmZhY3RvcnkoJ3JlbW92ZWl0ZW0nLCBmdW5jdGlvbigkY29va2llcywgJGNvb2tpZVN0b3JlKXtcblx0cmV0dXJuIHtcblx0XHRyZW1vdmVmcm9tY2FydDogZnVuY3Rpb24oaXRlbXRvZ28pe1xuXHRcdFx0Y29uc29sZS5sb2coaXRlbXRvZ28pO1xuXHRcdFx0dmFyIHdvcmthcnJheSA9ICRjb29raWVTdG9yZS5nZXQoJ3Byb2R1Y3RzJyk7XG5cdFx0XHRjb25zb2xlLmxvZyh3b3JrYXJyYXksICd0aGlzIGlzIHdvcmthcnJheScpO1xuXG5cdFx0XHRmb3IgKHZhciBpPTA7IGk8d29ya2FycmF5Lmxlbmd0aDsgaSsrKXtcblx0XHRcdFx0aWYgKHdvcmthcnJheVtpXSA9PT0gaXRlbXRvZ28pe1xuXHRcdFx0XHRcdHZhciByZW1vdmVkID0gd29ya2FycmF5LnNwbGljZShpLCAxKTtcblx0XHRcdFx0XHR2YXIgcHJvZHVjdHMgPSB3b3JrYXJyYXk7XG5cdFx0XHRcdFx0JGNvb2tpZVN0b3JlLnB1dCgncHJvZHVjdHMnKTtcblx0XHRcdFx0fSBlbHNlIFxuXHRcdFx0XHRhbGVydCgnWW91IGRvIG5vdCBoYXZlIHRoaXMgaXRlbSBpbiB5b3VyIGNhcnQnKTtcblxuXHRcdFx0fSBcblx0XHRcdFxuXHRcdFx0Y29uc29sZS5sb2coJGNvb2tpZXMucHJvZHVjdHMsICd0aGlzIGlzIGNvb2tpZXMucHJvZHVjdHMgZnJvbSByZW1vdmUgb25lIGl0ZW0nKTtcblx0XHR9XG5cdH1cbn0pXG5cbiIsIid1c2Ugc3RyaWN0JztcbmFwcC5mYWN0b3J5KCdhZGR0b2NhcnQnLCBmdW5jdGlvbigkY29va2llcywgJGNvb2tpZVN0b3JlKXtcblx0cmV0dXJuIHtcblx0XHRhZGR0b2NhcnQ6IGZ1bmN0aW9uKGl0ZW10b2FkZCl7XG5cblx0XHRcdGNvbnNvbGUubG9nKCd0aGlzIGlzIGZpcnN0ICRjb29raWVzJywgJGNvb2tpZXMucHJvZHVjdHMpO1xuICAgICAgICBjb25zb2xlLmxvZygnaGl0IGJ1dHRvbiB0aGlzIGNvbWVzIHRocm91Z2gnLCBpdGVtdG9hZGQpO1xuICAgICAgICB2YXIgcHJvZGFyciA9ICRjb29raWVTdG9yZS5nZXQoJ3Byb2R1Y3RzJyk7XG4gICAgICAgIHByb2RhcnIucHVzaChpdGVtdG9hZGQpO1xuICAgICAgICAkY29va2llU3RvcmUucHV0KCdwcm9kdWN0cycsIHByb2RhcnIpO1xuXG5cdFx0fVxuXHR9XG59KSIsIlwidXNlIHN0cmljdFwiO1xuYXBwLmZhY3RvcnkoJ2FkbWluRmFjdG9yeScsIGZ1bmN0aW9uKCRodHRwKXtcblx0cmV0dXJuIHtcblx0XHRnZXRVc2VyczogZnVuY3Rpb24oKXtcblx0XHRcdHJldHVybiAkaHR0cC5nZXQoJy9hcGkvYWRtaW4vYWxsVXNlcnMnKS50aGVuKGZ1bmN0aW9uKHJlc3BvbnNlKXtcblx0XHRcdFx0cmV0dXJuIHJlc3BvbnNlLmRhdGE7XG5cdFx0XHR9KTtcblx0XHR9LFxuXHRcdGFkbWluVXNlciA6IGZ1bmN0aW9uICh1c2VyKSB7XG5cdFx0XHRyZXR1cm4gJGh0dHAucG9zdCgnL2FwaS9hZG1pbi9hZG1pblVzZXInLCB7ZW1haWw6dXNlcn0pO1xuXHRcdH1cblx0fTtcbn0pO1xuXG5cbiIsIid1c2Ugc3RyaWN0JztcbmFwcC5mYWN0b3J5KCdBZGRUb0NhcnQnLCBmdW5jdGlvbigpIHtcblxuICAgICAgICAgICAgdmFyIGNhcnRjb250ZW50ID0ge1xuICAgICAgICAgICAgICAgIHVzZXI6IHJlcS5ib2R5LmNvb2tpZXMuY2FydCxcbiAgICAgICAgICAgICAgICBwcm9kdWN0czogW11cblxuICB9O1xuXG4gIHJldHVybiB7XG5cbiAgICBzZWxlY3Rpbmc6IGZ1bmN0aW9uKHByb2R1Y3RpbmZvKSB7XG4gICAgICB2YXIgdGhpc2NsaWNrID0ge307XG4gICAgICB0aGlzY2xpY2sucHJvZElkID0gcHJvZHVjdGluZm8uX2lkO1xuICAgICAgdGhpc2NsaWNrLlByaWNlID0gcHJvZHVjdGluZm8ucHJpY2U7XG4gICAgICB0aGlzY2xpY2suUXVhbnRpdHkgPSBwcm9kdWN0aW5mby5ob3dNYW55O1xuXG4gICAgICBjYXJ0Y29udGVudC5wcm9kdWN0cy5wdXNoKHRoaXNjbGljayk7XG4gICAgfSxcblxuXG5cbiAgICBhZGRlZFRvQ2FydDogZnVuY3Rpb24oKSB7XG4gICAgICByZXR1cm4gc2VsZWN0aW5nKGNsaWNraW5mbyk7XG4gICAgfVxuXG5cbiAgfTtcblxufSk7XG4iLCJcInVzZSBzdHJpY3RcIjtcbmFwcC5mYWN0b3J5KCdzaWduaW5GYWN0b3J5JywgZnVuY3Rpb24oJGh0dHApe1xuXHRyZXR1cm4ge1xuXHRcdGdldFVzZXI6IGZ1bmN0aW9uKCl7XG5cdFx0XHRyZXR1cm4gJGh0dHAucG9zdCgnL2FwaS9zaWduaW4vbmV3VXNlcicpLnRoZW4oZnVuY3Rpb24ocmVzcG9uc2Upe1xuXHRcdFx0XHRyZXR1cm4gcmVzcG9uc2UuZGF0YTtcblx0XHRcdH0pO1xuXHRcdH0sXG5cdFx0YWRkTmV3VXNlciA6IGZ1bmN0aW9uICh1c2VyKSB7XG5cdFx0XHRyZXR1cm4gJGh0dHAucG9zdCgnL2FwaS9zaWdudXAvbmV3VXNlcicsIHVzZXIpO1xuXHRcdH1cblx0fTtcbn0pO1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5hcHAuZmFjdG9yeSgnc2lnbnVwRmFjdG9yeScsIGZ1bmN0aW9uKCRodHRwKXtcblx0cmV0dXJuIHtcblx0XHRnZXRVc2VyOiBmdW5jdGlvbigpe1xuXHRcdFx0cmV0dXJuICRodHRwLmdldCgnL2FwaS91c2VyLycpLnRoZW4oZnVuY3Rpb24ocmVzcG9uc2Upe1xuXHRcdFx0XHRyZXR1cm4gcmVzcG9uc2UuZGF0YTtcblx0XHRcdH0pO1xuXHRcdH0sXG5cdFx0YWRkTmV3VXNlciA6IGZ1bmN0aW9uICh1c2VyKSB7XG5cdFx0XHRyZXR1cm4gJGh0dHAucG9zdCgnL2FwaS9zaWdudXAvbmV3VXNlcicsIHVzZXIpO1xuXHRcdH1cblx0fTtcbn0pO1xuXG5cbiIsIid1c2Ugc3RyaWN0JztcbmFwcC5kaXJlY3RpdmUoJ25hdmJhcicsIGZ1bmN0aW9uKCkge1xuICByZXR1cm4ge1xuICAgIHJlc3RyaWN0OiAnRScsXG4gICAgc2NvcGU6IHtcbiAgICAgIGl0ZW1zOiAnPSdcbiAgICB9LFxuICAgIHRlbXBsYXRlVXJsOiAnanMvY29tbW9uL2RpcmVjdGl2ZXMvbmF2YmFyL25hdmJhci5odG1sJ1xuICB9O1xufSk7XG4iLCIndXNlIHN0cmljdCc7XG5hcHAuZGlyZWN0aXZlKCdyYW5kb0dyZWV0aW5nJywgZnVuY3Rpb24gKFJhbmRvbUdyZWV0aW5ncykge1xuXG4gICAgcmV0dXJuIHtcbiAgICAgICAgcmVzdHJpY3Q6ICdFJyxcbiAgICAgICAgdGVtcGxhdGVVcmw6ICdqcy9jb21tb24vZGlyZWN0aXZlcy9yYW5kby1ncmVldGluZy9yYW5kby1ncmVldGluZy5odG1sJyxcbiAgICAgICAgbGluazogZnVuY3Rpb24gKHNjb3BlKSB7XG4gICAgICAgICAgICBzY29wZS5ncmVldGluZyA9IFJhbmRvbUdyZWV0aW5ncy5nZXRSYW5kb21HcmVldGluZygpO1xuICAgICAgICB9XG4gICAgfTtcblxufSk7IiwiJ3VzZSBzdHJpY3QnO1xuYXBwLmRpcmVjdGl2ZSgnc3RhY2snLCBmdW5jdGlvbigpIHtcbiAgcmV0dXJuIHtcbiAgICByZXN0cmljdDogJ0UnLFxuICAgIHRlbXBsYXRlVXJsOiAnanMvY29tbW9uL2RpcmVjdGl2ZXMvc3RhY2tTdG9yZUxvZ28vc3RhY2tTdG9yZUxvZ28uaHRtbCdcbiAgfTtcbn0pO1xuIl0sInNvdXJjZVJvb3QiOiIvc291cmNlLyJ9