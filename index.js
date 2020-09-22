const express = require('express');
const path = require('path');
const exphandle = require('express-handlebars');
const handlebars = require('handlebars');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const app = express();
const port = 9090;

const orderModel = require('./models/order');

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

/* ---------------------------------------- ALL 9 ROUTES ---------------------------------------- */

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
  orderModel.find({status: {$ne: "Completed"}}).sort({date: 1}).limit(10).exec(function(err, result){
    if(err) throw err;
    result.forEach(function(doc) {
      content.push(doc.toObject());
    });
    res.render('Homepage', {
      title: "Home",
      styles: "css/styles_inside.css",
      scripts: "script/HomepageScript.js",
      body_class: "inside",
      records: content
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

    orderModel.findOne({ordernum: order_id}, function (err, order){
        console.log(order);
        res.render('OrderInformation', {
            title: "Order " + order_id,
            styles: "css/styles_inside.css",
            scripts: "script/OrderInformationScript.js",
            body_class: "inside",
            ordernum: order.ordernum,
            name: order.name,
            contact: order.contact_info,
            mode: order.mode_of_delivery,
            address: order.address,
            date: order.date,
            time: order.time,
            size: order.paellasize,
            status: order.status,
            remarks: order.extraremarks,
            pan: order.pan_used
        });
    })
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
  orderModel.find().sort({date: 1}).exec(function(err, result){
    if(err) throw err;
    result.forEach(function(doc) {
      content.push(doc.toObject());
    });
    res.render('AllOrders', {
        title: "All Orders",
        styles: "css/styles_inside.css",
        scripts: "script/AllOrdersScript.js",
        body_class: "inside",
        records: content
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

app.get('/search-client-:param', function(req, res){ // TODO: change name to "search-customer" instead of client
    var  name = req.params.param;
    var content = [];

    orderModel.find({name: name}).sort({date: 1}).exec(function(err, orders){
      if(err) throw err;
      orders.forEach(function(doc) {
        content.push(doc.toObject());
      });
      console.log("Order: " + orders);

      res.render('SearchClient', {
          title: "Client " + name + " Orders",
          styles: "css/styles_inside.css",
          scripts: "script/AllOrdersScript.js",
          body_class: "inside",
          records: content,
          clname: name
      });
    });
});

/* ---------------------------------------- END OF ROUTES --------------------------------------- */

app.listen(port, function() {
    console.log('App listening at port '  + port)
  });

/* ---------------------------------- FEATURES & POST REQUESTS ---------------------------------- */
// we'll add things here after sprint 1

app.post('/newOrder', function (req, res) {

    var d = new Date();
    var year = d.getFullYear();

    orderModel.countDocuments().exec(function (err, count){
        count = count + 1;
        count = count.toString().padStart(7, '0');

        var order = new orderModel({
            ordernum:         year + "-" + count,
            name:             req.body.name,
            contact_info:     req.body.info,
            mode_of_delivery: req.body.mode,
            address:          req.body.address,
            date:             req.body.date,
            time:             req.body.time,
            paellasize:       req.body.paellasize,
            status:           req.body.status,
            extraremarks:     req.body.extraremarks,
            pan_used:         req.body.pan_used
        });
        var result;

        order.save(function(err, order) {
            if (err){
                console.log(err.errors);

                result = {success: false, message: "new order was not created"};
                res.send(result);
            }
            else{
                console.log("New order added");
                console.log(order);

                result = {success: true, message: "new order was created"};

                res.send(result);

                // tempRoute = "-" + order.ordernum


            }
        });
    });
});

app.post('/searchName', function(req, res) {
  orderModel.findOne({name: req.body.name}, function(err, order){
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

app.post('/searchOrderNum', function(req, res) {
  orderModel.findOne({ordernum: req.body.ordernum}, function(err, order){
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
