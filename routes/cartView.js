module.exports = {

  /* 
    Create function to view items in shopping cart
  */
  view: function(req, res, database, pg){
    pg.connect(database, function(err, client, done){
      if(err){
        console.error('Could not connect to the database');
        console.error(err);
        return;
      }
      console.log('Connected to database');

      var uid = req.cookies.user_id;
	  
	  if(uid == undefined){
		res.render('shoppingCart', { user_id : req.cookies.user_id, title: 'Shopping Cart'});
		return;
	  }

      client.query("SELECT * FROM cart WHERE uid = " + uid + ";", function(error, result){
		//Removed map stuff as there should be no duplicates now.
        var cart = result.rows;

        var total = '0';

        for (i in cart){
          total = +total + +cart[i].price;
        }

        res.render('shoppingCart', { user_id : req.cookies.user_id, title: 'Shopping Cart', cart: cart, total: total});
        
      });
    });
  }
}
