const dbConfig = require("../config/db.config.js");
var MongoClient = require('mongodb').MongoClient; 

function insertBaseUsers(){
    MongoClient.connect(dbConfig.url, function(err, db) {
        if (err) throw err;
        console.log("Database created/connected!");
        var dbo = db.db();
        MongoClient.connect(dbConfig.url, function(err, db) {
            if (err) throw err;
            console.log("Database created/connected!");
            var dbo = db.db();
            var names = []; 
            //console.log(dbo.listCollections());
            dbo.listCollections().toArray(function(err, collInfos) {
              // collInfos is an array of collection info objects that look like:
              // { name: 'test', options: {} }
              console.log(collInfos);
            });
            dbo.createCollection("SaludUser", function(err, res) {
                if (err) console.log("Collection " + "SaludUser" + " already exists!");
                console.log("Collection " + "SaludUser" + " created!");
              });
        
            dbo.createCollection("PersonalUser", function(err, res) {
                if (err) console.log("Collection " + "PersonalUser" + " already exists!");
                console.log("Collection " + "PersonalUser" + " created!");
              });
        
            dbo.createCollection("MerchantUser", function(err, res) {
                if (err) console.log("Collection " + "MerchantUser" + " already exists!");
                console.log("Collection " + "MerchantUser" + " created!");
              });
        
            dbo.createCollection("Order", function(err, res) {
                if (err) console.log("Collection " + "Order" + " already exists!");
                console.log("Collection " + "Order" + " created!");
              });
              var saludinserts = [
                {name: 'Test User', _id: 0123, phone_num: 2103469382, email: "testuser@gmail.com", password: "test123", personalUser: true},
                {name: 'Test Recipient', _id: 0125, phone_num: 2192069382, email: "testuser2@gmail.com", password: "test100", personalUser: true},
                {name: 'Food Place 1', _id: 9998, phone_num: 2130984732, email: "fooduser1@gmail.com", password: "test124", personalUser: false},
                {name: 'Food Place 2', _id: 9997, phone_num: 2130984742, email: "fooduser2@gmail.com", password: "test1354", personalUser: false},
                {name: 'Food Place 3', _id: 9967, phone_num: 2133284742, email: "fooduser3@gmail.com", password: "test154", personalUser: false}
            ]; 
            var personalinserts = [
                {name: 'Test User', _id: 0123, payment_type: "Google Play Services"},
                {name: 'Test Recipient', _id: 0125, payment_type: "Apple Pay"}
            ]; 
            var merchantinserts = [
                {name: 'Food Place 1', _id: 9998, location: "100 Cornet Drive", food_type: "Beer"},
                {name: 'Food Place 2', _id: 9997, location: "200 Cornet Drive", food_type: "Wine"},
                {name: 'Food Place 3', _id: 9967, location: "300 Cornet Drive", food_type: "Beer"}
            ]; 
            var orderinserts = [];
            dbo.collection("SaludUser").insertMany(saludinserts, function(err, res) {
              if (err) console.log("Has these inserts");
              console.log(res);
              //db.close();
            });
            dbo.collection("PersonalUser").insertMany(personalinserts, function(err, res) {
              if (err) console.log("Has these inserts");
              console.log( res);
              //db.close();
            });
            dbo.collection("MerchantUser").insertMany(merchantinserts, function(err, res) {
              if (err) console.log("Has these inserts");
              console.log( res);
              //db.close();
            });


            /*
            dbo.collection("SaludUser").insertMany(saludinserts, function(err, res) {
                if (err) throw err;
                console.log("Number of documents inserted: " + res.insertedCount);
                //db.close();
              });
            dbo.collection("PersonalUser").insertMany(personalinserts, function(err, res) {
                if (err) throw err;
                console.log("Number of documents inserted: " + res.insertedCount);
                //db.close();
              });
            dbo.collection("MerchantUser").insertMany(merchantinserts, function(err, res) {
                if (err) throw err;
                console.log("Number of documents inserted: " + res.insertedCount);
               // db.close();
              });
            dbo.collection("Order").insertMany(orderinserts, function(err, res) {
                if (err) throw err;
                console.log("Number of documents inserted: " + res.insertedCount);
               // db.close();
              });
            */
            db.close();
          });

        /*
        var saludinserts = [
            {name: 'Test User', _id: 0123, phone_num: 2103469382, email: "testuser@gmail.com", password: "test123", personalUser: true},
            {name: 'Test Recipient', _id: 0125, phone_num: 2192069382, email: "testuser2@gmail.com", password: "test100", personalUser: true},
            {name: 'Food Place 1', _id: 9998, phone_num: 2130984732, email: "fooduser1@gmail.com", password: "test124", personalUser: false},
            {name: 'Food Place 2', _id: 9997, phone_num: 2130984742, email: "fooduser2@gmail.com", password: "test1354", personalUser: false},
            {name: 'Food Place 3', _id: 9967, phone_num: 2133284742, email: "fooduser3@gmail.com", password: "test154", personalUser: false}
        ]; 
        var personalinserts = [
            {name: 'Test User', _id: 0123, payment_type: "Google Play Services"},
            {name: 'Test Recipient', _id: 0125, payment_type: "Apple Pay"}
        ]; 
        var merchantinserts = [
            {name: 'Food Place 1', _id: 9998, location: "100 Cornet Drive", food_type: "Beer"},
            {name: 'Food Place 2', _id: 9997, location: "200 Cornet Drive", food_type: "Wine"},
            {name: 'Food Place 3', _id: 9967, location: "300 Cornet Drive", food_type: "Beer"}
        ]; 
        var orderinserts = []; 
        dbo.collection("SaludUser").insertMany(saludinserts, function(err, res) {
            if (err) throw err;
            console.log("Saludinserts" + res);
            //db.close();
          });
        dbo.collection("PersonalUser").insertMany(personalinserts, function(err, res) {
            if (err) throw err;
            console.log("Personalinserts" + res);
            //db.close();
          });
        dbo.collection("MerchantUser").insertMany(merchantinserts, function(err, res) {
            if (err) throw err;
            console.log("Merchantinserts" + res);
            //db.close();
          });
        dbo.collection("Order").insertMany(orderinserts, function(err, res) {
            if (err) throw err;
            console.log("orderinserts" + res);
            //db.close();
          });
        db.close(); 
    */
    }); 
}

module.exports = {insertBaseUsers}; 
