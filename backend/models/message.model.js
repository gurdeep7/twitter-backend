const mongoose = require("mongoose")

var messageSchema = new mongoose.Schema({
    name:{type:String, required:true},
    message:{type:String, required:true}
})

  module.exports = mongoose.model("message",messageSchema)