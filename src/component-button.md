# Button

Komponen **`Button`** digunakan untuk menangani aksi sederhana dari pengguna, misalnya mengirim form atau menavigasi ke halaman lain.  
`Button` bawaan React Native cukup mudah digunakan, tapi terbatas dalam hal kustomisasi tampilan.

---

### Button Dasar
```ts
import { Button, View } from 'react-native';

export default function App() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Button
        title="Klik Saya"
        onPress={() => alert('Tombol ditekan!')}
      />
    </View>
  );
}
```
- `title` → teks yang ditampilkan pada tombol.
- `onPress` → fungsi yang dijalankan ketika tombol ditekan.


### Mengubah Warna Button
```ts
<Button
  title="Tombol Hijau"
  onPress={() => console.log('Hijau')}
  color="green"
/>
```