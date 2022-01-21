require("dotenv").config();
const jwt = require("jsonwebtoken");
const User = require("../models/user.model");

const newToken = (user) => {
  return jwt.sign({ user: user }, process.env.JWT_ACCESS_KEY);
};

const register = async (req, res) => {
  try {
    let user = await User.findOne({ email: req.body.email }).lean().exec();
    if (user)
      return res.status(400).json({
        status: "failed",
        message: " Please provide a different email address",
      });
      user = await User.findOne({username: req.body.username}).lean().exec()
      if (user)
      return res.status(400).json({
        status: "failed",
        message: "Please provide a different user name",
      });
    user = await User.create(req.body);
   
    const token = newToken(user);
    res.status(201).json({status:"passed", user, token });
  } catch (e) {
    return res.status(500).json({ status: "failed", message: e.message });
  }
};

const login = async (req, res) => {
  try {
    let user2 = await User.findOne({ email: req.body.email });
    if (!user2)
      return res.status(400).json({
        status: "failed",
        message: " Please provide correct email address and password",
      });
    const match = await user2.checkPassword(req.body.password);

    if (!match)
      return res.status(400).json({
        status: "failed",
        message: " Please provide correct email address and password",
      });
    const token = newToken(user2);
    let user = await User.findOne({ email: req.body.email }).select("-password");

    res.status(201).json({status:"passed", user, token }); 
  } catch (e) {
    return res.status(500).json({ status: "failed", message: e.message });
  }
};

const profile = async (req,res)=>{
   try {
     //let update = await User.findOne({ email: req.body.email });

    const user = await User.findByIdAndUpdate(user._id, req.body).select("-password")

    const token = newToken(user);

    res.status(201).json({status:"passed", user, token });}
    catch(e){
        return res.status(500).json({ status: "failed", message: e.message });

    }


}

module.exports = { register, login , profile};