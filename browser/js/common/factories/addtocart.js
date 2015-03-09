'use strict';
app.factory('addtocart', function($cookies, $cookieStore) {
    return {
        addtocart: function(itemtoadd) {
            console.log('this is first $cookies', $cookies.products);
            console.log('hit button this comes through', itemtoadd);
            var prodarr = $cookieStore.get('products');
            prodarr.push(itemtoadd);
            $cookieStore.put('products', prodarr);
        }
    }
})