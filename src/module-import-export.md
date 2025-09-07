# Module & Import/Export

Di JavaScript (sejak ES6) dan TypeScript, modul digunakan untuk membagi kode ke dalam file-file terpisah sehingga kode lebih mudah dibaca & dikelola dan bisa dipakai ulang di file lain. 

### Export
Sebuah file TypeScript dianggap sebagai modul ketika memiliki `export` atau `import`.

Contoh:

`mathUtils.ts`
```ts
// export variabel
export const PI = 3.14159;

// export fungsi
export function add(a: number, b: number): number {
  return a + b;
}

// export class
export class Calculator {
  multiply(x: number, y: number): number {
    return x * y;
  }
}
```


### Import
Kita bisa mengimpor apa yang diekspor dari file lain.

`app.ts`
```ts
import { PI, add, Calculator } from "./mathUtils";

console.log(PI); // 3.14159
console.log(add(10, 5)); // 15

const calc = new Calculator();
console.log(calc.multiply(4, 3)); // 12
```
Dengan kurung kurawal `{}` kita bisa mengambil item-item spesifik dari modul. TypeScript memastikan hanya yang diekspor yang bisa diimpor.

### Export Default
Kadang sebuah modul hanya punya satu hal utama. Untuk kasus ini kita bisa pakai default export.
Contoh:

logger.ts
```ts
export default function log(message: string): void {
  console.log("[LOG]:", message);
}
```

`app.ts`
```ts
import log from "./logger";

log("Halo dari default export!");
```

### Alias Import & Export
Kita bisa mengganti nama saat export atau import menggunakan `as`. Alias sering dipakai untuk menghindari konflik nama atau membuat kode lebih singkat.

`shapes.ts`
```ts
export function areaRectangle(w: number, h: number): number {
  return w * h;
}

export function areaCircle(r: number): number {
  return Math.PI * r * r;
}
```

`app.ts`
```ts
import { areaRectangle as rect, areaCircle as circle } from "./shapes";

console.log(rect(10, 5)); // 50
console.log(circle(7));   // 153.938...
```

