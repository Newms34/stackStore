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
        console.log('A mint:',$scope.productId,'|',$scope.item);
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


    $(':radio').change(
      function(){
        $('.choice').text( this.value + ' stars' );
      }
    )

    $scope.addtocart = function(id, isCoffee){
        addtocart.addtocart(id, isCoffee);
    }
});
