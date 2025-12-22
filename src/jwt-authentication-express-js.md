# JWT Authentication

Setelah password berhasil diverifikasi menggunakan `bcrypt`, langkah selanjutnya adalah memberikan identitas kepada user agar backend dapat mengenali user pada request berikutnya. Pada bagian ini, kita akan menggunakan JSON Web Token (JWT) sebagai mekanisme autentikasi.

JWT (_JSON Web Token_) adalah token berbentuk string yang digunakan untuk merepresentasikan identitas user secara aman.

Contoh JWT:

```yaml
xxxxx.yyyyy.zzzzz
```

JWT terdiri dari tiga bagian:

1. Header memuat informasi algoritma & tipe token
2. Payload memuat data (claim) yang disimpan
3. Signature memuat tanda tangan untuk memastikan token tidak dimodifikasi

JWT bersifat stateless, artinya backend tidak perlu menyimpan session.

## Instalasi

```bash
npm install jsonwebtoken
```

## Membuat JWT

JWT biasanya baru dibentuk setelah user berhasil melakukan login.

```js
const jwt = require("jsonwebtoken");

const payload = {
  id: user.id,
  email: user.email,
};

const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "1h" });
```

Penjelasan:

- payload: data yang akan disimpan di token. Pada contoh di atas adalah id dan email user.
- JWT*SECRET: secret key untuk menandatangani token. Biasanya disimpan pada file `.env` (\_variable environment*)
- expiresIn: masa berlaku token

Jangan menyimpan data sensitif seperti password di dalam payload JWT.

Token yang dibentuk kemudian dikirim ke client sebagai _response_. Client wajib menyimpan token ini dan mengirimkannya kembali pada request selanjutnya. Client dapat mengirim JWT bersama request tertentu dengan cara tambahkan token dengan format berikut pada HTTP Header.

```yaml
Authorization: Bearer <token>
```

Contoh:

```json
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwidXNlcm5hbWUiOiJEaW1hcyIsImVtYWlsIjoiZGltYXNAbWFpbC5jb20iLCJyb2xlIjoiR1VFU1QiLCJpYXQiOjE3NjYzMjIyMDcsImV4cCI6MTc2NjMyNTgwN30.rlxVaCreLp1oYTZYuJDnYAdvFEUVDzNLrjx-1IjjeCE
```

## Verifikasi JWT

Untuk memverifikasi JWT, kita menggunakan jwt.verify. Proses ini biasanya dilakukan di middleware.

```js
const decoded = jwt.verify(token, process.env.JWT_SECRET);
```

Jika token:

- Valid maka payload dikembalikan
- Tidak valid / expired mengembalikan error
