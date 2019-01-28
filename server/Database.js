const processes = {
  // username: process
};

const db = {
  users: {
    // username: User
  }
};

function addUserToDB(user) {
  if (getUserFromDB(user.username)) {
    console.log(`User ${username} already exists`);
    return false;
  }

  db.users[user.username] = user;
  return true;
}

function deleteUserFromDB(username) {
  if (getUserFromDB(username)) {
    delete db.users[username];
    delete processes[username];
    return true;
  }
  return false;
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
  deleteUserFromDB,
  getAllUsersFromDB,
  getUserFromDB
}