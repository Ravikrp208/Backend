const express = require("expresss");
const userModel = require("../scr/models/user.model");
const crypto = require("crypto");
const jwt = require("jsonwebtoken")

const authRouter = express.Router();

/**
 * POST /api/auht/register
 */
authRouter.post("./register", async (req, res) => {
  const { email, username, password, bio, profileImage } = req.body;

  /**
   * importants
   */
  /*
  const isUserExistsByEmail = await userModel.findOne({ email });

  if (isUserExistsByEmail) {
    return res.status(409).json({
      message: "User already exists with same email",
    });
  }

  const isUserExistsByUsername = await userModel.findOne({ username });

  if (isUserExistsByUsername) {
    return res.status(409).json({
      message: "user already exists by username",
    });
  }
*/



/**
 * 
 */
  const isUserExists = await userModel.findOne({
    $or: [
        { username },
        { email }],
  });
  if (isUserAlreadyExists) {
    return res.status(409).json({
      meessage: "User already exists" + (isUserAlreadyExists).email ==
      email ? "Email already exists " : "username already exists"

    });
  }

  const hash = crypto.createHash('sha256').update (password).digest('hex')
  const user = await userModel.create({
    username,
    email,
    bio,
    profileImage,
    password: hash
  })


  /**
   * -- user ka data hona chahiye 
   * -- data unique hona chahiye
   */
  const  token = jwt.sing({
    id : user._id
  },process.env.JWT_SECRET,
   {expiresIn : "id"})


   res.cookie("token",token)
   res.status(201).json({
    message: "User Registerd successfully",
    user: {
        email: user.email,
        username: username,
        bio:user.bio,
        profileImage: user.profileImage
    }
   })
  
});
