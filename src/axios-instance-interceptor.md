# Axios Instance & Interceptor

Pada aplikasi React Native yang menggunakan banyak HTTP request, menuliskan konfigurasi Axios (base URL, header, timeout) secara berulang akan membuat kode sulit dipelihara. Untuk mengatasi hal tersebut, Axios menyediakan fitur Instance dan Interceptor.

## Axios Instance

Axios Instance adalah objek Axios dengan konfigurasi default yang dapat digunakan kembali di seluruh aplikasi.

Dengan instance, kita dapat:

- Menentukan baseURL
- Mengatur timeout
- Menambahkan header default
- Menghindari duplikasi kode

## Membuat dan Menggunakan Axios Instance

```ts
import axios from "axios";

const api = axios.create({
  baseURL: "https://api.restful-api.dev",
  timeout: 5000,
  headers: {
    "Content-Type": "application/json",
  },
});
```

Penjelasan:

- baseURL: URL utama backend
- timeout: request dibatalkan jika melebihi 5 detik
- Content-Type: default untuk JSON

Instance di atas umumya disimpan di folder khusus, misalnya services/api.ts.

```tsx
import api from "./services/api";
export default function App() {
  const [data, setData] = useState([]);

  const getData = async () => {
    try {
      const response = await api.get("/objects", {
        params: {
          id: [3, 5, 10],
        },
        paramsSerializer: {
          indexes: null,
        },
      });
      setData(response.data);
    } catch (error) {
      console.error(error);
    }
  };
}
```

## Axios Interceptor

Axios Interceptor adalah mekanisme pada Axios yang memungkinkan kita memproses request atau response sebelum diteruskan ke server atau ke pemanggil fungsi.

Interceptor sangat berguna untuk:

- Menambahkan header secara otomatis
- Logging request dan response
- Menangani error secara global
- Autentikasi (JWT)
- Auto logout saat token tidak valid

### Jenis Axios Interceptor

Axios memiliki dua jenis interceptor:

### 1. Request Interceptor

Merupakan jenis interceptor yang dieksekusi sebelum request dikirim ke server. Request interceptor digunakan untuk:

- Menambahkan header Authorization
- Menyetel konfigurasi request
- Logging request

Contoh:
**src/services/api.ts**

```ts
import axios from "axios";

const api = axios.create({
  baseURL: "https://api.restful-api.dev",
  timeout: 5000,
});

api.interceptors.request.use(
  (config) => {
    const token = "jwt-secret-token"; // nanti diambil dari storage / context

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    console.log("Request dikirim ke:", config.url);
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default api;
```

### 2. Response Interceptor

Merupakan jenis interceptor yang dieksekusi setelah response diterima dari server. Response interceptor digunakan untuk:

- Mengolah data response
- Menangani error secara global
- Menangani status tertentu (401, 403, 500)

Contoh:

```ts
api.interceptors.response.use(
  (response) => {
    console.log("Response diterima:", response.status);
    return response;
  },
  (error) => {
    if (error.response?.status === 401) {
      console.log("Unauthorized - token tidak valid");
      // nanti bisa diarahkan ke logout
    }

    return Promise.reject(error);
  }
);
```
