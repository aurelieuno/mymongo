/**This lesson involves removing a document with the given `_id`.

The database name will be accessible via `process.argv[2]`.

The collection name will be passed as the second argument to your script.

The `_id` will be passed as the third argument to your script.**/

var MongoClient = require('mongodb').MongoClient
  , assert = require('assert');

// Connection URL
var url = 'mongodb://localhost:27017/mymongo';
// Use connect method to connect to the Server
MongoClient.connect(url, function(err, db) {
  assert.equal(null, err);
  console.log("Connected correctly to server");

   var collection = db.collection('mongo88');

   // Insert some documents in parrots collection
   collection.insertMany([
    {
  "name": "Lili",
  "age": 30,
  "username": "tinatime"
    },
      {
  "name": "Pauline",
  "age": 35,
  "username": "mariatime"
    },
      {
  "name": "Julia",
  "age": 34,
  "username": "juliatime"
    },
  ], function(err, result) {
        console.log("insertedMany");
        console.log(result.ops);

    collection.remove({ name: "Julia" }, function(err, result) {
    console.log("Removed the document");
    console.dir(result.result);

    collection.find().toArray(function(err, docs) {
    console.log("found")
    console.dir(docs)

    collection.stats(function(err, stats) {
      console.log("the stats are "+ stats.count);



     db.close();
})
})
})
})
})


/**

C:\Users\u00136\node_modules\mymongo>node mongo7.js
Connected correctly to server
insertedMany
[ { name: 'Lili',
    age: 30,
    username: 'tinatime',
    _id: 58d2be71dade792158e20d47 },
  { name: 'Pauline',
    age: 35,
    username: 'mariatime',
    _id: 58d2be71dade792158e20d48 },
  { name: 'Julia',
    age: 34,
    username: 'juliatime',
    _id: 58d2be71dade792158e20d49 } ]
Removed the document
{ n: 1, ok: 1 }
found
[ { _id: ObjectID { _bsontype: 'ObjectID', id: [Object] },
    name: 'Lili',
    age: 30,
    username: 'tinatime' },
  { _id: ObjectID { _bsontype: 'ObjectID', id: [Object] },
    name: 'Pauline',
    age: 35,
    username: 'mariatime' } ]



















    **/