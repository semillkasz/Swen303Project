module.exports = {
	/*
		Search function to return all listings of what was searched.
	*/
	accounts: function(req, res, next) {
	pg.connect(connectionString, onConnect);
	function onConnect(err, client, done) {
		if (err) {
			console.error(err);
			process.exit(1);
		}
		else {
			client.query("SELECT * FROM users;", function(error, result){
			done();
			if(error){
				console.error('Failed to execute query');
				console.error(error);
				return;
			}
			var queryResult = JSON.stringify(result.rows);
			res.render('account', { title: 'Buy and Sell', fname: 'Jenn', lname: 'Niven', address: 'Wellington, New Zealand', rating: '4.7/5.0', info: queryResult});
			console.log(result.rows);
		});
		};}
	}
};
