# Routing

Routing adalah konsep dasar dalam `ExpressJs` yang digunakan untuk menentukan bagaimana server merespons suatu _request_ dari client berdasarkan HTTP method dan URL path.

Dengan routing, kita dapat mengatur endpoint seperti:

- `GET /users`
- `POST /login`
- `PUT /products/:id`
- `PATCH /posts/:id`
- `DELETE /posts/:id`

Routing menjadi fondasi utama dalam membangun [RESTful API](./rest-api-express-js.md).

## HTTP Methods yang Didukung Express

| Method     | Keterangan                |
| ---------- | ------------------------- |
| **GET**    | Mengambil data            |
| **POST**   | Mengirim data baru        |
| **PUT**    | Mengupdate data (replace) |
| **PATCH**  | Mengupdate sebagian data  |
| **DELETE** | Menghapus data            |

Contoh route dasar di Express:

```js
app.get("/hello", (req, res) => {
  res.send("Hello World!");
});
```

### Memahami Objek `req` dan `res`

Ketika membuat route, handler function akan menerima dua objek penting yaitu `req` (request) dan `res` (response).

### Objek `req`

Berisi informasi dari client yang dikirim ke server. Objek ini memiliki beberapa property penting:

- `req.originalUrl` Menunjukkan URL lengkap. `req.baseUrl` Menunjukkan dasar tempat sebuah router dipasang. `req.path` Menunjukkan path spesifik dari URL yang menangani suatu route.

  ```js
  // GET 'http://www.example.com/admin/new?sort=desc'
  app.use("/admin", (req, res, next) => {
    console.dir(req.originalUrl); // '/admin/new?sort=desc'
    console.dir(req.baseUrl); // '/admin'
    console.dir(req.path); // '/new'
    next();
  });
  ```

`next` merupakan fungsi tambahan untuk kebutuhan [Middleware](./middleware-expres-js.md)

- `req.subdomains` Menunjukkan array subdomain.

  ```js
  // Host: "tobi.ferrets.example.com/admin"
  app.get("/admin", (req, res) => {
    console.dir(req.subdomains);
    // => ["ferrets", "tobi"]
  });
  ```

- `req.params` Menyimpan nilai dari [Route Parameters](./route-parameter-express-js.md).

  ```yaml
  GET /users/45
  ```

  ```js
  app.get("/users/:id", (req, res) => {
    console.log(req.params.id); // 45
  });
  ```

- `req.query` Menyimpan [Query Parameters](./query-parameter-express-js.md)

  ```yaml
  GET /search?title=express?year=2025
  ```

  ```js
  app.get("/search", (req, res) => {
    // const title = req.params.title   // jika ingin mendapatkan key tertentu
    // const year = req.params.year   // jika ingin mendapatkan key tertentu
    const { title, year } = req.params;

    console.log(title, year); // "express", 2025
  });
  ```

  Pastikan key sudah sama dengan yang terdapat pada URL. Contoh di atas, key-nya adalah `title` dan `year`

- `req.headers` Berisi semua header request HTTP yang dikirim oleh client.

  ```js
  app.get("/data", (req, res) => {
    const userAgent = req.headers["User-Agent"];
    console.log(`User Agent: ${userAgent}`);
  });
  ```

- `req.body` Berisi data yang dikirim melalui body (`POST`, `PUT`, `PATCH`) dan wajib menambahkan [Middleware](./middleware-expres-js.md) berikut

  ```js
  app.use(express.json());
  ```

  ```js
  app.post("/user/register", (req, res) => {
    const dataBody = req.body; // mendapatkan seluruh data body
    const username = req.body.username; // mendapatkan data dari suatu key
  });
  ```

- `req.method` Menunjukkan HTTP method yang digunakan dan `req.url` Menunjukkan URL path yang diminta.
  ```js
  app.use((req, res, next) => {
    console.log(`Request: ${req.method} - ${req.url}`);
    next();
  });
  ```

### Objek `res`

Digunakan untuk mengirim response ke client. Objek ini memiliki beberapa method penting:

- `res.send()` digunakan untuk mengirim `string`, `object`, `buffer`, atau `array` sebagai response.

  ```js
  app.get("/hello", (req, res) => {
    res.send("Hello world!");
  });
  ```

- `res.json()` digunakan untuk mengirimkan response ke client dalam format JSON.

  ```js
  app.post("/register", (req, res) => {
    res.json({
      message: "Behasil mendaftar",
      status: "success",
    });
  });
  ```

- `res.status()` digunakan untuk mengatur HTTP status code.

  ```js
  app.get("/hello", (req, res) => {
    res.status(200).send("Hello world!");
  });
  ```

- `res.end()` diguanakan untuk mengakhiri proses response tanpa mengirimkan data.

  ```js
  app.all("*", (req, res) => {
    res.status(404).end();
  });
  ```

- `res.status()` digunakan untuk mengatur HTTP status code.

  ```js
  app.get("/hello", (req, res) => {
    res.status(200).send("Hello world!");
  });
  ```

  ```js
  app.all("*", (req, res) => {
    res.status(404).send("Route tidak ditemukan");
  });
  ```

- `res.redirect()` digunakan untuk mengalihkan client ke URL lain.

  ```js
  app.get("/register", (req, res) => {
    // logic register
    res.redirect("/beranda");
  });
  ```

- `res.attachment()` digunakan untuk mengirimkan suatu file ke client.

  ```js
  app.post("/register", (req, res) => {
    res.attachment("path/file.ekstensi").json({
      message: "Behasil mendaftar",
      status: "success",
    });
  });
  ```

- `res.format()` digunakan untuk negosiasi konten yang memungkinkan server merespons dengan tipe konten yang berbeda seperti HTML, JSON, atau teks biasa berdasarkan header HTTP Accept yang dikirim oleh client.

  ```js
  res.format({
    "text/plain"() {
      res.send("hey");
    },

    "text/html"() {
      res.send("<p>hey</p>");
    },

    "application/json"() {
      res.send({ message: "hey" });
    },

    default() {
      // log the request and respond with 406
      res.status(406).send("Not Acceptable");
    },
  });
  ```

  Kode di atas menunjukkan perbedaan jenis konten yang akan diterima oleh client.

- `res.render()` digunakan untuk merender template tampilan dan mengirimkan HTML ke client. Untuk menggunakan metode ini, pastikan untuk menggunakan view engine seperti [EJS](https://ejs.co/).

  ```js
  const express = require("express");
  const app = express();

  app.set("view engine", "ejs");
  app.set("views", "./views"); // folder tempat menyimpan file .ejs

  app.get("/", (req, res) => {
    res.render("home", { nama: "John" });
  });
  ```
