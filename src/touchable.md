# Touchable

Komponen `Touchable` di React Native digunakan untuk membuat area yang bisa ditekan (pressable area).
Berbeda dengan [`Button`](component-button.md) bawaan yang terbatas dalam kustomisasi, `Touchable` memberikan fleksibilitas penuh untuk membuat tombol dengan gaya dan isi sesuai kebutuhan (misalnya teks, ikon, atau gambar).

React Native menyediakan beberapa varian Touchable seperti:
- `TouchableOpacity`
- `TouchableHighlight`
- `TouchableWithoutFeedback`

## TouchableOpacity
```javascript
import { Text, View, TouchableOpacity, Alert } from 'react-native';

export default function App() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <TouchableOpacity
        onPress={() => Alert.alert('Tombol ditekan!')}
        style={{
          backgroundColor: '#4CAF50',
          paddingVertical: 12,
          paddingHorizontal: 20,
          borderRadius: 8,
        }}
      >
        <Text style={{ color: 'white', fontSize: 16 }}>Klik Saya</Text>
      </TouchableOpacity>
    </View>
  );
}
```
- `onPress`: fungsi yang dijalankan ketika tombol ditekan.
- `style` → bisa bebas dikustomisasi, tidak seperti Button.
- `Text` atau komponen lain bisa dimasukkan sebagai isi tombol.

## TouchableHighlight
Memberikan efek highlight saat tombol ditekan.
```javascript
import { Text, View, TouchableHighlight } from 'react-native';
export default function App() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <TouchableHighlight onPress={() => console.log('Highlight!')}
        underlayColor="#DDDDDD"
        style={{
            backgroundColor: '#2196F3',
            padding: 12,
            borderRadius: 8,
        }}
      >
        <Text style={{ color: 'white', textAlign: 'center' }}>Tombol Highlight</Text>
      </TouchableHighlight>
    </View>
  );
}
```

## TouchableWithoutFeedback
Tidak memberikan efek visual, cocok jika ingin mendapatkan kontrol penuh terhadap tampilan.
```javascript
import { Text, View, TouchableWithoutFeedback } from 'react-native';
export default function App() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <TouchableWithoutFeedback onPress={() => console.log('Tanpa efek')}>
            <View style={{ backgroundColor: '#FF5722', padding: 12, borderRadius: 8 }}>
                <Text style={{ color: 'white' }}>Tanpa Efek</Text>
            </View>
        </TouchableWithoutFeedback> 
    </View>
  );
}
```