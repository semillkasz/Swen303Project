module.exports = {
	/*
	Create function to return and display information about a product
	 */
	view : function (req, res, database, pg) {
		pg.connect(database, function (err, client, done) {
			if (err) {
				console.error('Could not connect to the database');
				console.error(err);
				return;
			}

			var sid = req.query.sid;
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

				if (p_quantity <= 5 && p_quantity > 1) {
					res.render('viewProduct', {
						sid: sid,
						user_id : req.cookies.user_id,
						title : p_label,
						price : p_price,
						category : p_category,
						product_details : p_details,
						photoSRC : p_url,
						quantity : 'Only ' + p_quantity + ' left!',
						cartBtn : 'Add to Cart',
						wishlistBtn : 'Add to Wishlist',
            review_data : review_data
					});
				} else if (p_quantity == 0) {
					res.render('viewProduct', {
						sid: sid,
						user_id : req.cookies.user_id,
						title : p_label,
						price : p_price,
						category : p_category,
						product_details : p_details,
						photoSRC : p_url,
						noStock : true,
            review_data : review_data
					});
				} else {
					res.render('viewProduct', {
						sid: sid,
						user_id : req.cookies.user_id,
						title : p_label,
						price : p_price,
						category : p_category,
						product_details : p_details,
						photoSRC : p_url,
						cartBtn : 'Add to Cart',
						wishlistBtn : 'Add to Wishlist',
            review_data : review_data
					});

				}
			});
		});
	}

}
