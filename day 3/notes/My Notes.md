# 🍪 Cookies in Express.js & HTTP Status Codes 🚦

---

## ✅ What are Cookies?

Cookies are small pieces of text that websites store in your browser. They help the server remember who you are between different requests.

### Why use cookies?

* To keep users logged in
* To store settings like theme or language
* To track user activity (like shopping carts)

Cookies are sent between your browser and the server automatically.

---

## 🍪 Setting Cookies (Without Middleware)

To set a cookie in Express:

```js
res.cookie('username', 'john');
res.send('Cookie set!');
```

This sends a cookie named `username` with the value `john` to the browser.

By default:

* Not secure
* Not HTTP-only (can be accessed by JavaScript)
* Not saved after closing browser

---

## 🧪 Reading Cookies (Without Middleware)

Express doesn’t read cookies automatically. You can get them like this:

```js
const rawCookies = req.headers.cookie;
res.send(`Cookies: ${rawCookies}`);
```

To make it easier, use a helper:

```js
function parseCookies(cookieHeader) {
  const cookies = {};
  cookieHeader?.split(';').forEach(cookie => {
    const [name, value] = cookie.trim().split('=');
    cookies[name] = value;
  });
  return cookies;
}
```

---

## 🔌 Using `cookie-parser` Middleware

### ✅ Install it:

```bash
npm install cookie-parser
```

### ✅ Use it:

```js
const cookieParser = require('cookie-parser');
app.use(cookieParser());
```

Now you can use:

```js
req.cookies.name;
```

To use signed cookies (more secure):

```js
app.use(cookieParser('yourSecret'));
```

---

## 🔏 Signed Cookies

Signed cookies prevent tampering. If someone changes the value, Express ignores it.

```js
res.cookie('token', 'abc123', { signed: true });
const token = req.signedCookies.token;
```

If the cookie is changed, Express will return `undefined`.

---

## 🍪 Cookie Options (with Explanation)

```js
res.cookie('name', 'value', {
  maxAge: 86400000,     // Store for 1 day
  httpOnly: true,       // Can't access from JavaScript
  secure: true,         // Only sent over HTTPS
  signed: true,         // Signed with secret
  path: '/',            // Valid for all routes
  sameSite: 'lax',      // Limits cross-site requests
});
```

### SameSite options:

* `'lax'`: Some cross-site allowed (default)
* `'strict'`: No cross-site requests allowed
* `'none'`: All cross-site allowed (must use HTTPS)

You can also use:

```js
expires: new Date(Date.now() + 86400000)
```

---

## ❌ Clearing Cookies

To remove a cookie:

```js
res.clearCookie('name');
```

Make sure to use the same options as when setting it.

---

# 🚦 HTTP Status Codes (Easy Description)

Every HTTP response has a **status code** that shows what happened.

### ✅ 1xx: Info (rarely used)

| Code | Meaning             |
| ---- | ------------------- |
| 100  | Keep going          |
| 101  | Switching protocols |

### ✅ 2xx: Success

| Code | Meaning            |
| ---- | ------------------ |
| 200  | OK                 |
| 201  | Created            |
| 204  | No content to send |

```js
res.status(200).send("Success");
```

### ✅ 3xx: Redirect

| Code | Meaning            |
| ---- | ------------------ |
| 301  | Moved forever      |
| 302  | Temporary redirect |
| 304  | Use browser cache  |

```js
res.redirect(302, '/new-page');
```

### ✅ 4xx: Client Errors

| Code | Meaning               |
| ---- | --------------------- |
| 400  | Bad request           |
| 401  | Not logged in         |
| 403  | Forbidden (no access) |
| 404  | Page not found        |

```js
res.status(404).send("Page not found");
```

### ✅ 5xx: Server Errors

| Code | Meaning         |
| ---- | --------------- |
| 500  | Server crashed  |
| 502  | Bad gateway     |
| 503  | Server too busy |

```js
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).send("Server error");
});
```

---

## 👩‍💻 Summary Table

| Feature             | What it does                |
| ------------------- | --------------------------- |
| `res.cookie()`      | Sends a cookie to browser   |
| `req.cookies`       | Reads cookies from browser  |
| `cookie-parser`     | Automatically reads cookies |
| `signed: true`      | Prevents tampering          |
| `res.clearCookie()` | Deletes the cookie          |
| `res.status()`      | Sends a status response     |

---

## 💡 Full Working Example

```js
const express = require('express');
const cookieParser = require('cookie-parser');
const app = express();

app.use(cookieParser('secret123'));

app.get('/login', (req, res) => {
  res.cookie('userId', 'abc123', { httpOnly: true, signed: true });
  res.send('Logged in!');
});

app.get('/dashboard', (req, res) => {
  const userId = req.signedCookies.userId;
  if (!userId) return res.status(401).send('Please log in');
  res.send(`Welcome back, ${userId}`);
});

app.get('/logout', (req, res) => {
  res.clearCookie('userId');
  res.send('Logged out');
});

app.listen(3000, () => console.log('Server is running'));

```