# REST API

REST (Representational State Transfer) adalah arsitektur yang menggunakan HTTP sebagai protokol komunikasi. REST API menyediakan serangkaian endpoint untuk melakukan operasi data menggunakan HTTP method standar seperti:

- GET → mengambil data
- POST → menambah data
- PUT → mengupdate data
- PATCH → mengupdate sebagian data
- DELETE → menghapus data

Setiap endpoint biasanya mewakili sebuah resource, misalnya:

| Resource | Contoh Endpoint              |
| -------- | ---------------------------- |
| Customer | `/customer`, `/customer/:id` |
| Products | `/products`, `/products/:id` |

REST API selalu mengembalikan data dalam format JSON sehingga mudah diproses di frontend.

**Cara Kerja REST API di Express**

1. Ketika client mengirim request ke server:
2. Request masuk ke routing (routes/)
3. Diteruskan ke controller
4. Controller memanggil service (business logic)
5. Service berhubungan dengan repository (query ke database)
6. Hasil dikembalikan ke controller
7. Controller mengirim response JSON ke client

**Contoh Endpoint REST API**

```js
app.get("/customer", (req, res) => {
  res.json({ message: "Daftar customer" });
});
```

Response JSON yang umum digunakan:

```json
{
  "success": true,
  "data": [...],
  "message": "Berhasil mengambil data"
}
```

## Integrasi REST API + Express + MySQL

Contoh pada modul ini menggunakan database [northwind](https://en.wikiversity.org/wiki/Database_Examples/Northwind/MySQL). Pastikan telah me-_import_ ke MySQL local.

## Struktur Folder

```bash
project/
│
├── src/
│  ├── config/
│  │  └── db.js → koneksi MySQL
│  │
│  ├── repositories/
│  │  └── customer.repository.js → query SQL (data access layer)
│  │
│  ├── services/
│  │  └── customer.service.js → business logic (domain layer)
│  │
│  ├── controllers/
│  │  └── customer.controller.js → HTTP request handler (interface layer)
│  │
│  ├── routes/
│  │  └── customer.routes.js → routing
│  │
│  ├── middlewares/
│  │  └── errorHandler.js
│  │
│  └── app.js → konfigurasi Express
│
└── index.js → entry point server
```

## Contoh

### Membuat Koneksi ke MySQL

**src/config/db.js**

```js
const mysql = require("mysql2/promise");

const pool = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "",
  database: "northwind",
  port: 3306,
});

module.exports = pool;
```

### Membuat Query (Repository Layer)

Repositori bertanggung jawab penuh terhadap query ke database.

**src/repositories/user.repository.js**

```js
const db = require("../config/db");

async function getAllCustomer() {
  const [rows, fields] = await db.execute("SELECT * FROM customers");
  return rows;
}

async function getCustomerById(id) {
  const sql = "SELECT * FROM customers WHERE id=?";
  const [rows, field] = await db.execute(sql, id);
  return rows[0] ?? null;
}

module.exports = {
  getAllCustomer,
  getCustomerById,
};
```

### Membuat Logic Bisnis (Service Layer)

Lapisan service berfungsi sebagai business logic, misalnya validasi, transformasi data, dan aturan bisnis lainnya.

**src/services/customer.service.js**

```js
const customerRepository = require("../repositories/customer.repository");

async function listCustomer() {
  return await customerRepository.getAllCustomer();
}

async function findCustomer(id) {
  if (!/^[+-]?\d+(\.\d+)?$/.test(id)) {
    throw new Error("Id customer tidak valid. Harus berupa angka");
  }
  const customer = await customerRepository.getCustomerById([id]);

  if (!customer) throw new Error("Customer tidak ditemukan");

  return customer;
}

module.exports = {
  listCustomer,
  findCustomer,
};
```

### Membuat Controller

Lapisan ini berfungsi sebagai jembatan antara request dari client dan layanan aplikasi.

**src/controllers/customer.controller.js**

```js
const customerService = require("../services/customer.service");

async function getAllCustomer(req, res, next) {
  try {
    const customers = await customerService.listCustomer();
    res.json({ success: true, data: customers });
  } catch (error) {
    next(error);
  }
}
async function getCustomerById(req, res, next) {
  try {
    const { id } = req.params;
    const customer = await customerService.findCustomer(id);
    res.json({ success: true, data: customer });
  } catch (error) {
    next(error);
  }
}

module.exports = {
  getAllCustomer,
  getCustomerById,
};
```

### Membuat Routing

**src/routes/customer.routes.js**

```js
const express = require("express");
const router = express.Router();
const customerController = require("../controllers/customer.controller");

router.get("/", customerController.getAllCustomer);
router.get("/:id", customerController.getCustomerById);

module.exports = router;
```

### Membuat Middleware (Error Handler)

**errorHandler.js**

```js
module.exports = (err, req, res, next) => {
  console.log(err);

  res.status(err.status).json({
    success: false,
    message: err.message,
  });
};
```

### Integrasi Ke Aplikasi

**src/app.js**

```js
const express = require("express");
const app = express();

const customerRoutes = require("./routes/customer.routes");
const errorHandler = require("./middlewares/errorHandler");

app.use(express.json());

app.use("/customer", customerRoutes);

app.use(errorHandler);

module.exports = app;
```

**index.js**

```js
const app = require("./src/app");
const PORT = 3001;

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
```
