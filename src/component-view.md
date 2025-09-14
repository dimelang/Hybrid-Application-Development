# View

Komponen ini umumnya digunakan sebagai container untuk menampung komponen lain (mirip dengan `<div>` di HTML). View memiliki sifat fleksibel dan bisa digunakan untuk berbagai kebutuhan seperti layout, styling, hingga wrapper komponen.

### View sebagai container pusat
```ts
import { View, Text } from 'react-native';

export default function App() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Ini berada di dalam View</Text>
    </View>
  );
}
```

### View dengan Background
```ts
import { View } from 'react-native';

export default function App() {
  return (
    <View style={{ flex: 1, backgroundColor: '#87cefa' }} />
  );
}
```

### View untuk Layout Vertikal
```ts
import { View, Text } from 'react-native';

export default function App() {
  return (
    <View style={{ flex: 1, padding: 20 }}>
      <Text style={{ marginBottom: 10 }}>Atas</Text>
      <Text>Tengah</Text>
      <Text>Bawah</Text>
    </View>
  );
}
```

### View untuk Layout Horizontal (Row)
```ts
import { View, Text } from 'react-native';

export default function App() {
  return (
    <View
      style={{
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginTop: 50,
      }}
    >
      <View style={{ width: 50, height: 50, backgroundColor: 'red' }} />
      <View style={{ width: 50, height: 50, backgroundColor: 'green' }} />
      <View style={{ width: 50, height: 50, backgroundColor: 'blue' }} />
    </View>
  );
}
```


### View dengan Nested View
```ts
import { View, Text } from 'react-native';

export default function App() {
  return (
    <View style={{ flex: 1, padding: 20 }}>
      <Text style={{ marginBottom: 10 }}>Header</Text>

      <View style={{ flex: 1, backgroundColor: '#f0f0f0', padding: 10 }}>
        <Text>Konten utama di dalam nested View</Text>
      </View>

      <Text style={{ marginTop: 10 }}>Footer</Text>
    </View>
  );
}
```

### View Sebagai Card
```ts
import { View, Text } from 'react-native';

export default function App() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <View
        style={{
          width: 200,
          padding: 20,
          borderRadius: 10,
          backgroundColor: '#fff',
          elevation: 3, // Android shadow
          shadowColor: '#000', // iOS shadow
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.25,
          shadowRadius: 3.84,
        }}
      >
        <Text style={{ fontSize: 18, fontWeight: 'bold' }}>Card Title</Text>
        <Text>Ini isi card dengan styling View</Text>
      </View>
    </View>
  );
}
```