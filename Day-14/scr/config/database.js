const mongoose = require ("mongoose")

function connectToBD () {
    mongoose.connect(process.env,MONGO_URL)
    .then (()=>{
        console.log("connected to data base")
    })
}

module.exports = connectToBD