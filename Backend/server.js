const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const bodyParser = require('body-parser');
const cors = require('cors');
const errorHandler = require('./middleware/errorMiddleware');
const authRoutes = require('./routes/authRoutes');
const messageRoutes = require('./routes/messageRoutes');
const typingRoutes = require('./routes/typingRoutes');
const userRoutes = require('./routes/userRoutes');
const setupSocket = require('./socket/socket');
const  connectDB  = require('./config/dbConfig');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

connectDB();

app.use(cors());
app.use(bodyParser.json());
app.use('/api/auth', authRoutes);
app.use('/api/messages', messageRoutes);
app.use('/api/typing', typingRoutes);
app.use('/api/users', userRoutes);
app.use(errorHandler);

setupSocket(io);

server.listen(process.env.PORT || 5000, () => {
  console.log(`Server running on port ${process.env.PORT || 5000}`);
});
