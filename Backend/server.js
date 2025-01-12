import path from "path";
import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";

import authRoutes from "./routes/auth.routes.js";
import messageRoutes from "./routes/message.routes.js";
import userRoutes from "./routes/user.routes.js";
import { app, server } from "./socket/socket.js";

 import cors from "cors";

import connectToMongoDB from "./db/connectToMongoDB.js";

dotenv.config();


const PORT = process.env.PORT || 5000;

const __dirname = path.resolve();


app.use(express.json()); 
app.use(cookieParser());
// app.use(cors({
// 	origin: 'http://localhost:3000',  
// 	methods: ['GET', 'POST', 'PUT', 'DELETE'],  
// 	allowedHeaders: ['Content-Type', 'Authorization'],  
//   }));
app.use(cors({
	origin: 'http://localhost:3000', // frontend URL
	methods: 'GET,POST',
	allowedHeaders: 'Content-Type, user-id', // Allow custom headers like 'user-id'
  }));
app.use("/api/auth", authRoutes);
app.use("/api/messages", messageRoutes);
app.use("/api/user", userRoutes)


app.use(express.static(path.join(__dirname, "/frontend/dist")));

app.get("*", (req, res) => {
	res.sendFile(path.join(__dirname, "frontend", "dist", "index.html"));
});


server.listen(PORT, () => {
	connectToMongoDB();
	console.log(`Server Running on port ${PORT}`);
});
