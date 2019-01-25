const path = require('path');
const { PythonShell } = require('python-shell');
require('dotenv').config();

const scriptPath = path.resolve('./bot/scripts/');


class User {
  constructor(username, password) {
    this.username = username;
    this.password = password;
    this.bots = {
      like: null,
      follow: null,
      comment: null
    }
    this.avatar = null;
    this.initialInfo = null;
  }

  // Tries to login into account and returns user info
  checkAccount() {
    return new Promise((resolve, reject) => {
      const script = new PythonShell('checkAccount.py', {
        scriptPath,
        args: [`-u=${this.username}`, `-p=${this.password}`]
      });
    
      script.on('message', message => {
        try {
          message = JSON.parse(message);
          if(message.result) {

            // Storing user detailed info
            this.avatar = message.user.avatar
            if (this.initialInfo === null)
              this.initialInfo = message.user.initial_stats;

            resolve(this);
          }
          else {
            reject('Error in checkAccount()');
          }
        } 
        catch {
          // Here we can catch all messages printed in console by bot
        }
      })
    });
  }

  runBot(script) {
    switch (script) {
      case 'like':
        this.bots.like = _startProcess('like')
        break;
      default:
        return false;
    }
    return true;
  }

  _startProcess(script, args = []) {
    const _process = new PythonShell(`${script}.py`, {
      scriptPath,
      args: [`-u=${this.username}`, `-p=${this.password}`, ...args]
    });
    return _process;
  }
}

module.exports = {
  User
}

const user = new User(process.env.USERNAME, process.env.PASSWORD);
user.checkAccount()
.then(info => {
  console.log(info);
})
.catch(err => {
  console.log(err);
})