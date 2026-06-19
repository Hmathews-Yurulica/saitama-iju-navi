const { onRequest } = require('firebase-functions/v2/https');
const fs = require('fs');
const path = require('path');

const USER = 'test';
const PASS = 'fnea26';

exports.basicAuth = onRequest({ region: 'asia-northeast1' }, (req, res) => {
  const authHeader = req.headers.authorization || '';
  if (authHeader.startsWith('Basic ')) {
    const decoded = Buffer.from(authHeader.slice(6), 'base64').toString('utf8');
    const [user, ...rest] = decoded.split(':');
    const pass = rest.join(':');
    if (user === USER && pass === PASS) {
      const html = fs.readFileSync(path.join(__dirname, 'index.html'), 'utf8');
      res.set('Content-Type', 'text/html; charset=utf-8');
      return res.send(html);
    }
  }
  res.set('WWW-Authenticate', 'Basic realm="Test Site"');
  res.status(401).send('Authentication required');
});
