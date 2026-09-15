const express = require("express");
const app = express();
const port = 5000;
const fs = require("fs");
const path = require("path");

app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

const data = fs.readFileSync('questions.json', 'utf8');
const parsed_data = JSON.parse(data);
console.log(parsed_data[0])

app.post('/save',(req,res)=>{
    const category = req.body.category;
    const limit = req.body.limit;
    const diff = req.body.diff;
})
app.listen(port, ()=>{
    console.log(`Server running on http://localhost:${port}`);
})