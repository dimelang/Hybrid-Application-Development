# Navigation

Saat membuat aplikasi mobile, biasanya tidak hanya terdiri atas satu halaman saja. Misalnya aplikasi belanja online: ada halaman beranda, halaman detail produk, halaman keranjang belanja, hingga halaman profil pengguna. Semua halaman ini harus bisa saling terhubung agar pengalaman pengguna berjalan mulus. Bayangkan kalau aplikasi hanya menampilkan satu halaman statis, pengguna pasti akan kesulitan, karena tidak bisa berpindah ke informasi lain. Inilah alasan mengapa navigasi menjadi bagian yang sangat penting dalam pengembangan aplikasi mobile.

Di React Native sendiri, **tidak terdapat navigasi bawaan**. Artinya, diperlukan library tambahan untuk menangani navigasi antar halaman. Library yang paling populer dan direkomendasikan adalah **React Navigation**.

Dengan React Navigation, kita dapat:
- Membuat alur berpindah antar layar dengan Stack Navigation.
- Membuat menu bawah dengan Tab Navigation.
- Membuat menu samping dengan Drawer Navigation.

## Instalasi

Setelah membuat project baru, tambahkan atau install dependencies berikut:
```bash
npm install @react-navigation/native
```

**Expo**
```bash
npx expo install react-native-screens react-native-safe-area-context react-native-gesture-handler react-native-reanimated
```

**React Native CLI**
```bash
npm install react-native-screens react-native-safe-area-context react-native-gesture-handler react-native-reanimated
```

iOS
```bash
npx pod-install ios
```
