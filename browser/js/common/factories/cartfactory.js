'use strict';
app.factory('AddToCart', function($http) {

    return {


        submitOrder:function(ordersObj){
            return $http.post('/api/orders/submit', {ordersObj:ordersObj}).then(function(response){
              return response.data;
            });
        }

    };

});