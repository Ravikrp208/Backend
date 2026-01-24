const express = require("express");

const app = express();

app.get("/", (req, res) => {
  res.send("I am learn backend ");
});
app.use(express.json())

const note= []

app.post ("/note",(req,res) =>{
    console.log(req.body)
    note.push(res.body)
    res.send("note created")
})

app.delete("/note/:index", (req,res)=>{
  console.log(req.params.index)
})




app.get("/note",(req,res)=>{
    res.send(note)
})


app.listen(3000, () => {
  console.log("Server started on port 3000");
});
