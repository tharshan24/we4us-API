const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);
const morgan = require('morgan');
const cors = require('cors');
const main = require('./app/config/main');
const userRouter = require('./app/routes/user_routes');
const publicRouter = require('./app/routes/public_routes');
const organizationRouter = require('./app/routes/organization_routes');
const adminRouter = require('./app/routes/admin_routes');
const systemRouter = require('./app/routes/system_routes');
const availabilityRouter = require('./app/routes/availability_routes');
const requestRouter = require('./app/routes/request_routes');

const Conversation = require('./app/routes/conversationRoute');
const Messages = require('./app/routes/MessagesRoute');

const messageSchema = require('./app/models/Messages');

const mongoose = require('mongoose');

// const port = 8000;
const port = process.env.PORT || 80;

// console.log(main);
app.use(express.static(__dirname+'/app/public'));
mongoose.connect('mongodb+srv://root:root@cluster0.rpire.mongodb.net/myFirstDatabase?retryWrites=true&w=majority')

app.use(express.json());
app.use(express.urlencoded({
  extended: false
}));

app.get('/',(req,res)=>{
  console.log(req.body);
  res.send("Welcome");
});

//Socket Code
app.use("/conversation",Conversation);
app.use("/messages",Messages);

let users = [];

const addUser = (userId, socketId) => {
  if(users.some((user)=>user.userId === userId)){
    users = users.filter(user=>user.userId !== userId);
    users.push({userId, socketId});
  } else {
    users.push({userId, socketId});
  }
};

const getUser = (userId) =>{
  return users.find((user) => user.userId === userId);
};

const removeUser = (socketId)=>{
  users = users.filter(user=>user.socketId !== socketId);
};

io.on("connection",socket =>{
  console.log("User Connected to socket");
  console.log(socket.id);
  //add users
  socket.on('addUser',userId=>{
    addUser(userId,socket.id)
    io.emit('getUsers',users);
  })

  //send message
  socket.on('sendMessage',({msgId,senderId,receiverId,text,conversationId})=>{
    const user = getUser(receiverId);
    io.emit('receiver',user);
    io.to(user.socketId).emit('getMessage',{
      msgId,
      senderId,
      text,
    })
    let  chatMessage  =  new messageSchema ({
      conversationId: conversationId,
      text: text,
      user: {
        _id: senderId
      }
    });
    chatMessage.save();
  });

  //disconnect
  socket.on('disconnect', ()=>{
    console.log('user Disconnected');
    removeUser(socket.id);
    io.emit('getUsers',users);
  })
});

// user related requests
app.use('/user', userRouter);

// public specified requests
app.use('/public', publicRouter);

// organizations specified requests
app.use('/org', organizationRouter);

// admin specified requests
app.use('/admin', adminRouter);

// system specified requests
app.use('/system', systemRouter);

// availability specified requests
app.use('/availability', availabilityRouter);

// request specified requests
app.use('/request', requestRouter);

server.listen(port, () => {
  // console.log(`We4uS app listening at http://localhost:${port}`);
  console.log(`We4uS app listening at https://we4us.herokuapp.com:${port}`);
});

// app.listen('https://we4us.herokuapp.com/', () => {
//   console.log(`We4uS app listening at https://we4us.herokuapp.com/`);
// });
