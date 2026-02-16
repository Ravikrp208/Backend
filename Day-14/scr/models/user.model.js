const mongoose = require("mongoose")

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    unique: [true, "User name already exists"],
    required: [true, "Email is required"],
  },
  email: {
    type: String,
    unique: [true, "Email already exits"],
    required: [true, "User name is required"],
  },
  password: {
    type: String,
    required: [true, "Password is required"],
  },
  bio: String,
  ProfileImage: {
    type: String,
     default: "https://ik.imagekit.io/hnoglyswo0/avatar-gender-neutral-silhouette-vector-600nw-2470054311.webp"  },



     followers:[{
      // type: mongoose.Schema
     }]
});


const userModel = mongoose.model("users",userSchema)
module.exports = userModel