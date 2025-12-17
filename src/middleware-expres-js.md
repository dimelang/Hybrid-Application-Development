# Middleware

Middleware adalah fungsi yang berada di antara _request_ dan _respond_ pada Express. Setiap _request_ yang masuk ke server akan melewati satu atau rangkaian middleware sebelum akhirnya mencapai `route handler`. Middleware digunakan untuk berbagai kebutuhan, seperti:

- Memproses atau memodifikasi _request_ sebelum ke route.
- Melakukan logging.
- Validasi data.
- Autentikasi dan otorisasi.
- Menangani error.
- dll.

## Cara Kerja Middleware

Sebuah middleware Express memiliki bentuk dasar:

```js
function (req, res, next){
    // kode middleware
    next();
}
```

Penjelasan parameter:

- `req`: objek _request_
- `res`: objek _response_
- `next()`: fungsi untuk melanjutkan ke middleware berikutnya

## Jenis-jenis Middleware di Express

Express mendukung beberapa jenis middleware:

## Application-level Middleware

Application-level middleware adalah middleware yang diterapkan langsung pada instance aplikasi Express, yaitu `app`.
Biasanya digunakan untuk kebutuhan yang berlaku global di seluruh route, seperti:

- Logging request
- Autentikasi dasar
- Validasi global
- Parsing body (JSON, URL-encoded)
- Rate limiting
- Menambah data ke objek req
- Mengatur response header

### Cara Menggunakan Application-level Middleware

Untuk menggunakan Application-level middleware, dapat dilakukan melalui dua cara, yaitu:

```js
app.use(middlewareFunction);
```

Middleware ini akan berjalan setiap kali ada request masuk, kecuali jika dibatasi pada route tertentu seperti cara berikut
atau

```js
app.use("/path", middlewareFunction);
```

### Contoh Application-level middleware paling dasar:

```js
const express = require("express");
const app = express();

app.use(express.json());

// Application-level middleware
app.use((req, res, next) => {
  console.log(`Request: ${req.method} - ${req.url}`);
  next(); // lanjut ke middleware berikutnya
});

app.get("/", (req, res) => {
  res.send("Hello dari Home Page!");
});

app.post("/submit", (req, res) => {
  const dataSubmited = req.body;
  res.send("Berhasil submit data");
});

app.listen(3000, () => {
  console.log("Server berjalan di port 3000");
});
```

Middleware di atas akan mencetak log setiap kali ada request masuk.

### Contoh Application-level middleware dengan Path

Middleware juga dapat diberlakukan hanya untuk path tertentu.

```js
app.use("/admin", (req, res, next) => {
  console.log("Middleware admin dijalankan");
  next();
});

app.get("/admin/dashboard", (req, res) => {
  res.send("Dashboard Admin");
});
```

Middleware hanya berjalan untuk URL yang diawali `/admin`.

### Contoh rangkaian Application-level middleware

Kita juga dapat membuat rangkaian middleware

```js
app.use(
  "/user/:id",
  (req, res, next) => {
    console.log("Request URL:", req.originalUrl);
    next();
  },
  (req, res, next) => {
    console.log("Request Type:", req.method);
    next();
  }
);
```

Kode di atas menunjukkan adanya dua middleware yang dirangkai untuk route yang mengarah ke path `/user/:id`

### 🛑 Middleware tanpa `next()`

Jika sebuah middleware **TIDAK** memanggil `next()` maka request akan terhenti.

```js
app.use((req, res) => {
  res.send("Request dihentikan di middleware ini");
});
```

Ini dapat digunakan untuk:

- Menolak akses
- Mengembalikan error
- Maintenance mode

**Catatan:**

Express mengeksekusi middleware secara berurutan dari atas ke bawah sesuai urutan penulisannya di kode.

## Router-level Middleware

Router-level middleware adalah middleware yang prinsip kerjanya sama seperti application-level middleware, tetapi dikhususkan hanya untuk instance Router. Artinya, middleware jenis ini hanya berlaku untuk sekelompok route tertentu. Biasanya digunakan untuk kebutuhan:

- Membantu modularisasi
- Membatasi cakupan middleware
- Membuat struktur kode lebih bersih dan terorganisir

### Cara Menggunakan Router-level Middleware

Untuk menggunakan Router-level middleware, dapat dilakukan dalam dua tahap, yaitu:

1.  Buat Router dan tambahkan middleware ke router

    **src/routes/user.routes.js**

    ```js
    const express = require("express");
    const router = express.Router();

    // Router-level middleware dengan path
    router.use(
      "/profile/:id",
      (req, res, next) => {
        console.log("Request URL:", req.originalUrl);
        next();
      },
      (req, res, next) => {
        console.log("Request Type:", req.method);
        next();
      }
    );

    // Route
    router.get("/profile/:id", (req, res) => {
      res.send(`Profil user dengan ID: ${req.params.id}`);
    });

    module.exports = router;
    ```

    Penjelasan:

    - `router.use()` menerapkan middleware hanya untuk route di router ini.
    - Middleware akan berjalan untuk semua request yang cocok dengan path `/profile/:id`.

2.  Tambahkan router ke aplikasi utama

    **index.js**

    ```js
    const express = require("express");
    const app = express();
    const userRoutes = require("./src/routes/user.routes");

    // gunakan router
    app.use("/users", userRoutes);

    app.listen(3000, () => {
      console.log("Server berjalan pada port 3000");
    });
    ```

