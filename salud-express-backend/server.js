const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
var httpProxy = require('http-proxy');

const db = require("./app/models");

const app = express();


app.use(function (req, res, next) {
  //Enabling CORS
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT");
  res.header("Access-Control-Allow-Headers", 
  "Origin, X-Requested-With, Content-Type, Accept, x-client-key, x-client-token, x-client-secret, Authorization");
    next();
  });
var corsOptions = {
  origin: "http://localhost:8081"
};

//app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(bodyParser.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

db.mongoose
  .connect(db.url, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => {
    console.log("Connected to the database!");
    //Why does delete happen before insert in this order
    deleteExistingData(); 
    /*
    var k = InsertDatapromise; 
    k.then(function(result){
      console.log("Finished Inserting Info."); 
    }, function(err){
      console.log(err); 
    })
    */
  })
  .catch(err => {
    console.log("Cannot connect to the database!", err);
    process.exit();
  });

// simple route
app.get("/", (req, res) => {
  res.json({ message: "Backend for Salud Development Application, developed by Widchard Faustin." });
  //console.log(test);
  //res.json();
});

app.get("/SaludUserData", (req, res) => { 
  db.salud_models.SaludUser.find({}, function(err, docs){
    if (err){
      console.log(err);
    }
    else{
      console.log("Second function call : ", docs);
      res.json(docs);
  }
  });
});

app.get("/login", (req, res) =>{
});

app.put("/login", (req, res) =>{
  var email = req.body.email || 'testuser@gmail.com'; 
  var password = req.body.password || 'test123'; 
  db.salud_models.SaludUser.find({email: email, password: password, personalUser: true}, function(err, docs){
    if (err){
      console.log(err);
    }
    else{
      console.log("Second function call : ", docs);
      res.send(docs);
  }
  }); 
}); 

app.get("/createOrder", (req, res) =>{

}); 

app.get("/pullAllOrders", (req, res) =>{

}); 

app.put("/pullUnredeemedOrdersOfUser", (req, res) =>{
  var id = req.body.id; 
  db.salud_models.Order.find({gifter_id: id, redeemed: false}, function(err, docs){
    if (err){
      console.log(err);
    }
    else{
      console.log("Second function call : ", docs);
      res.send(docs);
  }
  }); 
}); 

app.put("/pullUnredeemedOrdersOfMerchant", (req, res) =>{
  var id = req.body.id; 
  db.salud_models.Order.find({merchant_id: id, redeemed: false}, function(err, docs){
    if (err){
      console.log(err);
    }
    else{
      console.log("Second function call : ", docs);
      res.send(docs);
  }
  }); 
}); 

app.get("/PersonalUserData", (req, res) => { 
  db.salud_models.PersonalUser.find({}, function(err, docs){
    if (err){
      console.log(err);
    }
    else{
      console.log("Second function call : ", docs);
      res.json(docs);
  }
  });
});

app.get("/MerchantUserData", (req, res) => { 
  db.salud_models.MerchantUser.find({}, function(err, docs){
    if (err){
      console.log(err);
    }
    else{
      console.log("Second function call : ", docs);
      res.json(docs);
  }
  });
});

app.get("/OrderData", (req, res) => { 
  db.salud_models.Order.find({}, function(err, docs){
    if (err){
      console.log(err);
    }
    else{
      console.log("Second function call : ", docs);
      res.json(docs);
  }
  });
});

// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
  console.log(`Process Port is ${process.env.PORT}`);
});












//Setting up original data


async function deleteExistingData(){
  await db.salud_models.SaludUser.deleteMany({}).then(function(){
    console.log("SaludUser Data Deleted");
  }).catch(function(error){
    console.log(error);
  });
  await db.salud_models.PersonalUser.deleteMany({}).then(function(){
    console.log("SaludUser Data Deleted");
  }).catch(function(error){
    console.log(error);
  });
  await db.salud_models.MerchantUser.deleteMany({}).then(function(){
    console.log("SaludUser Data Deleted");
  }).catch(function(error){
    console.log(error);
  });
  await db.salud_models.Order.deleteMany({}).then(function(){
    console.log("SaludUser Data Deleted");
  }).catch(function(error){
    console.log(error);
  });
  //return true; 
  insertDummyData();
}


function insertDummyData(){

  db.salud_models.SaludUser.insertMany([{name: 'Test User', id: 0123, phone_num: 2103469382, email: "testuser@gmail.com", password: "test123", personalUser: true},
{name: 'Test Recipient', id: 0125, phone_num: 2192069382, email: "testuser2@gmail.com", password: "test100", personalUser: true},
{name: 'Food Place 1', id: 9998, phone_num: 2130984732, email: "fooduser1@gmail.com", password: "test124", personalUser: false},
{name: 'Food Place 2', id: 9997, phone_num: 2130984742, email: "fooduser2@gmail.com", password: "test1354", personalUser: false},
{name: 'Food Place 3', id: 9967, phone_num: 2133284742, email: "fooduser3@gmail.com", password: "test154", personalUser: false}]).then(function(){
  console.log("SaludUser Data inserted");
}).catch(function(error){
  console.log(error);
});
db.salud_models.PersonalUser.insertMany([{name: 'Test User', id: 0123, payment_type: "Google Play Services"},
{name: 'Test Recipient', id: 0125, payment_type: "Apple Pay"}]).then(function(){
  console.log("PersonalUser Data inserted");
}).catch(function(error){
  console.log(error);
});
db.salud_models.MerchantUser.insertMany([{name: 'Food Place 1', id: 9998, location: "100 Cornet Drive", food_type: "Beer"},
{name: 'Food Place 2', id: 9997, location: "200 Cornet Drive", food_type: "Wine"},
{name: 'Food Place 3', id: 9967, location: "300 Cornet Drive", food_type: "Beer"}]).then(function(){
  console.log("MerchantUser Data inserted");
}).catch(function(error){
  console.log(error);
});
}