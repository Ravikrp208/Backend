

const mongoose = require("mongoose");
 function connectTodb() {
   mongoose.connect(process.env.MONGO_URL)

     .then(() => {
       console.log("Connected to Data base");
     });
 }
  

 module.exports = connectTodb
