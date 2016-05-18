module.exports = {

  /* 
    Create function to add current item to the shopping cart
  */
  add: function(req, res, database, pg){
    pg.connect(database, function(err, client, done){
      if(err){
        console.error('Could not connect to the database');
        console.error(err);
        return;
      }
      console.log('Connected to database');

      client.query("SELECT * FROM stock WHERE sid = 10;", function(error, result){

        var q = JSON.stringify(result.rows);
        var queryResult = JSON.parse(q);
        
        //var u_id = current user
        var p_id = queryResult[0].sid;
        var p_label = queryResult[0].label;
        var p_details = queryResult[0].description;
        var p_price = queryResult[0].price;
        var p_url = queryResult[0].photourl;
        var p_category = queryResult[0].category;
        var p_quantity = queryResult[0].quantity;

        client.query("INSERT INTO cart (uid, sid, label, price) " +
          "VALUES(1, '"+p_id+"', '"+p_label+"', '"+p_price+"');", 
        function(error, result){
          done();
            if(error){
              console.error('Failed to execute query');
              console.error(error);
            return;
            }
        res.render('viewProduct', { title: p_label, price: p_price, category: p_category, product_details: p_details, photoSRC: p_url, cartBtn: 'Added to Cart'});
      });
    });
  });
}
}