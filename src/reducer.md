# Reducer (`useReducer`)

`useReducer` adalah hook di React Native yang digunakan untuk mengelola state yang lebih kompleks dibanding `useState`. Jika `useState` cocok untuk perubahan state yang sederhana, `useReducer` lebih cocok digunakan saat kita memiliki logika update state yang melibatkan banyak kondisi atau aturan.

```jsx
const [state, dispatch] = useReducer(reducer, initialState);
```
- **state** → nilai state saat ini
- **dispatch** → fungsi untuk mengirimkan action
- **reducer** → fungsi yang menentukan bagaimana state berubah
- **initialState** → nilai awal state


```jsx
function reducer(state, action) {
  switch (action.type) {
    case "actionType":
      return stateBaru;
    default:
      return state;
  }
}
```
Reducer menerima state lama dan sebuah action, lalu mengembalikan state baru.

## Contoh 1: Counter
### App.tsx
```jsx

import { StatusBar } from 'expo-status-bar';
import { useReducer } from 'react';
import { StyleSheet, View } from 'react-native';
import Counter from './components/Counter';

export default function App() {
  return (
    <View style={styles.container}>
      <Counter title="Counter" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 20
  }
});
```

### components/Counter.tsx
```tsx

import { useReducer } from "react";
import { Button, StyleSheet, Text, View } from "react-native";

type State = {
    count: number
}

const initialState: State = { count: 0 };

type Action = { jenis: "increment" } | { jenis: "decrement" };

const reducer = (state: State, action: Action): State => {
    switch (action.jenis) {
        case "increment":
            return { count: state.count + 1 };
        case "decrement":
            return { count: state.count - 1 };
        default:
            return state;
    }
}

type CounterProps = { title: string }
export default function Counter({ title }: CounterProps) {
    const [state, dispatch] = useReducer(reducer, initialState);

    return (
        <View style={styles.card}>
            <Text style={styles.title}>{title}</Text>
            <Text style={[styles.content, state.count < 0 && { color: 'red' }]}>{state.count}</Text>
            <View style={styles.button_container}>
                <Button title="Kurangi" onPress={() => dispatch({ jenis: "decrement" })} />
                <Button title="Tambah" onPress={() => dispatch({ jenis: 'increment' })} />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    card: {
        width: 240,
        padding: 10,
        borderRadius: 8,
        backgroundColor: '#fff',
        elevation: 3,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    content: {
        alignSelf: 'center',
        fontSize: 28,
        fontWeight: "600",
    },
    button_container: {
        padding: 8,
        borderTopWidth: 1,
        borderTopColor: '#4b4b4bff',
        flexDirection: 'row',
        gap: 10,
        justifyContent: 'center',
        alignItems: 'center'
    }
});
```
Dengan `dispatch`, kita mengirim action (misalnya `{ jenis: "increment" }`), lalu reducer mengatur perubahan `state`.


