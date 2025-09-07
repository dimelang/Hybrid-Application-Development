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