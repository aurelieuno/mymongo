var MongoClient = require('mongodb').MongoClient
  , assert = require('assert');

// Connection URL
var url = 'mongodb://localhost:27017/myproject';
// Use connect method to connect to the Server
MongoClient.connect(url, function(err, db) {
  assert.equal(null, err);
  console.log("Connected correctly to server");

  var col = db.collection('streams');
  // Insert a single document
  col.insert([{a:1}, {a:2}, {a:3}], function(err, r) {
    assert.equal(null, err);
    assert.equal(3, r.result.n);

    // Get the results using a find stream
    var cursor = col.find({}).stream({
      transform: function(doc) {
        return JSON.stringify(doc);
      }
    });

    cursor.on('data', function(doc) {
      console.log(doc);
    });

    cursor.once('end', function() {
      db.close();
    });
  });
});
/**C:\Users\u00136\node_modules\mymongo>node
Connected correctly to server
{"_id":"58d2a7fadc534413d87be20a","a":1}
{"_id":"58d2a7fadc534413d87be20b","a":2}
{"_id":"58d2a7fadc534413d87be20c","a":3}**/

