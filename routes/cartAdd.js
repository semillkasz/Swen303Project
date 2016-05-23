module.exports = {

	/*
	Create function to add current item to the shopping cart
	 */
	add : function (req, res, database, pg) {
		pg.connect(database, function (err, client, done) {
			if (err) {
				console.error('Could not connect to the database');
				console.error(err);
				return;
			}

			var sid = req.query.sid;

			var uid = req.cookies.user_id;

			var review_data;


      		client.query("SELECT * FROM reviews WHERE sid = "+sid+";", function(error, result){
         
       			 review_data = result.rows;

     		});

			client.query("SELECT * FROM stock WHERE sid = " + sid + ";", function (error, result) {

				var q = JSON.stringify(result.rows);
				var queryResult = JSON.parse(q);

				var p_label = queryResult[0].label;
				var p_details = queryResult[0].description;
				var p_price = queryResult[0].price;
				var p_url = queryResult[0].photourl;
				var p_category = queryResult[0].category;
				var p_quantity = queryResult[0].quantity;

				//Search for duplicates
				client.query("SELECT * FROM cart WHERE uid = " + uid + " AND sid = " + sid + ";",
					function (error, result) {
					if (error) {
						console.error('Failed to execute query');
						console.error(error);
						return;
					}

					//If duplicate found, don't add the item to the shopping cart.
					if (result.rows.length > 0) {
						res.render('viewProduct', {
							sid : sid,
							title : p_label,
							price : p_price,
							category : p_category,
							product_details : p_details,
							photoSRC : p_url,
							cartBtn : 'Add to Cart',
							wishlistBtn : 'Add to Wishlist',
							user_id : req.cookies.user_id,
							reportMsg : 'This item is already in your shopping cart.',
							review_data: review_data
						});
						return;
					}

					client.query("INSERT INTO cart (uid, sid, label, price) " +
						"VALUES('" + uid + "'  , '" + sid + "', '" + p_label + "', '" + p_price + "');",
						function (error, result) {
						done();
						if (error) {
							console.error('Failed to execute query');
							console.error(error);
							return;
						}

						res.render('viewProduct', {
							sid : sid,
							title : p_label,
							price : p_price,
							category : p_category,
							product_details : p_details,
							photoSRC : p_url,
							cartBtn : 'Added to Cart',
							wishlistBtn : 'Add to Wishlist',
							user_id : req.cookies.user_id,
							reportMsg : 'Item added to cart.',
							review_data: review_data
						});
					});
				});
			});
		});
	}
}
