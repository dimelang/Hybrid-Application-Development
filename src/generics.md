# Konsep TypeScript 5: Generics
Sebelumnya kita sudah membahas Union & Intersection yang memberi fleksibilitas pada tipe. Terkadang terdapat sebuah kondisi yang membuat kita untuk membuat fungsi atau class yang bisa bekerja dengan banyak tipe tanpa kehilangan informasi tipe aslinya. Walaupun TypeScript memiliki operator `any`, namun hal ini akan membuat kebingungan karena kehilangan identitas. Di sinilah Generics sangat berguna. Generics memungkinkan kita menulis kode yang dapat digunakan kembali untuk berbagai tipe, tapi tetap memberikan jaminan tipe yang kuat.

## Generics pada Function

Dengan generics, kita bisa membuat fungsi yang menerima parameter dengan tipe yang bisa berubah-ubah.

Tanpa generics:
```ts
function identity(arg: any): any {
  return arg;
}

let a = identity(5);      // a: any
let b = identity("Hello"); // b: any
```
Masalah: hasilnya selalu any, sehingga kita kehilangan informasi tipe.

Dengan generics:
```ts
function identity<T>(arg: T): T {
  return arg;
}

let num = identity<number>(10);   // num: number
let str = identity("Halo");       // str: string (infer otomatis)
```
Dengan generics, kita mendefinisikan tipe sebagai parameter `<T>`. Hasilnya, TypeScript tahu bahwa input dan output punya tipe yang sama.

## Penamaan Parameter Generics
Kalau diperhatikan, kenapa kita sering melihat <T>, <K>, <V> di kode TypeScript?
Sebenarnya itu hanyalah nama variabel tipe, sama seperti kita memberi nama variabel biasa.
Namun, ada konvensi umum agar lebih mudah dibaca.
| Nama     | Makna Umum                        | Contoh Penggunaan                                  |
| -------- | --------------------------------  | -----------------                                  |
| `T`      | Type (umum)                       | `identity<T>(arg: T): T`                           |
| `U`,`S`  | Type tambahan / second            | `pair<T, U>(a: T, b: U)`                           |
| `K`      | Key dari sebuah object            | `getProperty<T, K extends keyof T>(obj: T, key: K)`|
| `V`      | Value dari sebuah object          | `Record<K, V> (objek dengan key K dan value V)`    |

Kita bisa pakai nama lain (`<MyType>`, `<Foo>`), tapi `<T>`, `<K>`, `<V>` sudah jadi kebiasaan.

Contoh:
```ts
function pair<K, V>(key: K, value: V): [K, V] {
  return [key, value];
}

let result = pair("id", 101); 
// result: [string, number]
```

**Generics pada function expression/arrow function:**
```ts
const getFirstElement = <T>(arr: T[]): T => {
  return arr[0];
};

let numbers = [1, 2, 3];
let first = getFirstElement(numbers); // first: number

let names = ["Ani", "Budi", "Cici"];
let firstName = getFirstElement(names); // firstName: string
```

**Generics dengan multi parameter:**
```ts
function merge<T, U>(obj1: T, obj2: U): T & U {
  return { ...obj1, ...obj2 };
}

let person = merge({ name: "Max" }, { age: 25 });
console.log(person); // { name: "Max", age: 25 }
```

**Constraint pada Generics

Kadang kita ingin membatasi tipe generics agar hanya tipe tertentu yang bisa digunakan.
Gunakan `extends`.
```ts
function getLength<T extends { length: number }>(arg: T): number {
  return arg.length;
}

console.log(getLength("Hello"));    // ✅ string punya length
console.log(getLength([1, 2, 3]));  // ✅ array punya length
// console.log(getLength(123));     // ❌ number tidak punya length
```

## Interface dengan Generics

Generics juga bisa digunakan dalam interface.
```ts
interface Repository<T> {
  data: T[];
  add(item: T): void;
  getAll(): T[];
}

class MemoryRepository<T> implements Repository<T> {
  data: T[] = [];

  add(item: T): void {
    this.data.push(item);
  }

  getAll(): T[] {
    return this.data;
  }
}

let userRepo = new MemoryRepository<string>();
userRepo.add("Jordan");
userRepo.add("Ani");
console.log(userRepo.getAll()); // ["Jordan", "Ani"]
```