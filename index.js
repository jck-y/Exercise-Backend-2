const express = require('express');
const morgan = require('morgan');
const users = require('./users'); 
const app = express();
const port = 3000;


app.use(morgan('dev'));

app.get('/users', (req, res) => {
    res.json({
        status: 'success',
        data: users 
    });
});

app.get('/users/:name', (req, res) => {
    const requestedName = req.params.name.toLowerCase();
    const user = users.find(u => u.name.toLowerCase() === requestedName);
    if (!user) {
        res.status(404).json({
        status: "error",
        message: "Data tidak ditemukan",
        });
    } else {
        res.json(user);
    }
    });
    
    app.use((req, res) => {
        res.status(404).json({
          status: "error",
          message: "Resource tidak ditemukan",
        });
      });
      
app.use((err, req, res, next) => {
    console.error(err.stack); 
    res.status(500).json({
        status: 'error',
        message: 'Terjadi kesalahan pada server'
    });
});

app.listen(port, () => console.log(`Server running at http://localhost:${port}`));
