'use strict';

app.factory('CoffeeFactory', function($http) {
    return {
        getCoffeeDb: function() {
            return $http.get('/api/coffee').then(function(response) {
                return response.data;
            });
        },
        getOneCoffeeDb: function(id) {
            return $http.get('api/coffee/' + id).then(function(response) {
                return response.data;
            });
        },
        getByCatDb: function(cat) {
            //we could put this in a single controller for BOTH, but at this point it's just as easy to put it in just Coffee
            return $http.get('api/cat/' + cat).then(function(response) {
                return response.data;
            });
        }
    };
});