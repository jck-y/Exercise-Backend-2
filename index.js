const express = require('express');
const morgan = require('morgan')
const app = express();
const port = 3000

// app.use ((req, res, next)=> {
//     console.log(`${Date.now()} - ${req.ip} - ${req.originalUrl}`)
//     next();
// })

app.use(morgan("dev"))
app.get('/', (req, res)=> 
    res.json({
        status: "success",
        message: "get"
    })
);

app.get('/about', (req, res)=> 
    res.json({
        status: "success",
        message: "hello world about"
    })
);

app.get('/user', (req, res)=>
    res.json({
        status:"success",
        message: "hello user"
    })
);

// app.post('/contoh', (req, res)=> {
//     res.send('request dengan method POST')
// })

// app.delete('/contoh', (req, res)=> 
//     res.json({
//         status:"success",
//         message: "delete"
//     })
// );

// app.patch('/contoh', (req, res)=> 
//     res.json({
//         status:"success",
//         message: "patch"
//     })
// );
// //parrams
// app.get("/post/:id", (req,res)=>{
//     const id = req.params.id;
//     res.json({
//         status:"success",
//         message: `Artikel ID ke-${id}`
//     })
// })

// app.get("/post", (req,res)=>{
//     // const data = req.query
//     const {page, sort}= req.query
//     res.json({
//         status:"success",
//         // message:data.page
//         message: `Page = ${page}, Sort by = ${sort}`
//     })
// })


app.listen(port, ()=>console.log(`Server running at http://localhost:${port}`));
