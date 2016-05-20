module.exports = {
	/*
		Search function to return all listings of what was searched.
	*/
	accounts: function(req, res, database, pg) {
		pg.connect(database, function(err, client, done){
			if (err) {
				console.error(err);
				process.exit(1);
			}
			else {
				client.query("SELECT * FROM users;", function(error, result){
					if(error){
						console.error('Failed to execute query');
						console.error(error);
						return;
					}
					var qr = JSON.stringify(result.rows);
					var queryResult = JSON.parse(qr);

					var u_username = queryResult[10].username;
		  			var u_realname = queryResult[10].realname;
		  			var u_address = queryResult[10].address;
		  			var u_rating = queryResult[10].rating;
		  			var u_photo = queryResult[10].photo;

		  			client.query("SELECT sid FROM transactions WHERE uid = 10;", function(error, result){
		  				if(error){
		  					console.error('Failed to execute query');
		  					console.error(error);
		  					return;
		  				}
		  				// for (var i = Things.length - 1; i >= 0; i--) {
		  				// 	Things[i]
		  				// 	// var photo = [];
		  				// 	//for every item in results 
		  				// 	// photo[i] = results[i].photourl
		  				// }
		  				client.query("SELECT photourl FROM stock WHERE sid = 10;", function(error, result){
			  				done();
			  				if(error){
			  					console.error('Failed to execute query');
			  					console.error(error);
			  					return;
			  				}
			  				// photos: photo
			  				// var sid = result.rows;
			  				// var stock = [];

			  				
							res.render('account', { title: 'Buy and Sell', realname: u_realname, address: u_address, rating: u_rating, photoSRC: u_photo, slider_data: result.rows});
							console.log(result.rows);	
						});
					});
				});
			}
		});
	}
}
