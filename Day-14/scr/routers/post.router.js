const express = require ("express")
const PostRouter = express.Router()
const postController  = require("../controllers/post.controller")
const multer = require ("multer")
const upload = multer({storage:multer.memoryStorage()})


/**
 * post /api/[protected]
 * /api/posts/
 */
// PostRouter.post("/",postController.createController)

postRouter.post("/", upload.single("chacha"), postController.createPostController)



module.exports = PostRouter