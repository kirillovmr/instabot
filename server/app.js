const path = require('path');
const http = require('http');
const express = require('express');
const bodyParser = require('body-parser')
const cors = require('cors');
require('dotenv').config();

const { User } = require('./User');
const { addUserToDB, deleteUserFromDB, 
  getUserFromDB, getAllUsersFromDB } = require('./Database');

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

/**
 * GET & POST Methods
 */

app.get('/', (req, res) => {
  res.sendFile('index.html');
});

app.get('/initial', (req, res) => {
  res.send({
    success: true,
    users: getAllUsersFromDB()
  })
});

app.get('/user', (req, res) => {
  const { username } = req.query;
  const user = getUserFromDB(username);
  if(user)
    res.send({
      success: true,
      user
    });
  else
    res.send({
      success: false,
      errorMsg: 'User was not found'
    });
});

// Adds account to database
app.post('/add', (req, res) => {
  const { username } = req.body;

  // Check if user already exists
  if (getUserFromDB(username)) {
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
      addUserToDB(user);

      res.send({
        success: true,
        user: user
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

app.post('/bots', (req, res) => {
  const { username, bot, activate } = req.body;
  let success, msg;

  if(activate) {
    // Start Bot
    success = getUserFromDB(username).runBot(bot);
    if (!success)
      msg = "No such script";
  }
  else {
    // Stop Bot
    success = getUserFromDB(username).stopBot(bot);
  }
  res.send({
    success,
    msg
  })
});

// Deletes an account
app.post('/delete', (req, res) => {
  const { username } = req.body;

  deleteUserFromDB(username);
  
  res.send({
    success: true
  });
})

server.listen(port, () => {
  console.log(`Server is up on port ${port}`);
});