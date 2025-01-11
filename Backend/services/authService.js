const bcrypt = require('bcryptjs');
const User = require('../models/User');
const jwt = require('jsonwebtoken');

const loginUser = async (username, password) => {
  try {
    const user = await User.findOne({ username }); 
    console.log(username,password,user)
    if (!user) {
      throw new Error('Invalid credentials');
    }
    console.log(password, user.password)
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      throw new Error('Invalid password');
    }

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET || 'chatapp', {
      expiresIn: '1h',
    });
    console.log(token);
    return { token, userId: user._id, username: user.username };
  } catch (err) {
    throw new Error(err.message);
  }
};

// const logoutUser = async (req, res) => {
//   try {
//     const userId = req.userId;
//     console.log(userId);
//     await User.findByIdAndUpdate(userId, { online: false, socketId: null });
//     const socketId = req.socketId;
//     if (socketId) {
//       const socket = io.sockets.sockets.get(socketId);
//       if (socket) {
//         socket.disconnect(true);
//       }
//     }
//     res.status(200).json({ message: 'User logged out successfully' });
//   } catch (err) {
//     res.status(500).json({ message: 'Error logging out user' });
//   }
// };

const logoutUser = async (userId, io) => {
  try {
    const user = await User.findById(userId);

    if (!user) {
      throw new Error('User not found');
    }

    const socketId = user.socketId;

    if (socketId) {
      const socket = io.sockets.sockets.get(socketId);
      if (socket) {
        socket.disconnect(true); 
      }
    }

    await User.findByIdAndUpdate(userId, { online: false, socketId: null }); 

    return { message: 'User logged out successfully' };
  } catch (err) {
    throw new Error('Error logging out user');
  }
};
const registerUser = async (username, password) => {
  try {
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      throw new Error('User already exists');
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({ username, password: hashedPassword });
    await newUser.save();

    const token = jwt.sign({ userId: newUser._id }, process.env.JWT_SECRET || 'chatapp', {
      expiresIn: '1h',
    });

    return { token, userId: newUser._id, username: newUser.username };
  } catch (err) {
    throw new Error(err.message);
  }
};

module.exports = { loginUser, logoutUser, registerUser };
