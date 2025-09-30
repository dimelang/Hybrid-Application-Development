# Bottom Tabs Navigation

## Konsep Dasar
- Bottom Tabs navigation menampilkan menu tab di bawah layar.
- Setiap tab adalah sebuah halaman (atau bahkan bisa berupa navigator lain seperti Stack).
- Cocok untuk aplikasi dengan menu utama seperti: Home, Profile, Settings.
- Karakteristiknya:
    - Tab yang aktif akan menampilkan screen terkait.
    - Navigasi antar tab tidak tumpukan (stack), jadi berpindah tab tidak menyimpan riwayat antar tab.
    - Bisa diberi ikon dan label untuk tiap tab.

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
    └── ProfileScreen.tsx
```
Struktur project di atas bukanlah aturan yang wajib diikuti. Struktur di atas menggunakan pendekatan modular karena:
- Maintainable: mudah diatur jika screen semakin banyak.
- Scalable: mudah menambahkan jenis navigasi lainnya seperti Stack atau Drawer.
- Clean code: App.tsx tetap terlihat ringkas.


## Instalasi
```bash
npm install @react-navigation/bottom-tabs
npx expo install @expo/vector-icons
```

## Contoh
### screens/HomeScreen.tsx
```javascript
import { BottomTabScreenProps } from "@react-navigation/bottom-tabs";
import { RootParamList } from "../navigations/TabNavigator";
import { Button, Text, View } from "react-native";

type Props = BottomTabScreenProps<RootParamList, 'Home'>;

export default function HomeScreen({ navigation }: Props) {
    return (
        <View style={{ flex: 1, justifyContent: "center", alignItems: 'center', gap: 15 }}>
            <Text style={{ fontSize: 18 }}>Ini Home Screen</Text>
            <Button title="Ke Profil" onPress={() => navigation.navigate('Profile')} />
        </View>
    );
}
```
- `Props = BottomTabScreenProps<RootParamList, 'Home'>`: mendefinisikan props khusus untuk halaman Home.
- `navigation`: digunakan untuk berpindah ke halaman lain.
- `navigation.navigate('Profile')`: pindah ke halaman Profile.

Jadi, `HomeScreen.tsx` adalah halaman awal aplikasi yang dapat mengarahkan user ke halaman Profile.

### screens/ProfileScreen.tsx
```javascript
import { BottomTabScreenProps } from "@react-navigation/bottom-tabs";
import { RootParamList } from "../navigations/TabNavigator";
import { Text, View } from "react-native";

type Props = BottomTabScreenProps<RootParamList, 'Profile'>;

export default function ProfileScreen({ }: Props) {
    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Text style={{ fontSize: 18 }}>Ini Profil Screen</Text>
        </View>
    );
}
```
- `Props = BottomTabScreenProps<RootParamList, 'Profile'>`: mendefinisikan props khusus untuk halaman Profile, namun karena type data untuk `prop` didefinisikan dengan `undefined` [lihat disini](#TabNavigator.tsx), maka tidak ada parameter pada halaman ini.


### screens/SettingScreen.tsx
```javascript
import { BottomTabScreenProps } from "@react-navigation/bottom-tabs";
import { RootParamList } from "../navigations/TabNavigator";
import { Text, View } from "react-native";

type Props = BottomTabScreenProps<RootParamList, 'Setting'>;

export default function SettingScreen() {
    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Text style={{ fontSize: 18 }}>Ini Setting Screen</Text>
        </View>
    );
}
```
- `Props = BottomTabScreenProps<RootParamList, 'Setting'>`: mendefinisikan props khusus untuk halaman Profile, namun karena type data untuk `prop` didefinisikan dengan `undefined` [lihat disini](#TabNavigator.tsx), maka tidak ada parameter pada halaman ini.

### navigations/TabNavigator.tsx {#TabNavigator.tsx}
```javascript
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomeScreen from "../screens/HomeScreen";
import ProfileScreen from "../screens/ProfileScreen";
import SettingScreen from "../screens/SettingScreen";
import { Ionicons } from "@expo/vector-icons";


export type RootParamList = {
    Home: undefined,
    Profile: undefined,
    Setting: undefined
};

const Tab = createBottomTabNavigator<RootParamList>();

export default function TabNavigator() {
    return (
        <Tab.Navigator initialRouteName="Home"
            screenOptions={{
                headerShown: true,
                tabBarActiveTintColor: '#f4511e',
                tabBarInactiveTintColor: 'gray',
            }}
        >
            <Tab.Screen name="Home" component={HomeScreen} options={{
                title: "Halaman Utama",
                tabBarLabel: 'Home',
                tabBarIcon: ({ focused, color, size }) => (
                    <Ionicons name={focused ? 'home' : 'home-outline'}
                        color={color}
                        size={size} />
                )
            }} />
            <Tab.Screen name="Profile" component={ProfileScreen} options={{
                title: "Halaman Profil",
                tabBarLabel: 'Profile',
                tabBarIcon: ({ focused, color, size }) => (
                    <Ionicons name={focused ? 'person' : 'person-outline'}
                        color={color}
                        size={size} />
                )
            }} />
            <Tab.Screen name="Setting" component={SettingScreen} options={{
                title: "Halaman Setting",
                tabBarLabel: 'Home',
                tabBarIcon: ({ focused, color, size }) => (
                    <Ionicons name={focused ? 'settings' : 'settings-outline'}
                        color={color}
                        size={size} />
                )
            }} />
        </Tab.Navigator>
    )
}
```
- `RootParamList `: mendefinisikan semua screen dan parameter yang boleh dipassing.
  - `Home: undefined`: Home tidak menerima parameter.
  - `Profile: undefined`: Profile tidak menerima parameter.
  - `Setting: undefined`: Setting tidak menerima parameter.
- `createBottomTabNavigator<RootParamList>()`: membuat navigator dengan dukungan type checking TypeScript.
- `Tab.Navigator`: mendefinisikan kumpulan tab.
- `initialRouteName="Home"`: halaman pertama.
- `screenOptions`: konfigurasi header dan `options` lainnya dapat dilihat pada <a href="https://reactnavigation.org/docs/bottom-tab-navigator/" target="_blank">halaman ini</a> 
- `Tab.Screen`: tiap layar didaftarkan di sini dengan:
  - `name`: nama route.
  - `component`: file halaman.
  - `options`: properti tambahan (misalnya judul di header dan icon tab).

Jadi, `TabNavigator.tsx` adalah peta aplikasi yang mengatur halaman apa saja yang ada dan bagaimana rutenya.

### App.tsx
```javascript
import { NavigationContainer } from '@react-navigation/native';
import TabNavigator from './navigations/TabNavigator';

export default function App() {
  return (
    <NavigationContainer>
      <TabNavigator />
    </NavigationContainer>
  );
}
```
