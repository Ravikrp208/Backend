import express from "express";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";

 

dotenv.config();
const app = express();  

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());


// Routes
app.get("/", (req, res) => {
  res.send({ message: "Server is running!" });
});

export default app;