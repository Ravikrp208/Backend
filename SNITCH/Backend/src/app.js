import express from "express";
import cookieParser from "cookie-parser";   
import morgan from "morgan";

const app = express();

// Middleware
app.use (morgan("dev"));
app.use (express.json());
app.use (cookieParser());
app.use (express.urlencoded({extended: true}));


app.get ("/", (req, res) => {
    res.status(200).json({message: "server is running  successfully"});
});



export default app;