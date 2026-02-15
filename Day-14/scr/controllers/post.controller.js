const postModel = require("../models/post.model");
const ImageKit = require("@imagekit/nodejs");
const { toFile } = require("@imagekit/nodejs");
const jwt = require("jsonwebtoken");
const { post } = require("../app");
const { isValidElement } = require("react");

const imagekit = new ImageKit({
  privateKey: process.env.IMAGEKIT_PRIVATE_KEY,
});

async function createPostController(req, res) {
  console.log(req.body, req.file);

  const file = await imagekit.files.upload({
    file: await toFile(Buffer.from(req.file.buffer), "file"),
    fileName: "Test",
  });

  res.send(file);
}

async function getPostController(req, res) {
  const token = req.cookies.token;
  let decoded = null;

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
  } catch (err) {
    return req.status(401).json({
      message: "Token invalid",
    });
  }

  const userId = decoded.userId

  const posts = await postModel.find({
    user:userId
  })

  res.status(200).json({
    message:"Post fetched successfully",
    posts
  })
}

/**
 * 
 */

async function getPostDetailsController(req, res){
  const token = req.cookies.token
     
  if(!token){
    return res.status(401).json({
      message:"UnAuthorized Access"
    })
  }
  let decoded 

  try{
       decoded =jwt.verify(token,process.env.JWT_SECRET)
  }
  catch(err){
    return res.status(401).json({
      message:"Invalid Token"
    })
  }
    const userId = decoded.userId
    const postId = req.params.postId

    const Post = await postModel.findById(postId)

    if(Post)
    {
      return res.status(404).json({
        message:"Post not found"
      })
    }

    const inValidUser = post.user ==userId


    if(!isValidUser){
      return res.status(403).json({
        message:"Forbidden Content."
      })
    }
    return res.status(200).json({
      message:"Post fetched successfully",post
    })

}

module.exports = { createPostController,
  getPostController,
  getPostDetailsController
};
