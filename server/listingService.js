const express = require('express');
require('dotenv').config();
const bodyParser = require('body-parser');
const { MongoClient } = require('mongodb');
const redis = require('redis');
const client = redis.createClient({ host: process.env.REDIS_HOST || 'localhost' });
// monogo init
const url = process.env.MONGO_HOST || 'mongodb://localhost:27017';
const mongoClient = new MongoClient(url);
const listingCollection = process.env.LISTING_COLLECTION;
mongoClient.connect((err) => {
  if (err) console.log(err);
  const db = mongoClient.db(process.env.MONGOCLIENT_DB);
  // move app logic in here
  const app = express();
  app.use(bodyParser.json());
  // sorry for spelling wrong :(
  app.post('/listingService/createListing', (req, res) => {
    // Create Account Service
    let insertId;
    const { title, desc, price } = req.body;
    db.collection(listingCollection).insertOne({ title, desc, price })
      .then((data) => {
        insertId = data.insertedId;
        const obj = { title, desc, price, insertId }
        client.publish('testPublish', obj);
        res.json(obj);
      })
      .catch((e) => res.status(400));

  });

  app.get('/listingService/getAllListing', (req, res) => {
    db.collection(listingCollection).find({}).toArray()
      .then((result) => {
        res.send(result.map(r => r.data));
      })
      .catch((e) => console.log(e));
  });

  app.listen(process.env.LISTING_SERVICE || 5002);
  // end app logic
});

