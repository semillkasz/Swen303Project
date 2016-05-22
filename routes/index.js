var express = require('express');
var router = express.Router();
var search = require('../routes/search');
var listings = require('../routes/listings');
var accounts = require('../routes/accounts');
var viewproduct = require('../routes/viewproduct');
var cartAdd = require('../routes/cartAdd');
var cartView = require('../routes/cartView');
var cartDel = require('../routes/cartDel');
var wishlist = require('../routes/wishlist');
var wishlistAdd = require('../routes/wishlistAdd');
var purchasedItems = require('../routes/purchasedItems');

var pg = require('pg').native;

/*
Comment this out and replace with your own database if username/password
is different. Will be eventually replaced with the postgres database
on ECS servers.
 */

//var database = "postgres://newtondavi2:dave@depot:5432/SWEN303SHOP";
var database = 'postgres://postgres:swen303@localhost:5432/303';
//var connectionString = 'postgres://localhost/SWEN303';


/* GET home page. */
router.get('/', function (req, res, next) {
	pg.connect(database, function (err, client, done) {
		if (err) {
			console.error('Could not connect to the database');
			console.error(err);
			return;
		}
		console.log('Connected to database');
		client.query("SELECT * FROM stock",
			function (error, result) {
			done();
			res.render('index', {
				slider_data : result.rows,
				user_id : req.cookies.user_id
			});
			console.log(result.rows);
		});

	});
});

router.get('/removeCookie', function (req, res) {
	res.clearCookie('user_id');
	res.redirect('/');
});

router.post('/', function (req, res, next) {
	console.log("Signing up")
	pg.connect(database, function (err, client, done) {
		if (err) {
			console.error('Could not connect to the database');
			console.error(err);
			return;
		}
		console.log('Connected to database');

		var fullName = req.body.fname;
		var userName = req.body.username;
		var password = req.body.pass;
		var email = req.body.email;
		var photoURL = req.body.imageURL;

		//Error check to make sure fields were filled in
		if (fullName.length == 0 || userName.length == 0 || password.length == 0 || email.length == 0 || photoURL.length == 0) {
			console.log("Error length")
			res.render('index', {
				reportMsg : 'Error: make sure all fields are filled in correctly.'
			});
			return;
		}

		//Add the item to the users table
		client.query("INSERT INTO users ( username, realname, password, email, photo) " +
			"VALUES('" + userName + "', '" + fullName + "', '" + password + "', '" + email + "','" + photoURL + "');",
			function (error, result) {
			done();
			if (error) {
				console.error('Failed to execute query');
				console.error(error);
				return;
			}
			res.redirect('/');
		});
	});
});

router.post('/login', function (req, res, next) {
	console.log("Logging In")
	pg.connect(database, function (err, client, done) {
		if (err) {
			console.error('Could not connect to the database');
			console.error(err);
			return;
		}
		console.log('Connected to database');
		var username = req.body.username;
		var password = req.body.password;

		client.query("SELECT * FROM users WHERE username = '" + username + "';",
			function (error, result) {
			done();
			if (result.rows.length == 0 || result == undefined) {
				//res.render('index', {slider_data: slider_data, reportMsg: "Error"});
				res.redirect('/');
				return;
			}
			var passwordSearch = result.rows[0].password;
			var uid = result.rows[0].uid;
			console.log(password)
			console.log(passwordSearch)
			if (password.toString() === passwordSearch.toString()) {
				res.cookie('user_id', uid, {
					maxAge : 999999999999999
				});
				//res.render('index', {slider_data: slider_data, user_id : req.cookies.user_id});
				res.redirect('/');
				return;
			} else {
				console.log("here");
				res.redirect('/');

				return;
			}
		});
	});
});

/* GET search page. */
router.get('/search', function (req, res) {
	search.search(req, res, database, pg);
});

/* GET categories page. */
router.get('/categories', function (req, res) {
	res.render('categories', {
		title : 'SWEN Shop | Categories',
		user_id : req.cookies.user_id
	});
});

/* GET create listings page. */
router.get('/createlisting', function (req, res) {
	res.render('createlisting', {
		title : 'SWEN Shop | create listing',
		user_id : req.cookies.user_id
	});
});

router.post('/createlisting', function (req, res) {
	listings.create(req, res, database, pg);
});

/* GET account page. */
router.get('/account', function (req, res) {
	accounts.accounts(req, res, database, pg);
});

/* GET view product page. */
router.get('/viewProduct', function (req, res) {
	viewproduct.view(req, res, database, pg);
});

router.post('/viewProduct', function (req, res) {
	cartAdd.add(req, res, database, pg);
});

/* GET shopping cart page */
router.get('/shoppingCart', function (req, res) {
	cartView.view(req, res, database, pg);
});

router.post('/shoppingCart', function (req, res) {
	cartDel.delete (req, res, database, pg);
});

/* GET purchased page */
router.get('/purchased', function (req, res) {
	purchasedItems.purchase(req, res, database, pg);
});

/* GET wishlist page */
router.get('/wishlist', function (req, res) {
	wishlist.view(req, res, database, pg);
});

router.post('/wishlist', function (req, res) {
	wishlistAdd.add(req, res, database, pg);
});

module.exports = router;
