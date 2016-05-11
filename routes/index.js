var express = require('express');
var router = express.Router();
var search = require('../routes/search');
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
	//Get the search string the user searched for.
	//NOTE: String has to be exact as the label in the database (will fix..)
	var searchString = req.query.searchString;
	search.search(res, searchString, database, pg);
});

module.exports = router;
