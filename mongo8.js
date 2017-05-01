/**Here we will learn how to count the number of documents that
meet certain criteria.

Use the `parrots` collection from the database named `learnyoumongo` to
count all documents where `age` is greater than the first argument
passed to your script.

Using `console.log`, print the number to `stdout`.**/

var MongoClient = require('mongodb').MongoClient
  , assert = require('assert');

// Connection URL
var url = 'mongodb://localhost:27017/mym8';
// Use connect method to connect to the Server
MongoClient.connect(url, function(err, db) {
  assert.equal(null, err);
  console.log("Connected correctly to server");

   var collection = db.collection('c8');

   // Insert some documents in parrots collection
   collection.insertMany([
    {
  "name": "Lili",
  "age": 25,
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
     {
  "name": "Maria",
  "age": 24,
  "username": "juliatime"
    },
  ], function(err, result) {


    collection.count({age: { $lt: 30 }}, function(err, count) {
    console.dir(count);

    //collection.find().toArray(function(err, docs) {
    //console.dir(docs)

    collection.stats(function(err, stats) {
      console.log("the stats are "+ stats.count);

     db.close();
})
})
})
})
//})