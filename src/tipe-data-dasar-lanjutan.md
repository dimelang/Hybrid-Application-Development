# Konsep TypeScript 1: Tipe Data Dasar Lanjutan

1. **Array**

    TypeScript juga memiliki beberapa struktur data yang juga terdapat dalam JavaScript. Array digunakan untuk menyimpan sekumpulan nilai dengan urutan tertentu. Bedanya, di TypeScript kita bisa menentukan tipe data yang boleh ada di dalam array. Hal ini membuat array kita lebih konsisten, karena semua elemennya punya tipe yang sama."
    ```ts
    let numbers: number[] = [1, 2, 3, 4];
    let names: string[] = ["Ani", "Budi", "Citra"];
    ```
    Atau dengan generics
    ```ts
    let scores: Array<number> = [90, 80, 100];
    ```

2. **Tuple**

    Jenis struktur data seperti array yang memiliki panjang tetap dan tipe data yang ditentukan untuk setiap posisinya. Ini berbeda dari array biasa karena tuple menjamin jumlah elemen dan urutan tipenya. Tuple cocok digunakan untuk merepresentasikan kumpulan nilai yang terstruktur, seperti koordinat (x, y) atau nilai RGB (merah, hijau, biru), di mana setiap posisi memiliki arti yang jelas

    ```ts
    let person: [string, number] = ["Alice", 25]; // Di sini, elemen pertama wajib diisi dengan string dan elemen kedua adalah numerik
    console.log(person[0]); // Alice
    console.log(person[1]); // 25
    ```

3. **Enum**

    Sekumpulan nilai konstan yang lebih mudah dibaca. Pada TypeScript `Enum` disediakan dalam bentuk numeric dan string atau bahkan keduanya. Untuk mendefiniskan `Enum` kita menggunakan keyword `enum`.
    ```ts
    enum NameOfEnum {
       member: constantValue // constantValue is optional
    }
    ```
    **Numeric Enums**
    Artinya adalah kita melakukan inisiasi pada member dengan tipe data Number.
    ```ts
    enum Direction {
        Up=1,
        Down,
        Left,
        Right
    }

    let move_up: Direction = Direction.Up;
    let move_down: Direction = Direction.Down;
    let move_left: Direction = Direction.Left;
    let move_right: Direction = Direction.Right;

    console.log(move_up); // 1
    console.log(move_down); // 2
    console.log(move_left); // 3
    console.log(move_right); // 4
    ```

    Enum pada TypeScript menganut sistem Auto Incerement dari setelah member yand diberi inisiasi


    **String Enums**
    Pada dasarnya sama dengan Numeric Enums hanya saja perbedaanya adalah ketika kita assign pada member tipenya adalah String. Dan satu hal lagi tidak ada konsep Auto Increment pada String Enums.
    ```ts
    enum Direction {
        Up="UP",
        Down="DOWN",
        Left="LEFT",
        Right="RIGHT"
    }
    ```

    **Heterogeneous Enums**
    Enum jenis ini adalah gabungan dari Numeric Enums dan String Enums.
    ```ts
    enum Direction {
        Up=0,
        Down=1,
        Left="LEFT",
        Right="RIGHT"
    }
    ```

4. **Union**
    Fitur yang memungkinkan sebuah variabel memiliki salah satu dari beberapa tipe data yang berbeda atau lebih sederhananya bisa menyimpan lebih dari satu tipe.
    ```ts
    let id: string | number;
    id = "ABC123"; // ✅
    id = 101;      // ✅
    id = true;     // ❌ Error

    ```
5. **Literal**
    Variable yang membatasi nilai hanya ke konstanta tertentu.
    ```ts
    let direction: "up" | "down";
    direction = "up";   // ✅
    direction = "down"; // ✅
    direction = "left"; // ❌ Error

    ```

Sebenarnya, TypeScript memiliki mekanisme untuk menentukan tipe data dari suatu variable berdasarkan nilainya (type inference).
```ts
let city = "Semarang"; // otomatis string
city = 123; // ❌ Error
```

Jika deklarasi tanpa nilai
```ts
let data; // otomatis any
data = "Hello";
data = 123;
```

