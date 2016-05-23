module.exports = {

	/*
	Function to delete an item from the wishlist
	 */
	delete  : function (req, res, database, pg) {
		pg.connect(database, function (err, client, done) {
			if (err) {
				console.error('Could not connect to the database');
				console.error(err);
				return;
			}
			console.log('Connected to database');

			var sid = req.query.sid;
			var uid = req.cookies.user_id;

			if (uid == undefined) {
				res.redirect('/');
				return;
			}

			client.query("DELETE FROM wishlist WHERE sid = " + sid + ";",
				function (error, result) {
					if (error) {
						console.error('Failed to execute query');
						console.error(error);
						return;
					}
					
					res.redirect('/wishlist');
				});
		});
	}
}
