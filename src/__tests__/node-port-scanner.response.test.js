const nodePortScanner = require('../node-port-scanner.js');

it('open ports', async () => {
  const data = await nodePortScanner('127.0.0.1', [], 'open');
  expect(data).toHaveProperty('host', '127.0.0.1');
  expect(data).toHaveProperty('status', 'open');
  expect(data).toHaveProperty('ports');
});

it('closed ports', async () => {
  const data = await nodePortScanner('127.0.0.1', [], 'closed');
  expect(data).toHaveProperty('host', '127.0.0.1');
  expect(data).toHaveProperty('status', 'closed');
  expect(data).toHaveProperty('ports');
});