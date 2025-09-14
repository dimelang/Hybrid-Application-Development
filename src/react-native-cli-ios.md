# Setup Environment React Native CLI – iOS

Setup React Native CLI untuk target Android akan dipisahkan ke dalam beberapa jenis Sistem Operasi:

## macOS

1. Install Node.js dan Java
    - Install Node dan Watchman menggunakan [**Homebrew**](https://brew.sh/)
        ```bash
        brew install node
        brew install watchman
        ```
    - Install [**Xcode**](https://apps.apple.com/us/app/xcode/id497799835?mt=12)
    - Install Xcode Command Line Tools
        Buka Xcode lalu pilih **Settings... (atau Preferences...)** pada menu Xcode. 
        Pilih panel **Locations** lalu pilih versi Command line tools terbaru
        ![Ilustrasi install command line tool Xcode](./assets/install%20command%20line%20tools.png "Ilustrasi install command line tool Xcode")

2. Install iOS simulator
    - Buka Xcode → Settings... → tab Platforms.
    - Pilih "+" dan pilih opsi iOS…
    - Jalankan emulator
