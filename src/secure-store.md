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
| Jenis Data                                 | Penyimpanan      |
| ------------------------------------------ | ---------------- |
| **Sensitif** (token, password, keys)       | **SecureStore**  |
| **Umum** (tema, bahasa, pengaturan, cache) | **AsyncStorage** |



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
| Kebutuhan                                  | Fungsi                                              |
| ------------------------------------------ | --------------------------------------------------- |
| Cek ketersediaan                           | `isAvailableAsync()`                                |
| Cek perlunya autentikasi biometrik         | `requireAuthentication()`                           |
| Menyimpan data                             | `setItemAsync(key: string, value: string, option? )`|
| Mengambil data                             | `getItemAsync(key: string, option?)`                 |
| Menghapus data                             | `deleteItemAsync(key: string)`                      |



> ⚠️ Semua data harus berupa string
>
> Gunakan `JSON.stringify()` untuk menyimpan object dan `JSON.parse()` saat membaca.


### `isAvailableAsync` - Cek ketersediaan
Tidak semua device mendukung SecureStore. Karena itu Anda disarankan mengecek terlebih dahulu:
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
Jika key tidak ditemukan, return value = `null`.

### `deleteItemAsync` - Menghapus data
```tsx
import * as SecureStore from 'expo-secure-store';

const removeToken = async () => {
  await SecureStore.deleteItemAsync('auth_token');
};
```

### Contoh: Simulasi Login dan Simpan Token
Menggunakan `SecureStore` untuk menyimpan token autentikasi. Token tetap tersimpan meskipun aplikasi ditutup dan agar lebih rapi dan scalable, gunakan: 

Struktur folder:
```bash
/src
  ├── context
  |      └── AuthContext.tsx
  ├── navigation
  |      └── AppNavigator.tsx
  └── screens
         ├── HomeScreen.tsx
         └── LoginScreen.tsx
App.tsx
```

Pastikan plugin [navigasi](navigation.md) sudah ter-*install* pada project.

**AuthContext.tsx**
```tsx
import { createContext, useContext, useEffect, useState } from "react"
import * as SecureStore from 'expo-secure-store';

interface AuthContextProps {
    token: string | undefined,
    login: () => Promise<void>,
    logout: () => Promise<void>
}

export const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const [token, setToken] = useState<string | undefined>(undefined);

    useEffect(() => {
        const initAuth = async () => {
            const available = await SecureStore.isAvailableAsync();
            if (!available) return;

            const storedToken = await SecureStore.getItemAsync('token');
            if (storedToken) setToken(storedToken);
        };

        initAuth();
    }, []);

    const login = async () => {
        const fakeToken = 'dNxH8zZ9xfMFzSswaNhoBCS1SQznZjkUhsuHO8u8yhuU190NhbshdbkjBM08';
        await SecureStore.setItemAsync('token', fakeToken);
        setToken(fakeToken);
    }

    const logout = async () => {
        await SecureStore.deleteItemAsync('token');
        setToken(undefined);
    }

    return (
        <AuthContext.Provider value={{ token, login, logout }}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => {
    const ctx = useContext(AuthContext);
    if (!ctx) throw new Error("useAuth must be used within AuthProvider");
    return ctx;
}
```

Pada real project, token akan diperoleh dari server melalui API login.

**LoginScreen.tsx**
```tsx
import { View, Text, TouchableOpacity } from "react-native";
import { useAuth } from "../context/AuthContext";

export default function LoginScreen() {
    const { login } = useAuth();
    return (
        <View style={{ justifyContent: 'center', flex: 1, padding: 20, backgroundColor: '#ffff' }}>
            <TouchableOpacity style={{ padding: 10, borderRadius: 10, backgroundColor: '#F875AA' }} onPress={login}>
                <Text style={{ color: "#EDFFF0", fontSize: 18, alignSelf: 'center' }}>Login</Text>
            </TouchableOpacity>
        </View>
    );
}
```

**HomeScreen.tsx**
```tsx
import { View, TouchableOpacity, Text } from "react-native";
import { useAuth } from "../context/AuthContext";

export default function HomeScreen() {
    const { logout } = useAuth();

    return (
        <View style={{ flex: 1, backgroundColor: '#ffffff' }}>
            <TouchableOpacity style={{ padding: 12, marginTop: 20, borderRadius: 10, backgroundColor: '#16476A', alignItems: 'center' }} onPress={logout}>
                <Text style={{ color: '#ffffff' }}>Logout</Text>
            </TouchableOpacity>
        </View>
    );
}
```

**AppNavigator.tsx**
```tsx
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useAuth } from "../context/AuthContext";
import { NavigationContainer } from "@react-navigation/native";
import HomeScreen from "../screens/HomeScreen";
import LoginScreen from "../screens/LoginScreen";

const Stack = createNativeStackNavigator();
export default function AppNavigator() {
    const { token } = useAuth();
    return (
        <NavigationContainer>
            <Stack.Navigator screenOptions={{ headerShown: false }}>
                {token ? (
                    <Stack.Screen name="Home" component={HomeScreen} />
                ) : (
                    <Stack.Screen name="Login" component={LoginScreen} />
                )}
            </Stack.Navigator>
        </NavigationContainer>
    )
}
```

**App.tsx**
```tsx
import { AuthProvider } from './src/context/AuthContext';
import AppNavigator from './src/navigation/AppNavigator';

export default function App() {
  return (
    <AuthProvider>
      <AppNavigator />
    </AuthProvider>
  );
}
```



