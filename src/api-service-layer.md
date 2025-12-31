# API Service Layer

API Service Layer adalah lapisan khusus yang bertanggung jawab untuk seluruh komunikasi dengan backend API. Komponen React Native tidak langsung memanggil Axios, melainkan melalui service ini. Tanpa service layer, kode API tersebar di banyak screen, sulit diubah jika endpoint berubah, dan sulit menambahkan auth, logging, atau error handling global. Dengan adanya service layer, kode lebih bersih dan terstruktur, mudah dikembangkan, mudah diuji, dan sangat cocok untuk aplikasi dengan skala menengah-besar.

## Struktur Folder (Rekomendasi)

```yaml
src/
├── services/
│   └── product.service.ts
│
├── types/
│   ├── product.ts
│   └── api.ts
│
└── screens/
```

### Membuat Axios Instance

**src/services/api.ts**

```ts
import axios from "axios";

const api = axios.create({
  baseURL: "https://api.restful-api.dev",
  timeout: 5000,
  headers: {
    "Content-Type": "application/json",
  },
});

export default api;
```

### Membuat Tipe Global API Response

**src/types/api.ts**

```ts
export type ApiResponse<T> = {
  success: boolean;
  data: T;
  message?: string;
};
```

### Membuat Tipe Product (Data Dinamis)

**src/type/product.ts**

```ts
export type DetailProduct = Record<string, unknown> | null;

export type Product = {
  id: string;
  name: string;
  data: DetailProduct | null;
};

export type CreateProduct = {
  name: string;
  data: DetailProduct | null;
};

export type UpdateProduct = {
  name?: string;
  data?: DetailProduct | null;
};
```

Record<string, unknown> digunakan karena struktur data tidak konsisten.

### Membuat Product Service

**src/services/product.service.ts**

```ts
import api from "../api/axiosIntances";
import { ApiResponse } from "../types/api";
import { CreateProduct, Product, UpdateProduct } from "../types/product";

export const productService = {
  getAll: async (): Promise<ApiResponse<Product[]>> => {
    try {
      const response = await api.get<Product[]>("/objects");
      return {
        success: true,
        data: response.data,
        message: "Berhasil mendapatkan data",
      };
    } catch (error) {
      return {
        success: false,
        data: [],
        message: "Gagal mendapatkan data",
      };
    }
  },

  getById: async (id: string): Promise<ApiResponse<Product>> => {
    try {
      const response = await api.get<Product>(`/objects/${id}`);
      return {
        success: true,
        data: response.data,
        message: "Berhasil mendapatkan data",
      };
    } catch (error) {
      return {
        success: false,
        data: null as any,
        message: "Gagal mendapatkan data",
      };
    }
  },

  create: async (payload: CreateProduct): Promise<ApiResponse<Product>> => {
    try {
      const response = await api.post("/objects", {
        data: payload,
      });
      return {
        success: true,
        data: response.data,
        message: "Berhasil menambahkan data",
      };
    } catch (error) {
      return {
        success: false,
        data: null as any,
        message: "Gagal menambahkan data",
      };
    }
  },

  update: async (
    id: string,
    payload: UpdateProduct
  ): Promise<ApiResponse<Product>> => {
    try {
      const response = await api.put(`/objects/${id}`, {
        data: payload,
      });
      return {
        success: true,
        data: response.data,
        message: "Berhasil memperbarui data",
      };
    } catch (error) {
      return {
        success: false,
        data: null as any,
        message: "Gagal memperbarui data",
      };
    }
  },

  delete: async (id: string) => {
    try {
      const response = await api.delete(`/objects/${id}`);
      return {
        success: true,
        message: "Berhasil menghapus data",
      };
    } catch (error) {
      return {
        success: false,
        message: "Gagal menghapus data",
      };
    }
  },
};
```

### Gabungkan Semuanya

```tsx
import { useEffect, useState } from "react";
import { FlatList, StyleSheet, Text, View } from "react-native";
import { productService } from "./src/services/product.service";
import { Product } from "./src/types/product";
import { ApiResponse } from "./src/types/api";

export default function App() {
  const [data, setData] = useState<ApiResponse<Product[]>>([] as any);
  const getData = async () => {
    try {
      const result = await productService.getAll();
      if (result.success) setData(result);
    } catch (error) {
      console.error(error);
    }
  };

  const postData = async () => {
    try {
      const response = await productService.create({
        name: "Apple MacBook Pro 16",
        data: {
          year: 2019,
          price: 1849.99,
          CPU: "Intel Core i9",
          HDD: "1 TB",
        },
      });
      console.log(response);
    } catch (error) {
      console.error(error);
    }
  };

  const putData = async () => {
    try {
      const response = await productService.update("1", {
        name: "Apple MacBook Pro 16",
        data: {
          year: 2019,
          price: 2049.99,
          "CPU model": "Intel Core i9",
          "Hard disk size": "1 TB",
          color: "silver",
        },
      });
      console.log(response);
    } catch (error) {
      console.error(error);
    }
  };

  const deleteData = async () => {
    try {
      const response = await productService.delete("1");
      console.log(response);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    // postData();
    // putData();
    // deleteData();
    getData();
  }, []);

  return (
    <View style={styles.container}>
      <FlatList
        data={data?.data}
        keyExtractor={(item) => item.id}
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
