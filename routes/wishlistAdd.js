module.exports = {

	/*
	Function to add item to wishlist
	 */
	add : function (req, res, database, pg) {
		pg.connect(database, function (err, client, done) {
			if (err) {
				console.error('Could not connect to the database');
				console.error(err);
				return;
			}
			console.log('Connected to database');

			var sid = req.query.sid;
			var uid = req.cookies.user_id;

			if (uid == undefined) {
				res.redirect('/');
				return;
			}

			client.query("SELECT * FROM stock WHERE sid = " + sid + ";", function (error, result) {

				console.log(result);

				var q = JSON.stringify(result.rows);
				var queryResult = JSON.parse(q);

				var p_label = queryResult[0].label;
				var p_details = queryResult[0].description;
				var p_price = queryResult[0].price;
				var p_url = queryResult[0].photourl;
				var p_category = queryResult[0].category;
				var p_quantity = queryResult[0].quantity

					//Check for duplicates
					client.query("SELECT * FROM wishlist WHERE uid = " + uid + " AND sid_item = " + sid + ";",
						function (error, result) {
						if (error) {
							console.error('Failed to execute query');
							console.error(error);
							return;
						}

						//If duplicate found, don't add to wish list
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
								reportMsg : 'This item is already on your wish list.'
							});
							return;
						}

						client.query("INSERT INTO wishlist (uid, sid_item, label, photourl, price) " +
							"VALUES('" + uid + "'  , '" + sid + "', '" + p_label + "', '" + p_url + "', '" + p_price + "');",
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
								cartBtn : 'Add to Cart',
								wishlistBtn : 'Added to Wishlist',
								user_id : req.cookies.user_id,
								reportMsg : 'Item added to wish list.'
							});
						});
					});
			});
		});
	}
}
