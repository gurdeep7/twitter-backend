const express = require("express")

const Post = require("../models/post.model")

const router = express.Router()

const authenticate = require("../middleware/authenticate")
router.post("/" ,authenticate,  async(req,res)=>{
try{
   const post = await Post.create(req.body)

  return res.status(201).json({status:"passed", post})

}catch(e){
return res.status(500).json({status:"failed", message:e.message})
}
}) 


router.get("/", authenticate, async (req,res)=>{
    try{
        const post = await Post.find().populate("user_id","-password").lean().exec()
        return res.status(201).json({status:"passed", post})
    }catch(e){
        return res.status(500).json({status:"failed", message:e.message})
        }
})


router.get("/user/:userid", authenticate, async (req,res)=>{
    try{
        const post = await Post.find({user_id:req.params.userid}).populate("user_id","-password").lean().exec()
        return res.status(201).json({status:"passed", post})
    }catch(e){
        return res.status(500).json({status:"failed", message:e.message})
        }
})

router.patch("/like/:postid/:userid", authenticate, async(req,res)=>{
    try{
        const post = await Post.findById(req.params.postid).lean().exec()
post.likes.push(req.params.userid)
        return res.status(201).json({status:"passed", post})
    }catch(e){
        return res.status(500).json({status:"failed", message:e.message})
        }
})
module.exports = router
