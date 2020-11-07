const nodePortScanner = require('../node-port-scanner.js');

it('require host', async () => {
  expect.assertions(1);
  try {
    await nodePortScanner('', [21, 22, 25, 80, 110, 123, 443], 'open');
  } catch (e) {
    expect(e).toEqual('host is required');
  }
});

it('require port status', async () => {
  expect.assertions(1);
  try {
    await nodePortScanner('127.0.0.1', [21, 22, 25, 80, 110, 123, 443], '');
  } catch (e) {
    expect(e).toEqual('status is required');
  }
});

it('validate port status (open/closed)', async () => {
  expect.assertions(1);
  try {
    await nodePortScanner('127.0.0.1', [21, 22, 25, 80, 110, 123, 443], 'not-open-or-closed');
  } catch (e) {
    expect(e).toEqual('status must be open or closed');
  }
});
 
it('require ports', async () => {
  expect.assertions(1);
  try {
    await nodePortScanner('127.0.0.1', '', 'open');
  } catch (e) {
    expect(e).toEqual('ports is required');
  }
});

it('validate ports is an array', async () => {
  expect.assertions(1);
  try {
    await nodePortScanner('127.0.0.1', 'not an array!', 'open');
  } catch (e) {
    expect(e).toEqual('ports must be an array');
  }
});

it('validate ports are integers', async () => {
  expect.assertions(1);
  try {
    await nodePortScanner('127.0.0.1', ['a', 'b', 'c'], 'open');
  } catch (e) {
    expect(e).toEqual('port must be an integer');
  }
});

it('validate ports in range', async () => {
  expect.assertions(1);
  try {
    await nodePortScanner('127.0.0.1', [0], 'open');
  } catch (e) {
    expect(e).toEqual('port must be in range [1-65535]');
  }
});

it('validate ports in range', async () => {
  expect.assertions(1);
  try {
    await nodePortScanner('127.0.0.1', [65536], 'open');
  } catch (e) {
    expect(e).toEqual('port must be in range [1-65535]');
  }
});