# Style & Layout Lanjutan

React Native menggunakan **Flexbox** untuk mengatur tata letak.  
Bedanya dengan web:
- Default `flexDirection` di web = **row**  
- Default `flexDirection` di React Native = **column**

Artinya, secara default komponen disusun **dari atas ke bawah**.

---

## Flexbox untuk Layout
React Native menggunakan Flexbox untuk mengatur tata letak.
Secara default, `flexDirection` di React Native adalah column (berbeda dengan web yang default-nya `row`).

**Flex direction**
```ts
<View style={{ flexDirection: 'row', justifyContent: 'space-around' }}>
  <View style={{ width: 50, height: 50, backgroundColor: 'red' }} />
  <View style={{ width: 50, height: 50, backgroundColor: 'green' }} />
  <View style={{ width: 50, height: 50, backgroundColor: 'blue' }} />
</View>
```

**Flex Grow**
```ts
<View style={{ flex: 1, flexDirection: 'row' }}>
  <View style={{ flex: 1, backgroundColor: 'red' }} />
  <View style={{ flex: 2, backgroundColor: 'green' }} />
  <View style={{ flex: 3, backgroundColor: 'blue' }} />
</View>
```

### justifyContent
Mengatur posisi sepanjang main axis (sumbu utama = flexDirection).
- `flex-start`
- `center`
- `flex-end`
- `space-between`
- `space-around`
- `space-evenly`
```ts
<View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
  <View style={{ width: 50, height: 50, backgroundColor: 'red' }} />
  <View style={{ width: 50, height: 50, backgroundColor: 'green' }} />
  <View style={{ width: 50, height: 50, backgroundColor: 'blue' }} />
</View>
```

### alignItems
Mengatur posisi sepanjang cross axis (sumbu berlawanan dengan main axis).
- `flex-start`
- `center`
- `flex-end`
- `stretch`
```ts
<View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
  <View style={{ width: 50, height: 50, backgroundColor: 'red' }} />
  <View style={{ width: 50, height: 100, backgroundColor: 'green' }} />
</View>
```


### alignSelf
Digunakan pada child component untuk override `alignItems`.
```ts
<View style={{ flexDirection: 'row', alignItems: 'flex-start' }}>
  <View style={{ width: 50, height: 50, backgroundColor: 'red' }} />
  <View style={{ width: 50, height: 50, backgroundColor: 'green', alignSelf: 'flex-end' }} />
</View>
```

### flex
Properti `flex` menentukan seberapa banyak ruang yang diambil relatif terhadap sibling-nya.
```ts
<View style={{ flexDirection: 'row', flex: 1 }}>
  <View style={{ flex: 1, backgroundColor: 'red' }} />
  <View style={{ flex: 2, backgroundColor: 'green' }} />
  <View style={{ flex: 3, backgroundColor: 'blue' }} />
</View>
```
- `flex: 1` → isi ruang secara proporsional.
- `flex: 0` → ukurannya tetap sesuai width/height.


### flexWrap
Membungkus elemen jika ruang tidak cukup.
```ts
<View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
  {Array.from({ length: 10 }).map((_, i) => (
    <View
      key={i}
      style={{ width: 80, height: 80, backgroundColor: i % 2 ? 'tomato' : 'skyblue', margin: 4 }}
    />
  ))}
</View>
```

**Contoh Kombinasi**
```ts
<View style={{ flex: 1 }}>
  <View style={{ flex: 1, backgroundColor: 'tomato' }} />     {/* Header */}
  <View style={{ flex: 4, backgroundColor: 'skyblue' }} />   {/* Content */}
  <View style={{ flex: 1, backgroundColor: 'limegreen' }} /> {/* Footer */}
</View>
```

## Positioning
Selain Flexbox, React Native juga mendukung **positioning** untuk mengatur letak komponen.  
Prinsipnya mirip dengan CSS di web.

### relative (default)
- Semua komponen secara default memiliki `position: "relative"`.  
- Artinya posisinya ditentukan oleh layout Flexbox.  
- Jika kita menambahkan `top`, `left`, `right`, atau `bottom`, maka komponen akan bergeser relatif terhadap posisi normalnya.

```tsx
<View style={{ flex: 1 }}>
  <View style={{ width: 100, height: 100, backgroundColor: 'tomato' }} />
  <View style={{ width: 100, height: 100, backgroundColor: 'skyblue', top: 20, left: 20 }} />
</View>
```

### absolute
- Komponen akan dilepaskan dari alur Flexbox.
- Posisi ditentukan relatif terhadap parent yang memiliki `position: "relative"` (atau container utamanya).
```ts
<View style={{ flex: 1 }}>
  <View style={{ width: 200, height: 200, backgroundColor: 'lightgray' }}>
    <View style={{ position: 'absolute', top: 20, left: 20, width: 50, height: 50, backgroundColor: 'tomato' }} />
    <View style={{ position: 'absolute', bottom: 20, right: 20, width: 50, height: 50, backgroundColor: 'skyblue' }} />
  </View>
</View>
```

### Z-Index
- Sama seperti CSS, digunakan untuk mengatur lapisan tumpukan.
- Semakin besar `zIndex`, semakin berada di atas.
```ts
<View style={{ flex: 1 }}>
  <View style={{ width: 100, height: 100, backgroundColor: 'tomato', zIndex: 1, position: 'absolute', top: 50, left: 50 }} />
  <View style={{ width: 100, height: 100, backgroundColor: 'skyblue', position: 'absolute', top: 70, left: 70 }} />
</View>

```