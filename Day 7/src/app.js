const express = require("express");
const app = express();
app.use (express.json());
const notes =[];

/* post /notes */

app.post("/notes",(req, res)=>{
    console.log(req.body)
    notes.push(req.body)

    res.status(201).json ({
        message:"Note created successfully"
    })
})

app.get ("/notes ",(req,res) =>{
    const notes =await noteModule.find()

    res.status()
})

module.exports = app;