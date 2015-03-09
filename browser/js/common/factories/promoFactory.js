"use strict";
app.factory('promoFactory', function($http) {
    return {
        getAllProms: function(){
            return $http.get('/api/admin/proms').then(function(response){
                return response.data;
            });
        },
        addPromo: function(promToAdd){
            return $http.post('/api/admin/addPromo',promToAdd).then(function(response){
                return response.data;
            });
        }
    };
});