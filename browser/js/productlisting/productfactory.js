'use strict';

app.factory('ProductFactory', function ($http) {
    return {
        getCoffee: function() {
            return $http.get('/api/coffee').then(function(response) {
                return response.data;
            });
        },
        getMints: function() {
            return $http.get('api/mint').then(function(response) {
                return response.data;
            });
        }
    };
});
