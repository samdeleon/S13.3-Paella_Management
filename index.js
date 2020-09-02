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
        body_class: "inside"
    });
});

// [PAGE-04] ORDER INFORMATION
app.get('/order-information:param', function(req, res){
    var id = req.params.param;
    /*
        id is the serial number of the order
        ^ will be used to search in the db
    */
    res.render('OrderInformation', {
        title: "Order " + id,
        styles: "css/styles_inside.css",
        body_class: "inside"
    });
});

// [PAGE-05] INGREDIENTS INVENTORY
app.get('/ingredients-inventory', function(req, res){
    res.render('IngredientsInventory', {
        title: "Ingredients Inventory",
        styles: "css/styles_inside.css",
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
        body_class: "inside"
    });
});

// [PAGE-08] ALL ORDERS
app.get('/orders', function(req, res){
    res.render('AllOrders', {
        title: "All Orders",
        styles: "css/styles_inside.css",
        body_class: "inside"
    });
});

// [PAGE-09] SEARCH PAGE
app.get('/search', function(req, res){
    res.render('Searchpage', {
        title: "Search",
        styles: "css/styles_inside.css",
        body_class: "inside"
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
        var order = new orderModel({
            ordernum:       year + "-" + count,
            name:           req.body.name,
            date:           req.body.date,
            time:           req.body.time,
            paellasize:     req.body.paellasize,
            status:         req.body.status,
            extraremarks:   req.body.extraremarks
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
            }
        });
    });


});

/* --------------------------------------- END OF FEATURES -------------------------------------- */
