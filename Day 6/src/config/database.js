const mongoose = require("mongoose");

const connectToDatabase = async () => {
  mongoose
    .connect(process.env.MONGODB_URI) 
    .then(async () => {
      console.log("Connected to MongoDB");
      // Drop typo index (usernmme) if it exists from previous schema
      try {
        await mongoose.connection.db.collection("users").dropIndex("usernmme_1");
      } catch (e) {
        if (e.code !== 27) throw e; // 27 = index not found, ignore
      }
    })
    .catch((error) => {
      console.error("Error connecting to MongoDB:", error);
    });
};

module.exports = connectToDatabase;
