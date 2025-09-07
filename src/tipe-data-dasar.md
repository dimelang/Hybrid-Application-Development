# Konsep TypeScript 1: Tipe Data Dasar
Di JavaScript, kita bebas memberikan nilai apapun ke sebuah variabel. Ini tentunya sangat fleksibel, tapi berpotensi menyebabkan bug. Seperti yang telah dijelaskan [di awal](./typescript.md). TypeScript hadir dengan sistem tipe yang ketat: kita bisa mendefinisikan sejak awal bahwa variabel hanya boleh menyimpan data dengan tipe tertentu. Dengan cara ini, kesalahan dapat dideteksi lebih awal, bahkan sebelum program dijalankan. TypeScript memiliki beberapa tipe data dasar, yaitu

1. **String**

    Digunakan untuk menyimpan data string yang menggunakan `"` atau `'`
    ```ts
    let word: string = "World";
    let greeting: string = `Hello, ${word}!`;
    ```
---
2. **Number**

    Digunakan untuk menyimpan data numerik seperti (integer, float/pecahan, heksadesimal, oktal)
    ```ts
    let age: number = 25;
    let pi: number = 3.14;
    let hex: number = 0xff;   // 255
    let binary: number = 0b1010; // 10
    let octal: number = 0o744; // 484
    ```
---
3. **Boolean**
    Digunakan untuk menyimpan data yang bernilai `true` atau `false`
    ```ts
    let isActive: boolean = true;
    let isAdmin: boolean = false;
    ```
---
4. **Null dan Undefined**

     `null` merupakan nilai kosong yang diberikan secara eksplisit. Akan dikonversi menjadi 0 dalam operasi aritmatika. 
     `undefined` merupakan nilai default ketika suatu variable belum diberi nilai. Akan menghasilkan NaN (Not a Number) dalam operasi aritmatika.
     ```ts
     let emptyValue: null = null;
     let notAssigned: undefined = undefined;
     ```
---

Selain tipe data dasar di atas, TypeScript juga memiliki beberapa tipe data khusus seperti

1. **Any**
    
    Tipe data yang menonaktifkan pemeriksaan tipe sehingga memperbolehkan variable atau fungsi menerima dan menampung nilai dari tipe data apapun. Tapi ini menghilangkan manfaat TypeScript, jadi gunakan hanya jika perlu.
    ```ts
    let randomValue: any = 10;
    randomValue = "Hello"; // tidak error
    randomValue = true;    // tidak error
    ```

2. **Unknown**
    
    Tipe data yang merepresentasikan nilai yang tipenya tidak diketahui atau tidak pasti pada saat kompilasi. Mirip `any`, tapi lebih aman. Kita harus cek tipe sebelum digunakan.
    ```ts
    let input: unknown = "Hello";
    if (typeof input === "string") {
        console.log(input.toUpperCase()); // HELLO
    }

    ```


