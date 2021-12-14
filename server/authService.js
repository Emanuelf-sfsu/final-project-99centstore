const express = require('express');
require('dotenv').config()
const bodyParser = require('body-parser');
const { MongoClient } = require('mongodb');
const redis = require('redis');
const client = redis.createClient({ host: process.env.REDIS_HOST || 'localhost' });

// monogo init
const url = process.env.MONGO_HOST || 'mongodb://localhost:27017';
console.log('this is the url', url)
const mongoClient = new MongoClient(url);
const userCollection = process.env.USER_COLLECTION || 'userCollection';
console.log('this is the userCollection', userCollection);
mongoClient.connect((err) => {
  if (err) console.log(err);
  const db = mongoClient.db(process.env.MONGOCLIENT_DB);
  db.createCollection(userCollection).then(data => { console.log('success'); console.log(data) }).catch(err => console.log(err));
  // move app logic in here
  const app = express();
  app.use(bodyParser.json());
  // sorry for spelling wrong :(
  app.post('/authService/createAccount', (req, res) => {
    // Create Account Service
    console.log('hello');
    console.log(req.body);
    const obj = {
      email: req.body.email,
      password: req.body.password
    }
    db.collection(userCollection).insertOne(obj)
      .then(() => console.log('db insert worked'))
      .catch((e) => console.log(e));
    client.publish('testPublish', JSON.stringify({ ...obj, type: 'auth' }));
    res.status(201).send({ message: 'Account Created', isAdmin: obj.email === 'admin@gmail.com' });
  });

  app.get('/authService/login', (req, res) => {
    console.log('Inside of login');
    console.log('authService/login', req.query);
    const obj = {
      email: req.query.email,
      password: req.query.password
    }
    client.get(obj.email, function (err, reply) {
      // reply is null when the key is missing
      if (reply) {
        console.log('redis')
        console.log(reply);
        res.send({ login: reply === obj.password, isAdmin: obj.email === 'admin@gmail.com' });
      } else {
        db.collection(userCollection).find({ email: obj.email }).toArray()
          .then((result) => {
            const filterArray = result.filter(r => r.password && (r.password === obj.password));
            if (filterArray.length > 0) {
              client.set(obj.email, obj.password);
            }
            res.send({ login: result.length > 0 && filterArray.length >= 1, isAdmin: obj.email === 'admin@gmail.com' });
          })
          .catch((e) => console.log(e));
      }
    });
    console.log(obj);

  });

  app.listen(process.env.AUTH_SERVICE || 5001);
  // end app logic
});

