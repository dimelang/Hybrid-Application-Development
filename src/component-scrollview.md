# ScrollView

Komponen **`ScrollView`** digunakan untuk membuat area yang dapat digulir (scroll), baik secara **vertikal** maupun **horizontal**.  
Berbeda dengan `FlatList` (yang lebih efisien untuk data besar), `ScrollView` cocok digunakan ketika jumlah elemen **relatif sedikit**.

---

### ScrollView Vertikal Dasar
```ts
import { ScrollView, Text, StyleSheet } from 'react-native';

export default function App() {
  return (
    <ScrollView style={styles.container}>
      {Array.from({ length: 20 }, (_, i) => (
        <Text key={i} style={styles.item}>
          Item {i + 1}
        </Text>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 40,
    padding: 10,
  },
  item: {
    fontSize: 18,
    marginVertical: 10,
  },
});
```

### ScrollView Horizontal
```ts
<ScrollView horizontal style={{ marginTop: 40 }}>
  {Array.from({ length: 10 }, (_, i) => (
    <Text key={i} style={{ fontSize: 18, marginHorizontal: 20 }}>
      Item {i + 1}
    </Text>
  ))}
</ScrollView>
```

### Menambahkan Konten yang Kompleks
```ts
import { ScrollView, View, Text, Image, StyleSheet } from 'react-native';

export default function App() {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Galeri Gambar</Text>
      {Array.from({ length: 5 }, (_, i) => (
        <Image
          key={i}
          source={{ uri: 'https://reactnative.dev/img/tiny_logo.png' }}
          style={styles.image}
        />
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  image: {
    width: 100,
    height: 100,
    marginVertical: 10,
  },
});
```

### Properti Penting ScrollView
- `horizontal` → menggulir secara horizontal.
- `contentContainerStyle` → styling untuk isi konten.
- `showsVerticalScrollIndicator` & `showsHorizontalScrollIndicator` → menampilkan/menyembunyikan scrollbar.
- `refreshControl` → menambahkan fitur pull-to-refresh.
```ts
<ScrollView showsVerticalScrollIndicator={false}>
  {/* konten */}
</ScrollView>
```