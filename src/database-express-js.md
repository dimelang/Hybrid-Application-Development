# Database

Database berfungsi untuk menyimpan dan mengelola data secara permanen, sehingga aplikasi dapat:

- menyimpan data pengguna,
- mengambil daftar produk,
- mengupdate informasi,
- menghapus data,
- dll.

Pada aplikasi backend, Express bertindak sebagai web server yang menerima _request_ lalu memprosesnya. Biasanya juga berinteraksi dengan database untuk mengambil atau menyimpan data. Menurut [dokumentasi resmi Express](https://expressjs.com/en/guide/database-integration.html), integrasi database dilakukan dengan menggunakan driver database bawaan Node.js seperti `Cassandra`, `Couchbase`, `CouchDB`, `MongoDB`, `MySQL`, dll. Namun, pada modul ini kita akan fokus pada MySQL, salah satu database relasional yang paling populer dan sering digunakan untuk aplikasi web skala kecil hingga besar.

## Instalasi

Untuk menggunakan MySQL pada Express, kita membutuhkan driver Node.js. Library yang direkomendasikan adalah:

- [mysql2](https://sidorares.github.io/node-mysql2/docs) merupakan versi lebih modern dari [mysql](https://github.com/mysqljs/mysql).

```bash
npm i mysql2
```

## Membuat Koneksi ke Database

Terdapat dua cara dalam membuat koneksi ke MySQL.

### 1. Koneksi Tunggal (Single Connection)

Cocok untuk aplikasi kecil atau latihan.

```js
const mysql = require("mysql2");

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "nama_database",
  port: 3306,
});

db.connect((err) => {
  if (err) {
    console.error("Gagal koneksi ke database:", err);
    return;
  }
  console.log("Berhasil terkoneksi ke MySQL");
});

module.exports = db;
```

### 2. Pool Koneksi

Lebih stabil untuk aplikasi sebenarnya karena dapat mengelola banyak koneksi secara efisien.

```js
const mysql = require("mysql2");

const pool = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "",
  database: "nama_database",
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

module.exports = pool.promise();
```

## Query

### `Select`

```js
const db = require("./connection");

async function getDataById(id) {
  try {
    const [rows, field] = await db.query(
      `SELECT * FROM table_data WHERE id=${id}`
    );
    return rows;
  } catch (error) {
    console.log(err);
  }
}
```

- `.query()`: metode untuk mengeksekusi query
- `rows`: memuat data hasil query
- `fields`: memuat meta data dari baris

Jika ingin menggunakan prepared statement. Prepared Statement adalah fitur database untuk mengeksekusi query SQL yang sudah disiapkan sebelumnya dengan parameter dinamis. Dengan cara ini, nilai yang dimasukkan ke query dipisahkan dari struktur query SQL-nya.

```js
const db = require("./connection");

async function getDataById(id) {
  try {
    const [rows, field] = await db.execute(
      "SELECT * FROM table_data WHERE id=?",
      [id]
    );
    return rows;
  } catch (error) {
    console.log(error);
  }
}
```

### `Insert`

```js
async function insertData(value_1, value_2) {
  try {
    const [result, fields] = await db.query(
      `INSERT INTO table_data (col_1, col_2) VALUES (${value_1}, ${value_2})`
    );
    return result;
  } catch (error) {
    console.log(error);
  }
}
```

Atau jika ingin menggunakan prepared statement

```js
async function insertData(value_1, value_2) {
  try {
    const [result, fields] = await db.execute(
      "INSERT INTO table_data (col_1, col_2) VALUES (?,?)",
      [value_1, value_2]
    );
    return result;
  } catch (error) {
    console.log(error);
  }
}
```

### `Update`

```js
async function updateData(new_value, edited_id) {
  try {
    const [result, fields] = await db.query(
      `UPDATE table_data SET edited_column = ${new_value} WHERE edited_id = ${edited_id}`
    );
    return result;
  } catch (error) {
    console.log(error);
  }
}
```

Atau jika ingin menggunakan prepared statement

```js
async function updateData(new_value, edited_id) {
  try {
    const [result, fields] = await db.execute(
      "UPDATE table_data SET edited_column = ? WHERE edited_id = ?",
      [new_value, edited_id]
    );
    return result;
  } catch (error) {
    console.log(error);
  }
}
```

### `Delete`

```js
async function deleteData(deleted_id) {
  try {
    const [result, fields] = await db.query(
      `DELETE FROM table_data WHERE deleted_id = ${deleted_id}`
    );
    return result;
  } catch (error) {
    console.log(error);
  }
}
```

Atau jika ingin menggunakan prepared statement

```js
async function deleteData(deleted_id) {
  try {
    const [result, fields] = await db.execute(
      "DELETE FROM table_data WHERE deleted_id = ?",
      [deleted_id]
    );
    return result;
  } catch (error) {
    console.log(error);
  }
}
```
