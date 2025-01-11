const setupSocket = (io) => {
    io.on("connection", (socket) => {
      console.log(`User connected: ${socket.id}`);
  
      socket.on("join", ({ username, userId }) => {
        socket.join(userId);
        io.to(userId).emit("online", { userId, username });
      });
  
      socket.on("message", ({ senderId, recipientId, content }) => {
        io.to(recipientId).emit("message", { senderId, content });
      });
  
      socket.on("typing", ({ userId, isTyping }) => {
        io.emit("typing", { userId, isTyping });
      });
  
      socket.on("disconnect", () => {
        console.log(`User disconnected: ${socket.id}`);
      });
    });
  };
  
  module.exports = setupSocket;
  