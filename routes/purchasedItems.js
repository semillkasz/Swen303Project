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
      console.log('Connected to database');

      var uid = req.cookies.user_id;
	  
	  if(uid == undefined){		
		res.redirect('/');
		return;
	  }

      client.query("SELECT * FROM cart WHERE uid = " + uid + ";", function(error, result){

        // var queryResult = JSON.stringify(result.rows);
        // var queryResult = JSON.parse(q);
        
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

        var total = '0';
        var stockRemaining = '0';

        for (i in cart){
          total = +total + +cart[i].price;

          // client.query("SELECT quantity FROM stock WHERE sid = "+ cart[i].sid+";", function(error, result){
          //   var currentStock = JSON.parse(JSON.stringify(result.rows));
          //   // console.log(stock[0].quantity);
            
          //   stockRemaining = +currentStock[0].quantity - +1;
          //   // console.log(stockRemaining);     

          //   client.query("UPDATE stock SET quantity = "+ stockRemaining +" WHERE sid = "+ cart[i].sid+";", function(error, result){});

          // });          
        }      

        for (var i = +0; i < cart.length; +i++){
          console.log("Testing: " + i);
          var c_sid = cart[i].sid;
          console.log("Stock ID: "+ c_sid);
          
          client.query("SELECT quantity FROM stock WHERE sid = "+ c_sid+";", function(error, result){

            done();
            var currentStock = JSON.parse(JSON.stringify(result.rows));
            // console.log(stock[0].quantity);
            console.log("Stock ID: "+ c_sid);
            stockRemaining = +currentStock[0].quantity - +1;
            // console.log(stockRemaining);     

            client.query("UPDATE stock SET quantity = "+ stockRemaining +" WHERE sid = "+ c_sid+";", function(error, result){});
            
          });  

        }          

        // for (i in cart){
        //   var c_sid = cart[i].sid;
        //   var c_uid = req.cookies.user_id;
        //   var c_type = PURCHASE;

        //   client.query("INSERT")
        // }

        //Deletes all items in current user's cart
        client.query("DELETE FROM cart WHERE uid = " + uid + ";", function(error, result){});




        res.render('purchased', { title: 'Thank you for shopping with us!', cart: cart, total: total, user_id : req.cookies.user_id});
      });
    });
  }
}
