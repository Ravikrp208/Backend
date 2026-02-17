const express = require ("express")
const cookieParser = require("cookie-parser")
const authRouter = require ("./routers/auth.router")
const PostRouter = require("./routers/post.router")

const app = express()
app.use(express.json());
app.use(cookieParser())


app.use("/api/auth", authRouter)
app.use("/api/posts", PostRouter)
module.exports = app;