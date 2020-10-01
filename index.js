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
const pansModel = require('./models/pans');
const ingredientsModel = require('./models/ingredients');

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

var curr_username = "";

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
    if (result.length == 0) {
      res.render('Homepage', {
        curruser: curr_username,
        title: "Home",
        styles: "css/styles_inside.css",
        scripts: "script/HomepageScript.js",
        body_class: "inside",
        records: content
      });
    }
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
              records: content,
              username: curr_username
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
            var statusBtnClass;
            // if the status is completed then you cant click on it na
            if(order.status == "Completed") {
              statusBtnClass = "btn completed-status btn-lg btn-block";
            }
            else {
              statusBtnClass = "btn btn-success btn-lg btn-block";
            }

            var arrChecked = [];
            var checkedValues;
            var isComplete = true;
            var isChecked = false;
            var i = 0;
            var saveText = "";

            for (i = 0 ; i < 23; i++){
              isChecked = order.order_ingredients[i].checked;

              if(isChecked == true) {  // if checked then its disabled
                checkedValues = {
                  value: "checked disabled"
                }
              }
              else {  // else its not disabled
                checkedValues = {
                  value: ""
                }
                isComplete = false;
              }

              arrChecked.push(checkedValues);

              console.log("Loop " + i + "= <"+order.order_ingredients[i].checked+", "+arrChecked[i].value+">");
            }

            // if its not complete, it wont be disabled
            if(isComplete == false) {
              saveBtnClass = "btn btn-warning btn-lg btn-block";
              saveText = "Save";
            }
            // if everythings checked & status is buying ingredients, then the save button will be disabled
            else if(isComplete == true && order.status == "Buying Ingredients") {
              saveBtnClass = "btn completed-status btn-lg btn-block"
              saveText = "Complete!";
            }
            // if everythings checked & status is complete ingredients, then the save button will be hidden and disabled
            else if(isComplete == true && order.status == "Complete Ingredients") {
              saveBtnClass = "btn completed-ingredients btn-lg btn-block"
              saveText = "Complete!";
            }
            // if status is anything after complete ingredients, then its both hidden and disabled
            else {
              saveBtnClass = "btn completed-ingredients btn-lg btn-block"
              saveText = "Complete!";
            }
            
            ingredientsModel.find().lean().exec(function (err, thing){
              if(err) {
                throw err;
              }
              else {

                // checking if theres stock for the ingredients
                var arrQuantity = [];
                var quantity;
                var i=-1;

                thing.forEach(function(doc) {
                  i++;
                  var inventory = doc;
                  var inventoryQty = inventory.quantity;
                  var orderQty = order.order_ingredients[i].quantity;

                    // if the quantity in inventory is >= to the quantity in order, then that means there IS stock (checkbox is not disabled)
                    if (inventoryQty >= orderQty || order.order_ingredients[i].checked == true) {
                      quantity = {
                        stock: ""
                      }
                    }
                    // kulang yung nasa inventory (checkbox will be = indeterminate, no pointer events, and show that its out of stock)
                    else {
                      quantity = {
                        stock: "(Out of Stock)"
                      }
                    }

                  arrQuantity.push(quantity);
                });


                // info for profit computation depending on price
                var customerPrice;
                var ingredientsPrice;
                var computation;
                var size = order.paellasize;

                if(order.status == "Completed") {
                  if(size == "14 inches") {
                    customerPrice = "2,800.00";
                    ingredientsPrice = "1,704.50";
                    computation = "1095.5";
                  }
                  else if(size == "16 inches") {
                    customerPrice = "3,200.00";
                    ingredientsPrice = "2,321.30";
                    computation = "878.50";
                  }
                  else if(size == "20 inches") {
                    customerPrice = "4,000.00";
                    ingredientsPrice = "2,642.64";
                    computation = "1,357.36";
                  }
                }
                else {
                  customerPrice = "None";
                  ingredientsPrice = "None";
                  computation = "None";
                }
                
                // LAST = rendering of stuff in order info page
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
                  pan: order.pan_used,
                  statusClass: statusBtnClass,
                  saveClass: saveBtnClass,
                  saveText: saveText,
                  array: order.order_ingredients,
                  quantity: arrQuantity,
                  checked: arrChecked,
                  payment1: customerPrice,
                  payment2: ingredientsPrice,
                  profit: computation
                });
              }
            });
            
          });
    });
});

