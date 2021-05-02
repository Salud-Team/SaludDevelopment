const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const QRCode = require('qrcode');
const fs = require("fs");
const request = require("request"); 
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
  var personalUser = req.body.personalUser;
  if (personalUser == undefined){
    personalUser = true; 
  }
  console.log(personalUser);
  db.salud_models.SaludUser.find({email: email, password: password, personalUser: personalUser}, function(err, docs){
    if (err){
      console.log(err);
    }
    else{
      console.log("Second function call : ", docs);
      res.send(docs);
  }
  }); 
}); 

app.post("/signupPersonal", (req, res) => {
  var current_users= []; 
  db.salud_models.SaludUser.find({}, function(err, docs){
    if (err){
      console.log(err);
    }
    else{
      console.log("Second function call : ", docs);
      for (var i in docs){
        current_users.push(docs[i].id); 
      }
    }
  });
  var id = 0; 
  while (id == 0 && !(current_users.includes(id))){
    id = Math.floor(Math.random() * 1000000000) % 9999999; 
    console.log(id);
  }
  db.salud_models.SaludUser.insertMany([{id: id, name: req.body.name, phone_num: req.body.phone_num, email: req.body.email, password: req.body.password, personalUser: true, picture: req.body.picture||""}])
  .then(function(){
    console.log("New Salud User created");
    //res.send("Entered successfully."); 
  }).catch(function(error){
    console.log(error);
    //res.send("Entered unsuccessfully."); 
  });
  db.salud_models.PersonalUser.insertMany([{id: id, name: req.body.name, payment_type: req.body.payment_type}])
  .then(function(){
    console.log("New Personal User created");
    res.send("Entered successfully."); 
  }).catch(function(error){
    console.log(error);
    res.send("Entered unsuccessfully."); 
  });
});

app.post("/signupMerchant", (req, res) => {
  var current_users= []; 
  db.salud_models.SaludUser.find({}, function(err, docs){
    if (err){
      console.log(err);
    }
    else{
      console.log("Second function call : ", docs);
      for (var i in docs){
        current_users.push(docs[i].id); 
      }
    }
  });
  var id = 0; 
  while (id == 0 && !(current_users.includes(id))){
    id = Math.floor(Math.random() * 1000000000) % 9999999; 
    console.log(id);
  }
  db.salud_models.SaludUser.insertMany([{id: id, name: req.body.name, phone_num: req.body.phone_num, email: req.body.email, password: req.body.password, personalUser: false, picture: req.body.picture||""}])
  .then(function(){
    console.log("New Salud User created");
    //res.send("Entered successfully."); 
  }).catch(function(error){
    console.log(error);
    //res.send("Entered unsuccessfully."); 
  });
  db.salud_models.MerchantUser.insertMany([{id: id, name: req.body.name, location: req.body.location, city: req.body.city||"", state: req.body.state||"", zip_code: req.body.zipcode || "",  food_type: req.body.food_type}])
  .then(function(){
    console.log("New Merchant created");
    res.send("Entered successfully."); 
  }).catch(function(error){
    console.log(error);
    res.send("Entered unsuccessfully."); 
  });
});


app.put("/createOrder", (req, res) =>{

}); 

app.get("/pullAllOrders", (req, res) =>{

}); 

app.get("/pullUnredeemedOrdersOfUser", (req, res) =>{
  var id = req.body.id || 0125; 
  console.log("In this endpoint"); 
  db.salud_models.Order.find({gifter_id: id, redeemed: false}, function(err, docs){
    if (err){
      console.log(err);
    }
    else{
      console.log("Second function call : ", docs);
      res.json(docs);
  }
  }); 
});

app.put("/aggregationOrderOfUser", (req, res) =>{
  var id = req.body.id; 
  //Right idea, but we're going to use pipelines for multijoins
  db.salud_models.Order.aggregate([{
    $match: {
      gifter_id: id
    }
  }, {
    $lookup:
    {
      from: "saludusers", 
      localField: "gifter_id", 
      foreignField: "id", 
      as: "gifter"
    }
  },{
    $unwind: "$gifter" 
  }, {
    $lookup:
    {
      from: "saludusers", 
      localField: "recipient_id", 
      foreignField: "id", 
      as: "recipient"
    }
  },{
    $unwind: "$recipient" 
  }, {
    $lookup:
    {
      from: "saludusers", 
      localField: "merchant_id", 
      foreignField: "id", 
      as: "merchant"
    }
  },{
    $unwind: "$merchant" 
  }], function(err, docs){
    if (err){
      console.log(err);
    }
    else{
      console.log("Second function call : ", docs);
      res.json(docs);
    }
  });
});

