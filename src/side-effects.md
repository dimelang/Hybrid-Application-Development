# Side Effects (`useEffect`)

Kalau sebelumnya kita belajar tentang state yang bisa menyimpan data dinamis di sebuah komponen, sekarang saatnya masuk ke hal lain yang tidak kalah penting: side effect.

Side effect adalah segala hal yang terjadi di luar proses rendering UI. Contohnya:
- Memanggil API untuk mengambil data.
- Mengatur timer atau interval.
- Mengupdate judul aplikasi atau menyimpan data ke storage.

`useEffect` adalah hook yang memungkinkan kita menjalankan kode setiap kali komponen selesai di-*render*. Dengan kata lain, dia seperti lifecycle methods di class component (componentDidMount, componentDidUpdate, dan componentWillUnmount) tapi digabung dalam satu fungsi.

Struktur dasarnya seperti ini:

```jsx
useEffect(() => {
  // kode yang mau dijalankan setelah render

  return () => {
    // optional: kode cleanup
  };
}, [dependencies]);
```

- Bagian pertama `(() => { ... })` adalah efek yang dijalankan.
- `return () => { ... }` adalah cleanup function, dipanggil ketika efek harus dibersihkan (misalnya saat komponen di-unmount atau sebelum efek baru dipasang lagi).
- `[dependencies]` adalah array berisi nilai yang diawasi. Efek hanya dijalankan ulang ketika nilai di array ini berubah.

## Contoh 1: Dipanggil Setiap Render
```jsx
import React, { useState, useEffect } from 'react';
import { View, Text, Button } from 'react-native';

export default function Counter() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    console.log('Komponen dirender. Nilai count:', count);
  });

  return (
    <View>
      <Text>Count: {count}</Text>
      <Button title="Tambah" onPress={() => setCount(count + 1)} />
    </View>
  );
}
```
Karena kita tidak memberi dependency array, efek ini akan dipanggil setiap kali komponen dirender.

## Contoh 2: Hanya Sekali
```jsx
useEffect(() => {
  console.log('Komponen baru saja muncul di layar');

  // cleanup
  return () => {
    console.log('Komponen hilang dari layar');
  };
}, []);
```
Dengan dependency array kosong `[]`, efek hanya dijalankan sekali saat komponen pertama kali dipasang, lalu dibersihkan saat komponen dilepas.


## Contoh 3: Bergantung Pada State Tertentu
```jsx
import React, { useState, useEffect } from 'react';
import { View, Text, Button } from 'react-native';

export default function NameWatcher() {
  const [name, setName] = useState('Mike');
  const [age, setAge] = useState(20);

  useEffect(() => {
    console.log('Nama berubah:', name);
  }, [name]); // hanya jalan kalau "name" berubah

  return (
    <View>
      <Text>{name} - {age}</Text>
      <Button title="Ganti Nama" onPress={() => setName('Portnoy')} />
      <Button title="Tambah Umur" onPress={() => setAge(age + 1)} />
    </View>
  );
}
```
Efek ini cuma jalan kalau nilai `name` berubah. Kalau `age` yang berubah, efek tidak akan dijalankan.


## Contoh 4: Memanggil API
```jsx
import React, { useEffect, useState } from 'react';
import { View, Text, ActivityIndicator } from 'react-native';

export default function UserList() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/users')
      .then((res) => res.json())
      .then((data) => {
        setUsers(data);
        setLoading(false);
      });
  }, []); // hanya sekali dijalankan saat komponen pertama kali render

  if (loading) return <ActivityIndicator />;

  return (
    <View>
      {users.map((user) => (
        <Text key={user.id}>{user.name}</Text>
      ))}
    </View>
  );
}
```

`useEffect` adalah salah satu hook paling penting di React Native. Memungkinkan kita untuk menangani hal-hal yang berhubungan dengan dunia luar render UI seperti API, timer, event listener, dan lain-lain.

`useEffect` memiliki tiga aturan simpel berikut:
- Tanpa dependency array → jalan setiap render.
- Dengan array kosong `[]` → jalan sekali di awal.
- Dengan array berisi state/props → jalan setiap kali nilai itu berubah.