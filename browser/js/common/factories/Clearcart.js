'use strict';
app.factory('clearcart', function($cookies, $cookieStore){
	return {
		clearoutcart: function(fullcart){
			var workingarray = $cookieStore.get('products');
			workingarray = [];
			var products = workingarray;
			$cookieStore.put('products', workingarray);
		}
	}
})