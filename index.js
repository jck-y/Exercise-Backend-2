const http = require('http');
const members = require('./members');

const server = http.createServer((req, res) => {
  const path = req.url;
  if (path === '/') {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    res.write('This is the home page');
    res.end();
  }else if (path === '/about') {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'application/json');
    const response = {
      status: 'success',
      message: 'response success',
      description: 'Exercise #03',
      date: new Date().toISOString(), 
      data: members 
    };
    // Mengubah objek JSON menjadi string dan menulisnya ke respons
    res.write(JSON.stringify(response));
    res.end();
}});
server.listen(3000)
// , () => {
//   console.log('Server berjalan di: http://localhost:3000/');
// });






  
