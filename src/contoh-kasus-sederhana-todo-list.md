# Contoh Kasus Sederhana (todo list)

Pada bagian ini, kita akan mengimplementasikan seluruh topik yang telah dibahas sejauh ini pada sebuah aplikasi sederhana berupa Todo List API. Program beserta skema database dapat di download [disini](./assets/todolist_app.zip).

## Gambaran Umum Aplikasi

Aplikasi Todo List ini memiliki fitur:

- Register dan login user
- Setiap user memiliki todo masing-masing
- Endpoint todo hanya bisa diakses oleh user yang login

## Arsitektur Aplikasi

Aplikasi ini menerapkan praktik _clean architecture_ sederhana yang terdiri atas:

```bash
project/
│
├── src/
│  ├── config/
│  │  └── db.js → koneksi MySQL
│  │
│  ├── controllers/  → HTTP request handler (interface layer)
│  │  ├── auth.controller.js
│  │  └── task.controller.js
│  │  └── user.controller.js
│  │
│  ├── middlewares/
│  │  ├── auth.js
│  │  └── error_handler.js
│  │  └── validation.js
│  │
│  ├── repositories/  → query SQL (data access layer)
│  │  ├── task.repository.js
│  │  └── user.repository.js
│  │
│  ├── routes/
│  │  ├── auth.routes.js
│  │  └── task.routes.js
│  │  └── user.routes.js
│  │
│  ├── services/  → business logic (domain layer)
│  │  ├── auth.service.js
│  │  └── task.service.js
│  │  └── user.service.js
│  │
│  ├── validation/  → validation rule
│  │  ├── auth.validation.js
│  │  └── task.validation.js
│  │
│  └── app.js → konfigurasi Express
│
└── index.js → entry point server
```

## Database

Database digunakan untuk menyimpan data utama aplikasi, yaitu: User dan Task. Konfigurasi database dapat dilihat pada file `src/configs/db.js` dimana nilainya diambil dari variable environment yang telah ditetapkan pada file `.env`.

## Controllers

Controller bertugas sebagai interface layer yang berhubungan langsung dengan HTTP request dan response. Pada aplikasi ini, Controller bertugas untuk:

- Menerima input dari client
- Memanggil `Services` yang sesuai
- Mengembalikan response ke client

## Middlewares

Middleware digunakan untuk memproses request sebelum sampai ke controller. Pada aplikasi ini, middleware digunakan untuk:

- Autentikasi JWT (file `auth.js`) yang memastikan bahwa endpoint tertentu hanya dapat diakses oleh user yang sudah login.
- Validasi input (file `validation.js`) yang menangani validasi dan mengirim response error ke client.
- Penanganan error (file `error_handler.js`).

## Repositories

Repository bertanggung jawab pada akses data dengan tugas utama yaitu menjalankan query SQL.

## Routes

Routes mendefinisikan:

- Endpoint yang tersedia
- HTTP method
- Middleware yang digunakan
- Controller yang menangani request

Melalui routes, kita dapat melihat dengan jelas:

- Endpoint mana yang protected
- Endpoint mana yang membutuhkan autentikasi

## Services

Service berisi business logic utama aplikasi dan juga menjadi penghubung antara controller dan repository. Layer ini bertugas untuk:

- Proses login user
- Transformasi data
- Validasi kepemilikan todo
- Mengatur alur autentikasi

## Validators

Validator digunakan untuk:

- Memastikan data request sesuai aturan
- Menghindari data tidak valid masuk ke sistem
- Menjaga konsistensi input

Validasi dilakukan sebelum request diproses lebih lanjut.

Untuk menggunakan aplikasi ini, cukup ekstrak dan import database MySQL. Setelah itu, pada folder project, jalankan perintah berikut untuk meng-_install_ seluruh dependency.

```bash
npm install
```

Jalankan program express melalui perintah

```bash
npm run dev
```
