const express = require("express");
const app = express();
const port = 5000;
const fs = require("fs");
const path = require("path");

app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

const data = fs.readFileSync('questions.json', 'utf8');
const parsed_data = JSON.parse(data);

const dataa = fs.readFileSync('players.json', 'utf8');
const parsed_dataa = JSON.parse(dataa);

app.post('/save',(req,res)=>{
    const limit = req.body.limit;
    const diff = req.body.diff;
    let category = req.body.category;
    if(category.toLowerCase() == "iq" || category.toLowerCase() == "mix"){
        category = "iq logic";
    }
    const selected_questions = parsed_data.filter(p=>p.category.toLowerCase()==category.toLowerCase());
    const selected_questions1 = selected_questions.filter(s=>s.difficulty.toLowerCase()===diff.toLowerCase());
    const selected_questions2 = selected_questions1.sort(()=>Math.random()-0.5).slice(0, limit);
    console.log(selected_questions2)
    const random_numforfun = Math.floor(Math.random()*70);
    res.json({
        success:true,
        questions: selected_questions2,
        random: random_numforfun
    })
})

app.post('/savee', (req,res)=>{
    const namee = req.body.name;
    const limitt = req.body.limit;
    const difff = req.body.diff;
    const select1 = parsed_dataa.filter(p=> p.difficulty = difff.toLowerCase());
    const select2 = select1.sort(()=> Math.random() - 0.5).slice(0,limitt);
    console.log(select2);
    res.json({
        success: true,
        data: select2,
    });
});

app.listen(port, ()=>{
    console.log(`Server running on http://localhost:${port}`);
})

module.exports = app;