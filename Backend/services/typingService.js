const Typing = require('../models/Typing');
const logger = require('../utils/logger'); 

class TypingError extends Error {
  constructor(message) {
    super(message);
    this.name = 'TypingError';
  }
}

const updateTypingStatus = async (userId, isTyping) => {
  try {
    if (!userId) {
      throw new TypingError('User ID is required');
    }

    const typingStatus = await Typing.findOneAndUpdate(
      { user: userId },
      { 
        isTyping, 
        lastTypingAt: isTyping ? new Date() : null  // Set lastTypingAt when isTyping is true
      },
      { upsert: true, new: true }
    );

    logger.logInfo(`Typing status for user ${userId} updated to ${isTyping}`);
    return typingStatus;
  } catch (err) {
    logger.logError('Error updating typing status: ' + err.message);
    throw new TypingError('Error updating typing status: ' + err.message);
  }
};

const getTypingStatus = async (userId) => {
  try {
    if (!userId) {
      throw new TypingError('User ID is required');
    }

    const typingStatus = await Typing.findOne({ user: userId });
    logger.logInfo(`Fetched typing status for user ${userId}: ${typingStatus ? typingStatus.isTyping : 'not typing'}`);
    return typingStatus ? typingStatus.isTyping : false;
  } catch (err) {
    logger.logError('Error fetching typing status: ' + err.message);
    throw new TypingError('Error fetching typing status: ' + err.message);
  }
};

module.exports = { updateTypingStatus, getTypingStatus };
