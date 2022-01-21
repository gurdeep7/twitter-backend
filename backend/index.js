const express = require("express")

const { register, login , profile} = require("./controllers/auth.controller");

const app = express()

const postController = require("./controllers/post.controller")

const { body, validationResult } = require('express-validator');

var http = require('http').Server(app);


const Message = require("./models/message.model")

const io = require('socket.io')(http);

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


app.get('/messages', (req, res) => {
    Message.find({},(err, messages)=> {
      res.send(messages);
    })
  })
  
  app.get('/messages', (req, res) => {
    Message.find({},(err, messages)=> {
      res.send(messages);
    })
  })
  
  app.post('/messages', (req, res) => {
    var message = new Message(req.body);
    message.save((err) =>{
      if(err)
        sendStatus(500);
      io.emit('message', req.body);
      res.sendStatus(200);
    })
  })
module.exports = app