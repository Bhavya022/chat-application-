const express = require('express');
const authenticateUser = require('../middleware/authMiddleware');
const { updateTyping,getTyping } = require('../controllers/typingController');
const router = express.Router();

router.post('/status',authenticateUser, updateTyping);
router.get('/:userId/status',authenticateUser, getTyping);

module.exports = router;
