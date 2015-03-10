"use strict";
app.factory('promoFactory', function($http) {
    return {
        getAllProms: function(){
            return $http.get('/api/admin/proms').then(function(response){
                return response.data;
            });
        },
        addPromo: function(promToAdd){
            return $http.post('/api/admin/addProm',promToAdd).then(function(response){
                return response.data;
            });
        },
        remPromo: function(promToRem){
            console.log('Remove: ',promToRem)
            return $http.post('/api/admin/remProm',{code:promToRem}).then(function(response){
                return response.data;
            });
        }
    };
});