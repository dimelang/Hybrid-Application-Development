# Konsep TypeScript 2: Function & Parameter

Dalam JavaScript, function bisa menerima argumen apa saja dan mengembalikan apapun. Ini tentunya sangat fleksibel, tapi rawan error. Dengan TypeScript, kita bisa menentukan tipe parameter dan tipe return value, sehingga function lebih jelas dan aman.

Contoh JavaScript:
```js
function add(a, b) {
  return a + b;
}

console.log(add(10, "20")); // "1020" → salah paham jadi string
```

Contoh TypeScript
```ts
function add(a: number, b: number): number {
  return a + b;
}

console.log(add(10, 20)); // 30
console.log(add(10, "20")); // ❌ Error

```

```ts
function full_name(first_name: string, last_name: string): string {
  return first_name + last_name;
}

console.log(full_name("Georgy", "Adelson")); // Georgy Adelson
console.log(full_name("Georgy", 62)); // ❌ Error

```

Jika function tidak mengembalikan nilai, gunakan `void` sebagai return type
```ts
function logMessage(message: string): void {
  console.log(message);
}
```

## Optional Parameter (?)
    
Parameter dalam TypeScript dapat dibuat opsional dengan tanda `?`, sehingga boleh tidak diisi.

```ts
function sayHello(name?: string): string {
    return name ? `Hello, ${name}` : "Hello, stranger!";
}

console.log(sayHello("Georgy")); // Hello, Georgy
console.log(sayHello());        // Hello, stranger!
```

## Deafult Parameter
Kita juga dapat memberi nilai default pada parameter.
```ts
function greetUser(name: string = "Guest"): string {
  return `Welcome, ${name}!`;
}

console.log(greetUser());       // Welcome, Guest!
console.log(greetUser("Georgy"));  // Welcome, Ani!
```

## Rest Parameter
Jika jumlah parameter tidak menentu, kita dapat menggunakan `...`
```ts
function sumAll(...numbers: number[]): number {
  return numbers.reduce((acc, curr) => acc + curr, 0);
}

console.log(sumAll(1, 2, 3, 4, 5)); // 15
```

## Function Expression
Selain deklarasi biasa, kita juga bisa menuliskan function sebagai ekspresi
```ts
const multiply = function (a: number, b: number): number {
  return a * b;
};
```

## Arrow Function (=>)
Arrow function disediakan untuk meringkas penulisa sebuah function sederhana
```ts
const divide = (a: number, b: number): number => a / b;

console.log(divide(10, 2)); // 5
```

## Overloading Function
TypeScript mendukung overloading yaitu function dengan bentuk parameter berbeda tapi memiliki nama yang sama
```ts
function combine(a: string, b: string): string;
function combine(a: number, b: number): number;
function combine(a: any, b: any): any {
  return a + b;
}

console.log(combine(10, 20));     // 30
console.log(combine("Hello, ", "World")); // Hello, World
```


