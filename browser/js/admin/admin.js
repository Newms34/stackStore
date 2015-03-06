'use strict';
app.config(function($stateProvider) {

    // Register our *about* state.
    $stateProvider.state('admin', {
        url: '/admin',
        controller: 'adminController',
        templateUrl: 'js/admin/admin.html'
    });

});

app.controller('adminController', function($scope, adminFactory) {
    $scope.users = {};
    adminFactory.getUsers().then(function(data) {
        $scope.users = data;
    });
    $scope.adminify = function(name){
        adminFactory.adminUser(name).then(function(data){
            console.log('done!')
        });
    };
});

