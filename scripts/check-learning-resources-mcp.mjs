#!/usr/bin/env node
import { spawn, spawnSync } from 'node:child_process';
import { readFileSync } from 'node:fs';
import readline from 'node:readline';

const configuredServer = JSON.parse(readFileSync('.mcp.json', 'utf8')).mcpServers.learning_resources;
const serverCommand = configuredServer.command === 'node' ? process.execPath : configuredServer.command;
const child = spawn(serverCommand, configuredServer.args, { stdio: ['pipe', 'pipe', 'inherit'] });
const lines = readline.createInterface({ input: child.stdout });
const pending = new Map();
lines.on('line', line => {
  const reply = JSON.parse(line);
  const resolve = pending.get(reply.id);
  if (resolve) { pending.delete(reply.id); resolve(reply); }
});
let id = 0;
function request(method, params) {
  const current = ++id;
  const promise = new Promise(resolve => pending.set(current, resolve));
  child.stdin.write(JSON.stringify({ jsonrpc: '2.0', id: current, method, params }) + '\n');
  return promise;
}
try {
  const init = await request('initialize', { protocolVersion: '2025-06-18', capabilities: {}, clientInfo: { name: 'protocol-check', version: '1.0' } });
  child.stdin.write(JSON.stringify({ jsonrpc: '2.0', method: 'notifications/initialized' }) + '\n');
  const listed = await request('tools/list', {});
  const blocked = await request('tools/call', { name: 'inspect_learning_page', arguments: { url: 'http://127.0.0.1/private' } });
  // https://modelcontextprotocol.io/specification/2025-06-18/basic/lifecycle#version-negotiation
  const mismatchProbe = spawnSync(serverCommand, configuredServer.args, {
    input: JSON.stringify({ jsonrpc: '2.0', id: 1, method: 'initialize', params: { protocolVersion: '2099-01-01', capabilities: {}, clientInfo: { name: 'protocol-check', version: '1.0' } } }) + '\n',
    encoding: 'utf8', timeout: 5000
  });
  if (mismatchProbe.status !== 0) throw new Error(`MCP mismatch probe failed: ${mismatchProbe.stderr}`);
  const mismatch = JSON.parse(mismatchProbe.stdout.trim());
  if (init.result.protocolVersion !== '2025-06-18' || mismatch.result.protocolVersion !== '2025-06-18' || init.result.serverInfo.name !== 'learning_resources' || listed.result.tools.length !== 1 || listed.result.tools[0].name !== 'inspect_learning_page' || !blocked.result.isError) throw new Error('MCP protocol assertion failed');
  console.log('PASS learning_resources MCP protocol and URL guard');
} finally {
  child.stdin.end();
}
