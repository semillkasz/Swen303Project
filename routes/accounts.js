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

		  			//Recently Bought
		  			client.query("SELECT sid FROM transactions WHERE uid = "+uid+";", function(error, result){
		  				if(error){
		  					console.error('Failed to execute query');
		  					console.error(error);
		  					return;
		  				}

		  				var transaction_sids = JSON.stringify(result.rows);
		  				var tSIDs = JSON.parse(transaction_sids);
		  				// var boughtitems = [];
						for (var i in tSIDs){
					    	client.query("SELECT photourl FROM stock WHERE sid  = "+tSIDs[i].sid+";", function(error, result){
				  				done();
				  				if(error){
				  					console.error('Failed to execute query');
				  					console.error(error);
				  					return;
				  				}
				  				console.log(result.rows);
							});
					    }
					    console.log(result.rows);
					    res.render('account', { title: 'Buy and Sell', realname: u_realname, address: u_address, rating: u_rating, photoSRC: u_photo, slider_data: result.rows});
					});
				});
			}
		});
	}
}
