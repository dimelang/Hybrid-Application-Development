# Style & Layout

Di React Native, styling dilakukan menggunakan **JavaScript**.  
Kita menggunakan **`StyleSheet`** atau **inline style** untuk mengatur tampilan komponen.  

---

## Inline Style
Cara paling sederhana adalah menuliskan style langsung di properti `style`:

```ts
import { Text, View } from 'react-native';

export default function App() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text style={{ color: 'blue', fontSize: 24 }}>Halo, dunia!</Text>
    </View>
  );
}
```
Cara ini efektif jika komponen tidak memerlukan banyak style.

### Menggunakan StyleSheet
Gunakan StyleSheet.create() untuk menggunakan style yang lebih rapi dan terstruktur.
```ts
import { Text, View, StyleSheet } from 'react-native';

export default function App() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Halo, dunia!</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f2f2f2',
  },
  text: {
    color: 'blue',
    fontSize: 24,
    fontWeight: 'bold',
  },
});
```

### Flexbox untuk Layout
React Native menggunakan Flexbox untuk mengatur tata letak.
Secara default, `flexDirection` di React Native adalah column (berbeda dengan web yang default-nya `row`).

**Flex direction**
```ts
<View style={{ flexDirection: 'row', justifyContent: 'space-around' }}>
  <View style={{ width: 50, height: 50, backgroundColor: 'red' }} />
  <View style={{ width: 50, height: 50, backgroundColor: 'green' }} />
  <View style={{ width: 50, height: 50, backgroundColor: 'blue' }} />
</View>
```

**Flex Grow**
```ts
<View style={{ flex: 1, flexDirection: 'row' }}>
  <View style={{ flex: 1, backgroundColor: 'red' }} />
  <View style={{ flex: 2, backgroundColor: 'green' }} />
  <View style={{ flex: 3, backgroundColor: 'blue' }} />
</View>
```

### Posiitioning
React Native mendukung properti position: `absolute` | `relative`.
```ts
<View style={{ flex: 1 }}>
  <View style={{ width: 100, height: 100, backgroundColor: 'skyblue' }} />
  <View style={{
    width: 50,
    height: 50,
    backgroundColor: 'tomato',
    position: 'absolute',
    top: 30,
    left: 30
  }} />
</View>
```

### Styling Text
```ts
<Text style={{
  fontSize: 20,
  fontWeight: 'bold',
  fontStyle: 'italic',
  textAlign: 'center',
  textDecorationLine: 'underline',
}}>
  Ini contoh teks
</Text>
```


### Styling dengan Array
```ts
<Text style={[styles.text, { color: 'red' }]}>
  Warna teks ini di-override jadi merah
</Text>
```


