
const mongoose = require("mongoose")

const postSchema = new mongoose.Schema({
    user_id:{type:mongoose.Schema.Types.ObjectId,
    ref: "user",
    required:true,
},
    img:{type:String, required: false, default:"#"},
    text:{type:String, required:true},
    likes:[{type:mongoose.Schema.Types.ObjectId,
    ref:"user"
    }]
},

{
    versionKey: false,
    timestamps: true,
  })

module.exports=mongoose.model("post",postSchema)