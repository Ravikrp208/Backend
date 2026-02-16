const express = require ("express")
const PostRouter = express.Router()
const postController  = require("../controllers/post.controller")
const multer = require ("multer")
const upload = multer({storage:multer.memoryStorage()})


/**
 * post /api/[protected]
 * /api/posts/
 */
PostRouter.post("/",postController.createPostController)

PostRouter.post("/",upload.single("chacha"),postController.createPostController)

/**
 * GET /api/posts/[protected]
 */

PostRouter.get("/",postController.getPostController)



PostRouter.get("/details/:postId",postController.getPostDetailsController)

module.exports = PostRouter