const express = require('express');
require('dotenv').config();
const server = require('http');
const httpProxy = require('http-proxy');
var cors = require('cors');
const app = express();
app.use(cors())
const appServer = server.createServer(app);
const apiProxy = httpProxy.createProxyServer(app);

const wsProxy = httpProxy.createProxyServer({
  target: process.env.WEBSOCKET_HOST || 'http://localhost:5500',
  ws: true,
});

apiProxy.on('error', (err, req, res) => {
  console.log(req);
  console.log(err);
  res.status(500).send(req.url);
});

wsProxy.on('error', (err, req, socket) => {
  console.log(err);
  console.log('ws failed');
  socket.end();
});
console.log(process.env)
const messangerHost = process.env.MESSANGER_HOST_URL || 'http://localhost:5000';
console.log(`Messanger end proxies to: ${messangerHost}`);
app.all('/messanger*', (req, res) => {
  apiProxy.web(req, res, { target: messangerHost });
});

const authService = process.env.AUTH_SERVICE_URL || 'http://localhost:5001';
console.log(`Auth Service end proxies to: ${authService}`);
app.all('/authService/*', (req, res) => {
  // for frontend
  apiProxy.web(req, res, { target: authService });
});


const listingService = process.env.LISTING_SERVICE_URL || 'http://localhost:5002';
console.log(`Listing Service end proxies to: ${listingService}`);
app.all('/listingService*', (req, res) => {
  // for frontend
  apiProxy.web(req, res, { target: listingService });
});


const imageService = 'http://localhost:5003';
console.log(`Image Service end proxies to: ${imageService}`);
app.all('/imageService*', (req, res) => {
  // for frontend
  console.log('image service')
  apiProxy.web(req, res, { target: imageService });
});

const websocketHost = process.env.WEBSOCKET_HOST_URL || 'http://localhost:5500/websocket';
console.log(`WebSocket end proxies to: ${websocketHost}`);
app.all('/websocket*', (req, res) => {
  console.log('incoming ws');
  apiProxy.web(req, res, { target: websocketHost });
});

appServer.on('upgrade', (req, socket, head) => {
  console.log('upgrade ws here');
  wsProxy.ws(req, socket, head);
});

const frontEndHost = process.env.FRONT_END_HOST_URL || 'http://localhost:3000';
console.log(`Front end proxies to: ${frontEndHost}`);
app.all('/*', (req, res) => {
  // for frontend
  apiProxy.web(req, res, { target: frontEndHost });
});


appServer.listen(process.env.GATEWAY_PORT || 4000);
console.log('Gateway started');