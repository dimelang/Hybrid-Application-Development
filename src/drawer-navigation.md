# Drawer Navigation

## Konsep Dasar
- Drawer navigation menampilkan menu geser dari sisi kiri layar (kadang kanan).
- Setiap item di drawer mengarah ke sebuah halaman atau bahkan ke navigator lain (Stack / Tabs).
- Cocok untuk aplikasi dengan banyak menu yang tidak cukup untuk dimuat pada bottom tab, misalnya: `Home`, `Profile`, `Settings`, `About`.
- Karakteristiknya:
    - Drawer dapat dimunculkan melalui gesture swipe atau tombol hamburger menu.
    - Drawer dapat dikustomisasi dengan menambahkan ikon, avatar, atau section.

## Struktur Implementasi
```bash
project/
│ App.tsx
│
├── navigations/
│   └── TabNavigator.tsx
│
└── screens/
    ├── HomeScreen.tsx
    ├── SearchScreen.tsx
    ├── SettingScreen.tsx
    └── ProfileScreen.tsx
```
Struktur project di atas bukanlah aturan yang wajib diikuti. Struktur di atas menggunakan pendekatan modular karena:
- Maintainable: mudah diatur jika screen semakin banyak.
- Scalable: mudah menambahkan jenis navigasi lainnya seperti Stack atau Drawer.
- Clean code: App.tsx tetap terlihat ringkas.


## Instalasi
```bash
npm install @react-navigation/drawer
npx expo install @expo/vector-icons
```

## Contoh

### screens/HomeScreen.tsx
```javascript
import { DrawerScreenProps } from "@react-navigation/drawer";
import { RootParamList } from "../navigations/DrawerNavigator";
import { Button, Text, View } from "react-native";

type Props = DrawerScreenProps<RootParamList, 'Home'>;

export default function HomeScreen({ navigation }: Props) {
    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', gap: 15 }}>
            <Text style={{ fontSize: 20 }}>Ini Home Screen</Text>
            <Button title="Profile" onPress={() => navigation.navigate('Profile', { id: 666, nama: 'John Doe' })} />
        </View>
    );
}
```
- `Props = DrawerScreenProps<RootParamList, 'Home'>`: mendefinisikan props khusus untuk halaman Home.
- `navigation`: digunakan untuk berpindah ke halaman lain.
- `navigation.navigate('Profile')`: pindah ke halaman Profile sekaligus mengirim data id = 666 dan barang = "John Doe".

Jadi, `HomeScreen.tsx` adalah halaman awal aplikasi yang dapat mengarahkan user ke halaman Profile dengan parameter.

