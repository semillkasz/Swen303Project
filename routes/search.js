module.exports = {
	/*
		Search function to return all listings of what was searched.
	*/
	search: function(req, res, database, pg){
		pg.connect(database, function(err, client, done){
			if(err){
				console.error('Could not connect to the database');
				console.error(err);
				return;
			}
			console.log('Connected to database');
			var searchString = req.query.searchString;
			//Query the database for the item searched for
			client.query("SELECT * FROM stock WHERE label ~* '"+searchString+"';", 
			function(error, result){
				done();
				var listings = result.rows;
				var sort = req.query.sort;
				if(error){
					console.error('Failed to execute query');
					console.error(error);
					return;
				}
				//Sort from lowest to highest price
				else if (sort == 'low'){
					listings.sort(function(a, b){
						return a.price - b.price;
					});
					res.render('search', { title: 'SWEN Shop | Search', listings: listings,
											searchString: searchString});
				}
				//Sort from highest to lowest price
				else if (sort == 'high'){
					listings.sort(function(a, b){
						return a.price - b.price;
					});
					listings.reverse();
					res.render('search', { title: 'SWEN Shop | Search', listings: listings,
											searchString: searchString});
				}
				else{
					//Return all listings
					res.render('search', { title: 'SWEN Shop | Search', listings: listings,
											searchString: searchString});
				}
			});
		});
	}
};
