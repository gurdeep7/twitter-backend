const mongoose = require("mongoose")

const postSchema = new mongoose.Schema({
    user_id:{type:mongoose.Schema.Types.ObjectId,
    ref: "user",
    required:true,
},
    img:{type:String, required: false, default:"#"},
    text:{type:String, required:true}
},
{
    versionKey: false,
    timestamps: true,
  })

