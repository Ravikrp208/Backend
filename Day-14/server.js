
require("dotenv").config();
const app = require("./scr/app")
const connectToBD = require ("./scr/config/database")



connectToBD ()
app.listen(3000,() =>{
    console.log("server is running on port 3000 ")
})