module.exports = {

	/*
	Function to view wishlist
	 */
	view : function (req, res, database, pg) {
		pg.connect(database, function (err, client, done) {
			if (err) {
				console.error('Could not connect to the database');
				console.error(err);
				return;
			}
			console.log('Connected to database');

			var uid = req.cookies.user_id;

			if (uid == undefined) {
				res.render('wishlist', {
					user_id : req.cookies.user_id,
					title : 'Wishlist'
				});
				return;
			}

			client.query("SELECT * FROM wishlist WHERE uid = " + uid + ";", function (error, result) {
				if (error) {
					console.error('Failed to execute query');
					console.error(error);
					return;
				}
				
				var list = result.rows;

				res.render('wishlist', {
					user_id : req.cookies.user_id,
					title : 'Wishlist',
					wishlist : list
				});
			});
		});
	}
}
