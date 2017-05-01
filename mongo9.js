/**Next up is aggregation. Aggregation allows one to do things like
calculate the sum of a field of multiple documents or the average
of a field of documents meeting particular criteria.

Say you have a collection named `prices`. Each price document is modeled
like so:

```js
{
  "name": "Tshirt",
  "size": "S",
  "price": 10,
  "quantity": 12
  "meta": {
    "vendor": "hanes",
    "location": "US"
  }
}
```

In this exercise, we need to calculate the average price for all documents
in the `prices` collection in the database named `learnyoumongo` that have
the size that will be passed as the first argument to your script.

Use `console.log()` to print the average price rounded to 2 decimal places
to stdout after you have found it.

## HINTS

To use the `aggregate()` function, one first needs the collection.
The `aggregate()` function takes an array of objects as the first argument.

This array will contain the different pipelines for the aggregation.
To read more about pipelines, please visit [Aggregation](http://docs.mongodb.org/manual/core/aggregation-introduction/).
To read more about `aggregate()`, please visit [`aggregate()`](http://mongodb.github.io/node-mongodb-native/2.2/api/Collection.html#aggregate).


The two main pipeline stages we will use will be `$match` and `$group`.

### $match

`$match` is used similar to the way a query is done. It allows us to select
the documents that meet certain criteria.

Ex.

```js
var match = { $match: { status: 'A' } }
```

The above example will match all of the documents that have a `status`
property equal to `A`.

### $group

`$group` is what allows us to run operations on certain properties.

So, say we wanted to get the sum of the values of the property `value`
where status is equal to `A` and have it placed in the `total` property.

Ex.

```js
// [
//  { status: 'A', value: 1 },
//  { status: 'B', value: 2 },
//  { status: 'A', value: 10 }
// ]

collection.aggregate([
  { $match: { status: 'A' }}
, { $group: {
    _id: 'total' // This can be an arbitrary string in this case
  , total: {
      // $sum is the operator used here
      $sum: '$value'
    }
  }}
]).toArray(function(err, results) {
  // handle error
  console.log(results)
  // => [
  // =>   { _id: 'total', total: 11 }
  // => ]
})
```
Other operators used in the `$group` stage include:

- `$avg`
- `$first`
- `$last`
- `$max`
- `$min`
- `$push`
- `$addToSet`

# Rounding

The `Number` prototype contains a function `toFixed()`, which accepts the
number of decimal places you would like to round to, and returns a string
representation.

      var value = "1"
      Number(value).toFixed(5)
      // => '1.00000'

If your program does not finish executing, you may have forgotten to
close the `db`. That can be done by calling `db.close()` after you
have finished.

**/

var MongoClient = require('mongodb').MongoClient
  , assert = require('assert');

// Connection URL
var url = 'mongodb://localhost:27017/mym9';
// Use connect method to connect to the Server
MongoClient.connect(url, function(err, db) {//1

    var docs = [
    {
  "name": "Tshirt1",
  "size": "S",
  "price": 10,
  "quantity": 18,
  "meta": {
    "vendor": "hanes",
    "location": "US"
  }},
  {
  "name": "Tshirt2",
  "size": "M",
  "price": 20,
  "quantity": 19,
  "meta": {
    "vendor": "hanes",
    "location": "US"
  }},
    {
  "name": "Tshirt3",
  "size": "S",
  "price": 30,
  "quantity": 12,
  "meta": {
    "vendor": "hanes",
    "location": "US"
  }},
    {
  "name": "Tshirt4",
  "size": "S",
  "price": 40,
  "quantity": 13,
  "meta": {
    "vendor": "hanes",
    "location": "US"
  }},
    {
  "name": "Tshirt5",
  "size": "S",
  "price": 50,
  "quantity": 14,
  "meta": {
    "vendor": "hanes",
    "location": "US"
  }
}]


 // Create a collection
    var collection = db.collection('c10');
  // Insert the docs
    collection.insertMany(docs, {w: 1}, function(err, result) {
        //console.log(result.ops);

    collection.aggregate([
        { $match : { size : "S"}},
        { $group : {
         _id: null,
         total1 : { $sum : "$price" },
         total2 : { $sum : "$quantity" },
        average : { $avg : "$price" },
           count: { $sum: 1 }}
    }], function(err, result) {
        var avgPrice1 = result[0].total1/result[0].count;
        var avgPrice2 = Number(avgPrice1).toFixed(2);

        console.log({averagePrice : avgPrice2});
        console.log(result[0].average);


        db.close();
    });
  });
});




//[ { _id: null, total: 130 } ] [ { _id: null, total1: 260, total2: 114 } ]