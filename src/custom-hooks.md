# Custom Hooks

Custom Hook adalah fungsi buatan kita sendiri yang mengikuti aturan Hook (diawali dengan `use...`) untuk mengenkapsulasi logic tertentu agar dapat digunakan ulang di berbagai komponen.

Jika `useState`, `useEffect`, `useReducer`, dll adalah hook bawaan **React Native**, maka custom hook memungkinkan kita bikin versi sendiri sesuai kebutuhan.

Custom hook memberikan beberapa keuntungan, seperti:
1. Kode lebih bersih & reusable
2. Logic & UI terpisah
3. Lebih mudah testing

## Contoh 1: Hook untuk Input Text
```jsx
// hooks/UseInput.ts
import { useState } from "react";

// custom hook
function useInput(initialValue = "") {
  const [value, setValue] = useState(initialValue);

  const onChangeText = (text) => setValue(text);
  const reset = () => setValue("");

  return { value, onChangeText, reset };
}

export default useInput;
```

```jsx
// App.tsx
import React from "react";
import { View, TextInput, Button, Text } from "react-native";
import useInput from "./hooks/UseInput";

export default function App() {
  const name = useInput("");
  const email = useInput("");

  return (
    <View style={{ padding: 20 }}>
      <TextInput
        placeholder="Nama"
        value={name.value}
        onChangeText={name.onChangeText}
        style={{ borderWidth: 1, marginBottom: 10, padding: 5 }}
      />
      <TextInput
        placeholder="Email"
        value={email.value}
        onChangeText={email.onChangeText}
        style={{ borderWidth: 1, marginBottom: 10, padding: 5 }}
      />
      <Button title="Submit" onPress={() => {
        console.log("Nama:", name.value, "Email:", email.value);
        name.reset();
        email.reset();
      }} />
      <Text style={{ marginTop: 10 }}>
        Nama: {name.value} | Email: {email.value}
      </Text>
    </View>
  );
}
```


