/**
 * Vercel Edge Middleware — staging password gate
 *
 * Set the environment variable STAGING_PASSWORD in the Vercel dashboard.
 * Leave it unset (or empty) to disable protection on production.
 */

const COOKIE_NAME = 'staging_auth';

const loginPage = (next, error) => `<!DOCTYPE html>
<html lang="ja">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>ステージング環境 — パスワード認証</title>
  <style>
    *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
    body {
      font-family: sans-serif;
      display: flex;
      align-items: center;
      justify-content: center;
      min-height: 100dvh;
      background: #f5f5f5;
    }
    .card {
      background: #fff;
      border-radius: 8px;
      box-shadow: 0 2px 12px rgba(0,0,0,.1);
      padding: 2.5rem 2rem;
      width: min(100%, 360px);
    }
    h1 { font-size: 1.1rem; margin-bottom: 1.5rem; color: #333; }
    label { display: block; font-size: .85rem; color: #555; margin-bottom: .4rem; }
    input[type=password] {
      width: 100%;
      padding: .6rem .75rem;
      border: 1px solid #ccc;
      border-radius: 4px;
      font-size: 1rem;
      margin-bottom: 1rem;
    }
    input[type=password]:focus { outline: 2px solid #2e7d32; border-color: transparent; }
    button {
      width: 100%;
      padding: .65rem;
      background: #2e7d32;
      color: #fff;
      border: none;
      border-radius: 4px;
      font-size: 1rem;
      cursor: pointer;
    }
    button:hover { background: #1b5e20; }
    .error { color: #c62828; font-size: .85rem; margin-bottom: 1rem; }
  </style>
</head>
<body>
  <div class="card">
    <h1>ステージング環境</h1>
    ${error ? '<p class="error">パスワードが正しくありません。</p>' : ''}
    <form method="POST" action="/_auth?next=${encodeURIComponent(next)}">
      <label for="password">パスワード</label>
      <input id="password" type="password" name="password" autofocus autocomplete="current-password">
      <button type="submit">ログイン</button>
    </form>
  </div>
</body>
</html>`;

export default async function middleware(request) {
  const password = process.env.STAGING_PASSWORD;

  // No password set → allow everything through (production / local dev)
  if (!password) return new Response(null, { status: 200, headers: { 'x-middleware-next': '1' } });

  const url = new URL(request.url);

  // Handle the login form POST
  if (request.method === 'POST' && url.pathname === '/_auth') {
    const body = await request.formData();
    const submitted = body.get('password');
    const next = url.searchParams.get('next') || '/';

    if (submitted === password) {
      // Set auth cookie and redirect to the original destination
      return new Response(null, {
        status: 303,
        headers: {
          Location: next,
          'Set-Cookie': `${COOKIE_NAME}=${password}; Path=/; HttpOnly; SameSite=Strict; Max-Age=86400`,
        },
      });
    }

    // Wrong password — show form with error
    return new Response(loginPage(next, true), {
      status: 401,
      headers: { 'Content-Type': 'text/html; charset=utf-8' },
    });
  }

  // Serve the login page on GET /_auth
  if (url.pathname === '/_auth') {
    const next = url.searchParams.get('next') || '/';
    return new Response(loginPage(next, false), {
      status: 200,
      headers: { 'Content-Type': 'text/html; charset=utf-8' },
    });
  }

  // Check auth cookie on all other routes
  const cookies = Object.fromEntries(
    (request.headers.get('cookie') || '')
      .split(';')
      .map(c => c.trim().split('='))
      .filter(([k]) => k)
      .map(([k, ...v]) => [k.trim(), v.join('=').trim()])
  );

  if (cookies[COOKIE_NAME] === password) {
    return new Response(null, { status: 200, headers: { 'x-middleware-next': '1' } });
  }

  // Not authenticated — redirect to login
  const loginUrl = new URL('/_auth', request.url);
  loginUrl.searchParams.set('next', url.pathname);
  return Response.redirect(loginUrl.toString(), 303);
}

export const config = {
  matcher: [
    // Protect everything except static assets
    '/((?!assets/|favicon\\.ico).*)',
  ],
};
