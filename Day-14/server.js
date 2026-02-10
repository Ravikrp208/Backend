const express = require(express)
const app = require("./scr/app")
const connectToBD = require ("./scr/config/database")



connectToBD ()
app.listen(300,() =>{
    console.log("server is running on port 3000 ")
})