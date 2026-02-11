const mongoose = require("mongoose")
const { Profiler } = require("react")

const userSchema = new mongoose.userSchema({
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
    default:
      "https://imgs.search.brave.com/veKl8ET9WhanlBbihrKWBEkRfga_K4vtJ2gNSmAM1iE/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9jZG4u/dmVjdG9yc3RvY2su/Y29tL2kvNTAwcC80/MS85MS9hdmF0YXIt/ZGVmYXVsdC11c2Vy/LXByb2ZpbGUtaWNv/bi1zaW1wbGUtZmxh/dC1ncmV5LXZlY3Rv/ci01NzIzNDE5MS5q/cGc",
  },
});


const userModel = mongoose.model("users",userSchema)
module.exports = userModel