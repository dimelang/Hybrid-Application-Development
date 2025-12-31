# Fetch API

React Native menyediakan Fetch API secara bawaan (built-in) untuk melakukan HTTP request ke server. Fetch API merupakan standar web API yang juga tersedia di React Native tanpa perlu instalasi library tambahan.

Fetch API sangat cocok digunakan untuk:

- Aplikasi sederhana
- Pembelajaran dasar networking
- Memahami alur HTTP request–response

## Struktur Dasar Fetch API

Fetch API menggunakan fungsi fetch() yang mengembalikan Promise. Struktur dasarnya:

```ts
fetch(url, options);
```

Penjelasan:

- `url`: endpoint API
- `options`: konfigurasi request (method, headers, body, dll)
  Sebagai catatan, parameter `options` bersifat opsional. Jika tidak diberikan, `Fetch API` akan menggunakan method `GET` secara default.

## Properti Umum pada `options`

Berikut adalah properti options yang paling sering digunakan pada `Fetch API`:

### `method`

Menentukan HTTP method yang digunakan.

```tsx
method: "GET" | "POST" | "PUT" | "PATCH" | "DELETE";
```

Contoh:

```tsx
fetch("https://example.com/api/users", {
  method: "POST",
});
```

Jika tidak ditentukan, nilai default adalah GET.

### `headers`

Digunakan untuk mengirim informasi tambahan ke server. Contoh header yang sering digunakan adalah `Content-Type` dan `Authorization`.

```ts
headers: {
  "Content-Type": "application/json",
  Authorization: "Bearer jwt-secret-token",
}
```

Contoh:

```tsx
fetch("https://example.com/api/products", {
  method: "GET",
  headers: {
    Authorization: "Bearer jwt-secret-token",
  },
});
```

### `body`

Digunakan untuk mengirim data ke server (biasanya pada POST, PUT, PATCH). Sebagai catatan, `body` harus berupa string, bukan object JavaScript dan jika menggunakan `method` `GET`, option `body` tidak perlu disematkan.

```tsx
body: JSON.stringify({
  name: "John",
  email: "john_doe@mail.com",
});
```

Contoh:

```tsx
fetch("https://example.com/api/products", {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
    Authorization: "Bearer jwt-secret-token",
  },
  body: JSON.stringify({
    name: "Laptop",
    price: 10000000,
  }),
});
```

## Implementasi Fetch API

Contoh-contoh berikut memanfaatkan API publik `Coding Resources` dari [REST-API](https://restful-api.dev/).

### `GET`

**App.tsx**

```tsx
import { useEffect, useState } from "react";
import { FlatList, StyleSheet, Text, View } from "react-native";

export default function App() {
  const [data, setData] = useState([]);

  const fetchData = async () => {
    try {
      const response = await fetch(
        "https://api.restful-api.dev/objects?id=3&id=5&id=10"
      );
      if (response.status != 200) {
        throw new Error("Gagal mengambil data dari server");
      }

      const json = await response.json();
      setData(json);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <View style={styles.container}>
      <FlatList
        data={data}
        keyExtractor={(item) => item["id"]}
        renderItem={({ item }) => (
          <View style={styles.list}>
            <Text>{item["name"]}</Text>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  list: {
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
});
```

### `POST`

**App.tsx**

```tsx
import { useEffect, useState } from "react";
import { FlatList, StyleSheet, Text, View } from "react-native";

export default function App() {
  const [data, setData] = useState([]);

  const postData = async () => {
    try {
      const response = await fetch("https://api.restful-api.dev/objects", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: "Apple MacBook Pro 16",
          data: {
            year: 2019,
            price: 1849.99,
            "CPU model": "Intel Core i9",
            "Hard disk size": "1 TB",
          },
        }),
      });

      if (response.status != 200) {
        throw new Error("Gagal menambahkan data baru");
      }
      const json = await response.json();
      console.log(json);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    postData();
  }, []);

  return <View style={styles.container}></View>;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
```

### `PUT`

**App.tsx**

```tsx
import { useEffect, useState } from "react";
import { FlatList, StyleSheet, Text, View } from "react-native";

export default function App() {
  const [data, setData] = useState([]);

  const putData = async () => {
    try {
      const response = await fetch(
        "https://api.restful-api.dev/objects/ff8081819782e69e019b6f989ce11c58",
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name: "Apple MacBook Pro 18",
            data: {
              year: 2021,
              price: 2500,
              "CPU model": "Intel Core i9",
              "Hard disk size": "1 TB",
              color: "silver",
            },
          }),
        }
      );

      if (response.status != 200) {
        throw new Error("Gagal mengubah data");
      }
      const json = await response.json();
      console.log(json);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    putData();
  }, []);

  return <View style={styles.container}></View>;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
```

### `PATCH`

**App.tsx**

```tsx
import { useEffect, useState } from "react";
import { FlatList, StyleSheet, Text, View } from "react-native";

export default function App() {
  const [data, setData] = useState([]);

  const pacthData = async () => {
    try {
      const response = await fetch(
        "https://api.restful-api.dev/objects/ff8081819782e69e019b6f989ce11c58",
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            data: {
              year: 2023,
              price: 2666,
              color: "pink",
            },
          }),
        }
      );

      if (response.status != 200) {
        throw new Error("Gagal mengubah data");
      }
      const json = await response.json();
      console.log(json);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    pacthData();
  }, []);

  return <View style={styles.container}></View>;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
```

### `DELETE`

**App.tsx**

```tsx
import { useEffect, useState } from "react";
import { FlatList, StyleSheet, Text, View } from "react-native";

export default function App() {
  const [data, setData] = useState([]);

  const deleteData = async () => {
    try {
      const response = await fetch(
        "https://api.restful-api.dev/objects/ff8081819782e69e019b6f989ce11c58",
        {
          method: "DELETE",
        }
      );

      if (response.status != 200) {
        throw new Error("Gagal menghapus data");
      }
      const json = await response.json();
      console.log(json);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    deleteData();
  }, []);

  return <View style={styles.container}></View>;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
```
