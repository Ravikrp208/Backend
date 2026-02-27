// server.js
const express = require("express");
const cors = require("cors");

const app = express();
const PORT = 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Test route
app.get("/", (req, res) => {
  res.send("Backend is running 🚀");
});

// Example API route
app.get("/api/data", (req, res) => {
  res.json({
    message: "Hello from backend",
    status: true,
  });
});

// Example POST route
app.post("/api/user", (req, res) => {
  const { name, age } = req.body;

  res.json({
    success: true,
    name,
    age,
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
