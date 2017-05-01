var MongoClient = require('mongodb').MongoClient
  , assert = require('assert');

// Connection URL
var url = 'mongodb://localhost:27017/mymongo';
// Use connect method to connect to the Server
MongoClient.connect(url, function(err, db) {
  assert.equal(null, err);
  console.log("Connected correctly to server");

   var collection = db.collection('mongo38');

   // Insert some documents in parrots collection
   collection.insertMany([
    {
  "name": "Marierat",
  "age": 30,
  "username": "tinatime"
    },
      {
  "name": "Biaerat",
  "age": 35,
  "username": "mariatime"
    },
      {
  "name": "Bellert",
  "age": 34,
  "username": "juliatime"
    },
  ], function(err, result) {
        console.log("insertedMany");
        console.log(result.ops);

    collection.update(
    { "name": "Bellert" },
    {
      $set: {
        "age": 20,
      }
    }, function(err, result) {
      console.log("updated");
        console.log(result.result);


    collection.find().toArray(function(err, docs) {
    console.log("found")
    console.dir(docs)

     db.close();

})
})
})
})

/**

console.log(collection.find());
Readable {
  pool: null,
  server: null,
  disconnectHandler:
   { s: { storedOps: [], storeOptions: [Object], topology: [Object] },
     length: [Getter] },
  bson: {},
  ns: 'mymongo.mongo35',
  cmd:
   { find: 'mymongo.mongo35',
     limit: 0,
     skip: 0,
     query: {},
     slaveOk: true,
     readPreference: { preference: 'primary', tags: undefined, options: [Object]
 } },
  options:
   { skip: 0,
     limit: 0,
     raw: undefined,

***************************************************************
C:\Users\u00136\node_modules\mymongo>node mongo5.1.js
Connected correctly to server
insertedMany
[ { name: 'Marierat',
    age: 30,
    username: 'tinatime',
    _id: 58d2ab445fcdf922b068caf6 },
  { name: 'Biaerat',
    age: 35,
    username: 'mariatime',
    _id: 58d2ab445fcdf922b068caf7 },
  { name: 'Bellert',
    age: 34,
    username: 'juliatime',
    _id: 58d2ab445fcdf922b068caf8 } ]
updated
{ n: 1, nModified: 1, ok: 1 }
found
[ { _id: ObjectID { _bsontype: 'ObjectID', id: [Object] },
    name: 'Marierat',
    age: 30,
    username: 'tinatime' },
  { _id: ObjectID { _bsontype: 'ObjectID', id: [Object] },
    name: 'Biaerat',
    age: 35,
    username: 'mariatime' },
  { _id: ObjectID { _bsontype: 'ObjectID', id: [Object] },
    name: 'Bellert',
    age: 20,
    username: 'juliatime' } ]















**/