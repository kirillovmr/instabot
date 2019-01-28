const processes = {
  // username: process
};

const db = {
  users: {
    // username: User
  }
};

function addUserToDB(user) {
  if (db.users[user.username]) {
    console.log(`User ${username} already exists`);
    return false;
  }

  db.users[user.username] = user;
  return true;
}

function getAllUsersFromDB() {
  return db.users;
}

function getUserFromDB(username) {
  const user = db.users[username];

  if(!user) {
    console.log(`DB: user ${username} was not found`);
    return false;
  }
  
  return user;
}

module.exports = {
  processes,
  addUserToDB,
  getAllUsersFromDB,
  getUserFromDB
}