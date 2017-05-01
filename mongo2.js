//Use the parrots collection to find all documents where
//age is greater than the first argument passed to your script.

//Connecting to MongoDB
var MongoClient = require('mongodb').MongoClient
  , assert = require('assert');

// Connection URL
var url = 'mongodb://localhost:27017/mymongo';
// Use connect method to connect to the Server
MongoClient.connect(url, function(err, db) {
  assert.equal(null, err);
  console.log("Connected correctly to server");

   var collection = db.collection('mongo480');

   // Insert some documents in parrots collection
   collection.insertMany([{
      name: 'Fred'
    , age: 27
    }, {
      name: 'Jane'
    , age: 34
    }, {
      name: 'Jenny'
    , age: 25
    }],function(err, result) {
      console.log(result.ops)
        console.log("insertedMany");


  // Find some documents
  collection.find({age: { $lt: 30 }}).toArray(function(err, docs) {
    console.log(docs.length)
    console.log("Found the following records");
    console.dir(docs)

     db.close();
  });
})
})
/**C:\Users\u00136\node_modules\mymongo>no
Connected correctly to server
[ { firstName: 'Fred',
    lastName: 'Jones',
    _id: 58d18acb1dbbe6221c1b0754 } ]**/