const { onJoin, onMessage, onTyping, onDisconnect } = require('./socketEvents');

const setupSocket = (io) => {
  io.on("connection", (socket) => {
    console.log(`User connected: ${socket.id}`);

    socket.on("join", (data) => onJoin(socket, data));
    socket.on("message", (data) => onMessage(socket, data));
    socket.on("typing", (data) => onTyping(socket, data));
    socket.on("disconnect", () => onDisconnect(socket));
  });
};

module.exports = setupSocket;
