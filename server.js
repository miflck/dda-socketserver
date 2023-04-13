var express = require("express");

var app = express();
var server = app.listen(5501);

app.use(express.static("public"));

console.log("sone scheiss");

var socket = require("socket.io");

var io = socket(server);

//io.sockets.on('connection', newConnection);

io.on("connection", (socket) => {
  console.log("a user connected" + socket.id);

  socket.on("disconnect", () => {
    console.log("user disconnected");
  });
  socket.on("mouse", (data) => {
    console.log("message: " + socket.id);
    socket.broadcast.emit("mouse", data);
  });
  socket.on("hello", (data) => {
    console.log("hello message: " + data);
    socket.broadcast.emit("hello", data);
  });

  /*  function mouseMsg(data){
        console.log(data);
    }*/
});

/*
function newConnection(socket){
    console.log('new connection' + socket.id);

    socket.on('mouse', mouseMsg);

    function mouseMsg(data){
        console.log(data);
    }

    socket.on('error', function (err) {
        console.log(err);
    });
    
}*/
