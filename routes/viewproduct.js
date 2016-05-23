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
			console.log('Connected to database');

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

<<<<<<< HEAD
  				//Testing
  				console.log(p_label);
  				console.log(p_details);
  				console.log(p_price);
  				console.log(p_url);
  				console.log(p_category);
  				console.log(p_quantity);
          console.log(review_data);

  				if (p_quantity <= 5 && p_quantity > 1){
  					res.render('viewProduct', { user_id : req.cookies.user_id, title: p_label, price: p_price, category: p_category, product_details: p_details, photoSRC: p_url, quantity: 'Only ' + p_quantity + ' left!', cartBtn: 'Add to Cart', sid: sid, review_data : review_data});
  				}
          else if (p_quantity == 0){
            res.render('viewProduct', { user_id : req.cookies.user_id, title: p_label, price: p_price, category: p_category, product_details: p_details, photoSRC: p_url, noStock: true, sid: sid,review_data : review_data });
          }
  				else {
  					res.render('viewProduct', { user_id : req.cookies.user_id, title: p_label, price: p_price, category: p_category, product_details: p_details, photoSRC: p_url, cartBtn: 'Add to Cart', sid: sid, review_data : review_data});
=======
				//Testing
				console.log(p_label);
				console.log(p_details);
				console.log(p_price);
				console.log(p_url);
				console.log(p_category);
				console.log(p_quantity);

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
						wishlistBtn : 'Add to Wishlist'
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
						noStock : true
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
						wishlistBtn : 'Add to Wishlist'
					});
>>>>>>> 2cf86661f72dd9fbfaa2e50eb6cb47389dc778d3
				}
			});
		});
	}

}
