const nodePortScanner = require('./node-port-scanner.js');

// scan for open local common ports
nodePortScanner('127.0.0.1', [21, 22, 23, 25, 80, 110, 123, 443], 'open')
  .then(results => {  
    console.log(results);
  })
  .catch(error => {
    console.log(error);
  });

// scan for open remote common ports
nodePortScanner('github.com', [21, 22, 23, 25, 80, 110, 123, 443], 'open')
  .then(results => {  
    console.log(results);
  })
  .catch(error => {
    console.log(error);
  });

// scan for closed local common ports
nodePortScanner('127.0.0.1', [21, 22, 23, 25, 80, 110, 123, 443], 'closed')
  .then(results => {  
    console.log(results);
  })
  .catch(error => {
    console.log(error);
  });

// scan for closed remote common ports
nodePortScanner('github.com', [21, 22, 23, 25, 80, 110, 123, 443], 'closed')
  .then(results => {  
    console.log(results);
  })
  .catch(error => {
    console.log(error);
  });


// make calls in parallel
async function checkLocalPorts () {
  
  const openPorts = nodePortScanner('127.0.0.1', [], 'open');
  const closedPorts = nodePortScanner('127.0.0.1', [], 'closed');
  
  console.log(await openPorts);
  console.log(await closedPorts);
  
}
checkLocalPorts();
