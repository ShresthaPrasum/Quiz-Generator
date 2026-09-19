const express = require('express');
const app = express();
const path = require('path');
const port = 3000;
const fs = require('fs');

const data = fs.readFileSync('players.json');
const parsed_data = JSON.parse(data);

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());

app.get('/', (req,res)=>{
    res.send("HELLOO");
})
app.post('/save', (req,res)=>{
    const name = req.body.name;
    const limit = req.body.limit;
    const diff = req.body.diff;
    const select1 = parsed_data.filter(p=> p.difficulty = diff.toLowerCase());
    const select2 = select1.sort(()=> Math.random() - 0.5).slice(0,limit);
    console.log(select2);
});

app.listen(port, ()=>{
    console.log(`The server is running on https://localhost:${port}`);
})