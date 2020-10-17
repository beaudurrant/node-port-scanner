// what we need to use sockets
const net = require('net');

// scan range of ports for status (open|closed)
const nodePortScanner = (host, ports, status, callback) => {

  //all ports that exist
  const allPorts = Array.from({length: 65535}, (_, i) => i + 1);

  // connect to a single port and get the status
  const connectToPort = (host, port, callback) => {
    
    // error checking args
    if (!Number.isInteger(port)) throw new Error('port must be an integer');
    if (port < 1 || port > 65535) throw new Error('port must be in range [1-65535]');
    
    let socket = new net.Socket();
    // increase this if y'all on dial up
    let timeout = 200;
    
    // new properties & events for port scanner
    socket._scan = {};
    socket._scan.status = 'initialized';
    socket._scan.host = host;
    socket._scan.port = port;
    socket._scan._events = { complete : callback };
    
    // events for socket
    socket.on('connect', function () {
      this._scan.status = 'connect';
      socket.destroy();
    });
    socket.on('timeout', function () {
      this._scan.status = 'timeout';
      socket.destroy();
    });
    socket.on('error', function (exception) {
      this._scan.status = 'error';
      socket.destroy();
    });
    socket.on('close', function (exception) {
      this._scan._events.complete(this._scan);
    });
    
    socket.setTimeout(timeout);
    socket.connect(port, host);
    
  };

  // recursive function to check all port status one after the other is complete
  const connectToPorts = (host, ports, status, scanResults, callback) => {
    
    let port = ports.shift();
    
    connectToPort(host, port, function (result) {
      
      // add to our results based on the status of the result and scan
      if ((result.status == 'connect' && status == 'open') ||
          (result.status != 'connect' && status == 'closed')) {
        scanResults.ports.push(result.port);
      }
      
      // recursivly go through all the ports
      if (ports.length) {
        connectToPorts(host, ports, status, scanResults, callback);
      }
      // when ports are done then complete callback from the scan
      else {
        callback(scanResults);
      }
      
    });
    
  };
  
  // error checking args
  if (host == undefined || !host) throw new Error('host is required');
  if (ports == undefined || !ports) throw new Error('ports is required');
  if (!Array.isArray(ports)) throw new Error('ports must be an array');
  if (status == undefined || !status) throw new Error('status is required');
  if (status.toLowerCase() != 'open' && status.toLowerCase() != 'closed') throw new Error('status must be open or closed');
  if (callback == undefined || !callback || typeof callback != 'function') throw new Error('callback is required');
  
  // scan results will be and array of port numbers matching status
  let scanResults = { host : host, status : status, ports : [] };

  // no ports = all ports
  if (!ports.length) ports = allPorts;
  
  connectToPorts(host, ports, status, scanResults, callback);
  
};

// encapsulate methods
module.exports = { nodePortScanner : nodePortScanner };
