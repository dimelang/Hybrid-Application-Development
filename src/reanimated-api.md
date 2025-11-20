# Reanimated API

Merupakan library pihak ketiga untuk membuat animasi dengan performa tinggi di React Native. Reanimated memungkinkan kita untuk menjalankan logika animasi langsung di native thread, sehingga animasi tetap halus bahkan ketika JavaScript thread sibuk. `Reanimated` sangat cocok digunakan untuk animasi interaktif dan kompleks seperti:
- Drag & drop
- Gesture-based animations (dengan `react-native-gesture-handler`)
- Scroll animations
- Transition antar halaman

Sebelum menggunakan [`Reanimated`](https://docs.swmansion.com/react-native-reanimated/), terdapat beberapa hal yang perlu dilakukan yaitu instalasi dependency dan melakukan rebuild plugin.

## Instalasi
```bash
npm install react-native-reanimated react-native-worklets
```


## Rebuild
### Expo

Jalankan perintah berikut pada terminal
```bash
npx expo prebuild
```

### React Native CLI

Tambahkan plugin `react-native-worklets/plugin` secara manual pada file `babel.config.js`. Pastikan `react-native-worklets/` berada di baris paling akhir.
```js
module.exports = {
presets: [
    ... // don't add it here :)
],
plugins: [
    ...
    'react-native-worklets/plugin',
],
};
```

Khusus penggunaan `web` yang dibangun menggunakan React native CLI, selain wajib menambahkan `react-native-web` dan `react-dom`, kita perlu menambahkan plugin `@babel/plugin-proposal-export-namespace-from` lalu rebuild dengan cara menambahkan plugin tersebut ke `babel.config.js`.

```bash
npm install @babel/plugin-proposal-export-namespace-from
```

```js
module.exports = {
    presets: [
    ... // don't add it here :)
    ],
    plugins: [
        ...
        '@babel/plugin-proposal-export-namespace-from',
        'react-native-worklets/plugin',
    ],
};
```


### `Reanimated` memiliki beberapa konsep dasar yang perlu diketahui:

### `useSharedValue`
Digunakan untuk menginisialisasi nilai numerik yang bisa berubah tanpa menyebabkan re-*render* React. Mirip seperti `Animated.Value()`, tapi lebih efisien karena berjalan di native thread. Untuk mengakses data pada *shared value*, kita dapat menggunakan property `value`.
```tsx
const animation_value = useSharedValue(0);  // inisialisasi shared value
animation_value.value = 1; // mengubah shared value

const animation_value = useSharedValue({x: 0, y: 0});  // inisialisasi shared value
animation_value.value = {x: 50, y: -20}; // mengubah shared value

const animation_value = useSharedValue([1, 2, 3]);  // inisialisasi shared value
animation_value.value.push(4);
animation_value.value = [...animation_value.value, 1000]
```

### `withTiming`
Merupakan fungsi animasi yang dimiliki oleh Reanimated dan berfungsi untuk membuat nilai `shared value` berubah secara bertahap dari nilai awal ke nilai target selama periode tertentu. Selain itu, kita juga dapat mengatur kecepatan animasi melalui `Easing`.
```tsx
import { Easing, ReduceMotion } from 'react-native-reanimated';

withTiming(shared_value.value, {
    duration: 1000,  // dalam milisecond
    easing: Easing.inOut(Easing.quad),  
    reduceMotion: ReduceMotion.System,
})
```

**Contoh:**
```tsx
const scale_animation = useSharedValue(0);

const startScaleAnimation = () => {
    scale_animation.value = withTiming(scale_animation.value === 1 ? 1.5 : 1, { 
        duration: 500,
        easing: Easing.inOut(Easing.quad),  
        reduceMotion: ReduceMotion.System,
    });
}
```

### `withSpring`
Merupakan fungsi yang digunakan untuk membuat animasi yang meniru gerakan pegas. Artinya, nilai akan bergerak menuju target (toValue), namun dengan sedikit pantulan (overshoot) dan perlambatan alami di akhir.

```tsx
withSpring(shared_value.value, {
    stiffness: 900,
    damping: 120,
    mass: 4,
    overshootClamping: false,
    reduceMotion: ReduceMotion.System,
})
```
*Penjelasan*
- `stiffness`: Kekuatan pegas (semakin besar = gerakan lebih cepat dan kuat) (default = 900)
- `damping`: Mengatur seberapa cepat gerakan melambat (semakin besar = lebih cepat berhenti) (default = 120)
- `mass`: Berat objek (semakin besar = gerakan lebih lambat) (default = 4)
- `overshootClamping`: Jika true, tidak akan memantul melewati target (default = false)

Konfigurasi lainnya dari fungsi `withSpring` dapat dilihat pada [laman resmi](https://docs.swmansion.com/react-native-reanimated/docs/animations/withSpring)

**Contoh:**
```tsx
const scale_animation = useSharedValue(0);

const startScaleAnimation = () => {
    scale_animation.value = withSpring(scale_animation.value === 1 ? 1.5 : 1, { 
        stiffness: 900,
        damping: 120,
        mass: 4,
        overshootClamping: false,
        reduceMotion: ReduceMotion.System,
    });
}
```

### `withDecay`
Digunakan untuk membuat animasi yang terus bergerak ke arah tertentu dengan kecepatan awal, lalu melambat hingga berhenti secara alami.
```tsx
withDecay({
    velocity: event.velocityX,
    deceleration: 0.998,
    clamp: [-300, 300],
    velocityFactor: 1,
    rubberBandEffect: true,
    rubberBandFactor: 0.6,
    reduceMotion: ReduceMotion.System,
})
```
*Penjelasan*
- `velocity`: kecepatan awal gerakan (default = 0).
- `deceleration`: Nilai mendekati 1 membuat animasi melambat dengan lembut dan berjalan lebih lama, sedangkan nilai kecil (misal 0.95) membuat animasi cepat berhenti (default = 0.998).
- `clamp`: Batas minimum dan maksimum posisi. Ketika posisi hasil decay melewati nilai ini, maka animasi akan berhenti di batas tersebut. Contoh [-300, 300] artinya posisi hanya boleh di antara -300 hingga 300.
- `velocityFactor`: Faktor pengali untuk kecepatan awal (`velocity`). Gunanya untuk mengatur seberapa jauh atau seberapa cepat gerakan decay dimulai tanpa harus mengubah velocity langsung (default = 1).
- `rubberBandEffect`: menambahkan efek pantulan yang lembut seperti "karet" (default = false)
- `rubberBandFactor`: Mengatur seberapa kuat efek pantulan pada `rubberBandEffect`. Semakin kecil maka pantulan lebih kuat sedangkan semakin besar (lebih elastis) maka pantulan lebih kaku (cepat berhenti) (default = 0.6).

**Contoh:**
```tsx
const scale_animation = useSharedValue(0);

const startScaleAnimation = () => {
    scale_animation.value = withDecay({ 
        velocity: event.velocityX,
        deceleration: 0.998,
        clamp: [0, 300],
        velocityFactor: 1,
        rubberBandEffect: true,
        rubberBandFactor: 0.6,
        reduceMotion: ReduceMotion.System,
    });
}
```

### `withSequence`
Digunakan untuk menjalankan beberapa animasi satu per satu (secara berurutan) bukan bersamaan. Umumnya digunakan bersama `withTiming()`, `withSpring()`, dan `withDecay()` untuk membentuk efek kompleks.
```tsx
withSequence(animation1, animation2, animation3, ...)
```
*Penjelasan*
Setiap `animation` bisa berupa `withTiming()`, `withSpring()`, `withDecay()` atau bahkan `withDelay()` jika ingin memiliki jeda waktu di antaranya.

```tsx
translateX.value = withSequence(
  withTiming(100, { duration: 500 }),
  withTiming(-100, { duration: 500 }),
  withTiming(0, { duration: 500 })
);
```
**Contoh:**
```tsx
const scale_animation = useSharedValue(0);
const startScaleAnimation = () => {
    scale_animation.value = withSequence(
        withTiming(1.5, { duration: 300 }),
        withSpring(1, { damping: 5 }
    ;)
}
```

### `withRepeat`
Digunakan untuk menjalankan animasi secara berulang, baik dalam jumlah tertentu maupun tanpa batas (infinite loop). Biasanya digunakan untuk membuat animasi loading atau spinner.
```tsx
withRepeat(animation, numberOfReps?, reverse?, callback?)
```
*Penjelasan*
- animation: animasi yang akan diulang (biasanya menggunakan `withTiming` atau `withSpring`)
- numberOfReps: jumlah pengulangan animasi. Gunakan -1 untuk infinite loop. (default = 2)
- reverse: jika `true`, animasi akan membalik arah setiap kali mengulang. (default = `false`)
- callback: fungsi yang dipanggil ketika animasi selesai (jika finite)

```tsx
withRepeat(
    withTiming(200, { duration: 1000 }),
    2,
    false,
    () => {},
    ReduceMotion.System,
)
```

### `withDelay`
Digunakan untuk memberikan penundaan (delay) pada animasi sebelum dijalankan. Bisanya dipakai untuk menjalankan animasi yang berurutan atau bisa juga digunakan untuk memberi jeda antar efek.
```tsx
withDelay(delay, animation)
```
*Penjelasan*
- delay: durasi penundaan dalam milidetik sebelum animasi dimulai
- animation: animasi yang ingin dijalankan setelah delay (biasanya `withTiming`, `withSpring`, dll)

```tsx
opacity.value = withDelay(
    1000, // tunggu 1 detik
    withTiming(1, { duration: 1000 })
);
```

### `useAnimatedStyle`
Digunakan untuk membuat `object style` animasi. Mirip seperti `StyleSheet` namun, nilainya diambil dari *shared value*. Setiap kali nilai berubah, style akan diperbarui otomatis di native layer.
```tsx
const opacity = useSharedValue(0);
const scale = useSharedValue(0.5);

const animatedStyle = useAnimatedStyle(() => {
  return { 
    opacity: opacity.value,
    transform: [{ scale: scale.value }],
  };
});
```

Kemudian digunakan di komponen Animated.<Component> seperti ini (misalnya pada komponen View):
```tsx
const opacity = useSharedValue(0);
const scale = useSharedValue(0.5);

const animatedStyle = useAnimatedStyle(() => {
  return { 
    opacity: opacity.value,
    transform: [{ scale: scale.value }],
  };
});

<Animated.View style={[
    {
        width: 120,
        height: 120,
        backgroundColor: 'skyblue',
        borderRadius: 10,
    },
    animatedStyle,
    ]}
/>
```


### `useAnimatedProps`
Digunakan untuk memberikan animasi pada properti (props) komponen yang bukan bagian dari style. Berbeda dengan `useAnimatedStyle` yang hanya bisa digunakan untuk properti style, `useAnimatedProps` memungkinkan kita menganimasikan atribut seperti:
- `progress` pada `Animated.ProgressBar`
- `strokeDashoffset` pada elemen `SVG`
- `text` pada `Animated.TextInput`
- `value` atau `scrollOffset` pada beberapa komponen bawaan
Animasi dijalankan langsung di native thread, sehingga komponen tidak mengalami re-render di sisi JavaScript — hasilnya, animasi menjadi lebih halus dan efisien.
```tsx
const textValue = useSharedValue('Hello');

const animatedProps = useAnimatedProps(() => {
  return {
    text: textValue.value,
  };
});

const changeText = () => {
    textValue.value = withTiming(
        textValue.value === 'Hello' ? 'Reanimated' : 'Hello',
        {duration: 600}
    )
}
```
Kemudian digunakan di komponen Animated.<Component> seperti ini (misalnya pada komponen View):
```tsx
const AnimatedTextInput = Animated.createAnimatedComponent(TextInput);

<View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
    <AnimatedTextInput
        style={{
            fontSize: 24,
            color: 'black',
            borderWidth: 1,
            borderColor: '#aaa',
            padding: 10,
            textAlign: 'center',
            width: 200,
        }}
        editable={false}
        animatedProps={animatedProps}
    />
    <Button title="Ubah Teks" onPress={changeText} />
</View>
```

### Animated Component
`Reanimated` memiliki beberapa komponen yang dapat diberikan animasi adalah: `Animated.View`, `Animated.Text`, `Animated.Image`, `Animated.ScrollView`, `Animated.FlatList`, `Animated.SectionList`.

```tsx
const opacityAnim = useSharedValue(0);

const animatedStyle = useAnimatedStyle(() => ({
    opacity: opacityAnim.value,
}));

const toggleOpacity = () => {
    opacityAnim.value = withTiming(opacityAnim.value === 1 ? 0 : 1, {
      duration: 800,
    });
};

return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Animated.View
        style={[
          {
            width: 150,
            height: 150,
            backgroundColor: 'skyblue',
            borderRadius: 10,
            justifyContent: 'center',
            alignItems: 'center',
          },
          animatedStyle,
        ]}
      />
      <Button title="Toggle Fade" onPress={toggleOpacity} />
    </View>
);
```

Selain komponen di atas, kita juga dapat membuat komponen kustom *animatable* menggunakan `Animated.createAnimatedComponent()`.

```tsx
import React from 'react';
import { View, Text } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
} from 'react-native-reanimated';

// Komponen kustom biasa
const Box = ({ color }: { color: string }) => (
  <View
    style={{
      width: 100,
      height: 100,
      borderRadius: 10,
      backgroundColor: color,
      justifyContent: 'center',
      alignItems: 'center',
    }}
  >
    <Text style={{ color: 'white', fontWeight: 'bold' }}>BOX</Text>
  </View>
);

// Ubah menjadi komponen animatable
const AnimatedBox = Animated.createAnimatedComponent(Box);

export default function CustomAnimatedComponentExample() {
  const scale = useSharedValue(1);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  const animateBox = () => {
    scale.value = withSpring(scale.value === 1 ? 1.5 : 1);
  };

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <AnimatedBox color="tomato" style={animatedStyle} />
      <Button title="Animate Box" onPress={animateBox} />
    </View>
  );
}
```



Konsep penting lainnya dari Reanimated dapat diakses pada [laman resmi](https://docs.swmansion.com/react-native-reanimated)
