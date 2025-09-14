# FlatList

Komponen **`FlatList`** digunakan untuk menampilkan daftar data dalam jumlah banyak secara **efisien**.  
Berbeda dengan `ScrollView` (yang merender semua item sekaligus), `FlatList` hanya merender item yang terlihat di layar, sehingga lebih hemat memori dan performa.

---

### FlatList Dasar
```ts
import { FlatList, Text, StyleSheet, View } from 'react-native';

const DATA = Array.from({ length: 20 }, (_, i) => ({
  id: i.toString(),
  title: `Item ${i + 1}`,
}));

export default function App() {
  return (
    <FlatList
      data={DATA}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => (
        <View style={styles.item}>
          <Text style={styles.text}>{item.title}</Text>
        </View>
      )}
    />
  );
}

const styles = StyleSheet.create({
  item: {
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  text: {
    fontSize: 18,
  },
});
```


### FlatList Horizontal
```ts
<FlatList
  data={DATA}
  horizontal
  keyExtractor={(item) => item.id}
  renderItem={({ item }) => (
    <View style={{ margin: 10, padding: 20, backgroundColor: '#eee' }}>
      <Text>{item.title}</Text>
    </View>
  )}
/>
```


### Menambahkan Header & Footer
```ts
<FlatList
  data={DATA}
  keyExtractor={(item) => item.id}
  renderItem={({ item }) => (
    <View style={styles.item}>
      <Text style={styles.text}>{item.title}</Text>
    </View>
  )}
  ListHeaderComponent={<Text style={styles.header}>Daftar Item</Text>}
  ListFooterComponent={<Text style={styles.footer}>Akhir List</Text>}
/>
```

### Menambahkan Separator
```ts
<FlatList
  data={DATA}
  keyExtractor={(item) => item.id}
  renderItem={({ item }) => (
    <View style={styles.item}>
      <Text style={styles.text}>{item.title}</Text>
    </View>
  )}
  ItemSeparatorComponent={() => <View style={{ height: 1, backgroundColor: '#ccc' }} />}
/>
```