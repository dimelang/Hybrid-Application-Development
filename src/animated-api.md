# Animated API

`Animated` adalah API bawaan (tidak butuh instalasi tambahan) React Native untuk mengubah nilai tampilan secara halus dari satu keadaan ke keadaan lainnya. Cocok untuk animasi sederhana berbasis state, seperti:

- Fade in / fade out
- Translasi (geser)
- Skala (zoom)
- Rotasi

`Animated` memiliki beberapa konsep utama yang perlu diketahui:
- `Animated.Value()`: Menyimpan nilai numerik yang berubah seiring waktu. Nilai ini bisa dihubungkan ke properti `style` seperti `opacity`, `transform`, atau `position`. Biasanya disimpan menggunakan `hook` `useRef`.
    ```tsx
    const anim = useRef(new Animated.Value(0)).current;
    ```
    `Animated.Value` dapat dianggap seperti “state khusus animasi”. Nilainya bisa berubah secara bertahap oleh sistem animasi tanpa menyebabkan re-render React.

- `Animated.timing()`: Mengubah nilai dalam durasi tertentu. Method ini juga dapat kita berikan `delay` maupun `easing`. `Easing` merupakan kurva animasi yang dimulai dan diakhiri dengan perlahan, namun bergerak cepat di bagian tengahnya. Ini menghasilkan gerakan yang lebih halus dan natural, mirip dengan bagaimana objek di dunia nyata bergerak
    ```tsx
    Animated.timing(anim, {
        toValue: 1,        // nilai akhir animasi
        duration: 1000,    // dalam milidetik
        easing: Easing.bounce,  // kurva animasi
        delay:100,         // dalam milidetik
        useNativeDriver: true // untuk performa lebih baik
    }).start();           // wajib agar animasi dijalankan
    ```
    Konfigurasi lengkapnya dapat dilihat pada halaman [ini](https://reactnative.dev/docs/animated#timing). Sedangkan untuk jenis `easing` dapat dilihat pada halaman [ini](https://reactnative.dev/docs/easing)

- `Animated.decay()`: Membuat animasi yang dimulai dengan kecepatan awal yang diberikan, lalu melambat secara bertahap hingga berhenti sepenuhnya, meniru efek seperti gesekan.
    ```tsx
    Animated.decay(anim, {
        velocity: 0.5,          // kecepatan awal
        deceleration: 0.997,    // semakin kecil, semakin cepat berhenti
        useNativeDriver: true
    }).start();

    ```
- `Animated.spring()`: Menciptakan efek pegas realistis seperti pantulan dan ayunan.
    ```tsx
    Animated.spring(anim, {
        toValue: 1,
        friction: 4,     // gesekan (semakin besar → lebih lambat)
        tension: 60,     // ketegangan pegas (semakin besar → lebih cepat)
        useNativeDriver: true
    }).start();

    ```
- `Animated.View`, `Animated.Text`, `Animated.Image`, `Animated.ScrollView`, `Animated.FlatList`, `Animated.SectionList`: Komponen yang dapat dianimasikan.
    ```tsx
    <Animated.View style={{
        opacity: anim,
        width: 150,
        height: 150,
        backgroundColor: 'skyblue',
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
    }}>
    ```
- Selengkapnya dapat dilihat pada [laman resmi](https://reactnative.dev/docs/animated)

## Contoh: Animasi
Struktur folder:
```bash
/components
   ├── FadeBox.tsx
   ├── ScaleBox.tsx
   └── TranslateBox.tsx
/screens
   └── HomeScreen.tsx
App.tsx
```

**FadeBox.tsx**
```typescript
import { useRef } from "react";
import { Animated, Text, View, Button } from "react-native";

export default function FadeBox() {
    const fadeAnim = useRef(new Animated.Value(0)).current;

    const fadeIn = () => {
        Animated.timing(fadeAnim, {
            toValue: 1,
            duration: 1000,
            useNativeDriver: true
        }).start();
    }

    const fadeOut = () => {
        Animated.timing(fadeAnim, {
            toValue: 0,
            duration: 1000,
            useNativeDriver: true
        }).start()
    }

    return (
        <View style={{ alignItems: 'center', padding: 10, borderColor: '#fdfd', borderWidth: 1, borderRadius: 7, width: '30%' }}>
            <Animated.View style={{
                opacity: fadeAnim,
                width: 150,
                height: 150,
                backgroundColor: 'skyblue',
                borderRadius: 10,
                justifyContent: 'center',
                alignItems: 'center',
            }}>
                <Text style={{ fontWeight: 'bold' }}>Fade Box</Text>
            </Animated.View>
            <View style={{ marginTop: 20, flexDirection: 'row', gap: 10 }}>
                <Button title="Fade In" onPress={fadeIn} />
                <Button title="Fade Out" onPress={fadeOut} />
            </View>
        </View>
    );
}
```