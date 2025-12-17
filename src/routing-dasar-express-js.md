# Routing Dasar

Route dasar adalah titik awal untuk memahami bagaimana Express menangani sebuah request dari client. Pada route dasar, kita mendefinisikan HTTP method, path, dan handler (fungsi yang dijalankan saat route dipanggil).

## Apa itu Route?

Route adalah kombinasi dari:

- HTTP method → `GET`, `POST`, `PUT`, `PATCH`, `DELETE`
- Path (URL) → misalnya `/users`, `/products/:id`
- Handler (callback) → fungsi yang menangani request dan memberikan response

## Membuat Route

### `GET`

Route GET digunakan untuk mengambil data atau menampilkan informasi.

```js
app.get("/hello", (req, res) => {
  res.send("Ini adalah route GET!");
});
```

Selain `res.send()`, Express juga mendukung `res.json()` untuk mengirim data format JSON.

```js
app.get("/json", (req, res) => {
  res.json({
    message: "Hello dari JSON!",
    status: "success",
  });
});
```

### `POST`

Route POST biasanya digunakan untuk mengirimkan data dari client ke server.

```js
app.post("/submit", (req, res) => {
  res.send("Data berhasil diterima!");
});
```

Catatan:
Jika menggunakan body JSON, pastikan app menggunakan [middleware](./middleware-expres-js.md) `express.json()`:

```js
app.use(express.json());

app.post("/submit", (req, res) => {
  console.log(req.body);
  res.json(req.body);
});
```

### `PUT`

Digunakan untuk memperbarui seluruh data.

```js
app.put("/update", (req, res) => {
  res.send("Data berhasil diperbarui!");
});
```

### `PATCH`

Digunakan untuk memperbarui sebagian data.

```js
app.use(express.json());
app.patch("/update", (req, res) => {
  const updatedData = req.body;
  // logic update data

  res.status(200).send("Data berhasil diperbarui!");
});
```

### `DELETE`

Digunakan untuk menghapus data.

```js
app.delete("/delete", (req, res) => {
  res.send("Data berhasil dihapus!");
});
```

### Menangani Semua HTTP Method

Express dapat menerima semua HTTP method menggunakan `all()`.

```js
app.all("/all", (req, res) => {
  res.send(`Metode HTTP yang diterima oleh route ini: ${req.method}`);
});
```

### Menangani Semua URL dengan

Route wildcard (`*`) biasanya digunakan untuk 404

```js
app.all("*", (req, res) => {
  res.status(404).send("Route tidak ditemukan");
});
```
