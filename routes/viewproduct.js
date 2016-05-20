module.exports = {
	/*
		Create function to return and display information about a product
	*/
	view: function(req, res, database, pg){
		pg.connect(database, function(err, client, done){
			if(err){
				console.error('Could not connect to the database');
				console.error(err);
				return;
			}
			console.log('Connected to database');

			var sid = req.query.sid;

			client.query("SELECT * FROM stock WHERE sid = "+sid+";", function(error, result){

  				var q = JSON.stringify(result.rows);
  				var queryResult = JSON.parse(q);
  			
  				var p_label = queryResult[0].label;
  				var p_details = queryResult[0].description;
  				var p_price = queryResult[0].price;
  				var p_url = queryResult[0].photourl;
  				var p_category = queryResult[0].category;
  				var p_quantity = queryResult[0].quantity;


  				//Testing
  				console.log(p_label);
  				console.log(p_details);
  				console.log(p_price);
  				console.log(p_url);
  				console.log(p_category);
  				console.log(p_quantity);


  				if (p_quantity <= 5 && p_quantity > 1){
  					res.render('viewProduct', { user_id : req.cookies.user_id, title: p_label, price: p_price, category: p_category, product_details: p_details, photoSRC: p_url, quantity: 'Only ' + p_quantity + ' left!', cartBtn: 'Add to Cart'});
  				}
          else if (p_quantity == 0){
            res.render('viewProduct', { user_id : req.cookies.user_id, title: p_label, price: p_price, category: p_category, product_details: p_details, photoSRC: p_url, noStock: true});
          }
  				else {
  					res.render('viewProduct', { user_id : req.cookies.user_id, title: p_label, price: p_price, category: p_category, product_details: p_details, photoSRC: p_url, cartBtn: 'Add to Cart'});
				}
			});
		});
	}



}