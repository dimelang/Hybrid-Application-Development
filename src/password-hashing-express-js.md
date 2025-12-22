# Password Hashing

Pada bagian ini, kita akan fokus pada cara menyimpan password dengan aman menggunakan `bcrypt`. Materi ini menjadi fondasi penting sebelum masuk ke proses login dan JWT authentication.

Menyimpan password dalam bentuk **plaintext** adalah kesalahan fatal karena:

- Jika database bocor, semua akun ikut bocor
- User sering menggunakan password yang sama di banyak layanan

Mengatasi masalah di atas, kita dapat menggunakan hashing. Hashing adalah proses mengubah data menjadi string acak dengan karakteristik:

- Tidak bisa dikembalikan ke bentuk semula (one-way)
- Input yang sama selalu menghasilkan hash yang sama
- Sedikit perubahan input menghasilkan hash yang sangat berbeda

`bcrypt` adalah library hashing yang dirancang khusus untuk password.

## Instalasi

```bash
npm install bcrypt
```

## Hashing Password Menggunakan `bcrypt`

```js
const bcrypt = require("bcrypt");

const password = "password123";
const saltRounds = 10;
const hashedPassword = await bcrypt.hash(password, saltRounds);
```

Penjelasan:

- `password`: password asli dari user
- `saltRounds`: tingkat kompleksitas (semakin besar, semakin aman tapi lambat)
- `hashedPassword`: hasil hash yang akan disimpan

## Verifikasi Password

```js
const email = "example@mail.com";
const passwordInput = "password123";
const user = await userRepository.findByEmail(email);
const isMatch = await bcrypt.compare(passwordInput, user.password);
```

Penjelasan:

- `passwordInput`: input user
- `user.password`: hash dari database
- `isMatch`: true atau false
