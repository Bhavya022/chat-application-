const Message = require('../models/Message');
const logger = require('../utils/logger');
const { validateMessage } = require('../utils/helper');

class MessageError extends Error {
  constructor(message) {
    super(message);
    this.name = 'MessageError';
  }
}

const saveMessage = async (senderId, recipientId, content) => {
  try {
    const validatedContent = validateMessage(content);

    if (!senderId || !recipientId || !validatedContent) {
      throw new MessageError('Missing required fields');
    }
    if(senderId === recipientId){
      throw new MessageError('senderId and recipientId cannot be the same');
    }
    const message = new Message({
      sender: senderId,
      recipient: recipientId,
      content: validatedContent,
    });

    await message.save();
    logger.logInfo(`Message saved from ${senderId} to ${recipientId}`);
    return message;
  } catch (err) {
    logger.logError(`Error saving message: ${err.message}`);
    throw new MessageError(`Error saving message: ${err.message}`);
  }
};

const getMessages = async (senderId, recipientId) => {
  try {
    const messages = await Message.find({
      $or: [
        { sender: senderId, recipient: recipientId },
        { sender: recipientId, recipient: senderId },
      ],
    }).sort({ createdAt: 1 });
    logger.logInfo(`Fetched messages between ${senderId} and ${recipientId}`);
    return messages;
  } catch (err) {
    logger.logError(`Error fetching messages: ${err.message}`);
    throw new MessageError(`Error fetching messages: ${err.message}`);
  }
};

module.exports = { saveMessage, getMessages };
