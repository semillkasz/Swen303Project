var express = require('express');
var router = express.Router();
var search = require('../routes/search');
var listings = require('../routes/listings');
var accounts = require('../routes/accounts');

var pg = require('pg').native;

/*
	Comment this out and replace with your own database if username/password
	is different. Will be eventually replaced with the postgres database
	on ECS servers.
*/
var database = 'postgres://postgres:swen303@localhost:5432/303';
var connectionString = 'postgres://localhost/SWEN303';

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
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
	});

router.get('/viewProduct', function(req, res, next) {
	pg.connect(database, onConnect);

	function onConnect(err, client, done) {

  	if (err) {
  		done();
    	console.error(err);
    	process.exit(1);
  	}

	else {

		client.query("SELECT * FROM stock WHERE sid = 1;", function(error, result){

		done();
		if(error){
			console.error('Failed to execute query');
			console.error(error);
			return;
		}
  		else {
  			var q = JSON.stringify(result.rows);
  			var queryResult = JSON.parse(q);
  			
  			var l = queryResult[0].label;
  			//var pDetails = queryResult[0].description;
  			var pPrice = queryResult[0].price;
  			//var pURL = queryResult[0].photourl;
  			var p_category = queryResult[0].category;

  			//Testing
  			console.log(result.rows);
  			console.log("Label: ", l);
  			console.log("Price: ", pPrice);
  			// console.log("Photo URL: ", pURL);
  			console.log("Tags: ", p_category);
  			// res.render('viewProduct', { title: l, price: pPrice, product_details: pDetails, photoSRC: pURL, p_tags: tags});
  			res.render('viewProduct', { title: l, price: pPrice, p_tags: p_category});
  		}
  	});
};}
}); 

module.exports = router;
