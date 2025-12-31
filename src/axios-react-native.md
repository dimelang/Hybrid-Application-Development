# Axios

Axios adalah library HTTP client berbasis Promise yang sering digunakan pada aplikasi React Native untuk melakukan HTTP request ke server. Dibandingkan Fetch API, Axios menyediakan fitur yang lebih lengkap dan konfigurasi yang lebih fleksibel.

Axios cocok digunakan untuk:

- Aplikasi skala menengah hingga besar
- Aplikasi dengan autentikasi (JWT)
- Aplikasi yang membutuhkan konfigurasi global request
- Penanganan error yang lebih terstruktur

## Instalasi

```bash
npm install axios
```

## Struktur Dasar Axios

Axios menyediakan fungsi utama seperti `axios.get()`, `axios.post()`, dan lainnya.

Contoh struktur dasar:

```ts
axios(config);
```

atau menggunakan shortcut method:

```ts
axios.get(url, config);
axios.post(url, data, config);
```

## Konfigurasi Request (`config`)

Axios menggunakan objek config yang mirip dengan `options` pada Fetch API.
Properti yang sering digunakan:
| Properti | Keterangan |
| --------- | ------------------------ |
| `method` | HTTP method |
| `url` | Endpoint API |
| `headers` | Header request |
| `params` | Query parameter |
| `data` | Body request |
| `timeout` | Batas waktu request (ms) |

Contoh:
Kode berikut menunjukkan contoh penggunaan `config` untuk kasus filter.

```tsx
import axios from "axios";

axios({
  method: "POST",
  url: "https://example.com/api/filter/products",
  headers: {
    "Content-Type": "application/json",
    Authorization: "Bearer jwt-secret-token",
  },
  params: {
    category: "electronics",
    limit: 10,
  },
  data: {
    name: "Laptop",
    price: 10000000,
  },
  timeout: 5000,
});
```

Penjelasan:

- `method`: menentukan HTTP method yang digunakan.
- `url`: menentukan endpoint API tujuan.
- `headers`: mengirim informasi tambahan ke server, seperti format data dan autentikasi.
- `params`: mengirim query parameter yang akan otomatis ditambahkan ke URL. Sehingga url di atas akan menjadi `https://example.com/api/filter/products?category=electronics&limit=10`
- `data`: digunakan sebagai body request, biasanya pada POST, PUT, atau PATCH.
- `timeout`: menentukan batas waktu request dalam satuan milidetik dan jika melebihi waktu yang ditentukan, axios akan melempar error.

Axios tidak memerlukan `JSON.stringify()` karena otomatis mengubah object ke `JSON`.

## Error Handling

Berbeda dengan [Fetch API](./fetch-api-react-native.md), Axios secara otomatis melempar error jika status response berada di luar rentang 2xx.

```tsx
try {
  const response = await axios.get("https://example.com/api/products");
  return response.data;
} catch (error) {
  if (axios.isAxiosError(error)) {
    console.error(error.response?.data);
  } else {
    console.error(error);
  }
}
```

## Implementasi Axios

