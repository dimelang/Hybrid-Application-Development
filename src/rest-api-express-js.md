# REST API

REST (Representational State Transfer) adalah arsitektur yang menggunakan HTTP sebagai protokol komunikasi. REST API menyediakan serangkaian endpoint untuk melakukan operasi data menggunakan HTTP method standar seperti:

- GET → mengambil data
- POST → menambah data
- PUT → mengupdate data
- PATCH → mengupdate sebagian data
- DELETE → menghapus data

Setiap endpoint biasanya mewakili sebuah resource, misalnya:

| Resource | Contoh Endpoint      |
| -------- | -------------------- |
| Task     | `/task`, `/task/:id` |
| User     | `/user`, `/user/:id` |

REST API selalu mengembalikan data dalam format JSON sehingga mudah diproses di frontend.

**Cara Kerja REST API di Express**
Pada aplikasi Express, alur kerja REST API adalah sebagai berikut:

1. Ketika client mengirim request ke server:
2. Request masuk ke routing (routes/)
3. Diteruskan ke controller
4. Controller memanggil service (business logic)
5. Service berhubungan dengan repository (query ke database)
6. Hasil dikembalikan ke controller
7. Controller mengirim response JSON ke client

## Integrasi REST API + Express + MySQL

Contoh pada modul ini menggunakan database [todo_app](./assets/todo_app.sql) dan menerapakan struktur yang rapi (clean architecture sederhana).

## Struktur Folder

```bash
project/
│
├── src/
│  ├── config/
│  │  └── db.js → koneksi MySQL
│  │
│  ├── repositories/  → query SQL (data access layer)
│  │  ├── task.repository.js
│  │  └── user.repository.js
│  │
│  ├── services/  → business logic (domain layer)
│  │  ├── task.service.js
│  │  └── user.service.js
│  │
│  ├── controllers/  → HTTP request handler (interface layer)
│  │  ├── task.controller.js
│  │  └── user.controller.js
│  │
│  ├── routes/
│  │  ├── task.routes.js
│  │  └── user.routes.js
│  │
│  ├── middlewares/
│  │  └── errorHandler.js
│  │
│  └── app.js → konfigurasi Express
│
└── index.js → entry point server
```

### Routing

Routing bertugas untuk menerima request berdasarkan URL dan HTTP method, lalu meneruskannya ke controller.

Contoh file `src/routes/task.routes.js`

```js
const express = require("express");
const router = express.Router();
const authController = require("../controllers/auth.controller");

router.get("/", taskController.getAllTasks);
router.get("/:id", taskController.getTaskById);
router.post("/", taskController.createTask);
router.put("/:id", taskController.updateTask);
router.delete("/:id", taskController.deleteTask);

module.exports = router;
```

Routing hanya berfungsi sebagai penghubung, tidak mengandung logic bisnis maupun query database.

### Controller

Controller bertugas:

- Menerima _request_ (`req`)
- Memanggil service
- Mengembalikan response ke client

Contoh file `src/controllers/task.controller.js`

```js
const taskService = require("../services/task.service");

class TaskController {
  async getTaskById(req, res) {
    try {
      const { id } = req.params;
      const task = await taskService.getTaskById(id);

      res.status(200).json({
        success: true,
        data: task,
      });
    } catch (error) {
      res.status(404).json({
        success: false,
        message: error.message,
      });
    }
  }

  async getUserTasks(req, res) {
    try {
      const { userId } = req.params;
      const result = await taskService.getUserTasks(userId);

      res.status(200).json({
        success: true,
        data: result,
      });
    } catch (error) {
      res.status(404).json({
        success: false,
        message: error.message,
      });
    }
  }

  async createTask(req, res) {
    try {
      const taskData = req.body;
      const result = await taskService.createTask(taskData);

      res.status(201).json(result);
    } catch (error) {
      res.status(400).json({
        success: false,
        message: error.message,
      });
    }
  }

  async updateTask(req, res) {
    try {
      const { id } = req.params;
      const updateData = req.body;
      const result = await taskService.updateTask(id, updateData);
      res.status(200).json(result);
    } catch (error) {
      res.status(400).json({
        success: false,
        message: error.message,
      });
    }
  }

  async deleteTask(req, res) {
    try {
      const { id } = req.params;
      const result = await taskService.deleteTask(id);
      res.status(200).json(result);
    } catch (error) {
      res.status(400).json({
        success: false,
        message: error.message,
      });
    }
  }
}

module.exports = new TaskController();
```

### Service

