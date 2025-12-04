# Route Parameters

Dalam `ExpressJs`, Route Parameters digunakan untuk membuat route yang memiliki bagian URL dinamis. Artinya, sebagian path dapat berubah-ubah, misalnya:

- `/users/10`
- `/users/27`
- `/products/666`

Bagian yang berubah tersebut disebut parameter dan ditulis menggunakan tanda titik dua `:` pada definisi route.

Contoh route parameter sederhana

```js
app.get("/users/:id", (req, res) => {
  const userId = req.params.id;
  res.send(`User dengan ID: ${userId}`);
});
```

Pada contoh di atas:

- `:id` adalah parameter
- `req.params.id` untuk mengambil nilainya

Jika URL yang dipanggil adalah

```yaml
/users/50
```

Maka response-nya

```bash
User dengan ID: 50
```

## Menggunakan Banyak Parameter

Kita mendefinisikan lebih dari satu route parameter

```js
app.get("/products/:category/:id", (req, res) => {
  const { category, id } = req.params;

  res.send(`Kategori: ${category}, Produk ID: ${id}`);
});
```

Contoh pemanggilan

```yaml
/products/electronics/123
```

Response

```bash
Kategori: electronics, Produk ID: 123
```

### Parameter Opsional

Dengan menambahkan tanda `?,` parameter menjadi opsional

```js
app.get("/hello/:name?", (req, res) => {
  const name = req.params.name || "Guest";
  res.send(`Hello, ${name}!`);
});
```

Contoh URL valid:

- `/hello` -> response
  ```bash
  Hello
  ```
- `/hello/Admin` -> response
  ```bash
  Hello Admin
  ```
