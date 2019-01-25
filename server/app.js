const path = require('path');
const http = require('http');
const express = require('express');
var bodyParser = require('body-parser')
require('dotenv').config();

const { runManager, checkAccount } = require('./python');
const { User } = require('./User');

const publicPath = path.join(__dirname, '../public');
const port = process.env.PORT || 3000;

const app = express();
const server = http.createServer(app);

app.use(express.static(publicPath));
app.use( bodyParser.json() );       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: true
}));

const db = {
  users: {},
  bots: {}
};

app.get('/', (req, res) => {
  res.sendFile('index.html');
});

// Adds account to database
app.post('/add', (req, res) => {

  // Check if user already exists
  if (db.users[req.body.username]) {
    res.send({
      success: false,
      msg: 'Account with that username already exists'
    });
  }
  else {
    // Verify credentials
    const user = new User(req.body.username, req.body.password);
    user.checkAccount()
    .then(userInfo => {
      // Adding user to database
      db.users[req.body.username] = req.body.password;

      res.send({
        success: true,
        user: userInfo,
        users: db.users
      });
    })
    .catch(() => {
      res.send({
        success: false,
        msg: 'You have entered bad credentials'
      });
    });
  }
});

server.listen(port, () => {
  console.log(`Server is up on port ${port}`);
});