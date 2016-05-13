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
			
			//Add the item to the datebase
			client.query("INSERT INTO stock (uid, label, price, quantity, category) " +
				"VALUES(1,'"+label+"', "+price+", "+quantity+", '"+category+"');", //UID will be different when accounts is finished
			function(error, result){
				done();
				if(error){
					console.error('Failed to execute query');
					console.error(error);
					return;
				}
				res.render('createlisting', { title: 'SWEN Shop | create listing' });
			});
		});
	}
};
