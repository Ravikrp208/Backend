const mongoose = require ("mongoose")

 async function connectToBD () {
   await mongoose.connect(process.env.MONGO_URI)
   .then(() => {
     console.log("connected to data base");
   });
}

module.exports = connectToBD