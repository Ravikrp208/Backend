const mongoose = require ("mongoose")

 async function connectTodatabase () {
   await mongoose.connect(process.env.MONGO_URI)
   .then(() => {
     console.log("connected to data base");
   })
   .catch((error) => {
     console.log("Error connecting to database:", error);
     process.exit(1);
   });
}

module.exports = connectTodatabase