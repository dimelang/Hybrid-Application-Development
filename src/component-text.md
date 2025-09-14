# Text
`Text` digunakan untuk menampilkan tulisan di layar. Hampir semua teks di aplikasi React Native harus dibungkus dengan komponen ini.

### Text Sederhana
```ts
import { Text, View } from 'react-native';

<View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
  <Text>Hello React Native!</Text>
</View>
```

### Text dengan Styling
```ts
import { Text, View } from 'react-native';

<Text style={{ fontSize: 24, fontWeight: 'bold', color: 'blue' }}>
  Teks dengan styling
</Text>
```

### Multiline Text
```ts
import { Text, View } from 'react-native';

<Text>
  Baris pertama{"\n"}
  Baris kedua{"\n"}
  Baris ketiga
</Text>
```

### Nested Text
```ts
import { Text, View } from 'react-native';

<Text>
  Ini <Text style={{ fontWeight: 'bold' }}>teks tebal</Text> di dalam kalimat.
</Text>
```