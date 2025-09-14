# TextInput

Komponen **`TextInput`** digunakan untuk menerima input teks dari pengguna, mirip dengan `<input type="text">` di HTML.  
`TextInput` adalah bagian penting dalam membangun form, pencarian, login, dan interaksi berbasis teks lainnya.

---

### TextInput Dasar
```ts
import { TextInput, View, StyleSheet } from 'react-native';

export default function App() {
  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Ketik sesuatu..."
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    width: 200,
    borderRadius: 5,
  },
});
```


### Mengatur Keyboard
`TextInput` bisa menyesuaikan jenis keyboard dengan properti `keyboardType`.

Beberapa nilai yang sering digunakan:
- `default` → keyboard standar.
- `numeric` → angka.
- `email-address` → untuk email.
- `phone-pad` → untuk nomor telepon.

```ts
<TextInput
  style={styles.input}
  placeholder="Masukkan email"
  keyboardType="email-address"
/>
```

### TextInput dengan Password (Secure Text Entry)
```ts
<TextInput
  style={styles.input}
  placeholder="Masukkan password"
  secureTextEntry={true}
/>
```

### Multiline Input
```ts
<TextInput
  style={[styles.input, { height: 100 }]}
  placeholder="Tulis komentar..."
  multiline
  numberOfLines={4}
/>
```