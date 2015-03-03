app.factory('AddToCart', function() {

            var cartcontent = {
                products: []
            };

            return {

                selecting: function(productinfo) {
                    var thisclick = {};
                    thisclick.prodId = productinfo._id;
                    thisclick.Price = productinfo.price;
                    thisclick.Quantity = productinfo.howMany;

                    cartcontent.products.push(thisclick);
                },


       
                addedToCart: function() {
                    return selecting(clickinfo);
                }


            })
