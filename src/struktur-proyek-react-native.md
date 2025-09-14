# Struktur Proyek React Native

Setelah membuat project baru, struktur folder akan sedikit berbeda tergantung apakah kita menggunakan React Native CLI atau Expo. Dengan memahami struktur proyek, kita bisa tahu mana bagian yang sering kita edit dan mana yang biasanya tidak perlu disentuh.

1. Struktur Proyek (React Native CLI)

    Contoh hasil dari `npx @react-native-community/cli@latest init MyFirstApp`
    ```bash
    HelloWorldApp/
    ├── android/            # kode native untuk Android (Java/Kotlin)
    ├── ios/                # kode native untuk iOS (Objective-C/Swift)
    ├── node_modules/       # dependency project (otomatis dibuat oleh npm/yarn)
    ├── App.js              # file utama aplikasi (entry point React)
    ├── index.js            # entry point aplikasi ke native (registrasi root component)
    ├── package.json        # daftar dependency & script project
    └── metro.config.js     # konfigurasi Metro bundler
    ```
    Penjelasan singkat file/folder penting:
    - `App.tsx`: komponen utama aplikasi (tempat kita menulis kode React Native).
    - `index.js`: menghubungkan komponen React Native (`App`) ke aplikasi native (Android/iOS).
    - `android/`: kode native untuk Android (bisa edit langsung kalau perlu modul custom).
    - `ios/`: kode native untuk iOS.
    - `package.json`: daftar library & script seperti `npm start`, `npm run android`.
    - `metro.config.js`: konfigurasi Metro bundler.

2. Struktur Proyek (Expo)

    Contoh hasil dari `npx create-expo-app@latest`
    ```bash
    HelloWorldApp/
    ├── node_modules/       # dependency project
    ├── App.js              # file utama aplikasi
    ├── package.json        # daftar dependency & script project
    └── app.json            # konfigurasi Expo (nama app, icon, splash screen, dsb.)

    ```
    Penjelasan singkat file/folder penting:
    - `App.tsx`: komponen utama aplikasi (entry point React).
    - `app.json`: konfigurasi Expo (nama app, ikon, orientasi layar, dll).
    