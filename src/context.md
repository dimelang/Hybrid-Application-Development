# Context (`useContext`)

Ketika ukuran aplikasi masih tergolong kecil, komunikasi antar komponen yang umumnya melalui `props` cukup mudah dilakukan. Bayangkan apabila data yang dikirimkan ke banyak komponen dan berada di hirarki yang cukup dalam. Menggunakan `props` untuk mengirimkan data ke setiap level tentunya bukan teknik yang efektif karena nantinya akan mempersulit pengelolaan aplikasi. 

Dengan `context`, data dapat disimpan secara global sehingga dapat diakses oleh komponen mana pun tanpa harus melempar data menggunakan `props`.

Secara sederhana, `Context` memiliki tiga bagian utama:
- **Membuat Context** → menggunakan `React.createContext()`.
- **Provider** → komponen yang membungkus bagian aplikasi, dan isinya adalah data yang akan dibagikan.
- **Consumer** → komponen yang membaca data dari `Context`.

## Contoh: Theme Context (Dark/Light Mode)

Struktur folder:

```bash
/components
   └── ThemedButton.tsx
/context
   └── ThemeContext.tsx
/screens
   └── HomeScreen.tsx
App.tsx
```

**ThemeContext.tsx**
```jsx
import React from "react";
import { createContext, useState } from "react";

type ContextType = {
    theme:string,
    toggleTheme: () => void
}

type Props = {
    children: ReactNode
}

export const ThemeContext = createContext<ContextType>('light'); // nilai default

export function ThemeProvider({ props }:Props) {
    const [theme, setTheme] = useState('light');
    const toggleTheme = () => setTheme(theme == 'light' ? 'dark' : 'light');
    return (
        <ThemeContext.Provider value={{ theme, toggleTheme }}>
            {props.children}
        </ThemeContext.Provider>
    );
}
```
`createContext('light')` bertindak sebagai wadah (context) untuk menyimpan data yang dapat digunakan di seluruh komponen. Di sini context akan menyimpan theme (light/dark) dan fungsi toggleTheme.

`ThemeProvider` adalah komponen pembungkus dengan `state` awal bernilai light. `ThemeContext.Provider` membagikan data (`theme`, `toggleTheme`) ke semua komponen di dalamnya (`children`). Artinya, komponen apa pun yang ada di bawah `ThemeProvider` dapat mengambil `theme` dan `toggleTheme`.

**ThemedButton.tsx**
```jsx
import { useContext } from "react";
import { ThemeContext } from "../context/ThemeContext";
import { Text, TouchableOpacity } from "react-native";

type Props = {
    title: string,
    onPress: () => void
};

export default function ThemedButton({props}:Props) {
    const { theme } = useContext(ThemeContext);

    const backgroundColor = theme === 'light' ? '#007BFF' : '#555';
    const textColor = theme === 'light' ? '#fff' : '#ddd';

    return (
        <TouchableOpacity
            style={{
                backgroundColor,
                padding: 12,
                borderRadius: 8,
                margin: 5,
            }}
            onPress={props.onPress}>
            <Text style={{ color: textColor, fontWeight: 'bold' }}>{props.title}</Text>
        </TouchableOpacity>
    );
}
```

**HomeScreen.tsx**
```jsx
import { useContext } from "react";
import { ThemeContext } from "../context/ThemeContext";
import { Text, View } from "react-native";
import ThemedButton from "../components/ThemedButton";

export default function HomeScreen() {
    const { theme, toggleTheme } = useContext(ThemeContext);
    return (
        <View style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: theme === 'light' ? '#fff' : '#333',
        }}>
            <Text style={{ color: theme === 'light' ? '#000' : '#fff' }}>
                Tema saat ini: {theme}
            </Text>
            <ThemedButton title="Ganti Tema" onPress={toggleTheme} />
            <ThemedButton title="Button Tambahan" onPress={() => { }} />

        </View>
    );
}
```

`useContext(ThemeContext)` digunakan untuk mengakses value atau fungsi yang diturunkan oleh `ThemeContext`.

**App.tsx**
```jsx
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { ThemeProvider } from './context/ThemeContext';
import HomeScreen from './screens/HomeScreen';

export default function App() {
  return (
    <ThemeProvider>
      <HomeScreen />
    </ThemeProvider>
  );
}
```

## Alur Program
1. `App.tsx` → Komponen parent yang membungkus seluruh komponen lainnya dengan `ThemeProvider` agar seluruh komponen *child* dapat mengakses `ThemeContext`.
2. `ThemeContext.tsx` → Menyimpan state tema (`light` atau `dark`) dan menyediakan fungsi `toggleTheme` untuk mengubah `state` tema.
3. `HomeScreen.tsx` → Menampilkan teks sesuai tema + tombol untuk ganti tema.
4. `ThemedButton.tsx` → Komponen tombol yang mengatur gaya sesuai tema.