Contoh-contoh berikut memanfaatkan API publik `Coding Resources` dari [REST-API](https://restful-api.dev/).

### GET

**App.tsx**

```tsx
import { useEffect, useState } from "react";
import { FlatList, StyleSheet, Text, View } from "react-native";

export default function App() {
  const [data, setData] = useState([]);

  const getData = async () => {
    try {
      // Menggunakan method alias
      const response = await axios.get("https://api.restful-api.dev/objects", {
        params: {
          id: [3, 5, 10],
        },
        paramsSerializer: {
          indexes: null,
        },
      });

      // const response = await axios({
      //     method: 'GET',
      //     url: 'https://api.restful-api.dev/objects',
      //     params: {
      //         id: ['3', '5', '10']
      //     },
      //     paramsSerializer:{
      //         indexes: null
      //     }
      // })
      console.log(response.data);

      setData(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getData();
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

Pada kode program di atas, terdapat dua cara untuk melakukan request `GET`.

### POST

**App.tsx**

```tsx
import { useEffect, useState } from "react";
import { FlatList, StyleSheet, Text, View } from "react-native";

export default function App() {
  const postData = async () => {
    try {
      // Menggunakan method alias
      const response = await axios.post("https://api.restful-api.dev/objects", {
        data: {
          name: "Apple MacBook Pro 16",
          data: {
            year: 2019,
            price: 1849.99,
            "CPU model": "Intel Core i9",
            "Hard disk size": "1 TB",
          },
        },
      });

      // const response = await axios({
      //   method: "POST",
      //   url: "https://api.restful-api.dev/objects",
      //   data: {
      //     year: 2019,
      //     price: 1849.99,
      //     "CPU model": "Intel Core i9",
      //     "Hard disk size": "1 TB",
      //   },
      // });

      console.log(response.data);
    } catch (error) {
      console.error(error);
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

Pada kode program di atas, terdapat dua cara untuk melakukan request `POST`.

### PUT

**App.tsx**

```tsx
import { useEffect, useState } from "react";
import { FlatList, StyleSheet, Text, View } from "react-native";

export default function App() {
  const putData = async () => {
    try {
      // Menggunakan method alias
      const response = await axios.put(
        "https://api.restful-api.dev/objects/ff8081819782e69e019b7395ade521b5",
        {
          data: {
            name: "Apple MacBook Pro 18",
            data: {
              year: 2021,
              price: 2065,
              "CPU model": "Intel Core i9",
              "Hard disk size": "1 TB",
              color: "pink",
            },
          },
        }
      );

      // const response = await axios({
      //   method: "PUT",
      //   url: "https://api.restful-api.dev/objects/ff8081819782e69e019b7395ade521b5",
      //   data: {
      //     name: "Apple MacBook Pro 18",
      //     data: {
      //       year: 2021,
      //       price: 2065,
      //       "CPU model": "Intel Core i9",
      //       "Hard disk size": "1 TB",
      //       color: "pink",
      //     },
      //   },
      // });

      console.log(response.data);
    } catch (error) {
      console.error(error);
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

Pada kode program di atas, terdapat dua cara untuk melakukan request `PUT`.

### PATCH

**App.tsx**

```tsx
import { useEffect, useState } from "react";
import { FlatList, StyleSheet, Text, View } from "react-native";

export default function App() {
  const patchData = async () => {
    try {
      // Menggunakan method alias
      const response = await axios.patch(
        "https://api.restful-api.dev/objects/ff8081819782e69e019b7395ade521b5",
        {
          data: {
            name: "Apple MacBook Pro 16 (Updated Name)",
          },
        }
      );

      // const response = await axios({
      //   method: "PATCH",
      //   url: "https://api.restful-api.dev/objects/ff8081819782e69e019b7395ade521b5",
      //   data: {
      //     name: "Apple MacBook Pro 16 (Updated Name)",
      //   },
      // });

      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    patchData();
  }, []);

  return <View style={styles.container}></View>;
}
```

Pada kode program di atas, terdapat dua cara untuk melakukan request `PATCH`.

### DELETE

**App.tsx**

```tsx
import { useEffect, useState } from "react";
import { FlatList, StyleSheet, Text, View } from "react-native";

export default function App() {
  const deleteData = async () => {
    try {
      // Menggunakan method alias
      const response = await axios.delete(
        "https://api.restful-api.dev/objects/ff8081819782e69e019b7395ade521b5"
      );

      // const response = await axios({
      //   method: "DELETE",
      //   url: "https://api.restful-api.dev/objects/ff8081819782e69e019b7395ade521b5",
      // });

      console.log(response.data);
    } catch (error) {
      console.error(error);
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

Pada kode program di atas, terdapat dua cara untuk melakukan request `DELETE`.
