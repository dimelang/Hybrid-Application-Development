# Pengenalan TypeScript {#type-script-intro}

## Apa itu TypeScript?
TypeScript adalah superset dari JavaScript yang artinya seluruh kode JavaScript valid bisa dijalankan di TypeScript, tapi TypeScript menambahkan fitur baru, yang paling penting adalah static typing.

Dengan TypeScript, kita bisa menentukan tipe data untuk variabel, fungsi, maupun objek, sehingga kesalahan bisa dicegah sejak proses pengembangan (compile time), bukan saat aplikasi sudah berjalan (runtime).  

## Mengapa TypeScript Dibutuhkan?
JavaScript sangat fleksibel (loosely typed), tapi justru karena itu sering menimbulkan bug yang sulit dilacak. Misalnya:
```js
let age = 25;
age = "dua puluh lima"; // JavaScript tidak error
```
Kalau kode di atas berjalan di aplikasi besar, bisa menimbulkan error tidak terduga.
Dengan TypeScript:
```ts
let age: number = 25;
age = "dua puluh lima"; // ❌ Error saat compile
```
Dengan demikian, menggunakan typescript, kesalahan dapat terdeteksi lebih awal.

### Keunggulan yang dimiliki oleh TypeScript:
1. **Type safety**, kode lebih aman karena ada pemeriksaan tipe.
2. **Autocompletion**, beberap editor bisa memberi saran kode yang lebih akurat.
3. **Lebih mudah dipelihara**, terutama di proyek besar dengan banyak developer.
4. **Mendukung fitur modern JavaScript**, TypeScript selalu up-to-date dengan ECMAScript terbaru.
5. **Kompatibel dengan JavaScript**, kode JS bisa langsung dipakai di TS.

## Instalasi 
Sebelum menggunakan TypeScript, pastikan di komputer teman-teman sudah menginstal [Node.js](https://nodejs.org/en/download). Untuk memastikan **Node.js** sudah berhasil diinstal, silahkan jalankan perintah berikut di dalam terminal/CMD.

```
node -v
```
Hasilnya adalah versi dari **Node.js** yang diinstal. Selanjutnya, lakukan instalasi TypeScript melalui *npm*. Jalankan perintah berikut untuk menginstal TypeScript secara *global*.

```
npm install -g typescript
```
