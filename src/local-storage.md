# Local Storage

Banyak aplikasi membutuhkan mekanisme untuk menyimpan data pada perangkat pengguna bahkan setelah aplikasi ditutup atau perangkat di-*restart*. Tidak seperti `state` atau `context` yang hanya bertahan selama aplikasi berjalan, local storage memungkinkan data disimpan secara persisten.

Contoh penggunaan local storage dalam aplikasi mobile diantaranya:

- menyimpan status login pengguna (misalnya token atau flag "sudah login"),
- menyimpan preferensi atau pengaturan aplikasi (seperti tema dan bahasa),
- menyimpan draft data atau cache,
- menyimpan daftar item sederhana seperti riwayat pencarian, keranjang belanja, atau tema aplikasi.

React Native menyediakan beberapa library untuk penyimpanan data lokal, di antaranya:

1. [**AsyncStorage**](asynchronous-storage.md): penyimpanan key-value sederhana, cocok untuk data kecil seperti token, settings, atau flag boolean.
2. **[SecureStore](secure-store.md)**: menyimpan data sensitif seperti token atau password dengan enkripsi.
3. **[MMKV](mmkv.md)**: solusi key-value storage modern yang sangat cepat dengan performa tinggi.
4. **[SQLite](sqlite.md)**: cocok untuk penyimpanan data kompleks seperti tabel, relasi, atau jumlah data besar.




