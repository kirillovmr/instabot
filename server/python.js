const path = require('path');
const { PythonShell } = require('python-shell');

const scriptPath = path.resolve('./bot/scripts/');

function runManager() {
  var options = {
    mode: 'text',
    // pythonPath: '/usr/bin/python', 
    pythonOptions: ['-u'], // get print results in real-time
    scriptPath,
    args: [`-u=${process.env.USERNAME}`, `-p=${process.env.PASSWORD}`]
  };

  const script = new PythonShell('test.py', options);

  script.on('message', message => {
    console.log('Msg', JSON.parse(message));
  });

  script.end((err, code, signal) => {
    if (err) throw err;
    console.log('The exit code was: ' + code);
    console.log('The exit signal was: ' + signal);
    console.log('finished');
  });

  // console.log('Script', script.command);
}

module.exports = {
  runManager
}