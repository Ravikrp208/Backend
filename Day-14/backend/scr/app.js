const express = require ("express")
const cookieParser = require("cookie-parser")


const app = express()
app.use(express.json());
app.use(cookieParser())

/** require router */
const authRouter = require("./routers/auth.router");
const PostRouter = require("./routers/post.router");
const userRouter =require("./routers/user.router");

/**using router */
app.use("/api/auth", authRouter)
app.use("/api/posts", PostRouter)
app.use("/api/users",userRouter)



module.exports = app;