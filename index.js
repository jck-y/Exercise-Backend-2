const express = require("express");
const multer = require("multer");
const morgan = require("morgan");
const cors = require("cors")
const users = require("./users");
const app = express();
const port = 3000;

app.use(express.static('public'));
app.use(express.json());
app.use(morgan("dev"));
app.use(cors({
    origin: "http://127.0.0.1:5500",
}));
const upload = multer({ dest: "public/" });

//1
app.get("/users", (req, res) => {
  res.json({
    status: "success",
    data: users,
  });
});
//3
app.post("/users", (req, res) => {
  if (!req.body) {
    return res.status(400).json({
      status: "error",
      message: "Masukkan data yang akan diubah",
    });
  }
  const newUser = req.body;
  users.push(newUser);
  res.status(201).json({
    status: "success",
    message: "Record baru berhasil ditambahkan",
    id:users.length + 1,
    data: newUser,
  });
});
//4
app.post("/upload", upload.single("image"), (req, res) => {
  res.status(200).json({
    status: "success",
    message: "File berhasil diunggah",
  });
});
//2
app.get("/users/:name", (req, res) => {
  const requestedName = req.params.name.toLowerCase();
  const user = users.find((u) => u.name.toLowerCase() === requestedName);
  if (!user) {
    res.status(404).json({
      status: "error",
      message: "Data tidak ditemukan",
    });
  } else {
    res.json(user);
  }
});
//5
app.put("/users/:name", (req, res) => {
  const requestedName = req.params.name.toLowerCase();
  const userIndex = users.findIndex(
    (u) => u.name.toLowerCase() === requestedName
  );
  if (userIndex === -1) {
    return res.status(404).json({
      status: "error",
      message: "Data tidak ditemukan",
    });
  }
  if (!req.body) {
    return res.status(400).json({
      status: "error",
      message: "Masukkan data yang akan diubah",
    });
  }
  users[userIndex] = { ...users[userIndex], ...req.body };
  res.status(200).json({
    status: "success",
    message: "Data berhasil diupdate",
    data: users[userIndex],
  });
});
//6
app.delete('/users/:name', (req, res) => {
    const requestedName = req.params.name.toLowerCase();
    const userIndex = users.findIndex(u => u.name.toLowerCase() === requestedName);

    if (userIndex === -1) {
        return res.status(404).json({
            status: 'error',
            message: 'Data tidak ditemukan'
        });
    }
    users.splice(userIndex, 1);
    res.status(200).json({
        status: 'success',
        message: 'Data berhasil dihapus'
    });
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    status: "error",
    message: "Terjadi kesalahan pada server",
  });
});
app.use((req, res) => {
    res.status(404).json({
      status: "error",
      message: "Resource tidak Ditemukan",
    });
  });
app.listen(port, () =>
  console.log(`Server running at http://localhost:${port}`)
);
