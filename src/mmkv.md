# MMKV

`MMKV` adalah *key-value* storage yang sangat cepat untuk React Native, dengan performa jauh lebih baik daripada [`AsyncStorage`](asynchronous-storage.md). Library paling populer adalah [react-native-mmkv](https://github.com/mrousavy/react-native-mmkv). `MMKV` cocok untuk data yang perlu akses cepat & sering seperti token, preferensi, cache, dsb karena sepenuhnya bekerja secara *synchronous*.

## Fitur Utama
- Mendukung penyimpanan string, boolean, number, ArrayBuffer
- Operasi *synchronous*, tanpa *async*/*await*, tanpa *Promise* dan *Bridge*
- Mendukung enkripsi
- Mendukung multiple instances (misalnya memisahkan data user vs settings)
- Mendukung iOS, Android, dan Web

## Instalasi
React Native CLI:
```bash
npm install react-native-mmkv react-native-nitro-modules
```

Jika menggunakan iOS:
```bash
cd ios && pod install
```

Expo:
```bash
npx expo install react-native-mmkv react-native-nitro-modules
npx expo prebuild
```

### API Dasar MMKV
| Kebutuhan                              | Fungsi                                                                |
| -------------------------------------- | --------------------------------------------------------------------- |
| Menyimpan data                         | `set(key, value)`                                                     |
| Mengambil string                       | `getString(key)`                                                      |
| Mengambil angka                        | `getNumber(key)`                                                      |
| Mengambil boolean                      | `getBoolean(key)`                                                     |
| Hook React untuk data otomatis sinkron | `useMMKVString(key)`<br>`useMMKVNumber(key)`<br>`useMMKVBoolean(key)` |
| Mengecek apakah key tersedia           | `contains(key)`                                                       |
| Mendapatkan semua key                  | `getAllKeys()`                                                        |
| Hapus data                             | `remove(key)`                                                         |
| Hapus seluruh data                     | `clearAll()`                                                         |
| Enkripsi ulang data                    | `recrypt(newKey)`                                                     |
| Menghapus enkripsi                     | `recrypt(undefined)`                                                  |


`MMKV` menyediakan beberapa API utama, namun sebelum menggunakan API MMKV, sebuah `instance` dengan konstruktor `MMKV` wajib dibuat. `Instance` ini akan digunakan di seluruh aplikasi, sehingga tidak perlu membuat `instance` baru untuk setiap fungsi.


### Membuat instance MMKV
```tsx
import { createMMKV } from 'react-native-mmkv'

export const storage = createMMKV()
```

Atau jika ingin enkripsi
```tsx
import { createMMKV } from 'react-native-mmkv'

export const secureStorage = createMMKV({
  id: "secure",
  encryptionKey: "my-secret-key"
});
```

**Penjelasan**
- `id`: digunakan sebagai nama file penyimpanan di perangkat, sekaligus sebagai pembeda antar-`instance`.
- `encryptionKey`: digunakan sebagai kunci enkripsi/dekripsi, jika option ini tidak dikonfigurasi, maka seluruh data akan disimpan seperti aslinya tanpa di enkripsi.


### `set` - Menyimpan data
```tsx
storage.set("user.token", "abc123.jwt");
storage.set("user.age", 25);
storage.set("darkMode", true);
```

### `get` - Mengambil data
```tsx
const token = storage.getString("user.token");
const age = storage.getNumber("user.age");
const dark = storage.getBoolean("darkMode");
```

### Jika ingin menyimpan dan mendapatkan data object
```tsx
const user = {
  token: 'abc123.jwt',
  age: 25,
}

storage.set('user', JSON.stringify(user))

const jsonUser = storage.getString('user') // { 'token': 'abc123.jwt', 'age': 25 }
const userObject = JSON.parse(jsonUser)
```

### Jika ingin menyimpan dan mendapatkan buffer
```tsx
const buffer = new ArrayBuffer(3)
const dataWriter = new Uint8Array(buffer)
dataWriter[0] = 1
dataWriter[1] = 100
dataWriter[2] = 255
storage.set('someToken', buffer)

const buffer = storage.getBuffer('someToken')
console.log(buffer) // [1, 100, 255]
```

### `useMMKVString` - Hooks
```tsx
const [usertoken, setUsertoken] = useMMKVString('user.token');
const [age, setAge] = useMMKVNumber('user.age');
const [darkmode, setDarkMode] = useMMKVBoolean('darkMode');
```

### `contains` - Cek ketersediaan key
```tsx
const hasUsername = storage.contains('user.name')  // false
const hasToken = storage.contains('user.token')  // true
```

### `getAllKeys` - Mengambil seluruh key
```tsx
const keys = storage.getAllKeys() // ['user.token', 'user.age', 'darkMode']
```

### `remove` - Menghapus key tertentu
```tsx
const wasRemoved = storage.remove('user.token');
```

### `clearAll` - Menghapus seluruh key
```tsx
storage.clearAll();
```

### `recrypt` - Enkripsi menggunakan private key atau menghapus enkripsi
Gunakan fungsi ini jika pada saat membuat `instance` MMKV tidak menambahkan opsi `encryptionKey` atau jika ingin menggunakan private key baru
```tsx
storage.recrypt('my-private-key');
```
Dapat digunakan untuk menghapus enkripsi
```tsx
storage.recrypt(undefined);
```

### Contoh: Simulasi Login dan Simpan Token

Struktur folder:
```bash
/src
  ├── context
  |      └── AuthContext.tsx
  ├── navigation
  |      └── AppNavigator.tsx
  └── screens
  |      ├── HomeScreen.tsx
  |      ├── LoginScreen.tsx
  |      └── RegisterScreen.tsx
  └── storage
         └── MMKVStorage.ts
App.tsx
```

Pastikan plugin [navigasi](navigation.md) sudah ter-*install* pada project.

**MMKVStorage.ts**
```tsx
import { createMMKV } from "react-native-mmkv"

export interface User {
    name: string,
    email: string,
    isAuthenticated: boolean,
    token: string
};

export const storage = createMMKV({
    'id': 'app-storage',
    'encryptionKey': 'my-app-private-key'
})

export const MMKVStorage = {
    setUser: (user: User | null) => {
        if (user) {
            storage.set('user', JSON.stringify(user));
        }
        return
    },

    getUser: (): User | null => {
        const data = storage.getString('user');
        return data ? JSON.parse(data) : null;
    },

    removeUser: () => {
        storage.remove('user');
    },
}
```

**AuthContext.tsx**
```tsx
import { createContext, useContext, useEffect, useState } from "react";
import { useMMKVString } from "react-native-mmkv";
import { MMKVStorage, User } from "../storage/MMKVStorage";


interface AuthContextProps {
    user: User | null,
    register: (name: string, email: string) => void,
    login: () => void,
    logout: () => void
};

const AuthContext = createContext<AuthContextProps | null>(null);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const [user, SetUser] = useState<User | null>(null);

    useEffect(() => {
        const savedUser = MMKVStorage.getUser();
        console.log(savedUser);

        SetUser(savedUser);
    }, []);

    useEffect(() => {
        MMKVStorage.setUser(user);
    }, [user])

    const register = (name: string, email: string) => {
        const newUser: User = {
            name,
            email,
            isAuthenticated: false,
            token: ""
        }
        SetUser(newUser);
    }

    const login = () => {
        if (!user) return;

        const loggedUser: User = {
            name: user['name'],
            email: user['email'],
            isAuthenticated: true,
            token: "TOKEN_" + Math.random().toString(36).substring(2, 12),
        };
        SetUser(loggedUser)

    }

    const logout = () => {
        if (user) {
            const loggedUser: User = {
                name: user['name'],
                email: user['email'],
                isAuthenticated: false,
                token: ""
            };
            SetUser(loggedUser)
        } else {
            return;
        }
    }

    return (
        <AuthContext.Provider value={{ user, register, login, logout }}>
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

**HomeScreen.tsx**
```tsx
import { Text, TouchableOpacity, View } from "react-native";
import { useAuth } from "../context/AuthContext";

export default function HomeScreen() {
    const { user, logout } = useAuth();
    return (
        <View style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center'
        }}>
            <Text style={{
                fontSize: 32,
            }}>
                Selamat datang, {user?.name}
            </Text>

            <TouchableOpacity style={{ padding: 12, marginTop: 20, borderRadius: 10, backgroundColor: '#16476A', alignItems: 'center' }} onPress={logout}>
                <Text style={{ color: '#ffffff' }}>Logout</Text>
            </TouchableOpacity>
        </View>
    )
}
```

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

**RegisterScreen.tsx**
```tsx
import { View, Text, TouchableOpacity, TextInput } from "react-native";
import { MMKV } from "react-native-mmkv";
import { useAuth } from "../context/AuthContext";
import { useState } from "react";

export default function RegisterScreen({ navigation }: any) {
    const { user, register } = useAuth();
    const [name, setName] = useState("");
    const [mail, setMail] = useState("");

    const registerHandler = () => {
        register(name, mail);
    }

    return (
        <View style={{ flex: 1, padding: 20, justifyContent: "center" }}>
            <Text style={{ fontSize: 26, fontWeight: "bold", marginBottom: 20 }}>
                Register
            </Text>

            <TextInput
                placeholder="Nama"
                value={name}
                onChangeText={setName}
                style={{
                    borderWidth: 1,
                    borderRadius: 10,
                    padding: 12,
                    marginBottom: 10,
                }}
            />

            <TextInput
                placeholder="Email"
                value={mail}
                onChangeText={setMail}
                style={{
                    borderWidth: 1,
                    borderRadius: 10,
                    padding: 12,
                    marginBottom: 10,
                }}
            />
            <TouchableOpacity
                onPress={registerHandler}
                style={{
                    backgroundColor: "#0066ff",
                    padding: 15,
                    borderRadius: 10,
                    alignItems: "center",
                }}
            >
                <Text style={{ color: "white", fontSize: 18 }}>
                    Register
                </Text>
            </TouchableOpacity>
            {user ? (
                <TouchableOpacity
                    onPress={() => navigation.navigate("Login")}
                    style={{ marginTop: 20 }}
                >
                    <Text style={{ color: "#0066ff", textAlign: "center" }}>
                        Sudah punya akun? Login
                    </Text>
                </TouchableOpacity>
            ) : (<View></View>)}
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
import RegisterScreen from "../screens/RegisterScreen";
import { useEffect, useState } from "react";
import LoginScreen from "../screens/LoginScreen";

const Stack = createNativeStackNavigator();
export default function AppNavigator() {
    const { user } = useAuth();
    let initialPage = 'Register';

    if (user) {
        if (user.isAuthenticated) {
            initialPage = 'Home';
        } else {
            initialPage = 'Login';
        }
    } else {
        initialPage = 'Register';
    }


    return (
        <NavigationContainer>
            <Stack.Navigator screenOptions={{ headerShown: false }} >
                {!user && (
                    <Stack.Screen name="Register" component={RegisterScreen} />
                )}

                {user && !user.isAuthenticated && (
                    <Stack.Screen name="Login" component={LoginScreen} />
                )}

                {user && user.isAuthenticated && (
                    <Stack.Screen name="Home" component={HomeScreen} />
                )}
            </Stack.Navigator >
        </NavigationContainer>
    );
}
```

**App.tsx**
```tsx
import { AuthProvider } from './src/context/AuthContext';
import { NavigationContainer } from '@react-navigation/native';
import AppNavigator from './src/navigation/AppNavigator';

export default function App() {
  return (
    <AuthProvider>
      <AppNavigator />
    </AuthProvider>
  );
}
```











