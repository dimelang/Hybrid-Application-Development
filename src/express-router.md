# Express Router

Saat aplikasi Express semakin besar, jumlah route akan bertambah dan bisa membuat file utama (`index.js` atau `app.js`) menjadi berantakan. Untuk menjaga struktur tetap rapi, Express menyediakan fitur Router untuk memisahkan route ke file-file terpisah.

Dengan Express Router, kita dapat:
- Mengelompokkan route berdasarkan fitur (Users, Products, Auth, dll.)
- Mempermudah maintenance
- Membuat struktur folder API lebih terorganisir

## Membuat Router Sederhana
Misalnya, kita ingin membuat router untuk user.

### Langkah 1 — Buat folder dan file router
```bash
src/
└── routes/
    └── user.routes.js
```
### Langkah 2 - Isi file user.routes.js:
```js
const express = require('express');
const router = express.Router();

// GET /users
router.get('/', (req, res) => {
  res.send('Menampilkan daftar user');
});

// GET /users/:id
router.get('/:id', (req, res) => {
  res.send(`Detail user dengan ID: ${req.params.id}`);
});

module.exports = router;
```

### Langkah 3 - Menggunakan Router di `index.js`
Di file utama (misalnya `index.js` atau `src/app.js`), kita import router tersebut
```js
const express = require('express');
const app = express();
const userRoutes = require('./src/routes/user.routes');

// gunakan router
app.use('/users', userRoutes);

app.listen(3000, () => {
  console.log('Server berjalan pada port 3000');
});
```
Sekarang route berikut otomatis aktif
| Method | URL          | Handler                 |
| ------ | ------------ | ----------------------- |
| GET    | `/users`     | Menampilkan daftar user |
| GET    | `/users/:id` | Menampilkan detail user |
