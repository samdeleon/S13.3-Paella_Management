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

//For login page
app.get('/', function(req, res){
    res.render('Login', {
        title: "Login Page"
    })
})

//For homepage
app.get('/home', function(req, res){
    res.render('Homepage', {
        title: "Home"
    })
})

//for all orders
app.get('/orders', function(req, res){
    res.render('AllOrders', {
        title: "All Orders"
    })
})

//for order Form
app.get('/order-form', function(req, res){
    res.render('OrderForm', {
        title: "Order Form"
    })
})

//for order information
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

//for ingredients inventory
app.get('/ingredients-inventory', function(req, res){
    res.render('IngredientsInventory', {
        title: "Ingredients Inventory"
    })
})

//for pans inventory
app.get('/pans-inventory', function(req, res){
    res.render('PansInventory', {
        title: "Pans Inventory"
    })
})

//for update ingredients
app.get('/update-ingredients', function(req, res){
    res.render('UpdateIngredients', {
        title: "Update Ingredients"
    })
})

//for search page
app.get('/search', function(req, res){
    res.render('Searchpage', {
        title: "Search"
    })
})


app.use(express.static('public'))

app.listen(port, function() {
    console.log('App listening at port '  + port)
  });