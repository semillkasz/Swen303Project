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
			console.log('Connected to database');
			
			var label = req.body.label;
			var price = req.body.price;
			var quantity = req.body.quantity;
			var category = req.body.category;
			
			//Error check to make sure fields were filled in
			if(label.length == 0 || price.length == 0 || quantity.length == 0 || category.length == 0){
				res.render('createlisting', { title: 'SWEN Shop | create listing', 
											reportMsg: 'Error: make sure all fields are filled in correctly.'});
				return;
			}
			
			//Error check to see if price and quantity are numbers
			if(isNaN(price)){
				res.render('createlisting', { title: 'SWEN Shop | create listing', 
											reportMsg: 'Error: price is not a number.'});
				return;
			} else if (isNaN(quantity)){
				res.render('createlisting', { title: 'SWEN Shop | create listing', 
											reportMsg: 'Error: quantity is not a number.'});
				return;
			}
			
			//Add the item to the stock table
			client.query("INSERT INTO stock (uid, label, price, quantity, category) " +
				"VALUES(1,'"+label+"', "+price+", "+quantity+", '"+category+"');", //UID will be different when accounts is finished
			function(error, result){
				done();
				if(error){
					console.error('Failed to execute query');
					console.error(error);
					return;
				}
				//Change this to link to the item page eventually.
				res.render('createlisting', { title: 'SWEN Shop | create listing', 
											reportMsg: 'Item put up for listing successfully.'});
			});
		});
	}
};
