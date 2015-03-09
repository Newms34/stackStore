'use strict';
app.factory('clearcart', function($cookies, $cookieStore){
	return {
		clearoutcart: function(fullcart){
			console.log($cookies.products);

			var workingarray = $cookieStore.get('products');
			workingarray = [];
			var products = workingarray;
			$cookieStore.put('products');
			console.log($cookies.products, 'this is cookies.products from empty cart');
		}
	}
})
