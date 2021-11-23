const KafkaConsumer = require('./KafkaConsumer');
const sharp = require('sharp');
const consumer = new KafkaConsumer('jobWork');
const { MongoClient,ObjectId } = require('mongodb');
require('dotenv').config();
const redis = require('redis');
const client = redis.createClient({ host: process.env.REDIS_HOST || 'localhost' });
const url = process.env.MONGO_HOST || 'mongodb://localhost:27017';
const mongoClient = new MongoClient(url);
const listingCollection = process.env.LISTING_COLLECTION || "listingCollection";


const resizeBase64 = async (base64Image, maxHeight = 640, maxWidth = 640) => {
  const destructImage = base64Image.split(";");
  const mimType = destructImage[0].split(":")[1];
  const imageData = destructImage[1].split(",")[1];

  try {
    let resizedImage = Buffer.from(imageData, "base64")
    resizedImage = await sharp(resizedImage).resize(maxHeight, maxWidth).toBuffer()

    return `data:${mimType};base64,${resizedImage.toString("base64")}`
  } catch (error) {
    throwError({ error })
  }
};

mongoClient.connect((err) => {
  if (err) console.log(err);
  const db = mongoClient.db(process.env.MONGOCLIENT_DB || "centStoreDB");
  consumer.on('message', (message) => {
    const obj = (JSON.parse(message.value));
    const { image, insertId } = obj;
    const id = new ObjectId(insertId);
    console.log(id);
    db.collection(listingCollection).findOne({"_id":id}).then(data=>console.log(data))
    resizeBase64(image, 500, 500).then(data => {
      db.collection(listingCollection).updateOne({ _id: id }, {
        $set: {
          image500: data
        }
      })
    }).catch(err => console.log(err));
    resizeBase64(image, 100, 100).then(data => {
      db.collection(listingCollection).updateOne({ '_id': id }, {
        $set: {
          image100: data
        }
      }).then(res => console.log(res.matchedCount)).catch(err => console.log("err"))
    }).catch(err => console.log(err));

  });
});




consumer.connect();

