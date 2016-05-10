var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

/* GET account page. */
router.get('/account', function(req, res, next) {
  res.render('account', { title: 'Buy and Sell', fname: 'Jenn', lname: 'Niven', address: 'Wellington, New Zealand', rating: '4.7/5.0'});
});

module.exports = router;
