# Pendahuluan

## Apa itu React Native?
React Native adalah **framework open-source** yang dikembangkan oleh **Meta (Facebook)** untuk membangun aplikasi mobile **Android** dan **iOS** menggunakan bahasa pemrograman **JavaScript** atau **TypeScript**.  
Dengan React Native, developer dapat menulis satu basis kode dan menjalankannya di berbagai platform tanpa harus menulis kode terpisah untuk Android (Java/Kotlin) dan iOS (Objective-C/Swift).

---

## Mengapa React Native?
Beberapa alasan mengapa React Native populer di kalangan developer:

1. **Cross-Platform**  
   Satu kode bisa berjalan di Android dan iOS.

2. **Performance Lebih Baik dibanding Hybrid Webview**  
   React Native menggunakan komponen native, bukan sekadar membungkus aplikasi web.

3. **Hot Reloading & Fast Refresh**  
   Mempercepat proses pengembangan karena perubahan kode bisa langsung dilihat tanpa build ulang penuh.

4. **Ekosistem & Komunitas Besar**  
   Banyak library, tutorial, dan komunitas aktif.

5. **Dukungan TypeScript**  
   Menjadikan aplikasi lebih aman dan maintainable.

---

## Arsitektur Dasar React Native
Secara garis besar, arsitektur React Native terdiri dari:
- **JavaScript Layer** → tempat kode aplikasi ditulis (JS/TS).
- **Bridge** → penghubung antara JavaScript dan kode native.
- **Native Layer** → komponen asli Android/iOS (misalnya `View`, `Text`, `Button`).

---

## Perbedaan React Native dengan Framework Lain
- **Flutter** → menggunakan bahasa Dart dan rendering engine sendiri.  
- **Ionic / Cordova** → berbasis WebView.  
- **React Native** → menggunakan komponen asli (native component) sehingga performa lebih dekat ke aplikasi native.

---


## Kebutuhan Backend untuk Aplikasi Mobile
Aplikasi mobile modern biasanya membutuhkan backend untuk menangani:
1. **Autentikasi pengguna**
   Login, register, refresh token, otorisasi.
2. **Penyimpanan data**
   Menyimpan data pengguna, transaksi, preferensi, dsb.
3. **Sinkronisasi antar perangkat**
   Contoh: data TODO yang sama muncul di Android atau iOS.
4. **Pengolahan data di server**
   Validasi, filtering, aggregasi, perhitungan, dan business logic lainnya.
5. **Integrasi dengan layanan eksternal**
   Pembayaran, notifikasi, cloud storage, dan sebagainya.

Untuk memenuhi kebutuhan ini, kita memerlukan backend API yang cepat, fleksibel, dan mudah dipelajari.

Express.js adalah framework backend Node.js yang ringan, cepat, dan sangat populer. Beberapa alasan Express sering dipilih sebagai backend aplikasi React Native:
1. **Bahasa yang sama**
   Backend dan frontend sama-sama menggunakan JavaScript/TypeScript → lebih mudah dipelajari.
2. **Ringan dan fleksibel**
   Tidak terlalu opiniated sehingga cocok untuk aplikasi kecil hingga besar.
3. **Ekosistem luas**
   Banyak library untuk autentikasi, database, upload file, logging, dsb.
4. **Mudah diintegrasikan dengan mobile apps**
   API yang dibangun dengan Express sangat mudah dipanggil dari React Native menggunakan fetch atau axios.
5. **Digunakan di industri**
   Banyak perusahaan menggunakan stack React Native + Express.js + MongoDB/PostgreSQL.