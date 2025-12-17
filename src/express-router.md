# Express Router

Saat aplikasi Express semakin besar, jumlah route akan bertambah dan dapat membuat file utama (`index.js` atau `app.js`) menjadi berantakan. Untuk menjaga struktur tetap rapi, Express menyediakan fitur Router untuk memisahkan route ke file-file terpisah.

Dengan Express Router, kita dapat:

- Mengelompokkan route berdasarkan fitur (Users, Products, Auth, dll.)
- Menjaga file utama tetap bersih
- Mempermudah scaling dan maintenance aplikasi
- Menerapkan middleware khusus untuk grup route tertentu

## Konsep Dasar Express Router

`Router` adalah instance terpisah dari Express yang hanya bertanggung jawab mengatur route.

```js
const router = express.Router();
```

Router dapat:

- Memiliki route sendiri
- Memiliki middleware sendiri
- di-_mount_ ke path tertentu menggunakan `app.use()`

## Membuat Router Sederhana

Misalnya, kita ingin membuat router untuk user.

### Langkah 1 — Buat folder dan file router

```bash
src/
└── routes/
│    ├── user.routes.js
│    └── article.routes.js
└── app.js
```

### Langkah 2 - Isi file `user.routes.js` dan `article.routes.js`:

```js
const express = require("express");
const router = express.Router();

// GET /users
router.get("/", (req, res) => {
  res.send("Menampilkan daftar user");
});

// GET /users/:id
router.get("/:id", (req, res) => {
  res.send(`Detail user dengan ID: ${req.params.id}`);
});

module.exports = router;
```

```js
const express = require("express");
const router = express.Router();

// GET /users
router.get("/", (req, res) => {
  res.send("Menampilkan daftar artikel");
});

// GET /users/:id
router.get("/:id", (req, res) => {
  const { include, limit } = req.query;
  res.json({
    articleId: req.params.id,
    include,
    limit,
  });
});

module.exports = router;
```

Catatan:

- Path pada router tidak perlu menuliskan /users
- Prefix URL akan ditentukan saat router dipasang

### Langkah 3 - Menggunakan Router di File Utama

Di file utama (misalnya `index.js` atau `src/app.js`), kita import router tersebut

```js
const express = require("express");
const app = express();
const userRoutes = require("./src/routes/user.routes");
const articleRoutes = require("./src/routes/article.routes");

// gunakan router
app.use("/users", userRoutes);
app.use("/articles", articleRoutes);

app.listen(3000, () => {
  console.log("Server berjalan pada port 3000");
});
```

Sekarang route berikut otomatis aktif
| Method | URL | Handler |
| ------ | ------------ | ----------------------- |
| GET | `/users` | Menampilkan daftar user |
| GET | `/users/:id` | Menampilkan detail user |
| GET | `/articles` | Menampilkan daftar artkel |
| GET | `/articles/:id` | Menampilkan detail artikel |

### Best Practice

1.  Gunakan 1 router per fitur
2.  Hindari logic bisnis di file route
3.  Pisahkan controller dan service
4.  Gunakan nama file konsisten (`*.routes.js`)
