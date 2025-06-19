import mongoose from "mongoose";

const connectDB = async () => {
    console.log("Connecting to MongoDB...");
    try{
        await mongoose.connect(process.env.MONGODB_URI)
        console.log("MongoDB connected successfully");

    }
    catch(err){
        console.error("MongoDB connection failed", err);
        process.exit(1); // Exit the process with failure
    }
}   
export default connectDB;