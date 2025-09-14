# Image

Komponen **`Image`** digunakan untuk menampilkan gambar di aplikasi React Native.  
Gambar dapat berasal dari **lokal** (disimpan di dalam project) maupun dari **URL**.

---

## 1. Menampilkan Image dari Lokal

Simpan file gambar, misalnya `logo.png`, di dalam folder `assets/`.

```ts
import { Image, View } from 'react-native';

<View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
    <Image
    source={require('./assets/logo.png')}
    style={{ width: 100, height: 100 }}
    />
</View>
```


### Menampilkan Image dari URL
```ts
import { Image, View } from 'react-native';

<Image
    source={{ uri: 'https://reactnative.dev/img/tiny_logo.png' }}
    style={{ width: 100, height: 100 }}
/>
```

### Mengatur Ukuran dan Styling
```ts
<Image
  source={require('./assets/logo.png')}
  style={{
    width: 120,
    height: 120,
    borderRadius: 60,
    borderWidth: 2,
    borderColor: 'blue',
  }}
/>
```

### ResizeMode
`Image` memiliki properti resizeMode untuk mengatur cara gambar ditampilkan:
- `cover` (default) → gambar memenuhi container dengan cropping jika perlu.
- `contain` → gambar menyesuaikan agar seluruh gambar terlihat.
- `stretch` → gambar diregangkan agar sesuai dengan ukuran container.
- `repeat` → gambar diulang-ulang.
- `center` → gambar ditampilkan sesuai ukuran asli di tengah.
```ts
<Image
  source={{ uri: 'https://reactnative.dev/img/tiny_logo.png' }}
  style={{ width: 200, height: 100 }}
  resizeMode="contain"
/>
```

### Background Image dengan `ImageBackground`
```ts
import { ImageBackground, Text, StyleSheet } from 'react-native';

export default function App() {
  return (
    <ImageBackground
      source={{ uri: 'https://reactnative.dev/img/tiny_logo.png' }}
      style={styles.background}
    >
      <Text style={styles.text}>Teks di atas gambar</Text>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    color: 'white',
    fontSize: 24,
    fontWeight: 'bold',
  },
});
```