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
var database = "postgres://postgres:swen303@localhost:5432/303";

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
  res.render('account', { title: 'Buy and Sell', fname: 'Jenn', lname: 'Niven', address: 'Wellington, New Zealand', rating: '4.7/5.0'});
});

module.exports = router;
