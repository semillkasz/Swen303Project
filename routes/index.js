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

//var database = "postgres://newtondavi2:dave@depot:5432/SWEN303SHOP"; 
// var database = 'postgres://postgres:swen303@localhost:5432/303';
// var connectionString = 'postgres://localhost/SWEN303';


/* GET home page. */
router.get('/', function(req, res, next) {
	//var query = client.query("SELECT * FROM users"); 
	var results = [];
	results[0] = "images/1.jpg"
	results[1] = "images/1.jpg"
	results[2] = "images/2.jpg"
	results[3] = "images/2.jpg"
	results[4] = "images/3.jpg"
	results[5] = "images/3.jpg"

	console.log(results);
	res.render('index', {slider_data: results});

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
  			
  			var p_label = queryResult[0].label;
  			var p_details = queryResult[0].description;
  			var p_price = queryResult[0].price;
  			var p_url = queryResult[0].photourl;
  			var p_category = queryResult[0].category;

  			// res.render('viewProduct', { title: l, price: pPrice, product_details: pDetails, photoSRC: pURL, p_tags: tags});
  			res.render('viewProduct', { title: p_label, price: p_price, category: p_category, product_details: p_details, photoSRC: p_url});
  		}
  	});
};}
}); 

module.exports = router;
