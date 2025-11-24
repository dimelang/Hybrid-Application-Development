# SecureStore

Merupakan penyimpanan lokal **terenkripsi** yang disediakan oleh `expo-secure-store`. Semua data disimpan secara aman menggunakan:
- **iOS** → Keychain Services
- **Android** → Encrypted Shared Preferences

Berbeda dengan [`AsyncStorage`](asynchronous-storage.md) yang cocok untuk data umum (tema, settings, cache), `SecureStore` dirancang untuk menyimpan data sensitif, seperti:
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
| Kebutuhan             | Fungsi                                              |
| --------------------- | --------------------------------------------------- |
| Cek ketersediaan      | `isAvailableAsync()`                                |
| Menyimpan data        | `setItemAsync(key: string, value: string, option: )`|
| Mengambil data        | `getItemAsync(key: string, option)`                 |
| Menghapus data        | `deleteItemAsync(key: string)`                      |


Sama seperti `AsyncStorage`, semua data harus berupa string.
Gunakan `JSON.stringify()` dan `JSON.parse()` bila menyimpan object.

### `isAvailableAsync` - Cek ketersediaan
```tsx
import * as SecureStore from 'expo-secure-store';

const checkAvailability = async () => {
  const isAvailable = await SecureStore.isAvailableAsync();
  console.log("SecureStore Available:", isAvailable);
};
```

### `setItemAsync` – Menyimpan data
```tsx
import * as SecureStore from 'expo-secure-store';

const saveToken = async () => {
  const token = 'abc123.jwt.token';
  await SecureStore.setItemAsync('auth_token', token);
};
```

### `getItemAsync` - Mengambil/Mendapatkan data
```tsx
import * as SecureStore from 'expo-secure-store';

const loadToken = async () => {
  const token = await SecureStore.getItemAsync('auth_token');
  console.log("Stored Token:", token);
};
```

### `deleteItemAsync` - Menghapus data
```tsx
import * as SecureStore from 'expo-secure-store';

const removeToken = async () => {
  await SecureStore.deleteItemAsync('auth_token');
};
```
