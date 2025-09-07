# Konsep TypeScript 3: Object & Interface

## Objek
Dalam JavaScript, objek adalah kumpulan properti yang menyimpan berbagai data. Pada TypeScript, kita bisa menentukan tipe properti dalam sebuah objek sehingga lebih jelas struktur datanya.

Contoh sederhana:
```ts
let user: { name: string; age: number; isAdmin: boolean } = {
  name: "Max",
  age: 25,
  isAdmin: true
};

console.log(user.name); // Max
```
Pastikan ketika memberikan nilai untuk setiap properti sudah sesuai dengan tipe data yang didefinisikan.

Selain pada function, operator optional `?` juga dapat digunakan pada objek.
```ts
let product: { id: number; name: string; description?: string } = {
  id: 101,
  name: "Laptop"
};

console.log(product.description); // undefined
```

#### Readonly Property

Dalam TypeScript, properti dapat dibuat tidak bisa diubah. Caranya adalah menambahkan syntax `readonly` sebelum nama properti.
```ts
let car: { readonly band: string; year: number } = {
  brand: "Dream Theater",
  year: 1985
};

car.year = 1968;     // ✅ Bisa diubah
car.brand = "Led Zeppelin"; // ❌ Error
```

## Interface
Interface adalah cara mendefinisikan bentuk dari sebuah objek dengan lebih rapi dan bisa digunakan berulang kali. Kalau tadi kita mendefinisikan tipe objek langsung di variabel, sekarang kita bisa memisahkan definisinya agar lebih mudah dibaca.

Contoh interface sederhana
```ts
interface User {
  name: string;
  age: number;
  isAdmin: boolean;
}

let admin: User = {
  name: "Ani",
  age: 30,
  isAdmin: true
};
```

Fitur opsional `?` dan `readonly` juga dapat diterapkan pada interface.

```ts
interface Product {
  readonly id: number;
  name: string;
  description?: string;
}

let item: Product = {
  id: 123,
  name: "Smartphone"
};

item.name = "Tablet";   // ✅
item.id = 456;          // ❌ Error
```

Selain menggunakan properti dengan nilai tunggal, properti pada interface juga bisa mendefinisikan bentuk function.
```ts
interface Person {
  name: string;
  greet(): void;
}

let user1: Person = {
  name: "John",
  greet() {
    console.log(`Hello, my name is ${this.name}`);
  }
};

user1.greet(); // Hello, my name is John
```

Interface juga bisa mewarisi (extend) sifat ke interface lainnya.
```ts
interface Animal {
  name: string;
  sound(): void;
}

interface Dog extends Animal {
  breed: string;
}

let myDog: Dog = {
  name: "Buddy",
  breed: "Golden Retriever",
  sound() {
    console.log("Woof woof!");
  }
};

myDog.sound(); // Woof woof!
```

