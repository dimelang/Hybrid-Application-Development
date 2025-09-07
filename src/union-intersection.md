# Konsep TypeScript 4: Union & Intersection

Dalam pemrograman nyata, kadang sebuah variabel bisa menampung lebih dari satu tipe data. Misalnya, ID user bisa berupa number atau string.

## Union Types (`|`)
Union `|` berarti salah satu dari beberapa tipe.
Contoh sederhana
```ts
let userId: number | string;

userId = 101;       // ✅ number
userId = "A102";    // ✅ string
userId = true;      // ❌ Error: Type 'boolean' is not assignable
```

Selain digunakan dalam variable, union (`|`) juga dapat digunakan pada function
contoh union pada function
```ts
function printId(id: number | string) {
  console.log("User ID:", id);
}

printId(123);     // ✅
printId("ABC");   // ✅
```

Union sangat berguna ketika kita berhadapan dengan data yang fleksibel tapi masih terkontrol. Namun, ketika menggunakan union, kita harus hati-hati. TypeScript memaksa kita untuk memastikan operasi yang dilakukan valid untuk semua tipe dalam union.

### Narrowing (Mempersempit Union)
Ketika menggunakan union, kita sering perlu memeriksa tipe data sebelum mengaksesnya. Proses ini disebut type narrowing.

Contoh narrowing sederhana:
```ts
function formatId(id: number | string) {
  if (typeof id === "string") {
    return id.toUpperCase(); // ✅ aman karena pasti string
  } else {
    return id.toFixed(2);    // ✅ aman karena pasti number
  }
}

console.log(formatId(123));     // "123.00"
console.log(formatId("abc"));   // "ABC"
```

## Intersection (`&`)
Fitur yang memungkinkan kita untuk menggabungkan beberapa tipe data menjadi satu tipe baru yang memiliki semua properti dan anggota dari setiap tipe yang digabungkan. Fitur ini sangat berguna untuk membuat tipe yang kompleks dari tipe-tipe yang lebih sederhana, di mana objek yang menggunakan tipe interseksi ini harus memenuhi semua persyaratan dari setiap tipe yang termasuk di dalamnya. 
Contoh sederhana:
```ts
interface Person {
  name: string;
}

interface Employee {
  company: string;
}

interface Worker = Person & Employee;

let staff: Worker = {
  name: "Max",
  company: "Microsoft"
};
```

`Worker` adalah seseorang yang sekaligus seorang karyawan, sehingga harus punya properti dari `Person` dan `Employee`

Selain pada interface, kita juga dapat menggunakan intersection pada tipe data dasar.
```ts
type A = { x: number };
type B = { y: string };

type AB = A & B;

let obj: AB = { x: 10, y: "hello" }; // ✅ harus punya keduanya
```

```ts
type C = { id: number };
type D = { id: string };

type CD = C & D; // ❌ Tidak mungkin, karena 'id' tidak bisa number sekaligus string
```

## Menggabungkan Union & Intersection
Terkadang, kita perlu mengombinasikan union dan intersection untuk membentuk tipe yang lebih kompleks. Teknik ini sering digunakan dalam aplikasi nyata, misalnya ketika mendesain model data yang fleksibel.

```ts
interface Admin {
  role: "admin";
  accessLevel: number;
}

interface User {
  role: "user";
  email: string;
}

interface Account = (Admin | User) & { id: number };

let acc1: Account = {
  id: 1,
  role: "admin",
  accessLevel: 5
};

let acc2: Account = {
  id: 2,
  role: "user",
  email: "test@mail.com"
};
```