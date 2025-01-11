const validateMessage = (content) => {
    if (!content || content.trim() === "") {
      throw new Error("Message content cannot be empty");
    }
    return content.trim();
  };
  
  const generateSocketId = (userId) => {
    return `${userId}-${Math.random().toString(36).substring(2, 15)}`;
  };
  
  module.exports = { validateMessage, generateSocketId };
  