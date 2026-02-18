const express = require ("express")
const PostRouter = express.Router()
const postController  = require("../controllers/post.controller")
const multer = require ("multer")
const upload = multer({storage:multer.memoryStorage()})
const indentifyUser = require("../middlerweres/auth.middlerware")
const identifyUser = require("../middlerweres/auth.middlerware")


/**
 * post /api/[protected]
 * /api/posts/
 */
PostRouter.post("/",postController.createPostController)

PostRouter.post("/",upload.single("chacha"),indentifyUser,postController.createPostController)

/**
 * GET /api/posts/[protected]
 */

PostRouter.get("/",identifyUser,postController.getPostController)

/**
 * GET/api/posts/details/postid
 */

PostRouter.get("/details/:postId",identifyUser,postController.getPostDetailsController)

module.exports = PostRouter