/* server ko create karan 
server ko config karna    */

const express = require("express");
const app = express();

/* this is a middel wire  
server ko read karne ke liye use karte hai  express server json data*/

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

/* GET /notes  /
jitna v server per note create hua hai sara data client ho mile/
server to client side data send hoga*/

app.get("/notes", (req,res)=>{
    res.status(200).json({
        notes:notes
    })
})

/* DELETE  /notes /:INDEX */

app.delete("/notes/:index",(req,res)=>{
    delete notes [req.params.index]

    res.status(204).json({
        message:"notes deleted successfully"
    })
})

/*PATCH /NOTES"/:INDEX */ 
app.patch("/notes/:index",(req,res)=>{
    notes[req.params.index].description =req.body.description
    

    res.status(200).json({
        message:"Note updated successfully"
    })
   
})




module.exports =app;