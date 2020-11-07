# node-port-scanner

[![npm](https://img.shields.io/npm/v/node-port-scanner.svg)](https://www.npmjs.com/package/node-port-scanner)

Scans ports to see if they are open or closed. 

After calling nodePortScanner, ports are checked in order one after the previous is completed.

Multiple calls can be made and will run in parallel.

## Install

```bash
npm install node-port-scanner
```

## Usage

```javascript
const nodePortScanner = require('node-port-scanner');

// scan for open local common ports
nodePortScanner('127.0.0.1', [21, 22, 23, 25, 80, 110, 123, 443], 'open')
  .then(results => {  
    console.log(results);
  })
  .catch(error => {
    console.log('Error: ' + error);
  });

// scan for open remote common ports
nodePortScanner('github.com', [21, 22, 23, 25, 80, 110, 123, 443], 'open')
  .then(results => {  
    console.log(results);
  })
  .catch(error => {
    console.log('Error: ' + error);
  });

//scan for closed local common ports
nodePortScanner('127.0.0.1', [21, 22, 23, 25, 80, 110, 123, 443], 'closed')
  .then(results => {  
    console.log(results);
  })
  .catch(error => {
    console.log('Error: ' + error);
  });

// scan for closed remote common ports
nodePortScanner('github.com', [21, 22, 23, 25, 80, 110, 123, 443], 'closed')
  .then(results => {  
    console.log(results);
  })
  .catch(error => {
    console.log('Error: ' + error);
  });


// make calls in parallel - remote port checking not recommended
async function checkLocalPorts () {
  
  const openPorts = nodePortScanner('127.0.0.1', [], 'open');
  const closedPorts = nodePortScanner('127.0.0.1', [], 'closed');
  
  console.log(await openPorts);
  console.log(await closedPorts);
  
}
checkLocalPorts();
```

## Test

```sh
npm test
```

## License (MIT)

[MIT](LICENSE)