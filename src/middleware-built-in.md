# Built-in Middleware

Express menyediakan beberapa middleware bawaan yang bisa langsung digunakan tanpa perlu menginstal paket tambahan. Middleware ini memudahkan kita memproses data dari request seperti JSON, form-urlencoded, dan file statis.

Built-in middleware yang paling umum:

- `express.json()`
- `express.urlencoded()`
- `express.static()`

## `express.json()`

Middleware ini digunakan untuk membaca body request dengan format JSON. Jika aplikasi menerima data JSON (misalnya dari POST atau PUT) maka `express.json()` harus diaktifkan.

### Contoh

```js
const express = require("express");
const app = express();

// agar express bisa membaca JSON
app.use(express.json());

app.post("/user", (req, res) => {
  console.log(req.body);
  res.send(`Halo ${req.body.nama}`);
});

app.listen(3000);
```

Jika mengirim request:

```json
{
  "nama": "Ben"
}
```
