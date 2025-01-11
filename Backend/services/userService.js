const User = require('../models/User');

const updateUserStatus = async (userId, onlineStatus) => {
  try { 
    console.log(userId, onlineStatus)
    await User.findByIdAndUpdate(userId, { online: onlineStatus });
  } catch (err) {
    throw new Error('Error updating user status: ' + err.message);
  }
};

const getUserById = async (userId) => {
  try {
    const user = await User.findById(userId);
    if (!user) {
      throw new Error('User not found');
    }
    return user;
  } catch (err) {
    throw new Error('Error fetching user: ' + err.message);
  }
};

module.exports = { updateUserStatus, getUserById };
