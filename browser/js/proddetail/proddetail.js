'use strict';
app.config(function($stateProvider) {

    $stateProvider.state('prodDetail', {
        url: '/product/:productId/:productType',
        controller: 'prodDetailCtrl',
        templateUrl: 'js/proddetail/proddetail.html'
    });

});

app.controller('prodDetailCtrl', function($scope, $state, $stateParams, CoffeeFactory, MintFactory, addtocart) {

    $scope.productId = $stateParams.productId;
    $scope.item = $stateParams.title;


    if($stateParams.productType !== "true"){
        console.log('A mint:',$scope.productId,'|',$scope.item);
        MintFactory.getOneMintDb($stateParams.productId).then(function(data){
            $scope.thisItem = data;
        });
    } else {
        CoffeeFactory.getOneCoffeeDb($stateParams.productId).then(function(data){
            $scope.thisItem = data;
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
