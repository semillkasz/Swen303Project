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
			console.log(req.cookies);

			

			var searchString = req.query.searchString;
			var categoryResults = [];
			
			//Query the datebase by category
			client.query("SELECT * FROM stock WHERE category ~* '"+searchString+"';", 
			function(error, result){
				catagoryResults = result.rows;
			});
			
			//Query the database for the item searched for
			client.query("SELECT * FROM stock WHERE label ~* '"+searchString+"';", 
			function(error, result){
				done();
				var searchResults = result.rows;
				//Merge the category and search results together
				var results = searchResults.concat(catagoryResults);
				
				//Remove duplicates
				var listings = [];
				var lookupMap = {};
				
				//Add each item to the lookup map by its sid
				for(var i in results){
					lookupMap[results[i].sid] = results[i];
				}
				
				//Add every item to the listings from the sid map (ensures no duplicates)
				for(i in lookupMap){
					listings.push(lookupMap[i]);
				}
				
				var sort = req.query.sort; //Can be undefined
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
