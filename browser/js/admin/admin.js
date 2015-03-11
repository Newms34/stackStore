'use strict';
app.config(function($stateProvider) {

    // Register our *about* state.
    $stateProvider.state('admin', {
        url: '/admin',
        controller: 'adminController',
        templateUrl: 'js/admin/admin.html'
    });

});

app.controller('adminController', function($scope, adminFactory, prodsFactory, promoFactory, $state, ngDialog) {
    $scope.users = {};
    $scope.prods = {};
    $scope.proms = {};
    $scope.whichProd = 'Mint';
    $scope.allProdCats = ['Mint', 'Coffee'];
    $scope.checkForAdmin = function() {
        console.log('checkin user:')
        adminFactory.checkUser().then(function(response) {
            console.log(response.data);
            if (response.data == 'no') {
                $state.go('home');
            } else {}
        });
    };
    $scope.checkForAdmin();
    $scope.getAllUsr = function() {
        adminFactory.getUsers().then(function(data) {
            $scope.users = data;
        });
    };
    $scope.getAllUsr();

    $scope.getAllProds = function(type) {
        prodsFactory.getProds(type).then(function(data) {
            $scope.prods = data;
            $scope.prods.map(function(el) {
                el.priceOut = el.price / 100;
                el.kittens = el.category.join(', ');
            })
        });
    };
    $scope.getAllProds($scope.whichProd);
    $scope.pickCat = function(prod) {
        $scope.whichProd = prod;
        $scope.getAllProds($scope.whichProd);
    };

    $scope.adminify = function(name) {
        adminFactory.adminUser(name).then(function(data) {
            $scope.getAllUsr();
        });
    };

    $scope.removeProd = function(prod) {
        prodsFactory.remProd(prod, $scope.whichProd).then(function(data) {
            console.log('Removed: ' + data)
            $scope.getAllProds($scope.whichProd);
        });
    };
    $scope.submitItem = function(prod) {
        var keys = prod.keys.split(',');
        keys = keys.map(function(el) {
            return el.trim();
        })
        var objToAddData = {
            name: prod.name,
            desc: prod.desc,
            price: parseInt(prod.price * 100),
            type: prod.type,
            file: prod.file,
            keys: keys
        };

        prodsFactory.addProd(objToAddData).then(function(data) {
            console.log('Added: ' + data);
            $scope.getAllProds($scope.whichProd);
        })
    };
    $scope.editItem = function(prod) {
        console.log(prod);
        var editDiag = ngDialog.openConfirm({
            template: '/js/admin/editProd.html',
            className: 'ngdialog-theme-default',
            data: {
                title: prod,
                type: $scope.whichProd
            },
            overlay: false,
            controller: 'editCont'
        });
    };
    $scope.$on('ngDialog.closed', function() {
        $scope.getAllProds($scope.whichProd);
    })

    $scope.getAllPromos = function() {
        promoFactory.getAllProms().then(function(data) {
            if (data != 'none') {
                $scope.proms = data;
            } else {
                $scope.proms = {};
            }
        })
    }
    $scope.getAllPromos();

    $scope.addNewPromo = function(newPromo) {
        promoFactory.addPromo(newPromo).then(function(data) {
            $scope.getAllPromos();
        });
    };
    $scope.dePromote = function(toDePromote) {
        promoFactory.remPromo(toDePromote).then(function(data) {
            $scope.getAllPromos();
        });
    };
});


app.controller('editCont', function($scope, prodsFactory, ngDialog) {
    $scope.currObj = {};
    prodsFactory.editProd($scope.ngDialogData).then(function(data) {
        console.log(data);
        $scope.updateForm(data);
    })
    $scope.updateForm = function(data) {
        $scope.currObj = data;
        $scope.edit = data;
        $scope.edit.price /= 100;
    }
    $scope.submitItemEdit = function(edit) {
        //construct object to be sent to backend.
        var editObj = {
            'type': $scope.ngDialogData.type,
            'desc': edit.description,
            'price': edit.price,
            'keys': edit.category,
            'file': edit.photo,
            'title': edit.title
        };
        prodsFactory.editProdSub(editObj).then(function(data) {
            $scope.currObj = data;
            $scope.updateForm($scope.currObj);
        });
    }
});
