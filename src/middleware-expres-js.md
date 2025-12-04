# Middleware

Middleware adalah fungsi yang berada di antara *request* dan *respond* pada Express. Setiap *request* yang masuk ke server akan melewati satu atau beberapa middleware sebelum akhirnya mencapai *route handler*. Middleware digunakan untuk berbagai kebutuhan, seperti:
- Memproses atau memodifikasi *request* sebelum ke route.
- Melakukan loggin.
- Validasi data.
- Autentikasi dan otorisasi.
- Menangani error.
- dan banyak lagi.

## Cara Kerja Middleware
Sebuah middleware Express memiliki bentuk dasar:
```js
function (req, res, next){
    // kode middleware
    next();
}
```
Penjelasan parameter:
- `req`: objek *request*
- `res`: objek *response*
- `next()`: fungsi untuk melanjutkan ke middleware berikutnya dan jika fungsi ini tidak dipanggil, *request* akan tertahan dan tidak akan pernah sampai ke *handler*

### Contoh Middleware Sederhana
```js
const express = require('express');
const app = express();

// middleware sederhana
app.use((req, res, next) => {
  console.log(`Request masuk: ${req.method} ${req.url}`);
  next(); // lanjut ke route berikutnya
});

app.get('/', (req, res) => {
  res.send('Halo dari Express!');
});

app.listen(3000, () => {
  console.log('Server berjalan di port 3000');
});
```
Pada contoh di atas:
- Setiap *request* akan dicatat di console.
- *Request* lalu diteruskan ke *route handler*.

## Jenis-jenis Middleware di Express
Express mendukung beberapa jenis middleware:

1. **Built-in Middleware**. Middleware bawaan Express seperti `express.json()`, `express.urlencoded()`.

2. **Custom Middleware**. Middleware yang kita buat sendiri untuk kebutuhan tertentu.

3. **Third-party Middleware**. Middleware dari komunitas, seperti `morgan`, `cors`, `helmet`, dll.

4. **Error Handling Middleware**. Middleware khusus untuk menangani error, memiliki 4 parameter: (`err`, `req`, `res`, `next`).

Semua jenis ini akan dibahas pada bagian-bagian selanjutnya.

