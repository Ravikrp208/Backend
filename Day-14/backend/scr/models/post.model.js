const mongoose = require ("mongoose")



const postSchema = new mongoose.Schema({
    
    Caption :{
        type : String,
        default :""
    },
    imageUrl:{
         type:String,
         required :[true, "imgUrl is requre for creating an post"]
    },

    user:{
        ref: "user",
        type: mongoose.Schema.Types.ObjectId,
        required: [true,"user id is required for creaating an  post "]
    }
})

const postModel = mongoose.model("posts",postSchema)


module.exports = postModel