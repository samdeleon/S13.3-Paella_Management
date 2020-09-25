const express = require('express');
const path = require('path');
const exphandle = require('express-handlebars');
const handlebars = require('handlebars');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const app = express();
const port = 9090;

const userModel = require('./models/user');
const orderModel = require('./models/order');
const customerModel = require('./models/customer');

app.engine('hbs', exphandle({
    extname: 'hbs',
    defaultView: 'main',
    layoutsDir: path.join(__dirname, '/views/layouts'), // Layouts folder
    partialsDir: path.join(__dirname, '/views/partials'), // Partials folder
}));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies

app.use(express.static('public'));

/* ---------------------------------------- ALL 11 ROUTES ---------------------------------------- */

// [PAGE-01] LOGIN
app.get('/', function(req, res){
    res.render('Login', {
        // for main.hbs
        title: "Login Page",
        styles: "css/styles_login.css",
        scripts: "script/LoginScript.js",
        body_class: "login"
    });
});

// [PAGE-02] HOMEPAGE
app.get('/home', function(req, res){
  var content = [];
  var entry;
  var i = 0;

  orderModel.find({status: {$ne: "Completed"}, customer_id: {$exists: true}}).sort({date: 1}).limit(10).exec(function(err, result){
    if(err) throw err;
    result.forEach(function(doc) {
      customerModel.findOne({_id: doc.toObject().customer_id}).lean().exec(function(err, result2){
        i++;
        if(err) throw err;
          entry = {main: doc.toObject(), clientinfo: result2};
          content.push(entry);

          if (i == result.length)
          {
            res.render('Homepage', {
              title: "Home",
              styles: "css/styles_inside.css",
              scripts: "script/HomepageScript.js",
              body_class: "inside",
              records: content
            });
          }

      });
    });
  });
});

// [PAGE-03] ORDER FORM
app.get('/order-form', function(req, res){
    res.render('OrderForm', {
        title: "Order Form",
        styles: "css/styles_inside.css",
        scripts: "script/OrderFormScript.js",
        body_class: "inside"
    });
});

// [PAGE-04] ORDER INFORMATION
app.get('/order-information-:param', function(req, res){
    var  order_id = req.params.param;
    /*
        id is the serial number of the order
        ^ will be used to search in the db
    */

    orderModel.findOne({ordernum: order_id, customer_id: {$exists: true}}, function (err, order){
        console.log(order);
        customerModel.findOne({_id: order.customer_id}, function (err, client){
            res.render('OrderInformation', {
                title: "Order " + order_id,
                styles: "css/styles_inside.css",
                scripts: "script/OrderInformationScript.js",
                body_class: "inside",
                ordernum: order.ordernum,
                name: client.name,
                contact: client.contact_info,
                message: client.message_info,
                mode: order.mode_of_delivery,
                address: client.address,
                date: order.date,
                time: order.time,
                size: order.paellasize,
                status: order.status,
                remarks: order.extraremarks,
                pan: order.pan_used
            });
        });
    });
});

// [PAGE-05] INGREDIENTS INVENTORY
app.get('/ingredients-inventory', function(req, res){
    res.render('IngredientsInventory', {
        title: "Ingredients Inventory",
        styles: "css/styles_inside.css",
        scripts: "script/IngredientsInventoryScript.js",
        body_class: "inside"
    });
});

// [PAGE-06] UPDATE INGREDIENTS
app.get('/update-ingredients', function(req, res){
    res.render('UpdateIngredients', {
        title: "Update Ingredients",
        styles: "css/styles_inside.css",
        body_class: "inside"
    });
});

// [PAGE-07] PANS INVENTORY
app.get('/pans-inventory', function(req, res){
    res.render('PansInventory', {
        title: "Pans Inventory",
        styles: "css/styles_inside.css",
        scripts: "script/PansInventoryScript.js",
        body_class: "inside"
    });
});

