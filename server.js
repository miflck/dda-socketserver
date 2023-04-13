"use strict";

const express = require("express");
const socketIO = require("socket.io");
const PORT = process.env.PORT || 5500;
const INDEX = "public/index.html";

const server = express()
  .use((req, res) => res.sendFile(INDEX, { root: __dirname }))
  .listen(PORT, () => {
    console.log(`Listening on ${PORT}`);
  });

const io = require("socket.io")(server, {
  cors: {
    origins: ["https://ddasocket.michaelflueckiger.ch", "http://localhost:5501"],
    methods: ["GET", "POST"],
  },
});

io.on("connection", (socket) => {
  io.emit("client connected", socket.id);
  socket.emit("client id", socket.id);

  socket.on("mouse", (data) => {
    console.log("message: " + socket.id);
    socket.broadcast.emit("mouse", "hey");
  });

  socket.on("disconnect", () => {
    io.emit("client disconnected");
  });
});
