# SQLite

Merupakan database relasional yang berjalan di dalam perangkat dan sangat cocok digunakan untuk data yang lebih komplek seperti:
| Kebutuhan                                            | Cocok memakai    |
| ---------------------------------------------------- | ---------------- |
| Simpan token, flag kecil, preferensi                 | **MMKV**         |
| Simpan beberapa data ringan                          | **AsyncStorage** |
| Simpan data banyak, tabel, relasional, CRUD kompleks | **SQLite**       |

Salah satu library terbaik untuk React Native adalah `react-native-quick-sqlite` karena memiliki beberapa keunggulan seperti:
- Sangat cepat
- Synchronous
- Mendukung React Native CLI maupun Expo

## Instalasi
React Native CLI:
```bash
npm install react-native-nitro-sqlite react-native-nitro-modules
```

Expo:
```bash
npx expo install react-native-nitro-sqlite react-native-nitro-modules
npx expo prebuild
```

### API 
| Metode / Properti                                                                 | Deskripsi / Kegunaan                                                                                                                                                                                                                                                                   |
| --------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **`close()`**                                                                     | Menutup koneksi database. setelah ini operasi pada `db` tidak dapat dilakukan lagi.                                                                                                                                                                                                    |
| **`delete()`**                                                                    | Menghapus file database (menghapus keseluruhan database). Berguna untuk reset/clear data seluruh database.                                                                                                                                                                             |
| **`attach(dbNameToAttach, alias, location?)`**                                    | Melampirkan (attach) database lain ke koneksi saat ini — artinya dua database yang berbeda dapat digunakan dalam satu connection (misalnya untuk join antar-database). `<dbNameToAttach>`: nama database file, `<alias>`: alias yang akan digunakan, `location` (opsional) lokasi file. |
| **`detach(alias)`**                                                               | Melepaskan (detach) database yang sebelumnya diter-attach dengan alias tertentu. Setelah detach, tidak dapat mengakses lagi schema dari database terlampir itu.                                                                                                                    |
| **`transaction(fn: (tx: Transaction) => void): Promise<void>`**                   | Membuka transaksi. Fungsi `fn` menerima objek `tx` (Transaction). Semua operasi di dalam transaction akan dieksekusi sebagai satu unit — jika terjadi error maka akan di-*ROLLBACK*. Berguna untuk menjaga konsistensi data dalam serangkaian query.                             |
| **`execute(query: string, params?: any[]): QueryResult`**                         | Menjalankan single SQL query **secara *sinkron***. Mengembalikan hasil `QueryResult` (berisi misalnya `rows`, `rowsAffected`, dsb). Karena berjalan secara sinkron, perlu hati-hati jika query berat agar tidak memblok UI.                                                                           |
| **`executeAsync(query: string, params?: any[]): Promise<QueryResult>`**           | Versi *asynchronous* dari `execute`. Operasinya berlangsung di thread native dan tidak memblok UI. Kembalian via `Promise`. Cocok untuk query yang berat atau banyak data.                                                                                                               |
| **`executeBatch(commands: BatchQueryCommand[]): BatchQueryResult`**               | Menjalankan sekumpulan query dalam satu batch (transaksi tunggal) **secara sinkron**. `commands` adalah array objek yang berisi `query` dan `params` (opsional). Cocok untuk operasi massal (insert/update/delete banyak data) dengan efisiensi.                                       |
| **`executeBatchAsync(commands: BatchQueryCommand[]): Promise<BatchQueryResult>`** | Versi asynchronous dari batch: menjalankan banyak query dalam satu transaksi, tetapi tanpa memblok UI. Mengembalikan hasil melalui `Promise`.                                                                                                                                          |
| **`loadFile(location: string): FileLoadResult`**                                  | Memuat file SQL (dump, skrip) ke database — sinkron. Berguna jika Anda ingin inisialisasi database dari file `.sql`. `location` adalah path ke file SQL.                                                                                                                               |
| **`loadFileAsync(location: string): Promise<FileLoadResult>`**                    | Versi asynchronous dari `loadFile`, cocok untuk file besar agar tidak memblok UI.                                                                                                                                                                                                      |



Sebelum menggunakan API di atas, buka (atau membuat baru jika belum ada) sebuah file database SQLite menggunakan perintah berikut:
```tsx
import { open } from 'react-native-nitro-sqlite'
const db = open({ name: 'myDb.sqlite' })
```
Ketika dijalankan program akan:
- Membuat koneksi database
- Mengembalikan objek DB

Cukup inisialisasi sekali dan gunakan diseluruh aplikasi

### `execute` - Menjalankan single SQL query (sinkron)
Contoh: membuat table + insert + select
```tsx
db.execute(`
  CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT
  )
`)

db.execute(`INSERT INTO users (name) VALUES (?)`, ["Ben Duerr"])

const result = db.execute(`SELECT * FROM users`)
console.log("Rows:", result.rows)
```

### `execute` - Menjalankan single SQL query (asinkron)
contoh: select data besar
```tsx
const result = await db.executeAsync(`SELECT * FROM big_table`)
console.log("Total rows:", result.rows.length)
rows.forEach((row) => {
    console.log(row);
});
```

### `executeBatch` - Multiple SQL query dalam satu batch (sinkron)
Contoh: insert banyak data sekaligus
```tsx
db.executeBatch([
  { query: `INSERT INTO items (name) VALUES (?)`, params: ["Apple"] },
  { query: `INSERT INTO items (name) VALUES (?)`, params: ["Orange"] },
  { query: `INSERT INTO items (name) VALUES (?)`, params: ["Banana"] },
])
```

### `executeBatchAsync` - Multiple SQL query dalam satu batch (asinkron)
```tsx
await db.executeBatchAsync([
  { query: `INSERT INTO logs (message) VALUES (?)`, params: ["Started"] },
  { query: `INSERT INTO logs (message) VALUES (?)`, params: ["Processing"] },
  { query: `INSERT INTO logs (message) VALUES (?)`, params: ["Done"] },
])
```

### `transaction` - Transaksi atomic
Contoh: insert 2 data. Jika satu gagal → rollback
```tsx
await db.transaction(tx => {
  tx.execute(`INSERT INTO orders (item, price) VALUES (?, ?)`, ["A", 100])
  tx.execute(`INSERT INTO orders (item, price) VALUES (?, ?)`, ["B", 200])
})
```

### `attach` - Melampirkan database lain
Contoh: memakai 2 database sekaligus
```tsx
db.attach("analytics.sqlite", "analytics")

const result = db.execute(`
  SELECT u.name, a.visit_count
  FROM users u
  JOIN analytics.stats a ON u.id = a.user_id
`)
```

### `detach` - Melepaskan database terlampir
```tsx
db.detach("analytics")
```

### `loadFile` - Memuat skrip SQL (sinkron)
Contoh: load file schema awal
```tsx
db.loadFile("assets/schema.sql")
```

### `loadFileAsync` - Memuat skrip SQL (asinkron)
```tsx
await db.loadFileAsync("assets/seed.sql")
```

### `close` - Menutup koneksi
```tsx
db.close()
```

### delete - Mengahus database
```tsx
db.delete()
```