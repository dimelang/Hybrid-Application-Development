# Reference (`useRef`)

`useRef` adalah salah satu hooks pada React Native yang berguna untuk menyimpan nilai atau mereferensikan elemen tanpa menyebabkan komponen melakukan render ulang. Kalau `useState` selalu bikin render ulang saat nilainya berubah, `useRef` tidak. Nilai yang disimpan di `useRef` tetap ada selama komponen hidup, tapi perubahan nilainya tidak memicu re-*render*.

`useRef` cocok digunakan pada kasus:
1. Menyimpan nilai lama (previous value).
2. Mengakses dan mengontrol elemen UI (misalnya TextInput).
3. Menyimpan variabel yang berubah-ubah tapi tidak perlu re-*render* misalnya timer.
4. Membuat animasi

## Contoh 1: Menyimpan Nilai Lama
Kadang kita ingin tahu nilai sebelum `state` berubah. `useRef` dapat menyimpan history ini.
```jsx
import React, { useState, useEffect, useRef } from "react";
import { View, Text, Button } from "react-native";

export default function App() {
  const [score, setScore] = useState(0);
  const prevScoreRef = useRef(0);

  useEffect(() => {
    prevScoreRef.current = score; // update setiap kali score berubah
  }, [score]);

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>Current Score: {score}</Text>
      <Text>Previous Score: {prevScoreRef.current}</Text>
      <Button title="Add 10" onPress={() => setScore(score + 10)} />
    </View>
  );
}
```
`prevScoreRef.current` selalu menyimpan nilai sebelum update.

## Contoh 2: Mengontrol Input
Dengan `useRef`, kita dapat fokus langsung ke input tanpa perlu `state` tambahan.
```jsx
import React, { useRef } from "react";
import { View, TextInput, Button } from "react-native";

export default function App() {
  const inputRef = useRef(null);

  const focusInput = () => {
    inputRef.current.focus(); // langsung fokus ke input
  };

  return (
    <View style={{ padding: 20 }}>
      <TextInput
        ref={inputRef}
        style={{ borderWidth: 1, padding: 10, marginBottom: 10 }}
        placeholder="Type something..."
      />
      <Button title="Focus Input" onPress={focusInput} />
    </View>
  );
}
```
`inputRef` dipakai untuk mengakses komponen TextInput langsung.

## Contoh 3: Timer dengan useRef
```jsx
import React, { useRef, useState } from "react";
import { View, Text, Button } from "react-native";

export default function App() {
  const [seconds, setSeconds] = useState(0);
  const timerRef = useRef(null);

  const startTimer = () => {
    if (timerRef.current) return; // cegah timer ganda
    timerRef.current = setInterval(() => {
      setSeconds((prev) => prev + 1);
    }, 1000);
  };

  const stopTimer = () => {
    clearInterval(timerRef.current);
    timerRef.current = null;
  };

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>⏱ {seconds} seconds</Text>
      <Button title="Start" onPress={startTimer} />
      <Button title="Stop" onPress={stopTimer} />
    </View>
  );
}
```

## Contoh 4: Animasi dengan useRef
```jsx
import React, { useRef, useEffect } from "react";
import { View, Animated } from "react-native";

export default function App() {
  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 2000,
      useNativeDriver: true,
    }).start();
  }, []);

  return (
    <Animated.View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        opacity: fadeAnim, // nilai dari useRef
      }}
    >
      <View style={{ width: 100, height: 100, backgroundColor: "tomato" }} />
    </Animated.View>
  );
}
```
