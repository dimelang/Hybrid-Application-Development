# Protected Routes

Setelah user berhasil login dan mendapatkan JWT, langkah selanjutnya adalah melindungi endpoint tertentu agar hanya dapat diakses oleh user yang sudah terautentikasi.

Protected route adalah endpoint yang hanya dapat diakses jika user:

- Mengirimkan JWT yang valid
- Telah melalui proses autentikasi

Alur protected route secara umum:

1. Client mengirim request ke endpoint protected
2. JWT dikirim melalui header `Authorization`
3. Middleware memeriksa keberadaan token
4. Middleware memverifikasi token
5. Jika valid, request diteruskan ke controller
6. Jika tidak valid, request ditolak

## Middleware Authentication

Middleware ini bertugas:

- Mengambil token dari header
- Memverifikasi token
- Menyimpan data user ke `req.user`

```js
const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({
      success: false,
      message: "Token tidak ditemukan",
    });
  }

  const [type, token] = authHeader.split(" ");
  if (type !== "Bearer" || !token) {
    return res.status(401).json({
      success: false,
      message: "Format token tidak valid",
    });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    return res.status(401).json({
      success: false,
      message: "Token tidak valid",
    });
  }
};

module.exports = authMiddleware;
```

Data user yang tersimpan di `req.user` berasal dari payload JWT dan akan digunakan pada proses authorization di tahap selanjutnya.

## Menggunakan Middleware pada Route

Middleware authentication digunakan sebelum controller.

```js
const authMiddleware = require("../middlewares/authMiddleware");
const userController = require("../controllers/user.controller");

router.get("/profile", authMiddleware, userController.getProfile);
module.exports = router;
```
