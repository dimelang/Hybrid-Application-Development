# Asynchronous Storage

Menyimpan data secara lokal di perangkat pengguna menggunakan format key–value. Berbeda dengan `localStorage` pada web yang bersifat **sinkron**, `AsyncStorage` bersifat **asinkron** dan berjalan secara efisien di perangkat mobile. Data yang disimpan menggunakan `AsyncStorage` akan tetap ada meskipun aplikasi ditutup atau perangkat direstart.

`AsyncStorage` sangat cocok digunakan untuk:

- Menyimpan token autentikasi (login session)
- Menyimpan preferensi aplikasi (tema, bahasa, settings)
- Cache ringan (misalnya data hasil fetch)
- Menyimpan daftar recent items atau history

Sebelum menggunakan [`AsyncStorage`](https://react-native-async-storage.github.io/2.0/), terdapat beberapa hal yang perlu dilakukan yaitu instalasi dependency dan melakukan rebuild plugin.

## Instalasi

Expo:
```bash
npx expo install @react-native-async-storage/async-storage
```

React Native CLI:
```bash
npm install @react-native-async-storage/async-storage
cd android && ./gradlew clean && cd ..
```


### API Dasar AsyncStorage
AsyncStorage menyediakan beberapa API utama:

| Kebutuhan                         | Fungsi                                |
| --------------------------------- | ------------------------------------- |
| Menyimpan data                    | `setItem(key: string, value: string)` |
| Mengambil data                    | `getItem(key:string)`                 |
| Menghapus data                    | `removeItem(key:string)`              |
| Menghapus semua data              | `clear()`                             |
| Menyimpan banyak data sekaligus   | `multiSet(keyValuePairs: Array<Array<string>>)`          |
| Mengambil banyak data sekaligus   | `multiGet(keys: Array<string>)`          |
| Menghapus beberapa data sekaligus | `multiRemove(keys: Array<string>)`       |

Semua data harus berupa string. Untuk object gunakan:
```js
JSON.stringify() // saat menyimpan
JSON.parse()      // saat membaca
```

### `setItem` - Menyimpan Data
```tsx
import AsyncStorage from '@react-native-async-storage/async-storage';

const saveUser = async () => {
  const user = { name: 'John Doe', age: 27 };
  await AsyncStorage.setItem('user', JSON.stringify(user));
};
```

### `getItem` - Mengambil Data
```tsx
const loadUser = async () => {
  const jsonValue = await AsyncStorage.getItem('user');
  return jsonValue != null ? JSON.parse(jsonValue) : null;
};
```


### `removeItem` - Menghapus Data
```tsx
const deleteUser = async () => {
  await AsyncStorage.removeItem('user');
};
```

### `clear` - Menghapus Data
```tsx
const clearUser = async () => {
  await AsyncStorage.clear();
};
```

### `multiSet` - Menyimpan Banyak Data
```tsx
import AsyncStorage from '@react-native-async-storage/async-storage';

const saveMultiUser = async () => {
  await AsyncStorage.multiSet([
    ['user:1', JSON.stringify({ name: 'John', age: 27 })],
    ['user:2', JSON.stringify({ name: 'Doe', age: 30 })],
  ]);
};
```

### `multiGet` - Mengambil Mutli Data
```tsx
import AsyncStorage from '@react-native-async-storage/async-storage';

const getMultiUser = async () => {
  const values = await AsyncStorage.multiGet(['user:1', 'user:2']);

  const users = values.map(([key, value]) => JSON.parse(value));
  return users;
};
```

### `multiRemove` - Menghapus Mutli Data
```tsx
import AsyncStorage from '@react-native-async-storage/async-storage';

const removeMultiUser = async () => {
  const keys = ['user:1', 'user:2'];
  await AsyncStorage.multiRemove(keys);
};
```


### Contoh 1: Theme Manager
Menggunakan AsyncStorage untuk menyimpan pilihan tema (light/dark) sehingga tema tetap tersimpan meskipun aplikasi ditutup. Agar lebih rapi dan scalable, kita menggunakan: 

- **Context API** → menyimpan state tema
- **AsyncStorage** → menyimpan tema secara persistent
- **ThemeStyle generator** → menghasilkan style sesuai tema
- **GlobalThemeStyle** → definisi warna untuk light/dark

Struktur folder:
```bash
/src
  ├── context
  |      └── ThemeContext.tsx
  ├── screens
  |      └── HomeScreen.tsx
  ├── styles
  |      └── GlobalThemeStyle.ts
  └── utils
         └── ThemeStyle.tsx
App.tsx
```

**ThemeContext.tsx**
```tsx
import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { createContext, useContext, useEffect, useState } from "react";

type ThemeType = 'light' | 'dark';
interface ThemeContextProps {
    theme: ThemeType,
    toggleTheme: () => void;
};

const ThemeContext = createContext<ThemeContextProps | undefined>(undefined);

export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
    const [theme, setTheme] = useState<ThemeType>('light');

    useEffect(() => {
        const loadTheme = async () => {
            const stored = await AsyncStorage.getItem('app_theme');
            if (stored === 'light' || stored === 'dark') {
                setTheme(stored);
            }
        };

        loadTheme();
    }, []);

    const toggleTheme = async () => {
        const newTheme = theme === 'light' ? 'dark' : 'light';

        setTheme(newTheme);
        await AsyncStorage.setItem('app_theme', newTheme);
    };

    return (
        <ThemeContext.Provider value={{ theme, toggleTheme }}>
            {children}
        </ThemeContext.Provider>
    );
}


export const useTheme = () => {
    const ctx = useContext(ThemeContext);
    if (!ctx) throw new Error("useTheme must be used within ThemeProvider");
    return ctx;
};
```


**HomeScreen.tsx**
```tsx
import { Text, View, TouchableOpacity } from "react-native";
import { useTheme } from "../context/ThemeContext";
import { DarkTheme, LightTheme } from "../styles/GlobalThemeStyle";
import { createThemeStyle } from "../utils/ThemeStyle";

export default function HomeScreen() {
    const { theme, toggleTheme } = useTheme();
    const colors = theme === "light" ? LightTheme.colors : DarkTheme.colors;
    const styles = createThemeStyle(colors);


    return (
        <View style={styles.container}>
            <Text style={styles.text}>Tema saat ini: {theme.toUpperCase()}</Text>

            <View style={styles.card}>
                <Text style={styles.text}>Card ini berubah sesuai tema 🎨</Text>
            </View>

            <TouchableOpacity style={styles.button} onPress={toggleTheme}>
                <Text style={styles.buttonText}>Ganti Tema</Text>
            </TouchableOpacity>
        </View>
    );
}
```

**GlobalThemeStyle.ts**
```tsx
export const LightTheme = {
    colors: {
        background: '#ffffff',
        text: '#000000',
        card: '#f0f0f0',
        button: '#8CA9FF'
    },
};

export const DarkTheme = {
    colors: {
        background: '#000000',
        text: '#ffffff',
        card: '#222222',
        button: '#16476A'
    },
};
```

**ThemeStyle.tsx**
```tsx
import { StyleSheet } from "react-native"


export const createThemeStyle = (colors: any) => {
    return StyleSheet.create({
        container: {
            flex: 1,
            backgroundColor: colors.background,
            padding: 20,
        },
        text: {
            color: colors.text,
            fontSize: 18,
        },
        card: {
            backgroundColor: colors.card,
            padding: 16,
            borderRadius: 12,
            marginTop: 20,
        },
        button: {
            padding: 12,
            marginTop: 20,
            borderRadius: 10,
            backgroundColor: colors.button,
            alignItems: "center",
        },
        buttonText: {
            color: colors.text,
            fontWeight: "600",
        },
    });
}
```

**App.tsx**
```tsx
import AsyncStorage from '@react-native-async-storage/async-storage';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { ThemeProvider } from './src/context/ThemeContext';
import HomeScreen from './src/screens/HomeScreen';

export default function App() {
  return (
    <ThemeProvider>
      <HomeScreen />
    </ThemeProvider>
  );
}
```

<!-- ### Contoh 2: Simulasi Login dan Simpan Token
Menggunakan AsyncStorage untuk menyimpan token autentikasi token tetap tersimpan meskipun aplikasi ditutup. Agar lebih rapi dan scalable, kita menggunakan: 

- **Context API** → menyimpan state token
- **AsyncStorage** → menyimpan token secara persistent
- **Navigation** → mengatur route secara dinamis

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

**AuthContext.tsx**
```tsx
import AsyncStorage from "@react-native-async-storage/async-storage";
import { createContext, useContext, useEffect, useState } from "react";


interface AuthContextProps {
    token: string | undefined,
    login: () => void,
    logout: () => void
}

export const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const [token, setToken] = useState<string | undefined>(undefined);

    useEffect(() => {
        const loadToken = async () => {
            const storedToken = await AsyncStorage.getItem('token');
            if (storedToken) {
                setToken(storedToken);
            }
        };
        loadToken();
    }, []);

    const login = async () => {
        const fakeToken = 'dNxH8zZ9xfMFzSswaNhoBCS1SQznZjkUhsuHO8u8yhuU190NhbshdbkjBM08';
        await AsyncStorage.setItem('token', fakeToken);
        setToken(fakeToken);
    }

    const logout = async () => {
        await AsyncStorage.removeItem('token');
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
    if (!ctx) throw new Error("useAuth must be used within ThemeProvider");
    return ctx;
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

Pastikan telah me-*install* depedency routing

**HomeScreen.tsx**
```tsx
import { Text, View, TouchableOpacity } from "react-native";
import { useAuth } from "../context/AuthContext";

export default function HomeScreen() {
    const { logout } = useAuth();

    return (
        <View style={{flex: 1, backgroundColor: '#ffffff'}}>
            <TouchableOpacity style={{padding: 12, marginTop:20, borderRadius:10, backgroundColor:'#16476A', alignItems: 'center' }} onPress={logout}>
                <Text style={{color: '#ffffff'}}>Logout</Text>
            </TouchableOpacity>
        </View>
    );
}
```

**LoginScreen.tsx**
```tsx
import { Text, TouchableOpacity, View } from "react-native";
import { useAuth } from "../context/AuthContext";

export default function LoginScreen() {
    const { login } = useAuth();

    const loginHandler = () => {
        login();
    }

    return (
        <View style={{ justifyContent: 'center', flex: 1, padding: 20, backgroundColor: '#ffff' }}>
            <TouchableOpacity style={{ padding: 10, borderRadius: 10, backgroundColor: '#F875AA' }} onPress={loginHandler}>
                <Text style={{ color: "#EDFFF0", fontSize: 18, alignSelf: 'center' }}>Login</Text>
            </TouchableOpacity>
        </View>
    );
}
```

**App.tsx**
```tsx
import AsyncStorage from '@react-native-async-storage/async-storage';
import { StyleSheet, Text, View } from 'react-native';
import { AuthProvider } from './src/context/AuthContext';
import AppNavigator from './src/navigation/AppNavigator';

export default function App() {
  return (
    <AuthProvider>
      <ThemeProvider>
        <AppNavigator />
      </ThemeProvider>
    </AuthProvider>
  );
}
``` -->