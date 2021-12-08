const express = require('express');
require('dotenv').config();
const path = require('path');
const app = express();

// express is not good for production static files, use cdn, or dedicated file server like ngnix, appache
app.use(express.static(path.join(__dirname, '..', 'build')));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'build', 'index.html'));
});


app.get('/api/viewListings', (req, res) => {
  try {
    return res.json(app.locals.storage);
  } catch (error) {
    return res.status('500').json({ message: error });
  }
});

const port = process.env.PORT || 3000;

app.listen(port);

console.log(`Listening on port ${port}`);