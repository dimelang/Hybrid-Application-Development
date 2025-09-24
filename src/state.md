# State (`useState`)

Setelah sebelumnya kita mengenal `props` sebagai cara untuk memberikan data dari luar ke dalam sebuah komponen, kini kita akan membahas konsep penting lainnya, yaitu `state`. Jika `props` dapat kita ibaratkan seperti paket data yang dikirim dari luar, maka state adalah data milik komponen itu sendiri yang dapat berubah sepanjang waktu.

Sebuah komponen dapat memiliki `state` untuk menyimpan informasi yang bersifat dinamis. Misalnya, ketika pengguna menekan tombol, mengetik di dalam sebuah input, atau ketika aplikasi menerima data baru dari server, semua perubahan tersebut bisa dikelola dengan `state`. Inilah yang membuat aplikasi menjadi interaktif.

Berbeda dengan `props` yang hanya bisa dibaca (**read-only**), `state` dapat diperbarui. Ketika `state` berubah, **React Native** akan secara otomatis melakukan *re-render* pada bagian komponen yang menggunakan `state` tersebut. Dengan demikian, tampilan aplikasi akan selalu sesuai dengan data terbaru.

Struktur dasarnya seperti ini:

```jsx
const [value, setValue] = useState(initialValue);
```
- `value`: isi `state` saat ini.
- `setValue`: fungsi untuk mengubah isi dari `state`.
- `initialValue`: nilai awal `state`.
- `useState`: hook **React Native**.




## Contoh State 1: Counter Sederhana
Sebagai contoh, kita ingin menampilkan angka yang bertambah setiap kali pengguna menekan tombol "+" dan begitupun sebaliknya untuk tombol "-". Untuk menyimpan angka tersebut, kita menggunakan `state`. Setiap kali tombol ditekan, `state` diperbarui, dan tampilan angka pada layar pun langsung ikut berubah.

```jsx
// App.tsx
import React, { useState } from "react";
import { View, Text, Button, StyleSheet } from "react-native";

export default function App() {
  // Membuat state bernama "count" dengan nilai awal 0
  const [count, setCount] = useState(0);

  return (
    <View style={styles.container}>
      // Komponen ini akan me-render jika ada perubahan nilai state
      <Text style={[styles.text, count < 0 ? { color: 'red' } : { color: 'black' }]}>Count: {count}</Text>
      <View style={styles.button_container}>
        <Button 
          title="+" 
          // memanggil fungsi SetCount untuk menambah nilai state ketika button ditekan
          onPress={() => setCount(count + 1)} 
        />

        <Button 
          title="-" 
          // memanggil fungsi SetCount untuk mengurangi nilai state ketika button ditekan
          onPress={() => setCount(count - 1)} 
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  text: {
    fontSize: 24,
    marginBottom: 20
  },
  button_container:{
    flexDirection:'row',
    justifyContent:'center',
    alignItems:'center',
    gap: 15
  }
});
```

Pada contoh di atas, kita menggunakan **`useState`** untuk membuat state `count`. Setiap kali tombol ditekan, fungsi `setCount` dipanggil untuk memperbarui nilai `count`. React Native kemudian secara otomatis memperbarui tampilan teks agar sesuai dengan nilai terbaru.


## Contoh State 2: Menyimpan Input Teks
Misalnya, kita ingin membuat aplikasi sederhana yang menampilkan teks berdasarkan teks yang diketik pengguna.
```jsx
// App.tsx
import React, { useState } from "react";
import { View, Text, TextInput, StyleSheet } from "react-native";

export default function App() {
  // Membuat state bernama "name" dengan nilai awal empty string
  const [name, setName] = useState("");

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Masukkan nama Anda:</Text>
      <TextInput
        style={styles.input}
        placeholder="Ketik di sini..."
        value={name}
        // memanggil fungsi setName untuk mengubah nilai state (name) sesuai dengan input user
        onChangeText={(text) => setName(text)}
      />

      // Komponen ini akan me-render jika ada perubahan nilai state
      <Text style={styles.greeting}>
        {name ? `Halo, ${name}!` : "Silakan ketik nama Anda"}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  label: {
    fontSize: 18,
    marginBottom: 10,
  },
  input: {
    width: "100%",
    borderWidth: 1,
    borderColor: "#aaa",
    padding: 10,
    marginBottom: 20,
    borderRadius: 5,
  },
  greeting: {
    fontSize: 20,
    fontWeight: "bold",
  },
});
```

## Contoh State 3: Menggunakan `useState` pada reusable component
Misalnya kita ingin membuat `CustomInput` yang bisa dipakai di banyak tempat. Komponen ini memiliki state untuk menyimpan teks lokal, lalu menampilkan hasil ketikan.

### App.tsx
```jsx
import React from "react";
import { View, StyleSheet } from "react-native";
import CustomInput from "./components/CustomInput";

export default function App() {
  return (
    <View style={styles.container}>
      <CustomInput label="Nama" placeholder="Masukkan nama Anda" />
      <CustomInput label="Email" placeholder="Masukkan email Anda" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 20,
  },
});
```

### components/CustomInput.tsx
```jsx
import React, { useState } from "react";
import { View, Text, TextInput, StyleSheet } from "react-native";

type CustomInputProps = {
  label: string,
  placeholder: string
};

export default function CustomInput({ label, placeholder }:CustomInputProps) {
  // Membuat state lokal bernama "value" dengan nilai awal empty string
  const [value, setValue] = useState("");

  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label}</Text>
      <TextInput
        style={styles.input}
        placeholder={placeholder}
        value={value}
        // memanggil fungsi setValue untuk mengubah nilai state sesuai dengan input user
        onChangeText={(text) => setValue(text)}
      />

      // komponen akan di re-render jika nilai state berubah
      <Text style={styles.preview}>
        {value ? `Anda mengetik: ${value}` : "Belum ada input"}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    marginBottom: 5,
  },
  input: {
    borderWidth: 1,
    borderColor: "#aaa",
    padding: 10,
    borderRadius: 5,
  },
  preview: {
    marginTop: 5,
    fontSize: 14,
    color: "#555",
  },
});

```

Pada contoh program di atas, setiap instance `CustomInput` (yang ditambahkan ke dalam App()) memiliki state masing-masing (sehingga input nama tidak mengganggu input email).

## Contoh State 4: Array State

### components/TodoList.tsx
```jsx
import React, { useState } from 'react';
import { View, Text, Button } from 'react-native';

export default function TodoList() {
  
  const [todos, setTodos] = useState([]);

  const addTodo = () => {
    // membuat salinan array lama sehingga data yang sudah tersimpan tidak hilang
    setTodos([...todos, `Tugas ${todos.length + 1}`]);
  };

  return (
    <View>
      // memanggil fungsi addTodo untuk menambah data baru ke dalam state
      <Button title="Tambah Tugas" onPress={addTodo} />
      {todos.map((todo, index) => (
        <Text key={index}>{todo}</Text>
      ))}
    </View>
  );
}
```
Kalau state berupa array, biasanya perlu membuat salinan array lama lalu tambahkan data baru, agar state tetap immutable (`...todos`).

`useState` adalah pondasi penting dalam React Native karena hampir semua komponen interaktif butuh state. Tanpa `useState`, aplikasi cuma hanya berupa sekumpulan teks dan gambar statis.

`useState` memiliki tiga aturan simpel berikut:
- Mengembalikan sepasang nilai (state saat ini) dan fungsi untuk mengubah state.
- Setiap kali state berubah, komponen otomatis merender ulang.
- State bisa berupa apa pun: string, number, boolean, array, object, bahkan kombinasi.