# Class & OOP Dasar

JavaScript sudah mengenalkan konsep class sejak ES6. Di TypeScript, class mendapatkan kekuatan tambahan berupa static typing, access modifier, dan interface/class inheritance. Dengan class, kita bisa membuat blueprint untuk objek, sehingga kode lebih terstruktur dan mudah dikelola.

### Membuat Class Dasar
Class adalah cetak biru (blueprint) untuk membuat objek.

```ts
class Person {
  name: string;
  age: number;

  constructor(name: string, age: number) {
    this.name = name;
    this.age = age;
  }

  greet() {
    console.log(`Halo, nama saya ${this.name} dan saya berusia ${this.age} tahun.`);
  }
}

let user = new Person("Ryo", 35);
user.greet();
// Output: Halo, nama saya Ryo dan saya berusia 35 tahun.
```
Contoh di atas, kita membuat class Person dengan properti name dan age. Constructor digunakan untuk menginisialisasi properti, dan method greet menampilkan data. Dengan ini, kita bisa membuat banyak objek Person tanpa menulis ulang struktur yang sama.

### Access Modifier
TypeScript menambahkan access modifier untuk mengatur visibilitas properti dan method.
```ts
class Car {
  public brand: string;       // Bisa diakses dari mana saja
  private engineNumber: string; // Hanya bisa diakses dari dalam class
  protected year: number;     // Bisa diakses oleh class ini & turunannya

  constructor(brand: string, engineNumber: string, year: number) {
    this.brand = brand;
    this.engineNumber = engineNumber;
    this.year = year;
  }

  getInfo() {
    return `${this.brand} (${this.year})`;
  }
}

let car = new Car("Toyota", "EN12345", 2020);
console.log(car.brand);          // ✅ Toyota
// console.log(car.engineNumber); // ❌ Error: private
```
- `public`: default, bisa diakses dari mana saja.
- `private`: hanya bisa diakses di dalam class itu sendiri.
- `protected`: bisa diakses dari class dan subclass (turunan).

### Getter & Setter
Kita bisa membuat method khusus untuk mengambil dan mengubah nilai dengan kontrol lebih.
```ts
class Account {
  private _balance: number = 0;

  get balance(): number {
    return this._balance;
  }

  set balance(amount: number) {
    if (amount < 0) throw new Error("Balance tidak boleh negatif");
    this._balance = amount;
  }
}

let acc = new Account();
acc.balance = 1000;        // Setter
console.log(acc.balance);  // Getter -> 1000
```

Getter & Setter memberi kontrol penuh atas cara data diakses dan dimodifikasi.
Misalnya, kita bisa menolak nilai negatif untuk `balance`.

### Inheritance (Pewarisan)
Class bisa mewarisi dari class lain dengan `extends`.
```ts
class Animal {
  name: string;

  constructor(name: string) {
    this.name = name;
  }

  move() {
    console.log(`${this.name} bergerak.`);
  }
}

class Dog extends Animal {
  bark() {
    console.log(`${this.name} menggonggong.`);
  }
}

let dog = new Dog("Buddy");
dog.move();  // Buddy bergerak.
dog.bark();  // Buddy menggonggong.
```

Dengan inheritance, kita bisa membuat class baru yang mewarisi properti dan method dari class lain.
Ini memungkinkan reuse kode dan membuat struktur hierarki yang lebih natural.

### Method Overriding
Subclass bisa menimpa (override) method dari superclass.
```ts
class Bird extends Animal {
  move() {
    console.log(`${this.name} terbang.`);
  }
}

let bird = new Bird("Garuda");
bird.move(); // Garuda terbang.
```

### Abstract Class
Abstract class tidak bisa dibuat instance langsung. Biasanya digunakan sebagai blueprint untuk class lain. Abstract class seperti kontrak: class turunan wajib mengimplementasikan method yang abstrak.
```ts
abstract class Shape {
  abstract area(): number;
}

class Rectangle extends Shape {
  constructor(public width: number, public height: number) {
    super();
  }

  area(): number {
    return this.width * this.height;
  }
}

let rect = new Rectangle(10, 5);
console.log(rect.area()); // 50
```

### Static Member
Kita bisa membuat properti dan method yang dimiliki oleh class itu sendiri, bukan oleh objeknya.
```ts
class MathUtil {
  static PI: number = 3.14159;

  static circleArea(radius: number): number {
    return this.PI * radius * radius;
  }
}

console.log(MathUtil.PI);               // 3.14159
console.log(MathUtil.circleArea(10));   // 314.159
```



