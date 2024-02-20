const express = require('express');
const morgan = require('morgan');
const users = require('./users'); 
const app = express();
const port = 3000;
const bodyParser = require('body-parser')
const path = require("path");
const multer = require("multer");
const upload = multer ({dest: "public"})
const fs = require("fs")
const cors = require ('cors')

app.use(morgan('dev'));
//1. bodyparser
app.use(bodyParser.urlencoded({extended:true}))
app.use(bodyParser.json())
//1.1 pakai express
app.use(express.urlencoded({extended:true}))
app.use(express.json())
//4. CORS
app.use(cors());
app.post('/login',(req,res)=>{
    const {username, password} = req.body
    res.send(`anda login dengan ${username} dan ${password}`)
})
//2. Statis FIle
app.use(express.static(path.join(__dirname, "public")))
//3. File Upload
app.post("/upload", upload.single("file"), (req, res)=>{
    const file = req.file;
    if(file){
        const target = path.join(__dirname, "public", file.originalname)
        fs.renameSync(file.path, target)
        res.send("file berhasil diupload")
    } else {
        res.send("file gagal diupload")
    }
})

app.listen(port, () => console.log(`Server running at http://localhost:${port}`));
