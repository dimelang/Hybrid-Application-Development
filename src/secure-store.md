# SecureStore

Merupakan penyimpanan lokal **terenkripsi** yang disediakan oleh `expo-secure-store`. Semua data disimpan secara aman menggunakan:
- **iOS** → Keychain Services
- **Android** → Encrypted Shared Preferences

Berbeda dengan [`AsyncStorage`](asynchronous-storage.md) yang cocok untuk data umum (tema, settings, cache), SecureStore dirancang untuk menyimpan data sensitif, seperti:
- Token autentikasi (JWT access token / refresh token)
- Password atau credential
- Private keys
- Session

Artinya data terenkripsi di level OS, tidak mudah dibaca meskipun device di-root/jailbreak.

Walaupun demikian, `SecureStore` dapat digunakan bersamaan dengan `AsyncStorage`:
- `SecureStore` untuk data sensitif
- `AsyncStorage` untuk preferensi umum


Sebelum menggunakan `SecureStore`, terdapat beberapa hal yang perlu dilakukan yaitu instalasi dependency dan melakukan rebuild plugin.

## Instalasi

Expo:
```bash
npx expo install expo-secure-store
```

React Native CLI:
```bash
npm install expo-secure-store
npx pod-install
```

### API Dasar SecureStore
`SecureStore` menyediakan beberapa API utama:
| Kebutuhan             | Fungsi                                     |
| --------------------- | ------------------------------------------ |
| Menyimpan data        | `setItemAsync(key: string, value: string)` |
| Mengambil data        | `getItemAsync(key: string)`                |
| Menghapus data        | `deleteItemAsync(key: string)`             |
| Menyimpan dengan opsi | `setItemAsync(key, value, options)`        |

Sama seperti `AsyncStorage`, semua data harus berupa string.
Gunakan `JSON.stringify()` dan `JSON.parse()` bila menyimpan object.

### `setItemAsync` – Menyimpan Data Sensitif
```tsx
import * as SecureStore from 'expo-secure-store';

const saveToken = async () => {
  const token = 'abc123.jwt.token';
  await SecureStore.setItemAsync('auth_token', token);
};
```


