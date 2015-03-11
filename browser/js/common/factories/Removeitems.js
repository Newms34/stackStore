'use strict';
app.factory('removeitem', function($cookies, $cookieStore) {
    return {
        removefromcart: function(itemtogo) {

            var workarray = JSON.parse($cookies.products);
        
            
            for (var i = 0; i < workarray.length; i++) {
                if (workarray[i].id === itemtogo) {
                    var removed = workarray.splice(i, 1);
                    var products = workarray;
                    $cookieStore.put('products', products);
                  return true;  
                } 
         

            }
        }
    }
})
