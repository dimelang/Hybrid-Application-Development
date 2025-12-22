# Authentication

Autentikasi adalah proses untuk memverifikasi identitas user. Dalam aplikasi backend, autentikasi umumnya dilakukan dengan mencocokkan kredensial (email & password) lalu memberikan token yang digunakan pada request berikutnya.

Pada bagian ini, kita akan membangun sistem autentikasi menggunakan `bcrypt` dan `JSON Web Token`.

## Konsep Dasar Autentikasi

Secara umum, alur autentikasi khususnya menggunakan skema JWT token adalah sebagai berikut:

1. User melakukan registrasi dengan email dan password
2. Password di-_hash_ menggunakan `bcrypt`
3. Data user disimpan ke database
4. User melakukan login
5. Server memverifikasi email dan password
6. Jika valid, server mengirimkan JWT token
7. JWT dikirim kembali oleh client pada request selanjutnya
8. Backend memverifikasi token sebelum mengakses resource
