'use strict';
app.factory('removeitem', function($cookies, $cookieStore){
	return {
		removefromcart: function(itemtogo){
			console.log(itemtogo);
			var workarray = $cookieStore.get('products');
			console.log(workarray, 'this is workarray');

			for (var i=0; i<workarray.length; i++){
				if (workarray[i] === itemtogo){
					var removed = workarray.splice(i, 1);
					var products = workarray;
					$cookieStore.put('products');
				} else 
				alert('You do not have this item in your cart');

			} 
			
			console.log($cookies.products, 'this is cookies.products from remove one item');
		}
	}
})

