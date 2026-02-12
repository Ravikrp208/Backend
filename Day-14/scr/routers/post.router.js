const express = express ("express")
const PostRouter = express.Router()
const postController  = require("../controllers/post.controller")


PostRouter.post("/",postController.createcontroller)


module.exports = PostRouter