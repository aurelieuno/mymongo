/**Here we are going to update a document in the `users` collection.

The database name will be accessible via `process.argv[2]`.

Say we have a user defined like:

```json
{
  "name": "Tina",
  "age": 30,
  "username": "tinatime"
}
```

We want to change Tina's age from 30 to 40.**/

var MongoClient = require('mongodb').MongoClient
  , assert = require('assert');

// Connection URL
var url = 'mongodb://localhost:27017/mymongo';
// Use connect method to connect to the Server
MongoClient.connect(url, function(err, db) {
  assert.equal(null, err);
  console.log("Connected correctly to server");

   var collection = db.collection('mongo15');

var insertDocuments = function(db, callback) {
   collection.insertMany([
    {
  "name": "Tina",
  "age": 30,
  "username": "tinatime"
    },
      {
  "name": "Maria",
  "age": 35,
  "username": "mariatime"
    },
      {
  "name": "Julia",
  "age": 34,
  "username": "juliatime"
    },
  ], function(err, result) {
    console.log("insertDocuments");
    callback(result);
  });
 }

var updateDocument = function(db, callback) {
   collection.update(
    { "name": "Tina" },
    {
      $set: {
        "age": 20,
      }
    }, function(err, result) {
      console.log("updatedDocument");
        console.log(result.result);
        callback(result);
    })
 }

var findDocuments = function(db, callback) {
   collection.find().toArray(function(err, docs) {
    console.log("foundDocuments");
    console.dir(docs)
     callback(docs);
  });
 }

 insertDocuments(db, function() {
    updateDocument(db, function() {
        findDocuments(db, function() {
          db.close();
        });
      });
    });
  })

/**
C:\Users\u00136\node_modules\mymongo>node mongo6.js
Connected correctly to server
insertDocuments
updatedDocument
{ n: 1, nModified: 1, ok: 1 }
foundDocuments
[ { _id: ObjectID { _bsontype: 'ObjectID', id: [Object] },
    name: 'Tina',
    age: 20,
    username: 'tinatime' },
  { _id: ObjectID { _bsontype: 'ObjectID', id: [Object] },
    name: 'Maria',
    age: 35,
    username: 'mariatime' },
  { _id: ObjectID { _bsontype: 'ObjectID', id: [Object] },
    name: 'Julia',
    age: 34,
    username: 'juliatime' } ]

**/
