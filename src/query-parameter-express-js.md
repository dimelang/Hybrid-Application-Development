# Query Parameters

Query Parameters adalah nilai yang dikirimkan melalui URL dengan format

```yaml
url?key_1=value_1&key_2=value_2
```

Query parameter **tidak berada di path**, melainkan berada setelah tanda tanya `?`, dan dapat memiliki banyak pasangan `key=value` yang dipisahkan oleh `&`.

Contoh URL

```yaml
/search?keyword=music&limit=10
```

Pada `ExpressJs`, query parameters dapat diakses menggunakan `req.query`

### Contoh Query Parameters

```js
app.get("/search", (req, res) => {
  const { keyword, limit } = req.query;
  res.send(`Mencari: ${keyword}, batas: ${limit}`);
});
```

Jika diakses

```yaml
/search?keyword=express&limit=5
```

Response

```bash
Mencari: express, batas: 5
```

### Query Parameters untuk Filtering Data

```js
app.get("/products", (req, res) => {
  const { category, sort, page } = req.query;
  res.json({
    message: "Filter produk",
    category,
    sort,
    page,
  });
});
```

Jika diakses

```yaml
/products?category=furniture&sort=asc&page=2
```

Response

```json
{
  "message": "Filter produk",
  "category": "furniture",
  "sort": "asc",
  "page": "2"
}
```

### Query Parameters dengan Nilai Array

Express secara otomatis mengubah query parameter berulang menjadi array

```yaml
/products?tag=promo&tag=discount
```

```js
app.get("/products", (req, res) => {
  res.json(req.query.tag);
});
```

Output:

```yaml
["promo", discount]
```

### Menggabungkan Route & Query Parameters

```js
app.get("/users/:id", (req, res) => {
  res.json({
    id: req.params.id,
    status: req.query.status,
  });
});
```

Jika diakses

```yaml
/users/7?status=true
```

Response

```json
{
  "id": "7",
  "status": "true"
}
```
