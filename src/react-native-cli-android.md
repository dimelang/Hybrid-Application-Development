# Setup Environment React Native CLI – Android

Setup React Native CLI untuk target Android akan dipisahkan ke dalam beberapa jenis Sistem Operasi:
## Windows
1. Install Node.js dan Java
    - Unduh **Node.js** (versi LTS) dari [nodejs.org](https://nodejs.org/).  
    - Install **Java JDK** (disarankan versi 11 atau lebih baru).  

Cek instalasi java:
```bash
node -v
java -version
```

2. Install Android Studio
    - Unduh [Android Studio](developer.android.com/studio)
    - Saat instalasi, pastikan mencentang:
        - Android SDK
        - Android SDK Platform
        - Android Virtual Device (AVD)
    - Setelah instalasi, buka Android Studio → SDK Manager → install:
        - Android SDK Platform 33 atau terbaru
        - Google APIs Intel x86 Atom System Image

3. Konfigurasi ANDROID_HOME environment variable
    - Buka **Window Control Panel**
    - Klik **User Accounts**, lalu pilih **Change my environment variables**
    - Klik **New...** untuk membuat user variable baru. Masukkan Variable name **ANDROID_HOME** dan Variable value **Lokasi SDK Android**

    ![Ilustrasi menambahkan environment variable](./assets/env%20variable%20windows.png "Ilustrasi menambahkan environment variable")

    Untuk menemukan lokasi SDK dapat dilakukan melalui **Android Studio**. Pilih **Settings** → **Languages & Frameworks** → **Android SDK**

4. Menjalankan Emulator Android
    - Buka Android Studio → AVD Manager → buat emulator baru (jika belum membuat emulator).
    - Jalankan emulator

## macOS

1. Install Node.js dan Java
    - Install Node dan Watchman menggunakan [**Homebrew**](https://brew.sh/)
        ```bash
        brew install node
        brew install watchman
        ```
    - Install JDK menggunakan [**Homebrew**](https://brew.sh/)
        ```bash
        brew install --cask zulu@17
        brew info --cask zulu@17
        open /opt/homebrew/Caskroom/zulu@17/<version number>
        ```
        Setelah Finder terbuka, Klik double untuk menginstal Azul Zulu JDK 17.pkg.
        
        Tambahkan atau update JAVA_HOME environment variable di ~/.zshrc (or in ~/.bash_profile).

        JDK umunya berada di /Library/Java/JavaVirtualMachines/zulu-17.jdk/Contents/Home. Lalu jalankan command berikut pada terminal

        ```bash
        export JAVA_HOME=/Library/Java/JavaVirtualMachines/zulu-17.jdk/Contents/Home
        ```

2. Install Android Studio
- Unduh [Android Studio](developer.android.com/studio)
- Saat instalasi, pastikan mencentang:
    - Android SDK
    - Android SDK Platform
    - Android Virtual Device (AVD)

- Setelah instalasi, buka Android Studio → SDK Manager → install:
    - Android SDK Platform 33 atau terbaru
    - Google APIs Intel x86 Atom System Image

3. Konfigurasi ANDROID_HOME environment variable
    - Jalankan command terminal berikut
        ```bash
        export ANDROID_HOME=$HOME/Library/Android/sdk
        export PATH=$PATH:$ANDROID_HOME/emulator
        export PATH=$PATH:$ANDROID_HOME/platform-tools
        ```
4. Menjalankan Emulator Android
    - Buka Android Studio → AVD Manager → buat emulator baru (jika belum membuat emulator).
    - Jalankan emulator

## Linux

1. Install Node.js dan Java
    - Install [**Node**](https://nodejs.org/en/download)
    - Install [**JDK**](https://openjdk.org/)

2. Install Android Studio
    - Unduh [Android Studio](developer.android.com/studio)
    - Saat instalasi, pastikan mencentang:
        - Android SDK
        - Android SDK Platform
        - Android Virtual Device (AVD)

- Setelah instalasi, buka Android Studio → SDK Manager → install:
    - Android SDK Platform 33 atau terbaru
    - Google APIs Intel x86 Atom System Image

3. Konfigurasi ANDROID_HOME environment variable
    - Jalankan command terminal berikut
        ```bash
        export ANDROID_HOME=$HOME/Android/Sdk
        export PATH=$PATH:$ANDROID_HOME/emulator
        export PATH=$PATH:$ANDROID_HOME/platform-tools
        ```
4. Menjalankan Emulator Android
    - Buka Android Studio → AVD Manager → buat emulator baru (jika belum membuat emulator).
    - Jalankan emulator

