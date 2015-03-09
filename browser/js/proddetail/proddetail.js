'use strict';
app.config(function($stateProvider) {

    $stateProvider.state('prodDetail', {
        url: '/product/:productId/:productType',
        controller: 'prodDetailCtrl',
        templateUrl: 'js/proddetail/proddetail.html'
    });

});

app.controller('prodDetailCtrl', function($scope, $stateParams, CoffeeFactory, MintFactory, addtocart, $state) {
    //TEMPORARY! FOR TESTING
    // console.log($stateParams.produ, 'this is produ');

    $scope.productId = $stateParams.productId;
    $scope.item = $stateParams.title;


    if($stateParams.productType !== "true"){
        MintFactory.getOneMintDb($stateParams.productId).then(function(data){
            $scope.thisItem = data;
        });
    } else {
        CoffeeFactory.getOneCoffeeDb($stateParams.productId).then(function(data){
            $scope.thisItem = data;
        });
    }

    $scope.goToReviews = function (){
        $state.go('reviews');
    };


    // $scope.prod = {
    //     title: 'Sample Product',
    //     description: 'This product is so awesome! It\'s tasty.',
    //     price: 3999,
    //     isCoffee: false,
    //     category: ['tasty', 'beans', 'mmm', 'srsly i got nothin'],
    //     photo: 'none'
    // };

    // $scope.prod.photo = 'images/' + $scope.prod.photo;
    // if ($scope.prod.isCoffee && $scope.prod.photo === 'images/none') {
    //     console.log('beans')
    //     $scope.prod.photo = 'images/placeholderCof.jpg';
    // } else if (!$scope.prod.isCoffee && $scope.prod.photo === 'images/none') {
    //     $scope.prod.photo = 'images/placeholderMint.png';
    // }
    // $scope.prod.priceOut = '$' + ($scope.prod.price / 100);
    $(':radio').change(
      function(){
        $('.choice').text( this.value + ' stars' );
      } 
    )

    $scope.addtocart = function(data){
        addtocart.addtocart(data);
    }
});
