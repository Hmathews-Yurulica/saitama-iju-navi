const { onRequest } = require('firebase-functions/v2/https');
const express = require('express');
const fs = require('fs');
const path = require('path');

const USER = 'test';
const PASS = 'fnea26';
const COOKIE_NAME = 'saitama_auth';
const COOKIE_VALUE = 'granted';

const LOGIN_HTML = `<!DOCTYPE html>
<html lang="ja">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>ログイン</title>
  <style>
    *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
    body {
      min-height: 100vh;
      display: flex;
      align-items: center;
      justify-content: center;
      background: #f5f5f5;
      font-family: sans-serif;
    }
    .card {
      background: white;
      border-radius: 16px;
      padding: 40px 36px;
      width: 320px;
      box-shadow: 0 4px 24px rgba(0,0,0,0.12);
      display: flex;
      flex-direction: column;
      gap: 16px;
    }
    .note { font-size: 14px; color: #666; text-align: center; }
    input {
      border: 1px solid #ddd;
      border-radius: 8px;
      padding: 10px 14px;
      font-size: 15px;
      width: 100%;
      outline: none;
    }
    input:focus { border-color: #36bc87; }
    .error { font-size: 13px; color: #e53935; text-align: center; display: none; }
    .error.visible { display: block; }
    button {
      background: #36bc87;
      color: white;
      border: none;
      border-radius: 8px;
      padding: 12px;
      font-size: 15px;
      font-weight: bold;
      cursor: pointer;
      width: 100%;
    }
    button:hover { opacity: 0.9; }
  </style>
</head>
<body>
  <div class="card">
    <p class="note">このサイトはテスト環境です</p>
    <form method="POST" action="/">
      <div style="display:flex;flex-direction:column;gap:16px;">
        <input type="text" name="id" placeholder="ID" autocomplete="username" required>
        <input type="password" name="pw" placeholder="パスワード" autocomplete="current-password" required>
        <p class="error{{ERROR_CLASS}}">IDまたはパスワードが正しくありません</p>
        <button type="submit">入る</button>
      </div>
    </form>
  </div>
</body>
</html>`;

const app = express();
app.use(express.urlencoded({ extended: false }));

app.use((req, res) => {
  const cookies = parseCookies(req.headers.cookie || '');

  if (req.method === 'POST') {
    const { id, pw } = req.body;
    if (id === USER && pw === PASS) {
      res.set('Set-Cookie', `${COOKIE_NAME}=${COOKIE_VALUE}; Path=/; HttpOnly; Secure; SameSite=Strict`);
      res.set('Content-Type', 'text/html; charset=utf-8');
      return res.send('<!DOCTYPE html><html><head><meta charset="UTF-8"><script>window.location.replace("/")</script></head><body></body></html>');
    }
    return res.status(401).send(LOGIN_HTML.replace('{{ERROR_CLASS}}', ' visible'));
  }

  if (cookies[COOKIE_NAME] === COOKIE_VALUE) {
    const html = fs.readFileSync(path.join(__dirname, 'index.html'), 'utf8');
    res.set('Content-Type', 'text/html; charset=utf-8');
    return res.send(html);
  }

  res.send(LOGIN_HTML.replace('{{ERROR_CLASS}}', ''));
});

function parseCookies(header) {
  return Object.fromEntries(
    header.split(';')
      .map(c => c.trim().split('='))
      .filter(([k]) => k)
      .map(([k, ...v]) => [k.trim(), v.join('=').trim()])
  );
}

exports.basicAuth = onRequest({ region: 'asia-northeast1' }, app);
