const express = require('express');
require('dotenv').config();
const bodyParser = require('body-parser');
const { MongoClient, ObjectId } = require('mongodb');
const redis = require('redis');
const client = redis.createClient({ host: process.env.REDIS_HOST || 'localhost' });
// monogo init
const url = process.env.MONGO_HOST || 'mongodb://localhost:27017';
const mongoClient = new MongoClient(url);
const listingCollection = process.env.LISTING_COLLECTION;

mongoClient.connect((err) => {
  if (err) console.log(err);
  const db = mongoClient.db(process.env.MONGOCLIENT_DB);
  db.createCollection(listingCollection).then(data=>{console.log('success');console.log(data)}).catch(err=>console.log(err));
  const app = express();
  app.use(bodyParser.json());
  app.post('/listingService/createListing', (req, res) => {
    let insertId;
    const { title, desc, price } = req.body;
    console.log("title ", title);
    db.collection(listingCollection).insertOne({ title, desc, price })
      .then((data) => {
        insertId = data.insertedId;
        const obj = { title, desc, price, insertId }
        client.publish('testPublish', JSON.stringify({ ...obj, type: 'newListing' }));
        res.send(obj);
        // client.publish('testPublish', obj);
      }).catch(err => console.log("err"))

  });

  app.post('/listingService/editListing', (req, res) => {
    const { title, desc, price, id } = req.body;
    console.log(title);
    const insertId = new ObjectId(id);

    console.log("title ", title);
    db.collection(listingCollection).updateOne({ '_id': insertId }, {
      $set: {
        title, desc, price
      }
    })
      .then((data) => {
        const obj = { title, desc, price, insertId }
        client.publish('testPublish', JSON.stringify({ ...obj, type: 'newListing' }));
        res.send(obj);
        // client.publish('testPublish', obj);
      }).catch(err => console.log("err"))

  });

  app.get('/listingService/deleteListing', (req, res) => {
    console.log(req.query)
    const { id } = req.query;
    console.log("title ", id);
    const insertId = new ObjectId(id);
    db.collection(listingCollection).deleteOne({ '_id': insertId })
      .then((data) => {
        // const obj = {  }
        client.publish('testPublish', JSON.stringify({ type: 'newListing' }));
        // res.send(obj);
        // client.publish('testPublish', obj);
        res.send('Deleted Record');
      }).catch(err => console.log("err"))

  });

  app.get('/listingService/getAllListing', (req, res) => {
    db.collection(listingCollection).find({}).toArray()
      .then((result) => {
        res.json(result);
      })
      .catch((e) => console.log(e));
  });

  app.get('/listingService/getListing', (req, res) => {
    const { id } = req.query;
    const searchId = new ObjectId(id);
    client.get(id, function (err, reply) {
      // reply is null when the key is missing
      if (reply) {
        console.log(reply);
        res.json(JSON.parse(reply));
      } else {
        db.collection(listingCollection).findOne({ '_id': searchId })
          .then((result) => {
            client.set(id, JSON.stringify(result));
            res.json(result);
          })
          .catch((e) => console.log(e));
      }
    });

  });

  app.listen(process.env.LISTING_SERVICE || 5002);
  // end app logic
});