## Error-Handling Middleware

Error-handling middleware adalah middleware khusus di Express yang digunakan untuk menangani error dalam aplikasi. Middleware ini memiliki empat parameter, yaitu: `err`, `req`, `res`, `next`. Express secara otomatis akan mengenali middleware sebagai error handler ketika memiliki empat parameter, bukan tiga.

Error-handling middleware berfungsi untuk:

- Menangkap error dari route handler atau middleware lain
- Mengirim response error yang konsisten
- Mencegah aplikasi berhenti ketika terjadi error
- Logging error secara terpusat
- Mengatur standar format error aplikasi

### Bentuk dasar error-handling middleware

```js
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Terjadi kesalahan pada server");
});
```

### Contoh sederhana

```js
const express = require("express");
const app = express();

app.use(express.json());

// Route dengan validasi manual
app.post("/register", (req, res, next) => {
  const { username } = req.body;

  if (!username) {
    const error = new Error("Username wajib diisi");
    error.status = 400;
    return next(error);
  }

  res.send("Register berhasil");
});

// 404 Handler
app.use((req, res, next) => {
  res.status(404).json({ message: "Endpoint tidak ditemukan" });
});

// Error handler
app.use((err, req, res, next) => {
  res.status(err.status || 500).json({
    success: false,
    message: err.message,
  });
});

app.listen(3000, () => console.log("Server berjalan di port 3000"));
```

Error-handling middleware harus ditempatkan setelah semua route dan middleware lainnya, karena Express memprosesnya secara berurutan (top-down).

## Built-in Middleware

Built-in middleware adalah middleware bawaan yang sudah disediakan oleh Express tanpa perlu menginstal library tambahan. Middleware ini sangat sering digunakan dalam aplikasi backend untuk memproses body request, menyajikan file statis, dan menangani URL-encoded form. Express menyediakan beberapa built-in middleware utama:

### `express.json()`

Middleware ini digunakan untuk membaca request body yang dikirim dalam format JSON. Tanpa middleware ini, `req.body` akan bernilai `undefined`.

### Contoh:

```js
const express = require("express");
const app = express();

// Mengaktifkan JSON parser
app.use(express.json());

app.post("/data", (req, res) => {
  res.send({
    message: "Data diterima",
    data: req.body,
  });
});

app.listen(3000, () => console.log("Server berjalan di port 3000"));
```

### `express.urlencoded()`

Middleware untuk membaca body request dari form HTML (seperti `application/x-www-form-urlencoded`). Biasanya digunakan untuk form login atau register.

### Contoh:

```js
const express = require("express");
const app = express();
const PORT = 3000;
app.use(express.urlencoded({ extended: true }));

app.get("/login", (req, res) => {
  res.send(
    "<form method=POST action=/login><input type=text name=username><input type=number name=age><input type=submit></form>"
  );
});

app.post("/login", (req, res) => {
  console.log(req.body);
  res.send("data has been recieved by the server");
});

app.listen(PORT, () => {
  console.log("Server is running on localhost://3000");
});
```

### `express.static()`

Middleware ini digunakan untuk menyajikan file statis, seperti:

- Gambar
- CSS
- File JavaScript frontend
- Dokumen
- Asset lainnya

Biasanya digunakan untuk folder publik.

### Contoh:

Jika kita memiliki sebuah file di `public/logo.png`.

```js
// tambahkan middleware pada aplikasi utama
app.use("/assets", express.static("public"));
```

maka dapat diakses `http://localhost:3000/assets/logo.png`

## Custom Middleware

Custom middleware adalah middleware yang dapat dibuat sendiri oleh pengguna yang biasanya ditujukan untuk menangani kebutuhan tertentu pada aplikasi Express misalnya logging, autentikasi, validasi, hingga memodifikasi objek `req` atau `res`.

Middleware custom memiliki struktur dasar:

```js
function middlewareName(req, res, next) {
  // logic middleware
  next(); // lanjut ke middleware berikutnya
}
```

Middleware wajib memanggil `next()` agar request dapat diteruskan ke middleware atau route handler berikutnya.

Setelah didefinisikan, middleware bisa digunakan dengan:

```js
app.use(middlewareName);
```

Atau jika ingin diterapkan pada route tertentu

```js
app.get("/route", middlewareName, (req, res) => {
  res.send("OK");
});
```

### Contoh: custom logging request

```js
const requestLogger = (req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.originalUrl}`);
  next();
};

app.use(requestLogger);
```

### Contoh: Middleware Autentikasi Sederhana

```js
const simpleAuth = (req, res, next) => {
  const token = req.headers["x-api-key"];

  if (token !== "12345") {
    return res.status(401).json({ message: "Unauthorized" });
  }

  next();
};

// Contoh penggunaan
app.get("/dashboard", simpleAuth, (req, res) => {
  res.send("Welcome to Dashboard");
});
```

### Contoh: Middleware Validasi Sederhana

```js
const validateName = (req, res, next) => {
  const { name } = req.body;

  if (!name) {
    return res.status(400).json({ message: "Name wajib diisi" });
  }

  next();
};

app.post("/hello", validateName, (req, res) => {
  res.send(`Halo, ${req.body.name}`);
});
```
