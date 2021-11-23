module.exports = { // pm2 start process.config.js
  apps: [
    {
      name: 'gateway',
      script: './server/gateway.js',
      watch: true,
    },
    {
      name: 'messanger',
      script: './server/messanger.js',
      watch: true,
    },
    {
      name: 'websocket',
      script: './server/websocket.js',
      watch: true,
    },
    // {
    //   name: 'frontend',
    //   script: './server/frontend.js',
    //   watch: true
    // },
    {
      name: 'authservice',
      script: './server/authService.js',
      watch: true
    },
    {
      name: 'listingService',
      script: './server/listingService.js',
      watch: true
    },
    {
      name: 'imageService',
      script: './server/imageService.js',
      watch: true
    },
    {
      name: 'jobWorker',
      script: './kafka/jobWorker.js',
      watch: true
    }
  ],
};