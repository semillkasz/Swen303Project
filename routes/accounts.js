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
				var uid = req.cookies.user_id;
				client.query("SELECT * FROM users WHERE uid = "+uid+";", function(error, result){
					if(error){
						console.error('Failed to execute query');
						console.error(error);
						return;
					}
					var qr = JSON.stringify(result.rows);
					var queryResult = JSON.parse(qr);

					var u_username = queryResult[0].username;
		  			var u_realname = queryResult[0].realname;
		  			var u_address = queryResult[0].address;
		  			var u_rating = queryResult[0].rating;
		  			var u_photo = queryResult[0].photo;

		  			client.query("SELECT sid FROM transactions WHERE uid = "+uid+";", function(error, result){
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
		  				client.query("SELECT photourl FROM stock WHERE sid  = "+uid+";", function(error, result){
			  				done();
			  				if(error){
			  					console.error('Failed to execute query');
			  					console.error(error);
			  					return;
			  				}
			  				// photos: photo
			  				// var sid = result.rows;
			  				// var stock = [];

			  				
							res.render('account', { title: 'Buy and Sell', realname: u_realname, address: u_address, rating: u_rating, photoSRC: u_photo, slider_data: result.rows, user_id: req.cookies.user_id});
							console.log(result.rows);	
						});
					});
				});
			}
		});
	}
}
