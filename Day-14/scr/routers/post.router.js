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

postRouter.port("/",upload.single("chacha"),postController.createController)

/**
 * GET /api/posts/[protected]
 */

postRouter.get("/",postController.getPostController)


postRouter.get("/details/:postId",postController,getPostDetailsController)

module.exports = PostRouter