// [PAGE-05] INGREDIENTS INVENTORY
app.get('/ingredients-inventory', function(req, res){


   ingredientsModel.find().lean().exec(function(err, result){
    if(err) throw err;

      res.render('IngredientsInventory', {
        title: "Ingredients Inventory",
        styles: "css/styles_inside.css",
        scripts: "script/IngredientsInventoryScript.js",
        body_class: "inside",
        records: result
    });

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
    var content14 = [];
    var img14;

    var content16 = [];
    var img16;

    var content20 = [];
    var img20;

    var classinfo;
    var entry;

    // For the row of 14 inch pans
    pansModel.find({name: {$regex: /14/}}).exec(function(err, result){
      if(err) throw err;

      result.forEach(function(doc) {
        img14 = "/images/14ABCD.jpg"

        // changing the button color based on its availability
        if(doc.toObject().availability) {
          classinfo = "btn btn-success btn-block pan-status";
        }
        else {
          classinfo = "btn btn-warning btn-block pan-status";
        }

        entry = {main: doc.toObject(), image: img14, btnClass: classinfo};
        content14.push(entry);
        var thing ="";
      });

      // For the row of 16 inch pans
      pansModel.find({name: {$exists: true, $regex: /16/}}).exec(function(err, result){
        if(err) throw err;

        result.forEach(function(doc) {
          if(doc.toObject().name == "16A") {
            img16 = "/images/16A.jpg";
          }
          else {
            img16 = "/images/16BC.jpg";
          }

          // changing the button color based on its availability
          if(doc.toObject().availability) {
            classinfo = "btn btn-success btn-block pan-status";
          }
          else {
            classinfo = "btn btn-warning btn-block pan-status";
          }

          entry = {main: doc.toObject(), image: img16, btnClass: classinfo};
          content16.push(entry);
        });

        // For the row of 20 inch pans
        pansModel.find({name: {$exists: true, $regex: /20/}}).exec(function(err, result){
          if(err) throw err;

          result.forEach(function(doc) {
            if(doc.toObject().ame == "20A") {
              img20 = "/images/20A.jpg";
            }
            else {
              img20 = "/images/20BCD.jpg";
            }

            // changing the button color based on its availability
            if(doc.toObject().availability) {
              classinfo = "btn btn-success btn-block pan-status";
            }
            else {
              classinfo = "btn btn-warning btn-block pan-status";
            }

            entry = {main: doc.toObject(), image: img20, btnClass: classinfo};
            content20.push(entry);
          });

          res.render('PansInventory', {
            title: "Pans Inventory",
            styles: "css/styles_inside.css",
            scripts: "script/PansInventoryScript.js",
            body_class: "inside",
            records14: content14,
            records16: content16,
            records20: content20
          });

          pan14info = content14;
          pan16info = content16;
          pan20info = content20;
        });
      });

    });
});

// [PAGE-08] ALL ORDERS
app.get('/orders', function(req, res){
  var content = [];
  var entry;
  var i = 0;

  orderModel.find({customer_id: {$exists: true}}).sort({date: 1}).exec(function(err, result){
    if(err) throw err
    if (result.length == 0) {
      res.render('AllOrders', {
          title: "All Orders",
          styles: "css/styles_inside.css",
          scripts: "script/AllOrdersScript.js",
          body_class: "inside",
          records: content
      });
    }
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
        if (result.length == 0) {
          res.render('AllCustomers', {
            title: "All Customers",
            styles: "css/styles_inside.css",
            scripts: "script/AllCustomersScript.js",
            body_class: "inside",
            records: content
          });
        }
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

app.post('/newUser', function (req, res) {
      var user = new userModel({
          username:     req.body.username,
          password:     req.body.password,

      });
      var result;
      //you can re register the same person with the same details over and over

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


              res.send(result);
              // tempRoute = "-" + order.ordernum


          }
      });
});

app.post('/login',function (req,res){
  userModel.findOne({username: req.body.user.username, password: req.body.user.password}, function(err, user){
    var result = {cont: user, ok: true};
    if (err)
      console.log('There is an error when searching for a user.');
    console.log("User: " + user);
    if (user == null)
        result.ok = false;
    else{
      result.ok = true;
      curr_username = user.username;
    }
        
    console.log("Result: " + result.ok);
    res.send(result);
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
    var bool = true
    customerModel.findOneAndUpdate({name : req.body.name}, {$set:query}, {new : true}, function (err, cus){
      var newCustomer;
      if (cus){
        newCustomer = cus
      }else{
        newCustomer = new customerModel({
        name:             req.body.name,
        contact_info:     req.body.info,
        message_info:     req.body.msg_info,
        address:          req.body.address,
        });
        bool = false
      }

      orderModel.countDocuments().exec(function (err, count){

        count = count + 1;
        count = count.toString().padStart(3, '0');

        // generating orderIngredients quantities depending on the paella size
          var arrObjects = [];
          var arrQuantity = [];

        // quantities for 14 inch paellasize
          if(req.body.paellasize == "14 inches") {
            arrQuantity = [1, 50, 1, 1.5, 4,1, 1, 2, 200, 1.5, 6, 8, 14, 20, 1, 6, 3, 3, 220, 4, 2, 2, 1]
          }

        // quantities for 16 inch paellasize
          if(req.body.paellasize == "16 inches") {
            arrQuantity = [1.5, 75, 1.5, 2, 6, 2, 2, 3, 250, 2, 8,10, 18, 25, 1.5, 9, 4.5, 4, 220, 4, 2, 2, 2]
          }

        // quantities for 20 inch paellasize
          if(req.body.paellasize == "20 inches") {
            arrQuantity = [2, 100, 2, 3, 10, 2, 2, 4, 350, 2, 8, 10, 22, 30, 2, 13, 6.5, 6, 220, 4, 2, 2, 2]
          }

        // loop for making the array of ingredients objects
          var i=0;
          var ingredientName = "";
          var tempNum = 0;

          for (i = 0 ; i < 23; i++){
            // index 0 to 4 = soffrito 1 to 5
              if (i>=0 && i<=4) {
                tempNum = i+1;
                ingredientName = "soffrito_" + tempNum;
              }

            // index 5 to 8 = meat 1 to 4
              if (i>=5 && i<=8) {
                tempNum = i-4;
                ingredientName = "meat_" + tempNum;
              }

            // index 9 to 14 = seafood 1 to 6
              if (i>=9 && i<=14) {
                tempNum = i-8;
                ingredientName = "seafood_" + tempNum;
              }

            // index 15 = stock 1
              if (i==15) {
                ingredientName = "stock_1";
              }

            // index 16 to 22 = etc 1 to 7
              if (i>=16 && i<=22) {
                tempNum = i-15
                ingredientName = "etc_" + tempNum;
              }
            
            var checkedValue = false;

            var ingredientObject = {
              name: ingredientName,
              quantity: arrQuantity[i],
              checked: checkedValue
            };

            arrObjects.push(ingredientObject);
          }

        var order = new orderModel({
          ordernum:           year + "-" + count,
          customer_id:        newCustomer._id,
          mode_of_delivery:   req.body.mode,
          date:               req.body.date,
          time:               req.body.time,
          paellasize:         req.body.paellasize,
          status:             req.body.status,
          extraremarks:       req.body.extraremarks,
          pan_used:           req.body.pan_used,
          order_ingredients:  arrObjects
        });
        var result;

        order.save(function(err, new_order) {
          if (err){
             console.log(err.errors);

            result = {success: false, message: "new order was not created"};
            res.send(result);
          }
          else {
            console.log("New order added");
            console.log(new_order);
            if (bool == false){
              newCustomer.save(function (err, new_customer) {
                console.log("New customer added");
                console.log(new_customer);

                result = {
                  success: true,
                  message: "new order was created"
                };
                
              });
              
            }
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

app.post('/saveCheckedIngredients', function (req, res){
  var newChecked = req.body.checked;
  var update;
  var result;

  orderModel.findOne({ordernum: req.body.ordernum}, function(err, data){
      // loop to update the checked value
      var newIngredients = data.order_ingredients;

      for (i=0; i<23; i++) {
        if(newChecked[i] == "true") {
          newIngredients[i].checked = true;
        }
        else {
          newIngredients[i].checked = false;
        }
          ;
      }

      update = {
          ordernum:           data.ordernum,
          name:               data.name,
          contact_info:       data.contact_info,
          mode_of_delivery:   data.mode_of_delivery,
          address:            data.address,
          date:               data.date,
          time:               data.time,
          paellasize:         data.paellasize,
          status:             data.status,
          extraremarks:       data.extraremarks,
          pan_used:           data.pan_used,
          order_ingredients:  newIngredients
      }

      orderModel.findOneAndUpdate({ordernum: req.body.ordernum}, update, { new: false }, function (err, order){
        if (err) {
          throw err;
        }
        else {
          result = {
            success: true
          }

          res.send(result);
          console.log("Successfully Updated the Ingredients!\n");
        }
      });
  });
});

app.post('/deductCheckedIngredients', function (req, res){
  var order = req.body.quantity;
  var update;
  var result;
  var i=-1;

  console.log(order[0]);
  
  ingredientsModel.find().lean().exec(function(err, result){
    if(err) throw err;

    var allUpdated = true;

    result.forEach(function(doc) {
      i++;
      var inventory = doc
      var inventoryQty = inventory.quantity;
      var orderQty = order[i];
      var deducted;

      var deducted = inventoryQty - orderQty;

      console.log("<"+inventoryQty+" - "+orderQty+" = "+deducted+">")

      update = {
        name: inventory.name,
        quantity: deducted
      }

      ingredientsModel.findOneAndUpdate({name: inventory.name}, update, { new: false }, function (err, order){
        if (err) {
          throw err;
          allUpdated = false;

          var result = {
            success: false
          }
          
          console.log("Ingredients Inventory was not updated\n");
          res.send(result);
        }
      });

    });


    if(allUpdated == true) {
      result = {
        success: true
      }

      console.log("Successfully Updated the Ingredients Inventory!\n");
      res.send(result);
    }
  
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
    var update;
    var result;

    orderModel.findOne({ordernum: req.body.ordernum}, function(err, data){
        update = {
            ordernum:         data.ordernum,
            name:             data.name,
            contact_info:     data.contact_info,
            mode_of_delivery: data.mode_of_delivery,
            address:          data.address,
            date:             data.date,
            time:             data.time,
            paellasize:       data.paellasize,
            status:           req.body.status,
            extraremarks:     data.extraremarks,
            pan_used:         data.pan_used
        }

        orderModel.findOneAndUpdate({ordernum: req.body.ordernum}, update, { new: false }, function (err, order){
          if (err) {
            throw err;

            result = {
              success: false
            }

            res.send(result);
          }
          else {
            result = {
              success: true
            }

            res.send(result);
            console.log("Successfully Updated the Status!\n");
          }
        });
    });
});

app.post('/assignPan', function (req, res) {
  var update;
  var result;

  orderModel.findOne({ordernum: req.body.ordernum}, function(err, data){
      var panName = "Pan #" + req.body.pan;
      update = {
          ordernum:         data.ordernum,
          name:             data.name,
          contact_info:     data.contact_info,
          mode_of_delivery: data.mode_of_delivery,
          address:          data.address,
          date:             data.date,
          time:             data.time,
          paellasize:       data.paellasize,
          status:           data.status,
          extraremarks:     data.extraremarks,
          pan_used:         panName
      }

      orderModel.findOneAndUpdate({ordernum: req.body.ordernum}, update, { new: false }, function (err, order){
        if (err) {
          throw err;

          result = {
            success: false
          }

          res.send(result);
        }
        else {
          result = {
            success: true
          }

          res.send(result);
          console.log("Successfully Assigned the Pan!\n");
        }
      });
  });

  pansModel.findOne({name: req.body.pan}, function(err, data){
    var orderName = "Order #" + req.body.ordernum;

    update = {
        name:           data.name,
        availability:   false,
        order_id:       orderName
    }

    pansModel.findOneAndUpdate({name: req.body.pan}, update, { new: false }, function (err, order){
      if (err) {
        throw err;
      }
      else {
        console.log("Successfully Assigned the Pan!\n");
      }
    });
  });

});

app.post('/retrievePan', function (req, res) {
  var update;

  pansModel.findOne({name: req.body.pan}, function(err, data){
    var orderName = "Order #" + req.body.ordernum;

    update = {
        name:           data.name,
        availability:   true,
        order_id:       "Available"
    }

    pansModel.findOneAndUpdate({name: req.body.pan}, update, { new: false }, function (err, order){
      if (err) {
        throw err;
      }
      else {
        console.log("Successfully Retrieved the Pan!\n");
      }
    });
  });

});


app.post('/updateInventory', function (req, res){
  
  var update;
  
  
  ingredientsModel.find().lean().exec(function(err, result){
    if(err) throw err;

    var i = -1

    result.forEach(function(doc) {
      i++;
      var inventory = doc
      
      var newQuantity = req.body.quantity[i]
      console.log("<"+newQuantity+">");
      update = {
        name: inventory.name,
        quantity: newQuantity
      }
      var response
      ingredientsModel.findOneAndUpdate({name: inventory.name}, update, { new: false }, function (err, order){
        if (err) {
          throw err;
          response = {success: false}
        } else {
          response = {success: true}
          
        }
         
        
        
      });
      res.send(response);
    });


    
  
  });
  
});

/* --------------------------------------- END OF FEATURES -------------------------------------- */
