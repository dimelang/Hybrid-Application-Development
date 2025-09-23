# Komponen React Native
Ketika kita membuat sebuah aplikasi, sebenarnya kita sedang menyusun potongan-potongan kecil yang bersama-sama membentuk satu kesatuan tampilan. Potongan kecil ini dalam React Native disebut komponen. Bisa dibilang, komponen adalah "building blocks" dari aplikasi mobile.

Hal menarik lainnya, React Native tidak hanya menyediakan komponen bawaan, tapi kita juga dapat membuat komponen buatan sendiri (custom component). Ini membuat kode kita lebih terstruktur, lebih mudah digunakan ulang, dan tentu saja lebih rapi.

Dalam **React Native**, `App.tsx` merupakan file utama yang pertama kali dijalankan ketika aplikasi dibuka. Kalau di web, mirip seperti `index.html` + `index.js`.

### Struktur dasar `App.tsx` (React Native CLI)

```ts
import { NewAppScreen } from '@react-native/new-app-screen';
import { StatusBar, StyleSheet, useColorScheme, View } from 'react-native';
import {
  SafeAreaProvider,
  useSafeAreaInsets,
} from 'react-native-safe-area-context';

function App() {
  const isDarkMode = useColorScheme() === 'dark';

  return (
    <SafeAreaProvider>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      <AppContent />
    </SafeAreaProvider>
  );
}

function AppContent() {
  const safeAreaInsets = useSafeAreaInsets();

  return (
    <View style={styles.container}>
      <NewAppScreen
        templateFileName="App.tsx"
        safeAreaInsets={safeAreaInsets}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default App;
```

Template default React Native CLI memang terlihat cukup kompleks bagi yang pertama kali belajar. Silahkan ubah kode di atas menjadi:
```ts
import { NewAppScreen } from '@react-native/new-app-screen';
import { StatusBar, StyleSheet, useColorScheme, View } from 'react-native';
import {
  SafeAreaProvider,
  useSafeAreaInsets,
} from 'react-native-safe-area-context';

function App() {
  const isDarkMode = useColorScheme() === 'dark';

  return (
    <SafeAreaProvider>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      <AppContent />
    </SafeAreaProvider>
  );
}

function AppContent() {
  const safeAreaInsets = useSafeAreaInsets();

  return (
    <View style={[styles.container,{ paddingTop: safeAreaInsets.top, paddingBottom: safeAreaInsets.bottom }]}>
      <View style={styles.center}>
        <Text style={styles.title}>Hello React Native 🚀</Text>
        <Text style={styles.subtitle}>Aplikasi pertama saya dengan CLI</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f0f0',
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333',
  },
  subtitle: {
    fontSize: 18,
    color: '#666',
    marginTop: 8,
  },
});

export default App;
```

### Struktur dasar `App.tsx` (Expo)
```ts
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';

export default function App() {
  return (
    <View style={styles.container}>
      <Text>Open up App.tsx to start working on your app!</Text>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
```

Coba ubah bagian `<Text>` menjadi berikut:
```ts
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';

export default function App() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Hello React Native dengan Expo 🚀</Text>
      <Text style={styles.subtitle}>Aplikasi pertama saya</Text>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f0f0',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333',
  },
  subtitle: {
    fontSize: 18,
    color: '#555',
    marginTop: 8,
  },
});
```
Amati perbedaan sebelum dan sesudah dimodifikasi.

React Native menyediakan sekumpulan komponen bawaan (built-in components) yang digunakan untuk membangun UI aplikasi. Komponen ini mirip dengan elemen HTML di web, tetapi disesuaikan dengan dunia mobile.

Selain komponen bawaan dari React Native, kita juga dapat menggunakan third-party yang sudah terkenal seperti [React Native Paper](https://reactnativepaper.com/), [GlueStack](https://gluestack.io/), [React Native Elements](https://reactnativeelements.com/), [UI Kitten](https://akveo.github.io/react-native-ui-kitten/), dan [Tamagui](https://tamagui.dev/)


