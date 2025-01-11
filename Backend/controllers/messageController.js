const { saveMessage, getMessages } = require('../services/messageService');
const logger = require('../utils/logger');

const saveMessageHandler = async (req, res) => {
  const { senderId, recipientId, content } = req.body;

  try {
    const message = await saveMessage(senderId, recipientId, content);
    res.status(201).json(message);
  } catch (err) {
    logger.logError(`Error saving message: ${err.message}`);
    res.status(500).json({ message: err.message || 'Error saving message' });
  }
};

const getMessagesHandler = async (req, res) => {
  const { userId, recipientId } = req.params;

  try {
    const messages = await getMessages(userId, recipientId);
    res.status(200).json(messages);
  } catch (err) {
    logger.logError(`Error fetching messages: ${err.message}`);
    res.status(500).json({ message: err.message || 'Error fetching messages' });
  }
};

module.exports = { saveMessageHandler, getMessagesHandler };
