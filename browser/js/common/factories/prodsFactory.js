"use strict";
app.factory('prodsFactory', function($http) {
    return {
        getProds: function(prod) {
            return $http.post('/api/admin/getProds', {
                theProd: prod
            }).then(function(response) {
                return response.data;
            });
        },
        remProd: function(prod, cat) {
            return $http.post('/api/admin/remProd', {
                theProd: prod,
                theCat: cat
            });
        },
        addProd: function(prodObj) {
            return $http.post('/api/admin/addProd', prodObj).then(function(response) {
                return response.data;
            });
        },
        editProd: function(prodObj) {
            //GET (via post.. i dunno) product to edit
            return $http.post('/api/admin/editProd', prodObj).then(function(response) {
                return response.data;
            });
        },
        editProdSub: function(editObj){
            //SUBMIT the edits 
            return $http.post('/api/admin/editSubmit',editObj).then(function(response){
                return response.data;
            });
        }
    };
});