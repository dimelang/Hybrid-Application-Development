# Membuat Project Express Pertama

## 1. Membuat Folder Project
Buat folder baru untuk project Express:
```bash
mkdir BelajarExpressJs
cd BelajarExpressJs
```

## 2. Instalasi ExpressJs
Inisialisasi project `Node`:
```bash
npm init -y
```
Perintah ini akan membuat file `package.json` sebagai konfigurasi dasar project.

Selanjutnya, install ExpressJs:
```bash
npm install express
```
Untuk mempermudah proses pengembangan, kita juga dapat menginstal [nodemon](https://nodemon.io/), sebuah tool yang akan me-*restart* server secara otomatis ketika terjadi perubahan kode.
```bash
npm install --save-dev nodemon
```
Tambahkan script berikut pada file `package.json`:
```json
"scripts": {
  "start": "node index.js",
  "dev": "nodemon index.js"
}
```
Dengan menambahkan script `dev`, kita bisa menjalankan server tanpa harus menghentikan dan menjalankan ulang secara manual.
Catatan: `index.js` merupakan file main program dan bisa disesuaikan nantinya. 


## 3. Membuat File Main
Buat file `index.js` lalu isi dengan kode berikut:
```js
const express = require('express');
const app = express();
const PORT = 3000;

// Endpoint dasar
app.get('/', (req, res) => {
  res.send('Hello Express!');
});

// Menjalankan server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
```
Penjelasan singkat:
- `express()` → membuat instance server
- `app.get()` → membuat endpoint GET
- `res.send()` → mengirim response
- `app.listen()` → menjalankan server

## 4. Menjalankan Server
Jalankan command:
```bash
npm run dev
```
Jika berhasil, akan muncul di terminal:
```bash
Server running on http://localhost:3000
```

## 5. Mengakses API
Buka browser atau gunakan tools lain seperti [Postman](https://www.postman.com/) lalu akses url: 
```bash
http://localhost:3000/
```

## 6. Menghentikan Server
Untuk menghentikan server gunakan `CTRL + C` pada terminal yang menjalankan server.
