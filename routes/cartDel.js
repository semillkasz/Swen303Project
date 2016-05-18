module.exports = {

  /* 
    Create function to view items in shopping cart
  */
  delete: function(req, res, database, pg){
    pg.connect(database, function(err, client, done){
      if(err){
        console.error('Could not connect to the database');
        console.error(err);
        return;
      }
      console.log('Connected to database');

      client.query("SELECT * FROM cart WHERE uid = 1;", function(error, result){
        //var u_id = current user

        var queryResult = result.rows;
        var cart = [];
        var lookupMap = {};

        for (var i in queryResult){
          lookupMap[queryResult[i].sid] = queryResult[i];
        }

        for (i in lookupMap){
          cart.push(lookupMap[i]);
        }

        res.render('shoppingCart', { title: 'Shopping Cart', cart: cart});
        
      });
    });
  }
}
