module.exports = {
	/*
	Search function to return all listings of what was searched.
	 */
	accounts : function (req, res, database, pg) {
		pg.connect(database, function (err, client, done) {
			if (err) {
				console.error(err);
				process.exit(1);
			} else {
				var uid = req.cookies.user_id;

				if (uid == undefined) {
					res.render('account', {
						user_id : req.cookies.user_id,
						title : 'Buy and Sell'
					});
					return;
				}

				client.query("SELECT * FROM users WHERE uid = " + uid + ";", function (error, result) {
					if (error) {
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
					var u_feedback = queryResult[0].feedback;

					//Items for sale
					client.query("SELECT * FROM stock WHERE uid = " + uid + ";", function (error, result) {
						if (error) {
							console.error('Failed to execute query');
							console.error(error);
							return;
						}
						
						var itemsForSale = result.rows;
						
						//Recently Bought
						client.query("SELECT photourl, sid FROM transactions WHERE uid  = " + uid + ";", function (error, result) {
							done();
							if (error) {
								console.error('Failed to execute query');
								console.error(error);
								return;
							}

							res.render('account', {
								user_id : req.cookies.user_id,
								title : 'Buy and Sell',
								realname : u_realname,
								address : u_address,
								rating : u_rating,
								photoSRC : u_photo,
								feedback : u_feedback,
								boughtItems : result.rows,
								itemsForSale : itemsForSale
							});
						});
					});
				});
			}
		});
	}
}
