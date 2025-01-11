const { loginUser, logoutUser, registerUser } = require('../services/authService');

const login = async (req, res) => {
 const { username, password } = req.body;
  try {
    const userData = await loginUser(username, password);
    res.status(200).json(userData);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

const logout = async (req, res) => {
  try {
    const result = logoutUser();
    res.status(200).json(result);
  } catch (err) {
    res.status(500).json({ message: 'Server Error' });
  }
};

const register = async (req, res) => {
  const { username, password } = req.body;
  try {
    const userData = await registerUser(username, password);
    res.status(201).json(userData);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = { login, logout, register };
