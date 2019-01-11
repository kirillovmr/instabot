const python = require('python-shell');

function runManager() {
  python.run('duoScript.py', function (err, results) { 
    console.log(err);
    console.log(results);
    
  });
}