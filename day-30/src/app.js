const express = require("express");
const app = express();


// Middleware to parse JSON bodies
app.use(express.json());
// Import routes
const authRoutes = require("./routes/auth.routes");
// Use routes
app.use("/api/auth", authRoutes);
module.exports = app;
