# Event Handling

Pada dasarnya, event handling adalah mekanisme untuk menangani aksi yang dilakukan pengguna, seperti menekan tombol, mengetik teks, atau melakukan scroll. Di React Native, event handling dilakukan dengan cara menghubungkan sebuah event handler (fungsi) dengan properti event dari suatu komponen. Secara umum, ada beberapa kategori event yang sering dipakai:

**1. Event pada komponen interaktif (tombol, touchable)**
- `onPress` → saat komponen ditekan (Button, TouchableOpacity, Pressable).
- `onLongPress` → saat ditekan lama.
- `onPressIn` dan `onPressOut` → saat jari menyentuh & melepas.

**2. Event pada input teks**
- `onChangeText` → saat teks berubah.
- `onFocus` → saat input aktif (fokus).
- `onBlur` → saat input kehilangan fokus.
- `onSubmitEditing` → saat user menekan tombol submit/enter.

**3. Event pada list / scroll**
- `onScroll` → saat daftar/scrollview digulir.
- `onEndReached` (FlatList/SectionList) → saat mendekati akhir daftar.
- `onRefresh` → saat user menarik ke bawah (pull to refresh).

**4. Event gesture / sentuhan**
- `onTouchStart`, `onTouchMove`, `onTouchEnd` → event dasar sentuhan.
- Jika pakai `PanResponder` atau library react-native-gesture-handler, bisa dapat event lebih kompleks seperti swipe, drag, fling.

**5. Event pada image & media**
- `onLoad` dan `onError` (Image) → saat gambar berhasil/gagal dimuat.
- `onLoadStart` dan `onLoadEnd` → progres load gambar.


## Contoh Event Handling 1
```jsx
// App.tsx
import { useState } from "react";
import { View, Text, Button, StyleSheet } from "react-native";

export default function App() {
  const [count, setCount] = useState(0);

  const handlePress = () => {
    setCount(count + 1); // setiap kali tombol ditekan, count bertambah
  };

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Jumlah klik: {count}</Text>
      <Button title="Klik Saya" onPress={handlePress} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    fontSize: 20,
    marginBottom: 20,
  },
});
```
Pada contoh di atas, event `onPress` dari komponen `Button` dipasangkan dengan fungsi `handlePress`. Setiap kali tombol ditekan, state `count` akan bertambah satu, dan perubahan state ini akan langsung di-*rerender* pada teks yang ditampilkan.


## Contoh Event Handling 2
```jsx
// App.tsx
import { useState } from "react";
import { View, Text, TextInput, StyleSheet } from "react-native";

export default function App() {
  const [name, setName] = useState("");

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Ketik nama Anda"
        onChangeText={(text) => setName(text)}
      />
      <Text style={styles.text}>Halo, {name}!</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 10,
    width: 200,
    marginBottom: 20,
  },
  text: {
    fontSize: 18,
  },
});
```
Di sini, setiap kali pengguna mengetik, event `onChangeText` akan dijalankan dan memperbarui state name. Tampilan pun otomatis menyesuaikan dengan isi teks terbaru.