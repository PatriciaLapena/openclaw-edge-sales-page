const http = require('http');
const fs = require('fs');
const path = require('path');
const { URL } = require('url');

const HOST = process.env.HOST || '0.0.0.0';
const PORT = Number(process.env.PORT || 8787);
const WORKSPACE = '/root/.openclaw/workspace';
const OFFERS_DIR = path.join(WORKSPACE, 'offers');
const MAILERLITE_API_KEY = process.env.MAILERLITE_API_KEY || fs.readFileSync(path.join(WORKSPACE, 'credentials', 'mailerlite_api_key.txt'), 'utf8').trim();
const MAILERLITE_GROUP_ID = process.env.MAILERLITE_GROUP_ID || '182138072772642593'; // ScoreApp Leads
const SUCCESS_REDIRECT = '/design-your-next-chapter-gated.html';

function json(res, status, payload) {
  res.writeHead(status, {
    'Content-Type': 'application/json; charset=utf-8',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET,POST,OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type'
  });
  res.end(JSON.stringify(payload));
}

function sendFile(res, filePath) {
  const ext = path.extname(filePath).toLowerCase();
  const contentType = {
    '.html': 'text/html; charset=utf-8',
    '.css': 'text/css; charset=utf-8',
    '.js': 'application/javascript; charset=utf-8',
    '.jpg': 'image/jpeg',
    '.jpeg': 'image/jpeg',
    '.png': 'image/png',
    '.webp': 'image/webp',
    '.svg': 'image/svg+xml',
    '.pdf': 'application/pdf'
  }[ext] || 'application/octet-stream';

  fs.readFile(filePath, (err, data) => {
    if (err) {
      res.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' });
      res.end('Not found');
      return;
    }
    res.writeHead(200, { 'Content-Type': contentType });
    res.end(data);
  });
}

function parseBody(req) {
  return new Promise((resolve, reject) => {
    let body = '';
    req.on('data', chunk => {
      body += chunk;
      if (body.length > 1_000_000) {
        reject(new Error('Request too large'));
        req.destroy();
      }
    });
    req.on('end', () => {
      try {
        resolve(body ? JSON.parse(body) : {});
      } catch (error) {
        reject(error);
      }
    });
    req.on('error', reject);
  });
}

async function subscribeLead({ name, email, source }) {
  const [first_name, ...rest] = String(name || '').trim().split(/\s+/).filter(Boolean);
  const last_name = rest.join(' ');

  const payload = {
    email,
    fields: {
      name: String(name || '').trim(),
      first_name: first_name || '',
      last_name: last_name || ''
    },
    groups: [MAILERLITE_GROUP_ID],
    status: 'active',
    subscribed_at: new Date().toISOString()
  };

  if (source) payload.fields.source = source;

  const response = await fetch('https://connect.mailerlite.com/api/subscribers', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'Authorization': `Bearer ${MAILERLITE_API_KEY}`
    },
    body: JSON.stringify(payload)
  });

  const text = await response.text();
  let data;
  try {
    data = text ? JSON.parse(text) : {};
  } catch {
    data = { raw: text };
  }

  if (!response.ok) {
    const message = data?.message || data?.errors?.email?.[0] || 'MailerLite request failed';
    throw new Error(message);
  }

  return data;
}

const server = http.createServer(async (req, res) => {
  if (req.method === 'OPTIONS') {
    res.writeHead(204, {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET,POST,OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type'
    });
    return res.end();
  }

  const url = new URL(req.url, `http://${req.headers.host}`);
  const pathname = decodeURIComponent(url.pathname);

  if (req.method === 'POST' && pathname === '/api/next-chapter-lead') {
    try {
      const body = await parseBody(req);
      const name = String(body.name || '').trim();
      const email = String(body.email || '').trim().toLowerCase();
      const source = String(body.source || 'Design Your Next Chapter').trim();

      if (!name) return json(res, 400, { ok: false, error: 'Please enter a first name.' });
      if (!email || !email.includes('@')) return json(res, 400, { ok: false, error: 'Please enter a valid email address.' });

      const data = await subscribeLead({ name, email, source });
      return json(res, 200, {
        ok: true,
        redirect: SUCCESS_REDIRECT,
        subscriberId: data?.data?.id || null
      });
    } catch (error) {
      return json(res, 500, { ok: false, error: error.message || 'Unable to save lead right now.' });
    }
  }

  let filePath = pathname === '/' ? path.join(OFFERS_DIR, 'design-your-next-chapter-optin.html') : path.join(OFFERS_DIR, pathname.replace(/^\//, ''));
  if (!filePath.startsWith(OFFERS_DIR)) {
    res.writeHead(403, { 'Content-Type': 'text/plain; charset=utf-8' });
    return res.end('Forbidden');
  }

  fs.stat(filePath, (err, stat) => {
    if (err || !stat.isFile()) {
      res.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' });
      return res.end('Not found');
    }
    sendFile(res, filePath);
  });
});

server.listen(PORT, HOST, () => {
  console.log(`Lead capture server running on http://${HOST}:${PORT}`);
});
