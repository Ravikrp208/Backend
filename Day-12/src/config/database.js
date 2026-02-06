const mongoose =require("mongoose")

function connectToDB(){
    mongoose.connect(process.env.MONGO-URI)
   .then(()=>{
    console.log("connected to DB")
   })
}