// [PAGE-08] ALL ORDERS
app.get('/orders', function(req, res){
  var content = [];
  var entry;
  var i = 0;

  orderModel.find({customer_id: {$exists: true}}).sort({date: 1}).exec(function(err, result){
    if(err) throw err;
    result.forEach(function(doc) {
      customerModel.findOne({_id: doc.toObject().customer_id}).lean().exec(function(err, result2){
        i++;
        if(err) throw err;
          entry = {main: doc.toObject(), clientinfo: result2};
          content.push(entry);

          if (i == result.length)
          {
            res.render('AllOrders', {
                title: "All Orders",
                styles: "css/styles_inside.css",
                scripts: "script/AllOrdersScript.js",
                body_class: "inside",
                records: content
            });
          }

      });
    });
  });
});

// [PAGE-09] SEARCH PAGE
app.get('/search', function(req, res){
    res.render('Searchpage', {
        title: "Search",
        styles: "css/styles_inside.css",
        scripts: "script/SearchpageScript.js",
        body_class: "inside"
    });
});

// [PAGE-10] CUSTOMER INFORMATION
app.get('/client-information-:param', function(req, res){ // TODO: change name to "search-customer" instead of client
    var  name = req.params.param;
    var content = [];
    var compcontent = [];
    var entry;
    var i = 0;

    customerModel.findOne({name: name}).exec(function(err, result0){
      if(err) throw err;
      orderModel.find({customer_id: result0._id}).sort({date: 1}).exec(function(err, result){
        if(err) throw err;
        result.forEach(function(doc) {
          customerModel.findOne({_id: doc.toObject().customer_id}).lean().exec(function(err, result2){
            i++;
            if(err) throw err;
              entry = {main: doc.toObject(), clientinfo: result2};
              content.push(entry);

              if (i == result.length)
              {

                orderModel.find({customer_id: result0._id, status: "Completed"}).exec(function(err, result3){
                  result3.forEach(function(doc2) {
                    compcontent.push(doc2.toObject());
                  });

                  res.render('CustomerInformation', {
                      title: "Customer " + name + " Orders",
                      styles: "css/styles_inside.css",
                      scripts: "script/CustomerInformation.js",
                      body_class: "inside",
                      records: content,
                      clname: name,
                      contact: content[0].clientinfo.contact_info,
                      message: content[0].clientinfo.message_info,
                      address: content[0].clientinfo.address,
                      completed: compcontent.length,
                      upcoming: content.length - compcontent.length
                    });
                });
              }

          });
        });
      });
    });
});

// [PAGE-10] ALL CUSTOMERS
app.get('/customers', function(req, res){
  var content = [];

      customerModel.find().sort({name: 1}).exec(function(err, result){
        if(err) throw err;
        result.forEach(function(doc) {
          content.push(doc.toObject());
        });
          res.render('AllCustomers', {
            title: "All Customers",
            styles: "css/styles_inside.css",
            scripts: "script/AllCustomersScript.js",
            body_class: "inside",
            records: content
          });
      });
});

/* ---------------------------------------- END OF ROUTES --------------------------------------- */

app.listen(port, function() {
    console.log('App listening at port '  + port)
  });

/* ---------------------------------- FEATURES & POST REQUESTS ---------------------------------- */
// we'll add things here after sprint 1
/*test stuff for Login*/

app.post('/newUser', function (req, res) {
      var user = new userModel({
          username:     req.body.username,
          password:     req.body.password,

      });
      var result;

      user.save(function(err, user) {
          if (err){
              console.log(err.errors);

              result = {success: false, message: "new user was not created"};
              res.send(result);
          }
          else{
              console.log("new user added");
              console.log(user);

              result = {success: true, message: "new user was created"};


              res.redirect("/")
              // tempRoute = "-" + order.ordernum


          }
      });
});

app.post('/Login',function (req,res){
 /*
  var user = new userModel({
    username:     req.body.username,
    password:     req.body.password,

});
*/
  var result;
  user.findOne({
    username: req.body.username, password: req.body.password
    }, function(err, user){
      if(err){
        console.log(err.errors);
        result = {success: false, message: "Error"};
        res.send(result);
      }
      if(!user){
        console.log(err.errors);
        result = {success: false, message: "user was not found"};
        res.send(result);
      }
      else{
        console.log(user);
        result = {success: true, message: "Login successful"};
        res.redirect("/home")
      }
  });
});