app.put("/aggregationReceivedOrderOfUser", (req, res) =>{
  var id = req.body.id; 
  //Right idea, but we're going to use pipelines for multijoins
  db.salud_models.Order.aggregate([{
    $match: {
      recipient_id: id
    }
  }, {
    $lookup:
    {
      from: "saludusers", 
      localField: "gifter_id", 
      foreignField: "id", 
      as: "gifter"
    }
  },{
    $unwind: "$gifter" 
  }, {
    $lookup:
    {
      from: "saludusers", 
      localField: "recipient_id", 
      foreignField: "id", 
      as: "recipient"
    }
  },{
    $unwind: "$recipient" 
  }, {
    $lookup:
    {
      from: "saludusers", 
      localField: "merchant_id", 
      foreignField: "id", 
      as: "merchant"
    }
  },{
    $unwind: "$merchant" 
  }], function(err, docs){
    if (err){
      console.log(err);
    }
    else{
      console.log("Second function call : ", docs);
      res.json(docs);
    }
  });
});

app.put("/aggregationReceivedValidOrderOfUser", (req, res) =>{
  var id = req.body.id; 
  //Right idea, but we're going to use pipelines for multijoins
  db.salud_models.Order.aggregate([{
    $match: {
      $and: [
        {
          recipient_id: id,
          redeemed: false
        }
      ]
    }
  }, {
    $lookup:
    {
      from: "saludusers", 
      localField: "gifter_id", 
      foreignField: "id", 
      as: "gifter"
    }
  },{
    $unwind: "$gifter" 
  }, {
    $lookup:
    {
      from: "saludusers", 
      localField: "recipient_id", 
      foreignField: "id", 
      as: "recipient"
    }
  },{
    $unwind: "$recipient" 
  }, {
    $lookup:
    {
      from: "saludusers", 
      localField: "merchant_id", 
      foreignField: "id", 
      as: "merchant"
    }
  },{
    $unwind: "$merchant" 
  }], function(err, docs){
    if (err){
      console.log(err);
    }
    else{
      console.log("Second function call : ", docs);
      res.json(docs);
    }
  });
});

