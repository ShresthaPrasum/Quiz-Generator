const express = require('express');
const app = express();
const path = require('path');
const port = 3000;

app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req,res)=>{
    res.send("HELLOO");
})

app.listen(port, ()=>{
    console.log(`The server is running on https://localhost:${port}`);
})