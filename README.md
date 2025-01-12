# chat-application-

#  Chat Application

This is a full-stack chat application built using the MERN stack (MongoDB, Express.js, React, Node.js). The application provides real-time messaging functionality with authentication and user management.

## Features

- **User Authentication**: Sign up, login, and logout functionality.
- **Real-Time Messaging**: Users can send and receive messages instantly.
- **User Management**: List of users available for chatting.
- **Responsive UI**: Optimized for different screen sizes.
- **Protected Routes**: Frontend handles token-based route protection.
- **Toast Notifications**: Alerts for various actions.

## Technologies Used

### Frontend

- **React**: For building the user interface.
- **React Hot Toast**: For notifications.
- **CSS**: For styling components.

### Backend

- **Node.js**: Backend runtime environment.
- **Express.js**: Web framework for building APIs.
- **MongoDB**: Database for storing user and message data.
- **JWT**: JSON Web Tokens for authentication.
- **Bcrypt.js**: For password hashing.

## Installation

### Prerequisites

- Node.js and npm installed on your system.
- MongoDB instance running locally or on the cloud.

### Steps

1. **Clone the repository:**

   ```bash
   git clone https://github.com/yourusername/mern-chat-app.git
   cd mern-chat-app
Install backend dependencies:

bash
Copy code
cd backend
npm install
Set up environment variables: Create a .env file in the backend folder and add the following:

env
Copy code
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
Run the backend server:

bash
Copy code
npm start
Install frontend dependencies:

bash
Copy code
cd ../frontend
npm install
Run the frontend server:

bash
Copy code
npm start
Access the application: Open your browser and navigate to http://localhost:3000.

API Endpoints
Auth Routes
POST /api/auth/signup: Register a new user.
POST /api/auth/login: Login a user.
POST /api/auth/logout: Logout a user.
User Routes
GET /api/user: Fetch users for the sidebar.
Message Routes
GET /api/message/:conversationId: Fetch messages for a conversation.
POST /api/message: Send a new message.
Folder Structure
css
Copy code
mern-chat-app/
├── backend/
│   ├── models/
│   ├── routes/
│   ├── controllers/
│   ├── middleware/
│   ├── utils/
│   └── server.js
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── hooks/
│   │   ├── utils/
│   │   └── App.js
└── README.md
Future Enhancements
Add typing indicators.
Add message delivery status.
Enable file and image sharing.
Implement group chats.
