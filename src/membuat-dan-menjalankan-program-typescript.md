# Membuat dan Menjalankan Program TypeScript
Sekarang mari buat file TypeScript pertama kita. TypeScript dapat ditulis dalam file `.ts` yang nantinya akan dikompilasi ke JavaScript lalu jalankan menggunakan **Node.js**.

## Langkah-langkah
1. Buat file `hello.ts`
    ```ts
    let word: string = "World";
    console.log(`Hello, ${word}!`);
    ```

2. Kompilasi file `hello.ts` ke JavaScript menggunakan perintah berikut di terminal/CMD.
    ```bash
    tsc hello.ts
    ```
    Nantinya, akan tercipta sebuah file baru yaitu `hello.js`

3. Jalankan dengan Node.js menggunakan perintah termnial/CMD berikut
    ```
    node hello.js
    ```

