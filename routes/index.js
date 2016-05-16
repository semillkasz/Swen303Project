var express = require('express');
var router = express.Router();
var search = require('../routes/search');
var listings = require('../routes/listings');
var pg = require('pg').native;

/*
	Comment this out and replace with your own database if username/password
	is different. Will be eventually replaced with the postgres database
	on ECS servers.
*/
var database = "postgres://newtondavi2:dave@depot:5432/SWEN303SHOP"; 

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
  res.render('account', { title: 'Buy and Sell', fname: 'Jenn', lname: 'Niven', address: 'Wellington, New Zealand', rating: '4.7/5.0'});
});

module.exports = router;
