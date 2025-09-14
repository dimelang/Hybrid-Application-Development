# React Native CLI

Setelah environment selesai di-setup, mari kita coba membuat aplikasi pertama kita menggunakan React Native CLI.

1. Membuat Project Baru
    ```bash
    npx @react-native-community/cli@latest init MyFirstApp
    ```

    Jika sebelumnya sudah pernah menginstal react-native-cli secara global, jalankan command terminal berikut unutk mencegah kesalahan 
    ```bash
    npm uninstall -g react-native-cli @react-native-community/cli
    ```
2. Start Metro
    [Metro](https://metrobundler.dev/) merupakan tool build berbasis JavaScript. Jalankan terminal command berikut untuk menjalankan Metro
    ```bash
    npm start
    ```
3. Jalankan Aplikasi
    Buka terminal baru lalu jalankan terminal command berikut untuk menjalankan aplikasi React Native
    ```bash
    npm run android
    ```
    atau
    ```bash
    npm run ios // hanya pada macOS
    ```
    Aplikasi akan berjalan di emulator
