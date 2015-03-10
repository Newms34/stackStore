'use strict';
app.config(function($stateProvider) {

    $stateProvider.state('prodDetail', {
        url: '/product/:productId/:productType',
        controller: 'prodDetailCtrl',
        templateUrl: 'js/proddetail/proddetail.html'
    });

});

app.controller('prodDetailCtrl', function($scope, $state, $stateParams, CoffeeFactory, MintFactory, addtocart, ReviewsFactory) {

    $scope.productId = $stateParams.productId;
    $scope.item = $stateParams.title;
    var total = 0;
   
    if($stateParams.productType !== "true"){
        MintFactory.getOneMintDb($stateParams.productId).then(function(data){
            $scope.thisItem = data;
        });
        ReviewsFactory.getMintReviewsDb($stateParams.productId).then(function(reviewArray){

            $scope.reviews = reviewArray;

            var starTotal = function (){ reviewArray.forEach(function(elem){
                total += elem.stars
            })
            return total;
            }
            $scope.average = starTotal() / reviewArray.length;    
         });
    } else {
        CoffeeFactory.getOneCoffeeDb($stateParams.productId).then(function(data){
            $scope.thisItem = data;
        });
        ReviewsFactory.getCoffeeReviewsDb($stateParams.productId).then(function(reviewArray){
            $scope.reviews = reviewArray;


            var starTotal = function (){ reviewArray.forEach(function(elem){
                total += elem.stars
            })
            return total;
            }
            $scope.average = starTotal() / reviewArray.length;   
        });
    }

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
