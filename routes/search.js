module.exports = {
	/*
		Search function to return all listings of what was searched.
	*/
	search: function(res, searchString, database, pg){
		pg.connect(database, function(err, client, done){
			if(err){
				console.error('Could not connect to the database');
				console.error(err);
				return;
			}
			console.log('Connected to database');
			//Query the database for the item searched for
			client.query("SELECT * FROM stock WHERE label ~* '"+searchString+"';", 
			function(error, result){
				done();
				if(error){
					console.error('Failed to execute query');
					console.error(error);
					return;
				} else{
					console.log(result.rows);
					//Return all listings
					res.render('search', { title: 'SWEN Shop | Search', listings: result.rows });
				}
			});
		});
	}
};
