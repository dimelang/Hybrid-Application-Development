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
```tsx
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

***Penjelasan***

`const fadeAnim = useRef(new Animated.Value(0)).current;` membuat nilai animasi awal dengan nilai 0. Nilai tersebut disimpan dalam `fadeAnim`, dan nantinya akan diubah oleh fungsi `fadeIn()` dan `fadeOut()`. 
    - `useRef()` digunakan agar nilai fadeAnim tidak di-reset setiap kali komponen di-render ulang.
    - `Animated.Value(0)` berarti nilai awal untuk properti animasi (dalam hal ini opacity) adalah 0, artinya komponen dimulai dalam keadaan transparan.

`fadeIn()` memiliki beberapa property, yaitu:
    - `Animated.timing()` mengatur perubahan nilai animasi secara bertahap.
    - `toValue: 1` artinya fadeAnim akan meningkat dari 0 → 1, membuat komponen semakin terlihat.
    - `duration: 1000` menunjukkan animasi berlangsung selama 1 detik (1000 ms).
    - `useNativeDriver: true` membuat animasi dijalankan di native thread, sehingga lebih halus dan efisien.

`fadeOut()` memiliki beberapa property yang serupa dengan fungsi fadeIn(). Perbedaan terletak pada nilai dari property `toValue: 1` yang menunjukkan `opacity` akan turun dari 1 → 0.

`Animated.View` digunakan agar properti style bisa dianimasikan. Properti `opacity` dihubungkan langsung ke `fadeAnim`. Saat `fadeAnim` berubah, React Native akan otomatis menyesuaikan opacity komponen atau membuat efek fade in dan fade out.


**ScaleBox.tsx**
```tsx
import { useRef } from "react";
import { Animated, View, EasingFunction, Text, Button, Easing } from "react-native";

export default function ScaleBox() {
    const scaleAnim = useRef(new Animated.Value(0)).current;

    const zoomIn = () => {
        Animated.spring(scaleAnim, {
            toValue: 1,
            friction: 2,
            tension: 40,
            useNativeDriver: true
        }).start()
    }

    const zoomOut = () => {
        Animated.spring(scaleAnim, {
            toValue: 0,
            friction: 4,
            tension: 60,
            useNativeDriver: true
        }).start()
    }

    return (
        <View style={{ alignItems: 'center', padding: 10, borderColor: '#fdfd', borderWidth: 1, borderRadius: 7, width: '30%' }}>
            <Animated.View style={{
                transform: [
                    { scale: scaleAnim }
                ],
                width: 150,
                height: 150,
                backgroundColor: '#87eba2',
                borderRadius: 10,
                justifyContent: 'center',
                alignItems: 'center',
            }}>
                <Text style={{ fontWeight: 'bold' }}>Slide Box</Text>
            </Animated.View>
            <View style={{ marginTop: 20, flexDirection: 'row', gap: 10 }}>
                <Button title="Zoom In" onPress={zoomIn} />
                <Button title="Zoom Out" onPress={zoomOut} />
            </View>
        </View>
    );
}
```
***Penjelasan***

`const scaleAnim = useRef(new Animated.Value(0)).current;` membuat nilai animasi awal dengan nilai 0. Nilai tersebut disimpan dalam `scaleAnim`, dan nantinya akan diubah oleh fungsi `zoomIn()` dan `zoomOut()`.

- `useRef()` digunakan agar nilai scaleAnim tidak di-reset setiap kali komponen di-render ulang.
- `Animated.Value(0)` berarti nilai awal untuk properti animasi (dalam hal ini scale) adalah 0, artinya komponen dimulai dalam ukuran (scale) yang kecil.

`zoomIn()` memiliki beberapa property, yaitu:
    - `Animated.spring()` untuk menghasilkan efek pegas (spring motion).
    - `toValue: 1` artinya sacleAnim akan meningkat dari 0 → 1, membuat komponen kembali ke ukuran normal.
    - `friction` mengontrol gesekan. Semakin tinggi nilainya, maka semakin cepat animasi berhenti.
    - `tension` mengontrol daya tarik pegas. Semakin besar nilainya, semakin cepat pergerakan awal animasi.
    - `useNativeDriver: true` membuat animasi dijalankan di native thread, sehingga lebih halus dan efisien.

`zoomOut()` memiliki beberapa property yang serupa dengan fungsi zoomIn(). Perbedaan terletak pada nilai dari property `toValue: 1` yang menunjukkan `scale` akan turun dari 1 → 0.

`Animated.View` digunakan agar properti style bisa dianimasikan. Properti `transform` dengan `{scale: scaleAnim}` dihubungkan langsung ke `scaleAnim`. Saat `sacleAnim` berubah, React Native akan otomatis menyesuaikan ukuran (`scale`) komponen.

**TranslateBox.tsx**
```tsx
import { useRef } from "react";
import { Animated, Text, View, Button } from "react-native";

export default function TranslatedBox() {
    const slideAnim = useRef(new Animated.Value(0)).current;

    const startDecay = () => {
        Animated.decay(slideAnim, {
            velocity: 1.5,
            deceleration: 0.997,
            useNativeDriver: true
        }).start();
    }

    return (
        <View style={{ alignItems: 'center', padding: 10, borderColor: '#fdfd', borderWidth: 1, borderRadius: 7, width: '30%' }}>
            <Animated.View style={{
                transform: [
                    { translateY: slideAnim }
                ],
                width: 150,
                height: 150,
                backgroundColor: '#87eba2',
                borderRadius: 10,
                justifyContent: 'center',
                alignItems: 'center',
            }}>
                <Text style={{ fontWeight: 'bold' }}>Slide Box</Text>
            </Animated.View>
            <View style={{ marginTop: 20, flexDirection: 'row', gap: 10 }}>
                <Button title="Start deacy" onPress={startDecay} />
                <Button title="Reset deacy" onPress={() => slideAnim.setValue(0)} />
            </View>
        </View>
    );
}
```
***Penjelasan***

`const slideAnim = useRef(new Animated.Value(0)).current;` membuat nilai animasi awal dengan nilai 0. Nilai tersebut disimpan dalam `slideAnim`, dan nantinya akan diubah oleh fungsi `startDecay()`.

- `useRef()` digunakan agar nilai `slideAnim` tidak di-*reset* setiap kali komponen di-*render* ulang.
- `Animated.Value(0)` berarti nilai awal untuk properti animasi (dalam hal ini posisi) adalah 0, artinya komponen dimulai dalam posisi awal yaitu 0.

`startDecay()` memiliki beberapa property, yaitu:
    - `Animated.decay()` untuk menghasilkan animasi yang berhenti secara alami seperti benda yang bergerak lalu melambat karena gaya gesek.
    - `velocity: 1` konfigurasi kecepatan awal animasi. Semakin tinggi nilainya, maka semakin cepat animasi bergerak.
    - `deceleration` mengontrol laju perlambatan. Semakin tinggi nilainya (mendekati 1), maka gerakan berhenti lebih lambat.
    - `useNativeDriver: true` membuat animasi dijalankan di native thread, sehingga lebih halus dan efisien.


`Animated.View` digunakan agar properti style bisa dianimasikan. Properti `transform` dengan `{translateY: scaleAnim}` dihubungkan langsung ke `slideAnim`. Saat `slideAnim` berubah, React Native akan otomatis menyesuaikan posisi (`translateY`) komponen.