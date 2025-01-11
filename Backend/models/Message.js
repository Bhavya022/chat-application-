const mongoose = require('mongoose');

const MessageSchema = new mongoose.Schema({
  sender: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  recipient: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  content: { type: String, required: true },
  readStatus: { type: Boolean, default: false },
  messageType: { type: String, enum: ['text', 'image', 'file'], default: 'text' },
}, { timestamps: true });

module.exports = mongoose.model('Message', MessageSchema);
