const dbConfig = require("../config/db.config.js");
var MongoClient = require('mongodb').MongoClient;  


const mongoose = require("mongoose");
mongoose.Promise = global.Promise;

const db = {};
db.mongoose = mongoose;
db.url = dbConfig.url;
db.salud_models = require("./salud.model.js")(mongoose);


module.exports = db; 

/* If using mongodb instead of mongoose
//var inserts = require("./insertion");


MongoClient.connect(dbConfig.url, function(err, db) {
  if (err) throw err;
  console.log("Database created/connected!");
  var dbo = db.db();
  dbo.listCollections().toArray(function(err, collInfos) {
    // collInfos is an array of collection info objects that look like:
    // { name: 'test', options: {} }
    console.log(collInfos);
  });
  dbo.dropCollection("SaludUser", function(err, delOK) {
      if (err) console.log("SaludUser Collection doesnt exist");
      if (delOK) console.log("SaludUser Collection deleted");
      db.close();
    });

  dbo.dropCollection("PersonalUser", function(err, delOK) {
      if (err) console.log("PersonalUser Collection doesnt exist");
      if (delOK) console.log("PersonalUser Collection deleted");
      db.close();
    });

  dbo.dropCollection("MerchantUser", function(err, delOK) {
      if (err) console.log("MerchantUser Collection doesnt exist");
      if (delOK) console.log("MerchantUser Collection deleted");
      db.close();
    });
  dbo.dropCollection("Order", function(err, delOK) {
    if (err) console.log("Order Collection doesnt exist");
    if (delOK) console.log("Order Collection deleted");
    db.close();
  });
}); 

//inserts.insertBaseUsers();

*/

/*
if (names.length != 0){
      dbo.dropCollection("Order", function(err, delOK) {
        if (err) throw err;
        if (delOK) console.log("Order Collection deleted");
        db.close();
      });
      dbo.dropCollection("SaludUser", function(err, delOK) {
          if (err) throw err;
          if (delOK) console.log("SaludUser Collection deleted");
          db.close();
        });
  
      dbo.dropCollection("PersonalUser", function(err, delOK) {
          if (err) throw err;
          if (delOK) console.log("PersonalUser Collection deleted");
          db.close();
        });
  
      dbo.dropCollection("MerchantUser", function(err, delOK) {
          if (err) throw err;
          if (delOK) console.log("MerchantUser Collection deleted");
          db.close();
        });
    }
    dbo.dropCollection("SaludUser", function(err, delOK) {
      if (err) throw err;
      if (delOK) console.log("SaludUser Collection deleted");
      //db.close();
    });
*/