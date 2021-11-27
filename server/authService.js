const express = require('express');
require('dotenv').config()
const bodyParser = require('body-parser');
const { MongoClient } = require('mongodb');
const redis = require('redis');
const client = redis.createClient({ host: process.env.REDIS_HOST || 'localhost' });

// monogo init
const url = process.env.MONGO_HOST || 'mongodb://localhost:27017';
console.log(url)
const mongoClient = new MongoClient(url);
const userCollection = process.env.USER_COLLECTION;
console.log(userCollection);
mongoClient.connect((err) => {
  if (err) console.log(err);
  const db = mongoClient.db(process.env.MONGOCLIENT_DB);
  // move app logic in here
  const app = express();
  app.use(bodyParser.json());
  // sorry for spelling wrong :(
  app.post('/authService/createAccount', (req, res) => {
    // Create Account Service
    console.log(req.body);
    const obj = {
      email: req.body.email,
      password: req.body.password
    }
    db.collection(userCollection).insertOne(obj)
      .then(() => console.log('db insert worked'))
      .catch((e) => console.log(e));
    client.publish('testPublish', JSON.stringify({ ...obj, type: 'auth' }));
    res.status(201).send('Account Created');
  });

  app.get('/authService/login', (req, res) => {
    const obj = {
      email: req.body.email,
      password: req.body.password
    }
    console.log(obj);
    db.collection(userCollection).find({ email: obj.email }).toArray()
      .then((result) => {
        console.log(result)
        const filterArray = result.filter(r => r.password && (r.password === obj.password));
        res.send({ login: result.length > 0 && filterArray.length >= 1 });
      })
      .catch((e) => console.log(e));
  });

  app.listen(process.env.AUTH_SERVICE || 5001);
  // end app logic
});

