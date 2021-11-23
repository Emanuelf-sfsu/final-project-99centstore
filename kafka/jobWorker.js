const KafkaConsumer = require('./KafkaConsumer');

const consumer = new KafkaConsumer('jobWork');

consumer.on('message', (message) => {
  console.log(message);
  const num = message.value;
  console.log(num.replace(/\"/g, ''));
  const parsedNum = parseInt(num.replace(/\"/g, ''));
  setTimeout(() => {
      console.log('Heavy work completed: ' + parsedNum)
  })
});

consumer.connect();