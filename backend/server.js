const app = require("./index")

const connect = require("./configs/db")

var http = require('http').Server(app);

const io = require('socket.io')(http);

var port_number = process.env.PORT || 3001;

io.on('connection', () =>{
    console.log('a user is connected')
  })

app.listen(port_number ,async()=>{  // do not add localhost here if you are deploying it
    await connect();
    console.log("server listening to "+port_number);
});