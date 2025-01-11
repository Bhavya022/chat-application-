const User = require('../models/User');
const userService = require('../services/userService');

const getUserStatus = async (req, res) => {
  const { userId } = req.params;
  try {
    const user = await userService.getUserById(userId);
    res.status(200).json({ status: user.online });
  } catch (err) {
    res.status(500).json({ message: 'Error fetching user status' });
  }
};

const updateUserStatus = async (req, res) => {
  const { userId, onlineStatus } = req.body;
  try {
    if(!userId || !onlineStatus) {
      res.status(400).json({ message: 'User ID and online status are required' });
    }
    await userService.updateUserStatus(userId, onlineStatus);
    res.status(200).json({ message: 'User status updated' });
  } catch (err) {
    res.status(500).json({ message: 'Error updating user status controller' });
  }
};

module.exports = { getUserStatus, updateUserStatus };
