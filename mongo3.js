/**Here we will learn how to search for documents but only fetch the fields
we need. Also known as `projection` in MongoDB

Use the `parrots` collection from the database named `learnyoumongo` to
find all documents where `age` is greater than the first argument
passed to your script.

The difference from the last lesson will be that we only want the
`name` and `age` properties**/

var MongoClient = require('mongodb').MongoClient
  , assert = require('assert');

// Connection URL
var url = 'mongodb://localhost:27017/mymongo';
// Use connect method to connect to the Server
MongoClient.connect(url, function(err, db) {
  assert.equal(null, err);
  console.log("Connected correctly to server");

   var collection = db.collection('mongo56');

   // Insert some documents in parrots collection
   collection.insertMany([{
      name: 'Fred'
    , age: 25
    }, {
      name: 'Jane'
    , age: 34
    }, {
      name: 'Jenny'
    , age: 23
    }], function(err, result) {
        console.log("insertedMany");


  // Find some documents
  collection.find({age: { $lt: 30 }},
  {name: 1, age: 1, _id: 0}).toArray(function(err, docs) {
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