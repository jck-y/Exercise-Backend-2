const express = require('express');
const { Pool } = require('pg');


const app = express();

const pool = new Pool({
user: "postgres",
password: 'ultrax',
host: 'localhost',
port: 5432, 
database: 'backend-class',
  
});
module.exports = {
  query: (text, params) => pool.query(text, params)
};

// app.get('/', (req, res) => {
//     console.log('Hello World'); 
//     res.send('Hello World');
//   });
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server berjalan di port ${PORT}`);
});
