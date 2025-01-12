import React, { useState, useEffect } from 'react';
import axios from 'axios';
import io from 'socket.io-client';
import '../styles/chat.css';  // For custom styling

// Backend API base URL
const API_URL = 'https://chat-app-backend-z8ta.onrender.com/';

const socket = io(API_URL);

const ChatPage = ({ userId, recipientId }) => {
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState('');
  const [typingStatus, setTypingStatus] = useState('');

  // Fetch existing messages when component mounts
  useEffect(() => {
    axios
      .get(`${API_URL}/api/messages/${userId}/${recipientId}`)
      .then((response) => {
        setMessages(response.data.messages);
      })
      .catch((error) => {
        console.error('Error fetching messages:', error);
      });

    // Listen for new messages
    socket.on('newMessage', (newMessage) => {
      setMessages((prevMessages) => [...prevMessages, newMessage]);
    });

    // Listen for typing status
    socket.on('typingStatus', (status) => {
      setTypingStatus(status);
    });

    // Clean up on unmount
    return () => {
      socket.off('newMessage');
      socket.off('typingStatus');
    };
  }, [userId, recipientId]);

  // Handle sending a new message
  const handleSendMessage = async () => {
    if (message.trim()) {
      try {
        const response = await axios.post(`${API_URL}/api/messages/message`, {
          userId,
          recipientId,
          message,
        });
        socket.emit('sendMessage', response.data.message);
        setMessage('');
      } catch (error) {
        console.error('Error sending message:', error);
      }
    }
  };

  // Handle typing status
  const handleTyping = () => {
    socket.emit('typing', { userId, recipientId });
  };

  const handleStopTyping = () => {
    socket.emit('stopTyping', { userId, recipientId });
  };

  return (
    <div className="chat-page">
      <div className="chat-header">
        <h2>Chat with User {recipientId}</h2>
      </div>
      <div className="messages">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`message ${msg.senderId === userId ? 'sent' : 'received'}`}
          >
            <p>{msg.message}</p>
          </div>
        ))}
        {typingStatus && (
          <div className="typing-status">
            <span>{typingStatus} is typing...</span>
          </div>
        )}
      </div>
      <div className="chat-input">
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyPress={handleTyping}
          onBlur={handleStopTyping}
          placeholder="Type your message..."
        />
        <button onClick={handleSendMessage}>Send</button>
      </div>
    </div>
  );
};

export default ChatPage;
