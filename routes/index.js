var express = require('express');
var router = express.Router();
var search = require('../routes/search');
var listings = require('../routes/listings');
var accounts = require('../routes/accounts');
var viewproduct = require('../routes/viewproduct');
var cartAdd = require('../routes/cartAdd');
var cartView = require('../routes/cartView');

var pg = require('pg').native;

/*
	Comment this out and replace with your own database if username/password
	is different. Will be eventually replaced with the postgres database
	on ECS servers.
*/


var database = "postgres://newtondavi2:dave@depot:5432/SWEN303SHOP"; 
//var database = 'postgres://postgres:swen303@localhost:5432/303';
// var connectionString = 'postgres://localhost/SWEN303';

//var database = "postgres://newtondavi2:dave@depot:5432/SWEN303SHOP"; 
//var database = 'postgres://postgres:swen303@localhost:5432/303';



/* GET home page. */
router.get('/', function(req, res, next) {
	pg.connect(database, function(err, client, done){
			if(err){
				console.error('Could not connect to the database');
				console.error(err);
				return;
			}
			console.log('Connected to database');
			client.query("SELECT * FROM stock",
			function(error, result){
				done();
				res.render('index',{slider_data: result.rows});	
		    });

	});
}); 


/* GET search page. */
router.get('/search', function(req, res) {
	search.search(req, res, database, pg);
});

/* GET categories page. */
router.get('/categories', function(req, res) {
	res.render('categories', { title: 'SWEN Shop | Categories' });
});

/* GET create listings page. */
router.get('/createlisting', function(req, res) {
	res.render('createlisting', { title: 'SWEN Shop | create listing' });
});
	
router.post('/createlisting', function(req, res) {
	listings.create(req, res, database, pg);
});
	
/* GET account page. */
router.get('/account', function(req, res, next) {
	pg.connect(database, onConnect);
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
			var qr = JSON.stringify(result.rows);
			var queryResult = JSON.parse(qr);

			var u_username = queryResult[2].username;
  			var u_realname = queryResult[2].realname;
  			var u_address = queryResult[2].address;
  			var u_rating = queryResult[2].rating;
  			var u_photo = queryResult[2].photo;

			res.render('account', { title: 'Buy and Sell', realname: u_realname, address: u_address, rating: u_rating, photoSRC: u_photo});
			console.log(result.rows);	
		});
		};}
	});

/* GET view product page. */
router.get('/viewProduct', function(req, res) {
	viewproduct.view(req, res, database, pg);
}); 

router.post('/viewProduct', function(req, res){
	cartAdd.add(req, res, database, pg);
});

/* GET shopping cart page */
router.get('/shoppingCart', function(req, res){
	cartView.view(req, res, database, pg);
});

module.exports = router;