Service berisi logic aplikasi, misalnya:

- Validasi tambahan
- Aturan bisnis
- Pengolahan data sebelum atau sesudah dari database

Contoh file `src/services/task.service.js`

```js
const taskRepository = require("../repositories/task.repository");

class TaskService {
  async getTaskById(id) {
    const task = await taskRepository.findById(id);
    if (!task) throw new Error("Task tidak ditemukan");
    return task;
  }

  async getUserTasks(userId) {
    const tasks = await taskRepository.findByUserId(userId);
    if (!tasks) throw new Error("Task dari user ini tidak ditemukan");
    return tasks;
  }

  async createTask(taskData) {
    const createdTask = await taskRepository.createTask(taskData);
    if (!createdTask) throw new Error("Gagal menambahkan task");
    return {
      success: true,
      message: "Berhasil menambahkan task baru",
    };
  }

  async updateTask(id, updatedData) {
    const existingData = await taskRepository.findById(id);
    if (!existingData) throw new Error("Task tidak ditemukan");

    const result = await taskRepository.updateTask(id, updatedData);
    return {
      success: true,
      message: result
        ? "Berhasil memperbarui data task"
        : "Tidak ada task yang diperbarui",
    };
  }

  async deleteTask(id) {
    const existingData = await taskRepository.findById(id);
    if (!existingData) throw new Error("Task tidak ditemukan");

    const result = await taskRepository.deleteTask(id);

    return {
      success: true,
      message: result
        ? "Berhasil menghapus data task"
        : "Tidak ada task yang dihapus",
    };
  }
}

module.exports = new TaskService();
```

### Repository

Repository bertugas untuk menangani komunikasi dengan database, menggunakan query SQL seperti yang telah dibahas pada materi [Database](./database-express-js.md).

Contoh file `repositories/task.repository.js`:

```js
const db = require("../configs/db");

class TaskRepository {
  async findById(id) {
    const query = "SELECT * FROM tb_tasks WHERE id=?";
    const [result] = await db.execute(query, [id]);
    return result[0] || null;
  }

  async findByUserId(user_id) {
    const query = "SELECT * FROM tb_tasks WHERE user_id=?";
    const [result] = await db.execute(query, [user_id]);
    return result;
  }

  async createTask(taskData) {
    const keys = Object.keys(taskData);
    const values = Object.values(taskData);

    const query = `INSERT INTO tb_tasks (${keys.join(", ")}) VALUES (${keys
      .map((_) => "?")
      .join(", ")})`;
    const [result] = await db.execute(query, values);
    return result.affectedRows > 0;
  }

  async updateTask(id, taskData) {
    const keys = Object.keys(taskData);
    const values = Object.values(taskData);

    const query = `UPDATE tb_tasks SET ${keys
      .map((key) => key + "=?")
      .join(", ")} WHERE id=?`;
    const [result] = await db.execute(query, [...values, id]);
    return result.affectedRows > 0;
  }

  async deleteTask(id) {
    const query = `DELETE FROM tb_tasks WHERE id=?`;
    const [result] = await db.execute(query, [id]);
    return result.affectedRows > 0;
  }
}

module.exports = new TaskRepository();
```

Dengan pendekatan ini, query database terisolasi dan mudah dikelola.

### Database

```js
const mysql = require('mysql2/promise');

const pool = mysql.createPool({
    host: localhost,
    user: root,
    password: ,
    database: todo_app,
    port: 3306,
    waitForConnections: true,
    connectionLimit: 10,
});

module.exports = pool;
```

### Middleware

Middleware dapat digunakan untuk:

- Logging
- Validasi input
- Autentikasi
- Error handling

Contoh file `src/middlewares/error_handler.js`

```js
module.exports = (err, req, res, next) => {
  console.log(err);
  const statusCode = err.statusCode || 500;

  res.status(statusCode).json({
    success: false,
    method: req.method,
    url: req.originalUrl,
    message: err.message || "Internal Server Error",
  });
};
```

### Gabungkan Semuanya

`src/app.js`

```js
const express = require("express");
const errorHandler = require("./middlewares/error_handler");
const taskRoutes = require("./routes/task.routes");

const app = express();
app.use(express.json());
app.use(express.urlencoded());

app.use("task", taskRoutes);

app.use(errorHandler);
module.exports = app;
```

`index.js`

```js
require("dotenv").config();
const app = require("./src/app");

const PORT = process.env.PORT;

app.listen(PORT, () => {
  console.log(`Server berjalan pada http://localhost:${PORT}`);
});
```
