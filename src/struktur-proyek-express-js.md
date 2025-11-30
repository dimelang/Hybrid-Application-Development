# Struktur Project

Setelah membuat project Express dasar, langkah selanjutnya adalah memahami bagaimana cara menyusun struktur folder yang rapi, terorganisir, dan mudah dikembangkan. Struktur folder sangat penting terutama ketika API semakin besar dan memiliki banyak endpoint.

Pada bagian ini kita akan membahas struktur minimal untuk project Express serta penjelasan per masing-masing folder/file.

## 1. Struktur Sederhana untuk Project Kecil
Untuk project sederhana (misalnya API untuk belajar dasar Express), struktur yang umum digunakan adalah:
```bash
project-folder/
├── node_modules/
├── index.js
├── package.json
└── package-lock.json
```
Struktur ini hanya cocok untuk aplikasi kecil. Namun untuk API yang memiliki banyak route, controller, middleware, dan model. Kedepannya kita pasti akan membutuhkan struktur yang lebih modular. Berikut adalah contoh struktur proyek yang lebih modular
```bash
project-folder/
├── node_modules/
├── src/
│   ├── routes/
│   │   └── user.routes.js
│   ├── controllers/
│   │   └── user.controller.js
│   ├── middlewares/
│   │   └── auth.middleware.js
│   ├── config/
│   │   └── db.js
│   └── app.js
├── index.js
├── package.json
└── package-lock.json
```

## 2. Tips Menyusun Struktur Project
-   Pisahkan route dan controller agar file tidak terlalu besar.
-   Semua konfigurasi sebaiknya ada dalam folder `/config`.
-   Gunakan folder `/services` jika API mulai kompleks.
-   Middleware jangan digabungkan dengan controller.
-   Simpan file statis (jika ada) dalam folder `public/`.

## 3. Kapan Harus Memperluas Struktur?
Gunakan struktur modular jika:
- API memiliki banyak endpoint
- Ketika menggunakan database
- Perlu auth, middleware, validation
- Project akan dikembangkan oleh tim

Untuk materi lanjutan, kita akan menggunakan struktur modular ini agar lebih terorganisir.