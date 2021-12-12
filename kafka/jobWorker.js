const ConsumerGroup = require('kafka-node').ConsumerGroup;
const EventEmitter = require('events');

// Kafka Consumer Class

const consumerOptions = {
  kafkaHost: 'localhost:9092',
  groupId: (Date.now()).toString(),
  sessionTimeout: 25000,
  protocol: ['roundrobin'],
  fromOffset: 'latest',
};

class KafkaConsumer extends EventEmitter {
  constructor(topics) {
    super();
    if (Array.isArray(topics)) {
      this.topics = topics;
    } else {
      this.topics = [topics];
    }
    this.consumerGroup = null;
  }

  connect() {
    this.consumerGroup = new ConsumerGroup(Object.assign({ id: 'test1' }, consumerOptions), this.topics);
    this.consumerGroup.on('message', message => this.emit('message', message));
  }
}


const sharp = require('sharp');
const consumer = new KafkaConsumer('jobWork');
const { MongoClient, ObjectId } = require('mongodb');
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
    throw new Error({ error });
  }
};

mongoClient.connect((err) => {
  if (err) console.log(err);
  const db = mongoClient.db(process.env.MONGOCLIENT_DB || "centStoreDB");
  consumer.on('message', async (message) => {
    const obj = (JSON.parse(message.value));
    const { image, insertId } = obj;
    const id = new ObjectId(insertId);
    const image500 = await resizeBase64(image, 500, 500);
    const image100 = await resizeBase64(image, 100, 100);
    db.collection(listingCollection).updateOne({ '_id': id }, {
      $set: {
        image100: image100,
        image500: image500
      }
    }).then(res => {
      const obj = {
        insertId,
        image100
      }
      client.publish('testPublish', JSON.stringify({ ...obj, type: 'image' }));
    }).catch(err => console.log("err"))
  });
});




consumer.connect();

