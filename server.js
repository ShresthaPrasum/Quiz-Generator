const express = require("express");
const app = express();
const port = 5000;
const fs = require("fs");
const path = require("path");

app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

app.get('/',(req, res)=>{
    console.log("APP LOADED");
    res.send("APP LOADED");
})
app.listen(port, ()=>{
    console.log(`Server running on http://localhost:${port}`);
})