module.exports = {
	/*
		Create function to create a listing in the datebase
	*/
	create: function(req, res, database, pg){
		pg.connect(database, function(err, client, done){
			if(err){
				console.error('Could not connect to the database');
				console.error(err);
				return;
			}
			
			var uid = req.cookies.user_id;
			
			var label = req.body.label;
			var price = req.body.price;
			var quantity = req.body.quantity;
			var category = req.body.category;
			var description = req.body.description;
			var photourl = req.body.photourl;
			
			//Error check to make sure fields were filled in
			if(label.length == 0 || price.length == 0 || quantity.length == 0 || category.length == 0 || description.length == 0){
				res.render('createlisting', { title: 'Create Listing', 
											reportMsg: 'Error: make sure all fields are filled in correctly.',
											user_id : req.cookies.user_id});
				return;
			}
			
			//Error check to see if price and quantity are numbers
			if(isNaN(price)){
				res.render('createlisting', { title: 'Create Listing', 
											reportMsg: 'Error: price is not a number.',
											user_id : req.cookies.user_id});
				return;
			} else if (isNaN(quantity)){
				res.render('createlisting', { title: 'Create Listing', 
											reportMsg: 'Error: quantity is not a number.',
											user_id : req.cookies.user_id});
				return;
			}
			
			//Add the item to the stock table
			client.query("INSERT INTO stock (uid, label, price, quantity, category, photourl, description) " +
				"VALUES("+uid+", '"+label+"', "+price+", "+quantity+", '"+category+"', '"+photourl+"', '"+description+"');",
			function(error, result){
				done();
				if(error){
					console.error('Failed to execute query');
					console.error(error);
					return;
				}
				//Change this to link to the item page eventually.
				res.render('createlisting', { title: 'Create Listing', 
											reportMsg: 'Item put up for listing successfully.',
											user_id : req.cookies.user_id});
			});
		});
	}
};
