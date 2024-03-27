const express = require("express");
const db = require("./db");
const app = express();
const port = 3200;
const { Pool } = require("pg");

const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

app.use(express.static("public"));
app.use(express.json());

app.get("/students", async (req, res) => {
  try {
    // const result = await db.query("SELECT * FROM students");
    const allStudents = await prisma.students.findMany();
    res.status(200).json({
      status: "sucess",
      data: allStudents,
    });
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal Server Error");
  }
});
//AMBIL DATA BERDASARKAN ID
app.get("/students/:id", async (req, res) => {
  // const studentId = req.params.id;
  // db.query(`SELECT * FROM students WHERE id = ${studentId}`, (err, result) => {
  const studentId = parseInt(req.params.id);
  try {
    const student = await prisma.students.findUnique({
      where: {
        id: studentId,
      },
    });
    if (student) {
      res.status(200).json({
        status: "success",
        data: student,
      });
    } else {
      res.status(404).json({
        status: "error",
        message: "Data mahasiswa tidak ditemukan",
      });
    }
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
});
//TAMBAH
app.post("/students", async (req, res) => {
  const { name, address } = req.body;
  try {
    // const result = await db.query(
    //   `INSERT into students (name, address) values ('${name}', '${address}')`
    // );
    await prisma.students.create({
      data: {
        name: name,
        address: address,
      },
    });
    res.status(200).json({
      status: "success",
      message: "data berhasil dimasukan",
    });
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal Server Error");
  }
});
//PERBARUI
app.put("/students/:id", async (req, res) => {
  // const studentId = req.params.id;
  const studentId = parseInt(req.params.id);
  const { name, address } = req.body;
  // db.query(
  //   `UPDATE students SET name = '${name}', address = '${address}' WHERE id = ${studentId}`,
  try {
    const updatedStudent = await prisma.students.update({
      where: {
        id: studentId,
      },
      data: {
        name: name,
        address: address,
      },
    });
    if (updatedStudent) {
      res.status(200).json({
        status: "success",
        message: "Data berhasil diperbarui",
      });
    } else {
      res.status(404).json({
        status: "error",
        message: "Data mahasiswa tidak ditemukan",
      });
    }
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
});
//HAPUS
app.delete("/students/:id", async (req, res) => {
  // const studentId = req.params.id;
  const studentId = parseInt(req.params.id);
  // db.query(`DELETE FROM students WHERE id = ${studentId}`,
  try {
    const deletedStudent = await prisma.students.delete({
      where: {
        id: studentId,
      },
    });

    if (deletedStudent) {
      res.status(200).json({
        status: "success",
        message: "Data berhasil dihapus",
      });
    } else {
      res.status(404).json({
        status: "error",
        message: "Data mahasiswa tidak ditemukan",
      });
    }
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
});
app.listen(port, () =>
  console.log(`Server running at http://localhost:${port}`)
);
