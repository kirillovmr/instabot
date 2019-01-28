const path = require('path');
const { PythonShell } = require('python-shell');
require('dotenv').config();

const scriptPath = path.resolve('./bot/scripts/');
const { processes } = require('./Database');

class User {
  constructor(username, password) {
    this.username = username;
    this.password = password;
    this.bots = {
      like: null,
      follow: null,
      comment: null
    }
    processes[username] = {...this.bots}
    this.avatar = null;
    this.initialStats = null;
    this.currentStats = null;
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
            if (this.initialStats === null)
              this.initialStats = message.user.initial_stats;

            this.currentStats = message.user.current_stats;
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
        processes[this.username].like = this._startProcess('like', null, null, () => {
          const { exitCode } = processes[this.username][script];

          if(exitCode === 0) {
            console.log(`${this.username}: ${script} was closed`);
          } else if (exitCode === null) {
            console.log(`${this.username}: ${script} was terminated`);

            // Handling firther actions for manual script terminating here
            // todo
          }
          processes[this.username].like = null;
          this.bots.like = null;
        });
        this.bots.like = true;
        break;
      default:
        return false;
    }
    return true;
  }

  stopBot(script) {
    try {
      processes[this.username][script].terminate();
      this.bots[script] = null;
      // Now script is terminated.
      // Handling further actions in runBot() onClose() function
      return true;
    }
    catch(e) {
      if (e instanceof TypeError) {
        console.log('There is no running script');
        return false;
      } else {
        console.log('Unable to stop script', e);
        return false
      }
    }
  }

  _startProcess(script, args, onMessage, onClose, onError) {

    // Handling event functions
    onMessage = onMessage || function (msg) {
      console.log(`Log ${this.username} ${script}:`, msg);
    }
    onClose = onClose || function (msg) {
      console.log(`${this.username}: ${script} was closed`);
    }
    onError = onError || function (e) {
      // console.log('EXIT WITH NON ZERO', e.exitCode);
    }
    if (args === null)
      args = [];

    const _process = new PythonShell(`${script}.py`, {
      scriptPath,
      args: [`-u=${this.username}`, `-p=${this.password}`, ...args]
    });

    console.log(`${this.username}: ${script} was started`);

    _process.on('message', onMessage);
    _process.on('close', onClose);
    _process.on('error', onError);

    return _process;
  }

  botsToBool() {
    const bots = {...this.bots};
    Object.keys(bots).forEach(key => {
      if(bots[key] !== null)
        bots[key] = true;
    });
    return bots;
  }
}

module.exports = {
  User
}

const user = new User(process.env.USERNAME, process.env.PASSWORD);
// user.checkAccount()
// .then(info => {
//   console.log(info);
// })
// .catch(err => {
//   console.log(err);
// })

// user.runBot('like');

// setTimeout(() => {
//   user.stopBot('like');
// }, 2000);