import mongoose from "mongoose";

const connectToMongoDB = async() => {
    try{
        await mongoose.connect(process.env.MONGODB_URL || 'mongodb+srv://bhavya:bhavya@cluster0.kin5ecd.mongodb.net/chatapp?retryWrites=true&w=majority');
        console.log("Connected to MongoDB");
    }
    catch(error){
       console.log("Error while connecting to MongoDB", error.message);
    }
};

export default connectToMongoDB;