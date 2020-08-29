const express = require('express')
const path = require('path')
const exphandle = require('express-handlebars')
const handlebars = require('handlebars')

const app = express()
const port = 9090

app.engine('hbs', exphandle({
    extname: 'hbs',
    defaultView: 'main',
    layoutsDir: path.join(__dirname, '/views/layouts'), // Layouts folder
    partialsDir: path.join(__dirname, '/views/partials'), // Partials folder
}))

app.set('view engine', 'hbs')

app.use(express.static('public'))

/* ---------------------------------------- ALL 9 ROUTES ---------------------------------------- */

// [PAGE-01] LOGIN
app.get('/', function(req, res){
    res.render('Login', {
        title: "Login Page"
    })
})

// [PAGE-02] HOMEPAGE
app.get('/home', function(req, res){
    res.render('Homepage', {
        title: "Home"
    })
})

// [PAGE-03] ORDER FORM
app.get('/order-form', function(req, res){
    res.render('OrderForm', {
        title: "Order Form"
    })
})

// [PAGE-04] ORDER INFORMATION
app.get('/order-information:param', function(req, res){
    var id = req.params.param;
    /*
        id is the serial number of the order
        ^ will be used to search in the db
    */
    res.render('OrderInformation', {
        title: "Order " + id
    })
})

// [PAGE-05] INGREDIENTS INVENTORY
app.get('/ingredients-inventory', function(req, res){
    res.render('IngredientsInventory', {
        title: "Ingredients Inventory"
    })
})

// [PAGE-06] UPDATE INGREDIENTS
app.get('/update-ingredients', function(req, res){
    res.render('UpdateIngredients', {
        title: "Update Ingredients"
    })
})

// [PAGE-07] PANS INVENTORY
app.get('/pans-inventory', function(req, res){
    res.render('PansInventory', {
        title: "Pans Inventory"
    })
})

// [PAGE-08] ALL ORDERS
app.get('/orders', function(req, res){
    res.render('AllOrders', {
        title: "All Orders"
    })
})

// [PAGE-09] SEARCH PAGE
app.get('/search', function(req, res){
    res.render('Searchpage', {
        title: "Search"
    })
})

/* ---------------------------------------- END OF ROUTES --------------------------------------- */

app.listen(port, function() {
    console.log('App listening at port '  + port)
  });

/* ---------------------------------- FEATURES & POST REQUESTS ---------------------------------- */
// we'll add things here after sprint 1



/* --------------------------------------- END OF FEATURES -------------------------------------- */