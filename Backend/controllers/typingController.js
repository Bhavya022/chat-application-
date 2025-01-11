const { updateTypingStatus, getTypingStatus } = require('../services/typingService');
const logger = require('../utils/logger');

const updateTyping = async (req, res) => {
  const { userId, isTyping } = req.body;

  try {
    const typingStatus = await updateTypingStatus(userId, isTyping);
    res.status(200).json({
      message: 'Typing status updated successfully',
      typingStatus
    });
  } catch (err) {
    logger.logError('Error updating typing status: ' + err.message);
    res.status(500).json({ message: 'Error updating typing status' });
  }
};

const getTyping = async (req, res) => {
  const { userId } = req.params;

  try {
    const typingStatus = await getTypingStatus(userId);
    res.status(200).json({
      message: 'Typing status fetched successfully',
      isTyping: typingStatus
    });
  } catch (err) {
    logger.logError('Error fetching typing status: ' + err.message);
    res.status(500).json({ message: 'Error fetching typing status' });
  }
};

module.exports = { updateTyping, getTyping };
