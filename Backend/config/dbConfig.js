const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI || 'mongodb+srv://bhavya:bhavya@cluster0.kin5ecd.mongodb.net/chatapp?retryWrites=true&w=majority', {

    });
    console.log("Database connected successfully");
  } catch (error) {
    console.error("Database connection failed", error.message);
    process.exit(1);
  }
};

module.exports = connectDB;
