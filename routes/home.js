var pg = require("pg").native;
var connectionString = "postgres://newtondavi2:dave@depot:5432/SWEN303SHOP";  
var express = require('express');
var router = express.Router();
var client = new pg.Client(connectionString); 
client.connect();  

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

module.exports = router;