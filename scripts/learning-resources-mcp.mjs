#!/usr/bin/env node
// Minimal dependency-free MCP stdio server for learning-source evidence.
import readline from 'node:readline';

// https://modelcontextprotocol.io/specification/2025-06-18/basic/lifecycle#version-negotiation
// A server must return a version it supports, even when the client requests another.
const protocolVersion = '2025-06-18';
const allowedHosts = new Set(['docs.python.org', 'learn.microsoft.com', 'www.py4e.com']);
const toolDefinitions = [
  {
    name: 'inspect_learning_page',
    description: 'Fetch an allowlisted HTTPS learning page and return its live HTTP status, title, and description. Reports fetch failures explicitly.',
    inputSchema: { type: 'object', properties: { url: { type: 'string', description: 'HTTPS URL on docs.python.org, learn.microsoft.com, or www.py4e.com' } }, required: ['url'], additionalProperties: false }
  }
];

function result(data, isError = false) {
  return { content: [{ type: 'text', text: JSON.stringify(data) }], isError };
}

function approvedUrl(raw) {
  const url = new URL(raw);
  if (url.protocol !== 'https:' || !allowedHosts.has(url.hostname) || url.username || url.password || url.port) {
    throw new Error('Only allowlisted public HTTPS documentation hosts are supported');
  }
  return url;
}

async function inspect(raw) {
  const url = approvedUrl(raw);
  const checkedAt = new Date().toISOString();
  let response;
  try {
    response = await fetch(url, { redirect: 'manual', signal: AbortSignal.timeout(8000), headers: { 'User-Agent': 'personalized-learning-assistant/1.0' } });
  } catch (error) {
    return result({ url: url.href, checkedAt, status: 'fetch-failed', reason: error.message }, true);
  }
  if (!response.ok || response.status >= 300) {
    return result({ url: url.href, checkedAt, status: 'unusable', httpStatus: response.status, reason: 'Non-success response or redirect; inspect manually' }, true);
  }
  const contentType = response.headers.get('content-type') ?? '';
  if (!contentType.toLowerCase().includes('text/html')) {
    return result({ url: url.href, checkedAt, status: 'unusable', httpStatus: response.status, reason: `Unexpected content type: ${contentType}` }, true);
  }
  const html = (await response.text()).slice(0, 250000);
  const title = /<title[^>]*>([\s\S]*?)<\/title>/i.exec(html)?.[1]?.replace(/\s+/g, ' ').trim() ?? '';
  const description = /<meta\s+[^>]*name=["']description["'][^>]*content=["']([^"']*)["']/i.exec(html)?.[1]?.trim() ?? '';
  return result({ url: url.href, checkedAt, status: 'fetched', httpStatus: response.status, title, description });
}

async function call(name, args) {
  if (name === 'inspect_learning_page') {
    try { return await inspect(String(args?.url ?? '')); }
    catch (error) { return result({ status: 'invalid-url', reason: error.message }, true); }
  }
  return result({ error: `Unknown tool: ${name}` }, true);
}

function send(message) { process.stdout.write(`${JSON.stringify(message)}\n`); }

const input = readline.createInterface({ input: process.stdin, crlfDelay: Infinity });
for await (const line of input) {
  let request;
  try { request = JSON.parse(line); }
  catch { send({ jsonrpc: '2.0', id: null, error: { code: -32700, message: 'Parse error' } }); continue; }
  if (request.id === undefined) continue;
  let reply;
  switch (request.method) {
    case 'initialize':
      reply = { protocolVersion, capabilities: { tools: {} }, serverInfo: { name: 'learning_resources', version: '1.0.0' } };
      break;
    case 'tools/list': reply = { tools: toolDefinitions }; break;
    case 'tools/call': reply = await call(request.params?.name, request.params?.arguments); break;
    case 'ping': reply = {}; break;
    default: send({ jsonrpc: '2.0', id: request.id, error: { code: -32601, message: 'Method not found' } }); continue;
  }
  send({ jsonrpc: '2.0', id: request.id, result: reply });
}
