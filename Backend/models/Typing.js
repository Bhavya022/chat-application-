const mongoose = require('mongoose');

const TypingSchema = new mongoose.Schema({
  user: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User', 
    required: true 
  },
  isTyping: { 
    type: Boolean, 
    default: false 
  },
  lastTypingAt: { 
    type: Date 
  },
}, { timestamps: true });

TypingSchema.pre('save', function(next) {
  if (this.isModified('isTyping') && this.isTyping) {
    this.lastTypingAt = new Date();
  }
  next();
});

module.exports = mongoose.model('Typing', TypingSchema);
