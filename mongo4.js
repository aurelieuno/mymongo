/**Connect to MongoDB on port `27017`.
You should connect to the database named `learnyoumongo` and insert
a document into the `docs` collection.

The document should be a json document with the following properties:

- `firstName`
- `lastName`

`firstName` will be passed as the first argument to the lesson.

`lastName` will be passed as the second argument to the lesson.

Use `console.log` to print out the object used to create the document.

Make sure you use `JSON.stringify` convert it to JSON.**/


var MongoClient = require('mongodb').MongoClient
  , assert = require('assert');

// Connection URL
var url = 'mongodb://localhost:27017/mymongo';
// Use connect method to connect to the Server
MongoClient.connect(url, function(err, db) {
  assert.equal(null, err);
  console.log("Connected correctly to server");

   var collection = db.collection('mongo4');

   // Insert some documents in parrots collection
   collection.insert([{
      firstName: 'Fred'
    , lastName: 'Jones'
    }],  function(err, result) {
        console.log(result.ops);

        db.close();
    })
})

/**Connected correctly to server
[ { firstName: 'Fred',
    lastName: 'Jones',
    _id: 58d18acb1dbbe6221c1b0754 } ]**/