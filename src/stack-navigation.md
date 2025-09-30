# Stack Navigation

## Konsep Dasar

- Stack navigation mirip tumpukan kartu.
- Setiap kali pindah ke layar baru → layar ditaruh di atas stack.
- Ketika kembali → layar di atas dihapus, dan kita kembali ke layar sebelumnya.
- Ini cocok untuk alur seperti: `Home → Detail → Settings`
- Mekanismenya mirip riwayat browser:
    - `navigate()` = buka halaman baru dan `push` stack.
    - `goBack()` = kembali ke halaman sebelumnya `pop` stack.

## Struktur Implementasi
Sebenarnya, navigasi jenis ini dapat diinisialisasi langsung pada file main yaitu `App.tsx`. Struktur modular lebih disukai karena kemudahannya dalam proyek jangka panjang yang selalu berkembang.

```bash
project/
│ App.tsx
│
├── navigations/
│   └── StackNavigator.tsx
│
└── screens/
    ├── HomeScreen.tsx
    └── DetailScreen.tsx
```

## Instalasi
```bash
npm install @react-navigation/native-stack
```

## Contoh

### screens/HomeScreen.tsx
```javascript
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { View, Text, Button } from 'react-native';
import { RootStackParamList } from '../navigations/StackNavigator';

type Props = NativeStackScreenProps<RootStackParamList, 'Home'>

export default function HomeScreen({ navigation }: Props) {
    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Text style={{ fontSize: 20 }}>Ini Home Screen</Text>
            <Button
                title="Lihat Detail"
                onPress={() => navigation.navigate('Detail', { id: 101, barang: "Laptop" })}
            />
        </View>
    );
}
```
- `Props = NativeStackScreenProps<RootStackParamList, 'Home'>`: mendefinisikan props khusus untuk halaman Home. Strukturnya dapat dilihat pada [bagian ini](#TabNavigator.tsx).
- `navigation`: digunakan untuk berpindah ke halaman lain.
- `navigation.navigate('Detail', { id: 101, barang: "Laptop" })`: pindah ke halaman Detail, sekaligus mengirim data id = 101 dan barang = "Laptop".

Jadi, `HomeScreen.tsx` adalah halaman awal aplikasi yang dapat mengarahkan user ke halaman detail dengan parameter.


### screens/DetailScreen.tsx
```javascript
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { View, Text, Button } from 'react-native';
import { RootStackParamList } from '../navigations/StackNavigator';

type Props = NativeStackScreenProps<RootStackParamList, 'Detail'>

export default function DetailScreen({ route, navigation }: Props) {
    const { id, barang } = route.params || {};

    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Text style={{ fontSize: 20 }}>Ini Detail Screen</Text>
            <Text>ID: {id}</Text>
            <Text>Barang: {barang}</Text>
            <Button title="Kembali" onPress={() => navigation.goBack()} />
        </View>
    );
}
```

- `Props = NativeStackScreenProps<RootStackParamList, 'Detail'>`: tipe props khusus untuk halaman Detail. Strukturnya dapat dilihat pada [bagian ini](#TabNavigator.tsx).
- `route.params`: berisi data yang dikirim dari Home.
- `navigation`: digunakan untuk kembali atau pindah ke halaman lain.
- `const { id, barang } = route.params`: mengambil parameter id dan barang.

Jadi, `DetailScreen.tsx` adalah halaman kedua yang menerima data dari Home dan bisa kembali ke halaman sebelumnya.

### navigations/StackNavigator.tsx{#TabNavigator.tsx}
```javascript 
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from '../screens/HomeScreen';
import DetailScreen from '../screens/DetailScreen';

export type RootStackParamList = {
    Home: undefined,
    Detail: { id: number, barang: string }
}

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function StackNavigator() {
    return (
        <Stack.Navigator initialRouteName="Home"
            screenOptions={{
                headerStyle: {
                    backgroundColor: '#f4511e',
                },
                headerTintColor: '#fff',
                headerTitleStyle: {
                    fontWeight: 'bold',
                },
            }}
        >
            <Stack.Screen
                name="Home"
                component={HomeScreen}
                options={{
                    title: 'Halaman Utama',
                }}
            />
            <Stack.Screen
                name="Detail"
                component={DetailScreen}
                options={{ title: 'Detail Item' }}
            />
        </Stack.Navigator>
    );
}
```
- `RootStackParamList`: mendefinisikan semua screen dan parameter yang boleh dipassing.
  - `Home: undefined`: Home tidak menerima parameter.
  - `Detail: { id: number, barang: string }`: Detail wajib menerima parameter id bertipe number dan barang bertipe string.
- `createNativeStackNavigator<RootStackParamList>()`: membuat navigator dengan dukungan type checking TypeScript.
- `Stack.Navigator`: mendefinisikan kumpulan screen.
- `initialRouteName="Home"`: halaman pertama.
- `screenOptions`: konfigurasi header dan `options` lainnya dapat dilihat pada <a href="https://reactnavigation.org/docs/native-stack-navigator#options" target="_blank">halaman ini</a>
- `Stack.Screen`: tiap layar didaftarkan di sini dengan:
  - `name`: nama route.
  - `component`: file halaman.
  - `options`: properti tambahan (misalnya judul di header).
  - API lainnya dapat dilihat pada <a href="https://reactnavigation.org/docs/stack-navigator/#api-definition" target="_blank">halaman ini</a> 

Jadi, `StackNavigator.tsx` adalah peta aplikasi yang mengatur halaman apa saja yang ada dan bagaimana rutenya.
  


### App.tsx
```javascript 
import { NavigationContainer } from '@react-navigation/native';
import StackNavigator from './navigations/StackNavigator';

export default function App() {
  return (
    <NavigationContainer>
      <StackNavigator />
    </NavigationContainer>
  );
}

```
- `NavigationContainer`: komponen utama dari React Navigation yang membungkus seluruh aplikasi. Tanpa ini, navigasi tidak dapat berjalan.
- `StackNavigator`: definisi struktur navigasi.

Jadi, `App.tsx` adalah pintu masuk aplikasi yang menghubungkan navigasi dengan seluruh halaman.