const express = require("express")

const { register, login , profile} = require("./controllers/auth.controller");

const app = express()

const postController = require("./controllers/post.controller")

const { body, validationResult } = require('express-validator');

const cors = require("cors");

app.use(cors())

app.use(express.json())

app.post("/register", register);

app.post("/login", login);

app.post("/profile", profile)

app.get("/",(req,res)=>{
    res.send("We are twitter-Clonners")
})

app.use("/post",postController)
module.exports = app