const { nodePortScanner } = require('./node-port-scanner.js');

// scan for open common ports
nodePortScanner('127.0.0.1', [21, 22, 25, 80, 110, 123, 443], 'open', function (results) {
  console.log(results);
});

// scan for open common ports
nodePortScanner('github.com', [21, 22, 25, 80, 110, 123, 443], 'open', function (results) {
  console.log(results);
});

// scan for closed common ports
nodePortScanner('127.0.0.1', [21, 22, 25, 80, 110, 123, 443], 'closed', function (results) {
  console.log(results);
});

// scan for closed common ports
nodePortScanner('github.com', [21, 22, 25, 80, 110, 123, 443], 'closed', function (results) {
  console.log(results);
});

// scan for all open ports - not recommended on remote hosts
nodePortScanner('127.0.0.1', [], 'open', function (results) {
  console.log(results);
});

// scan for all closed ports - not recommended on remote hosts
nodePortScanner('127.0.0.1', [], 'closed', function (results) {
  console.log(results);
});