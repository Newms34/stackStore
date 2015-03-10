'use strict';
app.factory('addtocart', function($cookies, $cookieStore){
	return {
		addtocart: function(itemtoadd, prodtype){
			console.log("In addtocart", itemtoadd, prodtype);
	        var prodarr = $cookieStore.get('products');
	        var objprod = {
	        	id: itemtoadd, 
	        	type: prodtype
	        }

	        prodarr.push(objprod);
	        $cookieStore.put('products', prodarr);
	        //$cookieStore.put('price', prodtype);
	        console.log($cookies, 'this is cookies from AddToCart Factory');

		}
	}
})

    // 1 - for each product in cookies.products
    // 2 - fetch from the server, info about about that product (it could be coffee or mints)
    // 3 - previous fetch will retrun a promise
    // 4 - add that promise to an array [promise1, promise2]
    // 5 - when all promises resolve (Promise.all(promiseArray).then(function(arrayOfProductInfo) {}))
    // 6 - add those resolve promise data to the seshOrders


    // for (var j = 0; j < data.length; j++) {

    //                     console.log(data, 'this is data');
    //                     prod = {
    //                         id: data[j]._id,
    //                         title: data.title,
    //                         price: data.price,
    //                         quant: Number
    //                     }
    //                     console.log(prod.id, "this is test prod for cart");

    //                 }

