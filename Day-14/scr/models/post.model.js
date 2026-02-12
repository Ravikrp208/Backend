const mongoose = require ("mongoose")



const postSchema = new mongoose.Schema({
    
    Caption :{
        type : String,
        default :""
    },
    imageUrl:{
         type:string,
         required :[true, "imgUrl is requre for creating an post"]
    },

    user
})

const postModel = mongoose.model("post",postSchema)

modeul.exposts = postModel