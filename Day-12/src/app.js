const express = require("express");
const app = express();
const authRouter = require ("./router/auth.route")

app.use (express.json ())
/**
 * api/auth /register ko hit kar raha hai
 */
app.use ("./api/auth",authRouter)

module.exports =app