# Routing

Routing adalah konsep dasar dalam `ExpressJs` yang digunakan untuk menentukan bagaimana server merespons suatu *request* dari client berdasarkan HTTP method dan URL path.

Dengan routing, kita dapat mengatur endpoint seperti:
- `GET /users`
- `POST /login`
- `PUT /products/:id`
- `DELETE /posts/:id`

Routing menjadi fondasi utama dalam membangun RESTful API.

Contoh route dasar di Express:
```js
app.get('/hello', (req, res) => {
  res.send('Hello World!');
});
```

## HTTP Methods yang Didukung Express
| Method     | Keterangan                |
| ---------- | ------------------------- |
| **GET**    | Mengambil data            |
| **POST**   | Mengirim data baru        |
| **PUT**    | Mengupdate data (replace) |
| **PATCH**  | Mengupdate sebagian data  |
| **DELETE** | Menghapus data            |
