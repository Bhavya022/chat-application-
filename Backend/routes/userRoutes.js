const express = require('express');
const { getUserStatus, updateUserStatus } = require('../controllers/userController');
const router = express.Router();

router.get('/:userId/status', getUserStatus);
router.post('/status', updateUserStatus);

module.exports = router;
