const User = require('../models/User');
const Message = require('../models/Message');
const Typing = require('../models/Typing');

const onJoin = async (socket, { username, userId }) => {
  try {
    socket.join(userId);
    await User.findByIdAndUpdate(userId, { online: true, socketId: socket.id });
    socket.to(userId).emit("online", { userId, username });
  } catch (err) {
    console.error(err);
  }
};

const onMessage = async (socket, { senderId, recipientId, content }) => {
  try {
    const newMessage = new Message({
      sender: senderId,
      recipient: recipientId,
      content
    });
    await newMessage.save();
    socket.to(recipientId).emit("message", { senderId, content });
  } catch (err) {
    console.error(err);
  }
};

const onTyping = async (socket, { userId, isTyping }) => {
  try {
    await Typing.findOneAndUpdate({ user: userId }, { isTyping }, { upsert: true });
    socket.broadcast.emit("typing", { userId, isTyping });
  } catch (err) {
    console.error(err);
  }
};

const onDisconnect = async (socket) => {
  try {
    await User.findOneAndUpdate({ socketId: socket.id }, { online: false, socketId: null });
    console.log(`User disconnected: ${socket.id}`);
  } catch (err) {
    console.error(err);
  }
};

module.exports = { onJoin, onMessage, onTyping, onDisconnect };
