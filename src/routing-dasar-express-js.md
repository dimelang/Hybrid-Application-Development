# Routing Dasar

Route dasar adalah titik awal untuk memahami bagaimana Express menangani sebuah request dari client. Pada route dasar, kita mendefinisikan HTTP method, path, dan handler (fungsi yang dijalankan saat route dipanggil).

## Apa itu Route?

Route adalah kombinasi dari:
- HTTP method → GET, POST, PUT, PATCH, DELETE
- Path (URL) → misalnya /users, /products/:id
- Handler (callback) → fungsi yang menangani permintaan dan memberikan respons

## Membuat Route

### `GET`
Route GET digunakan untuk mengambil data atau menampilkan informasi.
```js
app.get('/hello', (req, res) => {
  res.send('Ini adalah route GET!');
});
```
Jika kita akses http://localhost:3000/hello, teks tersebut akan tampil di browser.

### `POST`
Route POST biasanya digunakan untuk mengirimkan data dari client ke server.
```js
app.post('/submit', (req, res) => {
  res.send('Data berhasil diterima!');
});
```
Catatan:
Jika menggunakan body JSON, pastikan app menggunakan middleware:
```js
app.use(express.json());
```

### `PUT`
Digunakan untuk memperbarui seluruh data.
```js
app.put('/update', (req, res) => {
  res.send('Data berhasil diperbarui!');
});
```

### `DELETE`
Digunakan untuk menghapus data.
```js
app.delete('/delete', (req, res) => {
  res.send('Data berhasil dihapus!');
});
```

### Mengirim Response JSON
Selain `res.send()`, Express juga mendukung `res.json()` untuk mengirim data format JSON.
```js
app.get('/json', (req, res) => {
  res.json({
    message: 'Hello dari JSON!',
    status: 'success'
  });
});
```

### Route Dasar dengan Status Code
Mengirimkan response dengan status tertentu
```js
app.get('/status', (req, res) => {
  res.status(201).json({ message: 'Created!' });
});
```

### Menangani Semua HTTP Method
Express dapat menerima semua HTTP method menggunakan `all()`
```js
app.all('/all', (req, res) => {
  res.send('Route ini menangani semua method');
});
```

### Menangani Semua URL dengan
Route wildcard (`*`) biasanya digunakan untuk 404
```js
app.all('*', (req, res) => {
  res.status(404).send('Route tidak ditemukan');
});
```