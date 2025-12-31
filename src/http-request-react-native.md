# HTTP Request

Pada aplikasi mobile modern, hampir semua data berasal dari server. Aplikasi React Native tidak hanya menampilkan tampilan (UI), tetapi juga bertugas untuk mengambil, mengirim, memperbarui, dan menghapus data melalui jaringan menggunakan HTTP request.

HTTP (_Hypertext Transfer Protocol_) adalah protokol komunikasi yang digunakan untuk bertukar data antara client dan server.

- Client: aplikasi React Native
- Server: backend (ExpressJs)
- Media komunikasi: HTTP request & response

React Native tidak langsung mengakses database. Sebagai gantinya, alur komunikasi data biasanya sebagai berikut:

1. React Native mengirim request ke backend API
2. Backend memproses request
3. Backend mengakses database atau layanan lain
4. Backend mengirimkan response ke client
5. React Native menampilkan data ke UI

Sebagian besar backend menggunakan konsep [REST API (Representational State Transfer)](./rest-api-express-js.md) dan mengirimkan data kembali kepada client dalam format JSON.

## HTTP Method

HTTP Method menunjukkan aksi yang ingin dilakukan client terhadap data di server.
| Method | Fungsi |
| ------ | --------------------------- |
| GET | Mengambil data |
| POST | Mengirim / menambahkan data |
| PUT | Memperbarui seluruh data |
| PATCH | Memperbarui sebagian data |
| DELETE | Menghapus data |
Contoh:

- Mengambil daftar user: `GET /users`
- Menambah user baru: `POST /users`
- Menghapus user: `DELETE /users/1`

## HTTP Status Code

Setiap response dari server memiliki status code yang menunjukkan hasil request.
| Kategori | Contoh | Arti |
| -------- | ------------- | --------------------- |
| 2xx | 200, 201 | Request berhasil |
| 4xx | 400, 401, 404 | Kesalahan dari client |
| 5xx | 500 | Kesalahan dari server |
Contoh:

- 200: OK atau data berhasil didapatkan
- 401: Unauthorized atau token tidak valid
- 404: Not Found atau data tidak ditemukan

## Struktur HTTP Request

Secara umum, HTTP request terdiri dari:

- URL (endpoint API)
- Method (GET, POST, dll)
- Header (Content-Type, Authorization, dll)
- Body (opsional, biasanya JSON)

Contoh:

- URL: `/api/users`
- Method: `POST`
- Header: Content-Type: `application/json`
- Body: `{ "name": "Danny" }`

## Struktur HTTP Response

HTTP response dari server biasanya berisi:

- Status code
- Header
- Body (data)

React Native menyediakan beberapa cara untuk melakukan HTTP request, di antaranya

- [Fetch API](./fetch-api-react-native.md)
- [Axios](./axios-react-native.md)
