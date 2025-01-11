const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const UserSchema = new mongoose.Schema({
  username: { type: String, required: true },
  password: { type: String, required: true },
  online: { type: Boolean, default: false },
  socketId: { type: String, default: null },
}, { timestamps: true });
UserSchema.pre('save', async function(next) {
  next();
});
UserSchema.methods.comparePassword = async function(candidatePassword) {
  console.log(candidatePassword,this.password);
  return await bcrypt.compare(candidatePassword, this.password);
};

module.exports = mongoose.model('User', UserSchema);
