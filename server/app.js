const path = require('path');
const http = require('http');
const express = require('express');
require('dotenv').config();

const publicPath = path.join(__dirname, '../public');
const port = process.env.PORT || 3000;

const app = express();
const server = http.createServer(app);

app.use(express.static(publicPath));

app.get('/', (req, res) => {
  res.sendFile('index.html');
});

app.post('/button', (req, res) => {
  res.send({
    text: 'Yee'
  });
})

server.listen(port, () => {
  console.log(`Server is up on port ${port}`);
});