const express = require('express');
require('dotenv').config();
const bodyParser = require('body-parser');
const { MongoClient } = require('mongodb');
const redis = require('redis');
const client = redis.createClient({ host: process.env.REDIS_HOST || 'localhost' });

// monogo init
const url = process.env.MONGO_HOST || 'mongodb://localhost:27017';
const mongoClient = new MongoClient(url);
const listingCollection = 'listingCollection';
mongoClient.connect((err) => {
  if (err) console.log(err);
  const db = mongoClient.db(process.env.MONGOCLIENT_DB);
  // move app logic in here
  const app = express();
  app.use(bodyParser.json());
  // sorry for spelling wrong :(
  app.post('/listingService/createListing', (req, res) => {
    //   // Create Account Service
    // console.log(req.body);
    // db.collection(listingCollection).insertOne({ data: req.body.message })
    //   .then(() => console.log('db insert worked'))
    //   .catch((e) => console.log(e));
    // client.publish('testPublish', req.body.message);
    // res.send('ok');
       // Create Account Service
       console.log(req.body);
       db.collection(listingCollection).insertOne({ data: req.body })
         .then(() => console.log('db insert worked'))
         .catch((e) => console.log(e));
       client.publish('testPublish', req.body);
       res.send('ok');

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