/*test stuff for log in end*/
app.post('/newOrder', function (req, res) {

    var d = new Date();
    var year = d.getFullYear();

    var query = {
      contact_info:     req.body.info,
      message_info:     req.body.msg_info,
      address:          req.body.address,
    }

    customerModel.findOneAndUpdate({name : req.body.name}, {$set:query}, {new : true}, function (err, cus){
      var newCustomer
      if (newCustomer == null){
          newCustomer = new customerModel({
          name:             req.body.name,
          contact_info:     req.body.info,
          message_info:     req.body.msg_info,
          address:          req.body.address,
        });
      }else
        newCustomer = cus

      orderModel.countDocuments().exec(function (err, count){


        count = count + 1;
        count = count.toString().padStart(3, '0');

        var order = new orderModel({
          ordernum:         year + "-" + count,
          customer_id:      newCustomer._id,
          mode_of_delivery: req.body.mode,
          date:             req.body.date,
          time:             req.body.time,
          paellasize:       req.body.paellasize,
          status:           req.body.status,
          extraremarks:     req.body.extraremarks,
          pan_used:         req.body.pan_used
        });
        var result;

        order.save(function(err, new_order) {
          if (err){
            console.log(err.errors);

            result = {success: false, message: "new order was not created"};
            res.send(result);
          }
          else{
            console.log("New order added");
            console.log(new_order);
            newCustomer.save(function (err, new_customer) {
              console.log("New customer added");
              console.log(new_customer);

              result = {
                success: true,
                message: "new order was created"

              };

              res.redirect('/');
            })
          }
        });
    });
  })
});


app.post('/newCustomer', function (req, res) {
  var newCustomer = new customerModel({
    name:             req.body.name,
    contact_info:     req.body.info,
    message_info:     req.body.msg_info,
    address:          req.body.address,
  });

  newCustomer.save(function (err, newCus) {

    const new_cus = {
      customer : newCus
    }

    res.send(new_cus)

  })
})



app.post('/searchName', function(req, res) {
  customerModel.findOne({name: req.body.name}, function(err, client){
    var result = {cont: client, ok: true};
    if (err)
      console.log('There is an error when searching for a customer.');
    console.log("Customer: " + client);
    if (client == null)
        result.ok = false;
    else
        result.ok = true;
    console.log("Result: " + result.ok);
    res.send(result);
  });
});

app.post('/searchOrderNum', function(req, res) {
  orderModel.findOne({ordernum: req.body.ordernum, customer_id: {$exists: true}}, function(err, order){
    var result = {cont: order, ok: true};
    if (err)
      console.log('There is an error when searching for an order.');
    console.log("Order: " + order);
    if (order == null)
        result.ok = false;
    else
        result.ok = true;
    console.log("Result: " + result.ok);
    res.send(result);
  });
});


app.post('/findOldCustomer', function (req, res){
  var findingFor = req.body.name
  var results

  customerModel.find({name: {$regex: "^" + findingFor, $options: 'i'}}).lean().exec(function (err, person){
    if(person.length >= 1){
      console.log(person);

      results = {
        success: true,
        old_customer: person[0]
      }

      res.send(results);
    }
    //else, only return success false
    else {
      console.log("The post does not exist in the database");

      results = {
        success: false,
        message: findingFor + " was not found"
      }

      res.send(results);
    }
  })
})

app.post('/nextStatus', function (req, res) {
    // orderModel.findOne({ordernum: req.body.ordernum}).lean().exec(function(err, data){
    //     var update = {
    //         ordernum:         data.ordernum,
    //         name:             data.name,
    //         contact_info:     data.contact_info,
    //         mode_of_delivery: data.mode_of_delivery,
    //         address:          data.address,
    //         date:             data.date,
    //         time:             data.time,
    //         paellasize:       data.paellasize,
    //         status:           req.body.status,
    //         extraremarks:     data.extraremarks,
    //         pan_used:         data.pan_used
    //     }

    // orderModel.findOneAndUpdate({ordernum: req.body.ordernum},update, function (err, order){

    // });
});

/* --------------------------------------- END OF FEATURES -------------------------------------- */
