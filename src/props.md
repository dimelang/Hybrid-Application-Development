# Props

Dalam React Native, terdapat salah satu konsep penting yang perlu dipahami yaitu `props`. `Props`, singkatan dari **properties**, merupakan cara untuk mengirimkan data dari satu komponen ke komponen lain. Bayangkan `props` seperti sebuah "paket data" yang diberikan oleh komponen induk (*parent*) kepada komponen anak (*child*). Dengan cara ini, beberapa komponen dapat berinteraksi atau berkomunikasi dengan baik tanpa harus mengubah struktur dasarnya.

`Props` bersifat read-only, artinya data yang dikirim melalui props hanya bisa dibaca oleh komponen penerima, tetapi tidak bisa diubah secara langsung dari dalam komponen tersebut. Hal ini menjadikan `props` sebagai fondasi utama dalam membangun komponen yang dapat digunakan kembali (*reusable components*).

Misalkan kita memiliki sebuah komponen bernama `Card`. Komponen ini dirancang untuk menampilkan nama dan pekerjaan seseorang. Menggunakan `props`, kita cukup membuat satu komponen `Card` lalu mengirimkan data yang berbeda melalui `props`.

```jsx
// App.tsx
import { View, StyleSheet } from "react-native";
import Card from "./components/Card";

export default function App() {
  return (
    <View style={styles.container}>
      <Card name="John Petrucci" job="Guitarist" />
      <Card name="Mike Portnoy" job="Drummer" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fefefe"
  }
});
```

Pada kode di atas, komponen `App` berperan sebagai parent, sedangkan `Card` adalah child. Data `name` dan `job` dikirim ke dalam `Card` melalui props.

```jsx
// components/Card.tsx
import { View, Text, StyleSheet } from "react-native";

type CardProps = {name:string, job:string}

export default function Card({ name, job }:CardProps) {
  return (
    <View style={styles.card}>
      <Text style={styles.name}>{name}</Text>
      <Text style={styles.job}>{job}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    width: 200,
    padding: 10,
    margin: 8,
    borderRadius: 8,
    backgroundColor: "#e0f7fa",
    alignItems: "center"
  },
  name: {
    fontSize: 18,
    fontWeight: "bold"
  },
  job: {
    fontSize: 14,
    color: "#555"
  }
});

```