app.put("/pullUnredeemedOrdersOfUser", (req, res) =>{
  var id = req.body.id; 
  console.log("In this endpoint"); 
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

app.put("/pullUnredeemedOrdersGivenToUser", (req, res) =>{
  var id = req.body.id; 
  console.log("In this endpoint"); 
  db.salud_models.Order.find({recipient_id: id, redeemed: false}, function(err, docs){
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

app.get("/findOrder", (req, res) =>{
  var id = req.body.id; 
  db.salud_models.Order.find({id: id, redeemed: false}, function(err, docs){
    if (err){
      console.log(err);
    }
    else{
      console.log("Second function call : ", docs);
      res.send(docs);
  }
  }); 
}); 

app.put("/redeemOrder", (req, res) =>{
  var id = req.body.id; 
  db.salud_models.Order.find({id: id, redeemed: false}, function(err, docs){
    if (err){
      console.log(err);
    }
    else{
      console.log("Second function call : ", docs);
      //res.send(docs);
      //Update Order
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

app.put("/RecipientScreen", (req, res) => { 
  var id = parseInt(req.body.id); 
  console.log(id);
  db.salud_models.SaludUser.find({id: {$ne: id}, personalUser: true}, function(err, docs){
    if (err){
      console.log(err);
    }
    else{
      console.log("Second function call : ", docs);
      res.json(docs);
  }
  });
});

app.put("/getUserbyId", (req, res) =>{
  var id = req.body.id; 
  db.salud_models.SaludUser.find({id: id}, function(err, docs){
    if (err){
      console.log(err);
    }
    else{
      console.log("Second function call : ", docs);
      res.send(docs);
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

app.get("/PullAllMerchants", (req, res) => { 
  db.salud_models.SaludUser.aggregate([{
    $match: {
      personalUser: false
    }
  },{
    $lookup:
    {
      from: "merchantusers", 
      localField: "id", 
      foreignField: "id", 
      as: "merchant"
    }
  }, {
    $unwind: "$merchant"
  }], function(err, docs){
    if (err){
      console.log(err);
    }
    else{
      console.log("Second function call : ", docs);
      res.json(docs);
  }
  });
});

app.put("/OrderQRCodes", (req, res) => {
  var code = "";
  var r;  
  db.salud_models.Order.find({id: req.body.id}, function(err, docs){
    if (err){
      console.log(err);
    }
    else{
      code = docs[0].qrCode;
      r = docs; 
      if(code == undefined){
        console.log("Im in here");
        var x = turnOrderIntoQRCodes(req.body.id||38532);
        db.salud_models.Order.find({id: x}, function(err, docs){
          if (err){
            console.log(err);
          }
          else{
            console.log("Second function call : ", docs);
            res.json(docs);
          }
        });
      }
      else{
        console.log("Here now?");
        res.json(r);
      }
    }
  });
})


app.put("/GetMerchantById", (req, res) => { 
  var id = req.body.id; 
  db.salud_models.SaludUser.aggregate([{
    $match: {
      personalUser: false
    }
  },{
    $match: {
      id: id
    }
  },{
    $lookup:
    {
      from: "merchantusers", 
      localField: "id", 
      foreignField: "id", 
      as: "merchant"
    }
  }, {
    $unwind: "$merchant"
  }], function(err, docs){
    if (err){
      console.log(err);
    }
    else{
      console.log("Second function call : ", docs);
      res.json(docs);
  }
  });
});


app.put("/GetPersonalById", (req, res) => { 
  var id = req.body.id; 
  db.salud_models.SaludUser.aggregate([{
    $match: {
      personalUser: true
    }
  },{
    $match: {
      id: id
    }
  },{
    $lookup:
    {
      from: "personalusers", 
      localField: "id", 
      foreignField: "id", 
      as: "personal"
    }
  }, {
    $unwind: "$personal"
  }], function(err, docs){
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

app.post("/OrderData", (req, res) => {
  var current_orders = []; 
  db.salud_models.Order.find({}, function(err, docs){
    if (err){
      console.log(err);
    }
    else{
      console.log("Second function call : ", docs);
      for (var i in docs){
        current_orders.push(docs[i].id); 
      }
    }
  });
  var id = 0; 
  while (id == 0 && !(current_orders.includes(id))){
    id = Math.floor(Math.random() * 1000000000) % 9999999; 
    console.log(id);
  }
  db.salud_models.Order.insertMany([{id: id, gifter_id: req.body.gifter_id, recipient_id: req.body.recipient_id, merchant_id: req.body.merchant_id, amount: req.body.amount, description: req.body.description, redeemed: false, video: req.body.video}])
  .then(function(){
    console.log("New order created");

    res.send("Entered successfully."); 
  }).catch(function(error){
    console.log(error);
    res.send("Entered unsuccessfully."); 
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

 db.salud_models.SaludUser.insertMany([{name: 'Test User', id: 0123, phone_num: 2103469382, email: "testuser@gmail.com", password: "test123", personalUser: true, picture: '../angular-salud-app/src/assets/images/external-content.duckduckgo.com.jpg'},
{name: 'Test Recipient', id: 0125, phone_num: 2192069382, email: "testuser2@gmail.com", password: "test100", personalUser: true,  picture: '../angular-salud-app/src/assets/images/external-content.duckduckgo.com.jpg'},
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
db.salud_models.MerchantUser.insertMany([{name: 'Food Place 1', id: 9998, location: "100 Cornet Drive", city: "Philadelphia", state: "PA", zip_code: "19026", food_type: "Beer"},
{name: 'Food Place 2', id: 9997, location: "200 Cornet Drive", city: "Boston", state: "MA", zip_code: "30291", food_type: "Wine"},
{name: 'Food Place 3', id: 9967, location: "300 Cornet Drive", city: "San Francisco", state: "CA", zip_code: "90153", food_type: "Beer"}]).then(function(){
  console.log("MerchantUser Data inserted");
}).catch(function(error){
  console.log(error);
});
db.salud_models.Order.insertMany([
  {id: 19032, gifter_id: 0123, recipient_id: 0125, merchant_id: 9998, amount: 25, description: "Beer at place. Happy Birthday", redeemed: false},
  {id: 192032, gifter_id: 0125, recipient_id: 0123, merchant_id: 9998, amount: 25, description: "Thanks for the beer, have your own.", redeemed: false},
  {id: 90213, gifter_id: 0123, recipient_id: 0125, merchant_id: 9998, amount: 20, description: "Return to sender.", redeemed: true},
  {id: 403923, gifter_id: 0123, recipient_id: 0125, merchant_id: 9997, amount: 15, description: "Here you go!", redeemed: false},
  {id: 74384, gifter_id: 0125, recipient_id: 0123, merchant_id: 9997, amount: 60, description: "Wine for my friend", redeemed: false},
  {id: 935842, gifter_id: 0123, recipient_id: 0125, merchant_id: 9997, amount: 45, description: "Payback", redeemed: false},
  {id: 9245310, gifter_id: 0125, recipient_id: 0123, merchant_id: 9997, amount: 65, description: "More wine", redeemed: true},
  {id: 38532, gifter_id: 0123, recipient_id: 0125, merchant_id: 9967, amount: 25, description: "More beer", redeemed: false},
  {id: 1104924, gifter_id: 0125, recipient_id: 0123, merchant_id: 9967, amount: 90, description: "Stop sending me stuff", redeemed: true},
  {id: 482045, gifter_id: 0123, recipient_id: 0125, merchant_id: 9967, amount: 25, description: "Cool", redeemed: true},
  {id: 28465291, gifter_id: 0125, recipient_id: 0123, merchant_id: 9967, amount: 15, description: "Yelp", redeemed: false},
]).then(function(){
  console.log("Order Data inserted");
}).catch(function(error){
  console.log(error);
});
}


function turnOrderIntoQRCodes(id){
  db.salud_models.Order.find({id: id}, function(err, docs){
    if (err){
      console.log(err);
    }
    else{
      var b = JSON.stringify(docs[0]);
      QRCode.toDataURL(b, function(err, code){
        if(err) return console.log("error occurred");
        console.log(code);
        db.salud_models.Order.updateOne({id: id},{qrCode: code},function(err, doc2){
          if(err){
            console.log(err); 
          }
          else{
            console.log("Updated Order: ", doc2);
          }
        })
      })
    }
  });
}