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

      var uid = req.cookies.user_id;
      var sid = req.query.sid;


      client.query("DELETE FROM cart WHERE sid = " +sid+" AND uid = " + uid + " ;", function(error, result){

        client.query("SELECT * FROM cart WHERE uid = " +uid+" ;", function(error, result){
          done();
          var queryResult = result.rows;
          var cart = [];
          var lookupMap = {};

          for (var i in queryResult){
            lookupMap[queryResult[i].sid] = queryResult[i];
          }

          for (i in lookupMap){
            cart.push(lookupMap[i]);
          }

          res.render('shoppingCart', { title: 'Shopping Cart', cart: cart, user_id : req.cookies.user_id});
          
        });

      });
     
    });
  }
}
