const path = require('path');
const http = require('http');
const express = require('express');
const bodyParser = require('body-parser')
const cors = require('cors');
require('dotenv').config();

const { runManager, checkAccount } = require('./python');
const { User } = require('./User');

const publicPath = path.join(__dirname, '../client/build');
const port = process.env.PORT || 4000;

const app = express();
const server = http.createServer(app);

app.use(cors());
app.use(express.static(publicPath));
app.use( bodyParser.json() );       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: true
}));

const db = {
  users: {}
};

app.get('/', (req, res) => {
  res.sendFile('index.html');
});

app.get('/initial', (req, res) => {
  res.send({
    success: true,
    users: db.users
  })
});

app.get('/user', (req, res) => {
  const { username } = req.query;
  if(db.users[username])
    res.send({
      success: true,
      user: db.users[username]
    });
  else
    res.send({
      success: false,
      errorMsg: 'User not found'
    });
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
      db.users[req.body.username] = userInfo;

      res.send({
        success: true,
        user: userInfo
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