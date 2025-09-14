# Text
`Text` digunakan untuk menampilkan tulisan di layar. Hampir semua teks di aplikasi React Native harus dibungkus dengan komponen ini.

### Text Sederhana
```ts
import { Text, View } from 'react-native';

export default function App() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Hello React Native!</Text>
    </View>
  );
}
```

### Text dengan Styling
```ts
import { Text, View } from 'react-native';

export default function App() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text style={{ fontSize: 24, fontWeight: 'bold', color: 'blue' }}>
        Teks dengan styling
      </Text>
    </View>
  );
}
```

### Multiline Text
```ts
import { Text, View } from 'react-native';

export default function App() {
  return (
    <View style={{ padding: 20 }}>
      <Text>
        Baris pertama{"\n"}
        Baris kedua{"\n"}
        Baris ketiga
      </Text>
    </View>
  );
}
```

### Nested Text
```ts
import { Text, View } from 'react-native';

export default function App() {
  return (
    <View style={{ padding: 20 }}>
      <Text>
        Ini <Text style={{ fontWeight: 'bold' }}>teks tebal</Text> di dalam kalimat.
      </Text>
    </View>
  );
}
```