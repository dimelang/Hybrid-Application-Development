# Validasi Input

Validasi input merupakan proses penting dalam pengembangan aplikasi backend untuk memastikan bahwa data yang dikirim oleh client benar-benar sesuai dengan yang diharapkan oleh server. Proses ini dilakukan sebelum data diproses lebih lanjut atau disimpan ke dalam database.

Dengan validasi input, aplikasi dapat memastikan bahwa data yang diterima:

- Memiliki format yang benar
- Tidak kosong jika wajib diisi
- Sesuai dengan aturan bisnis
- Aman sebelum diproses atau disimpan ke database

Tanpa validasi yang baik, aplikasi berisiko menerima data tidak valid yang dapat menyebabkan error, inkonsistensi data, hingga celah keamanan.

Dalam aplikasi Express, data dari client dapat dikirim melalui beberapa bagian request, yaitu `req.body`, `req.params`, dan `req.query`. Semua sumber data tersebut perlu divalidasi, karena seluruhnya berasal dari input eksternal.

Validasi input sebenarnya dapat dilakukan secara manual menggunakan kondisi `if`, misalnya:

```js
if (!req.body.email) {
  return res.status(400).json({ message: "Email wajib diisi" });
}
```

Pendekatan ini masih dapat diterima untuk aplikasi yang sangat kecil. Namun, pendekatan ini kurang direkomendasikan untuk aplikasi berskala menengah hingga besar. Oleh karena itu, Express menyediakan kemudahan integrasi dengan library pihak ketiga. Salah satu library yang paling umum dan direkomendasikan adalah [express-validator](https://express-validator.github.io/docs). `express-validator` merupakan middleware berbasis `validator.js` yang terintegrasi langsung dengan Express.

## Instalasi

Untuk mulai menggunakan `express-validator`, instal terlebih dahulu library-nya:

```bash
npm install express-validator
```

Setelah instalasi selesai, kita dapat langsung menggunakan `express-validator` sebagai middleware pada route Express untuk melakukan validasi input.

## Konsep Dasar Validasi

Validasi pada Express umumnya terdiri dari dua bagian:

1. Aturan validasi (validation rules)
2. Handler hasil validasi (menangani error validasi)

express-validator menyediakan fungsi `body`, `param`, dan `query` untuk mendefinisikan aturan validasi.

## Membuat Aturan Validasi

Buat file `validators/task.validator.js`:

```js
const { body } = require("express-validator");

exports.createTaskValidation = [
  body("title").notEmpty().withMessage("Title tidak boleh kosong"),

  body("description")
    .optional()
    .isString()
    .withMessage("Description harus berupa string"),
];
```

Penjelasan:

- `body("title")`: mengambil data dari req.body.title
- `notEmpty()`: field tidak boleh kosong
- `withMessage()`: pesan error kustom
- `optional()`: field boleh tidak dikirim

Rule lainnya dapat dilihat pada [laman ini](https://express-validator.github.io/docs/api/validation-chain/)

## Menangani Hasil Validasi

Aturan validasi yang dibuat menggunakan express-validator tidak otomatis menghentikan request ketika terjadi kesalahan. Express hanya akan mencatat hasil validasi tersebut. Oleh karena itu, kita membutuhkan satu middleware tambahan untuk:

- Mengumpulkan hasil validasi
- Mengecek apakah terdapat error
- Menghentikan request jika validasi gagal
- Meneruskan request jika validasi berhasil

Middleware inilah yang akan melakukan tugas di atas.

**src/middleware/validate.js**

```js
const { validationResult } = require("express-validator");

const validate = (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      message: "Validasi gagal",
      errors: errors.array(),
    });
  }
  next();
};

module.exports = validate;
```

Cara Kerja Middleware validate

1. `validationResult(req)` mengambil seluruh hasil validasi yang sebelumnya dijalankan
2. Jika terdapat error:
   - Request dihentikan
   - Server mengirim response status `400`
   - Daftar error dikirim ke client
3. Jika tidak ada error:
   - `next()` dipanggil
   - Request diteruskan ke request handler

## Validasi body request

Misalnya kita memiliki endpoint untuk task baru dan ingin memastikan:

- `username` wajib diisi.
- `email ` harus berupa email yang valid.

**src/validators/user.validation.js**

```js
const { body } = require("express-validator");

exports.createUserValidator = [
  body("username").notEmpty().withMessage("Username wajib diisi"),
  body("email").isEmail().withMessage("Format email tidak valid"),
];
```

Penjelasan:

- `body("username")` mengambail nilai dari `req.body.username`.
- `body("email")` mengambil nilai dari `req.body.email`.
- `.notEmpty()` memastikan nilainya tidak kosong.
- `.isEmail()` memastikan format email valid.
- `withMessage()` menentukan pesan error jika validasi gagal.

Selanjutnya, tambahkan validator beserta middleware ke dalam route

**src/routes/user.routes.js**

```js
const { createUserValidator } = require("../validators/user.validation");
const validateMiddleware = require("../middlewares/validate");

router.post("/users", createUserValidator, validateMiddleware, (req, res) => {
  res.json({ message: "User berhasil dibuat" });
});
```

Selain melakukan validasi terhadap objek `req.body`, `express-validator` juga memungkinkan untuk memvalidasi parameter URL dan Query parameter.

## Validasi Parameter URL

Untuk endpoint seperti:

```yaml
GET /users/:id
```

Kita dapat memvalidasi parameter `id` sebagai berikut:

```js
const { param } = require("express-validator");

exports.userIdValidator = [
  param("id").isInt().withMessage("ID harus berupa angka"),
];
```

Penjelasan:

- `param("id")` mengambail nilai dari `req.params.id`.
- `isInt()` memastikan parameter berupa angka.
- `withMessage()` menentukan pesan error jika validasi gagal.

## Validasi Query Parameter

Query parameter biasanya digunakan untuk kebutuhan seperti filtering, sorting, atau pagination.

Contoh endpoint:

```yaml
GET /users?search=John&status=true
```

Kita dapat memvalidasi query sebagai berikut:

```js
const { query } = require("express-validator");

exports.userQueryValidator = [
  query("search")
    .optional()
    .trim()
    .notEmpty()
    .withMessage("Search tidak boleh kosong"),

  query("status").optional().isBoolean().withMessage("Status harus boolean"),
];
```

Penjelasan:

- `query("search")` mengambil nilai dari req.query.search
- `optional()` menandakan bahwa parameter tidak wajib
- `trim()` menghapus spasi di awal dan akhir
- `isBoolean()` memastikan nilai berupa boolean
