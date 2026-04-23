const express = require("express")
const userController =require("../controllers/user.controller")
const identifyUser = require("../middlerweres/auth.middlerware")


const userRouter = express.Router();


/**
 * @route POST/ api/users/follow/:userid
 * @description follow a user
 * @access Private
 */

userRouter.post("/follow/:userid",identifyUser,userController.followUserController)


module.exports = userRouter;