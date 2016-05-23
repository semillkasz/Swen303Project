module.exports = {

  /* 
    Create function to purchase items in shopping cart, add it to the transactions table, decrease quantity in stock. 
  */
  purchase: function(req, res, database, pg){
    pg.connect(database, function(err, client, done){
      if(err){
        console.error('Could not connect to the database');
        console.error(err);
        return;
      }

      var uid = req.cookies.user_id;
    
    if(uid == undefined){   
    res.redirect('/');
    return;
    }

      client.query("SELECT * FROM cart WHERE uid = " + uid + ";", function(error, result){

        var queryResult = result.rows;
        var cart = [];
        var lookupMap = {};

        for (var i in queryResult){
          lookupMap[queryResult[i].sid] = queryResult[i];
        }

        for (i in lookupMap){
          cart.push(lookupMap[i]);
        }

        var total = '0';
        var stockRemaining = '0';

        for (i in cart){
          total = +total + +cart[i].price;     
        }      

        for (var i = +0; i < cart.length; +i++){
          var sid = cart[i].sid;
          
          client.query("SELECT quantity FROM stock WHERE sid = "+ sid+";", function(error, result){

            done();
            var currentStock = JSON.parse(JSON.stringify(result.rows));
            stockRemaining = +currentStock[0].quantity - +1;
  
            //Reduce stock quantity by 1
            client.query("UPDATE stock SET quantity = "+ stockRemaining +" WHERE sid = "+ sid+";", function(error, result){});}); 

            //Add the purchased items to the transactions table
            client.query("SELECT photourl FROM stock WHERE sid = " +sid +";", function(error, result){
              var photourlResult = result.rows;

              client.query("INSERT INTO transactions (sid, uid, type, photourl) " +
                "VALUES("+sid+", "+uid+", 'PURCHASE', '" + photourlResult[0].photourl + "');",
                function(error, result){
                done();
                if(error){
                  console.error('Failed to execute query');
                  console.error(error);
                  return;
              }}); 
            });      



        }          

        //Delete all items in user's cart
        client.query("DELETE FROM cart WHERE uid = " + uid + ";", function(error, result){});

        res.render('purchased', { title: 'Thank you for shopping with us!', cart: cart, total: total, user_id : req.cookies.user_id});
      });
    });
  }
}
