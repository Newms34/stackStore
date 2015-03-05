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

});