### screens/ProfileScreen.tsx
```javascript
import { DrawerScreenProps } from "@react-navigation/drawer";
import { RootParamList } from "../navigations/DrawerNavigator";
import { Text, View } from "react-native";

type Props = DrawerScreenProps<RootParamList, 'Profile'>;

export default function ProfileScreen({ route, navigation }: Props) {
    const { id, nama } = route.params || {};
    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', gap: 15 }}>
            <Text style={{ fontSize: 22 }}>Ini adalah halaman profil, halo</Text>
            <Text style={{ fontSize: 18 }}>id: {id}</Text>
            <Text style={{ fontSize: 18 }}>nama: {nama}</Text>
        </View>
    );
}
```
- `Props = DrawerScreenProps<RootParamList, 'Profile'>`: tipe props khusus untuk halaman Profile. Strukturnya dapat dilihat pada [bagian ini](#TabNavigator.tsx).
- `route.params`: berisi data yang dikirim dari Home.
- `navigation`: digunakan untuk kembali atau pindah ke halaman lain.
- `const { id, nama } = route.params`: mengambil parameter id dan nama.

### screens/SearchScreen.tsx
```javascript
import { DrawerScreenProps } from "@react-navigation/drawer";
import { RootParamList } from "../navigations/DrawerNavigator";
import { Text, View } from "react-native";

type Props = DrawerScreenProps<RootParamList, 'Search'>;
export default function SearchScreen({ }: Props) {
    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Text style={{ fontSize: 20 }}>Ini adalah halaman search</Text>
        </View>
    );
}
```
- `Props = DrawerScreenProps<RootParamList, 'Search'>`: tipe props khusus untuk halaman Profile. Namun karena type data untuk `prop` didefinisikan dengan `undefined` [lihat disini](#DrawerNavigator.tsx), maka tidak ada parameter pada halaman ini.


### screens/SearchScreen.tsx
```javascript
import { DrawerScreenProps } from "@react-navigation/drawer";
import { RootParamList } from "../navigations/DrawerNavigator";
import { Text, View } from "react-native";

type Props = DrawerScreenProps<RootParamList, 'Setting'>;

export default function SettingScreen() {
    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Text style={{ fontSize: 20 }}>Ini adalah halaman setting</Text>
        </View>
    );
}
```
- `Props = DrawerScreenProps<RootParamList, 'Setting'>`: tipe props khusus untuk halaman Profile. Namun karena type data untuk `prop` didefinisikan dengan `undefined` [lihat disini](#DrawerNavigator.tsx), maka tidak ada parameter pada halaman ini.

### navigations/DrawerNavigator.tsx {#DrawerNavigator.tsx}
```javascript
import { createDrawerNavigator } from "@react-navigation/drawer";
import HomeScreen from "../screens/HomeScreen";
import ProfileScreen from "../screens/ProfileScreen";
import SearchScreen from "../screens/SearchScreen";
import SettingScreen from "../screens/SettingScreen";

export type RootParamList = {
    Home: undefined,
    Profile: { id: number, nama: string },
    Search: undefined,
    Setting: undefined
};

const Drawer = createDrawerNavigator<RootParamList>();
export default function DrawerNavigator() {
    return (
        <Drawer.Navigator
            initialRouteName="Home"
            screenOptions={{
                headerStyle: { backgroundColor: '#f4511e' },
                headerTintColor: '#fff',
                drawerActiveTintColor: '#f4511e',
                drawerInactiveTintColor: 'gray',
            }}
        >
            <Drawer.Screen name="Home" component={HomeScreen} />
            <Drawer.Screen name="Profile" component={ProfileScreen} initialParams={{ id: 666, nama: "John Doe" }} />
            <Drawer.Screen name="Search" component={SearchScreen} />
            <Drawer.Screen name="Setting" component={SettingScreen} />
        </Drawer.Navigator>
    );
}
```

- `RootParamList `: mendefinisikan semua screen dan parameter yang boleh dipassing.
  - `Home: undefined`: Home tidak menerima parameter.
  - `Profile: { id: number, nama: string }`: Profile wajib menerima parameter id bertipe number dan nama bertipe string.
  - `Search: undefined`: Search tidak menerima parameter.
  - `Setting: undefined`: Setting tidak menerima parameter.
- `createDrawerNavigator<RootParamList>()`: membuat navigator dengan dukungan type checking TypeScript.
- `Drawer.Navigator`: mendefinisikan kumpulan halaman.
- `initialRouteName="Home"`: halaman pertama.
- `screenOptions`: konfigurasi header dan `options` lainnya dapat dilihat pada <a href="https://reactnavigation.org/docs/drawer-navigator/" target="_blank">halaman ini</a>
- `Drawer.Screen`: tiap layar didaftarkan di sini dengan:
  - `name`: nama route.
  - `component`: file halaman.
  - `initialParams`: definisi parameter default

Jadi, `DrawerNavigator.tsx` adalah peta aplikasi yang mengatur halaman apa saja yang ada dan bagaimana rutenya.

### App.tsx
```javascript
import { NavigationContainer } from '@react-navigation/native';
import DrawerNavigator from './navigations/DrawerNavigator';

export default function App() {
  return (
    <NavigationContainer>
      <DrawerNavigator />
    </NavigationContainer>
  );
}
```