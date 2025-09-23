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
```jsx
import React, { useReducer } from "react";
import { View, Text, Button } from "react-native";

const initialState = { count: 0 };


function reducer(state, action) {
  switch (action.type) {
    case "increment":
      return { count: state.count + 1 };
    case "decrement":
      return { count: state.count - 1 };
    default:
      return state;
  }
}

export default function App() {
  const [state, dispatch] = useReducer(reducer, initialState});

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text style={{ fontSize: 24 }}>Count: {state.count}</Text>
      <Button title="Tambah" onPress={() => dispatch({ type: "increment" })} />
      <Button title="Kurangi" onPress={() => dispatch({ type: "decrement" })} />
    </View>
  );
}
```
Dengan `dispatch`, kita mengirim action (misalnya `{ type: "increment" }`), lalu reducer mengatur perubahan `state`.


