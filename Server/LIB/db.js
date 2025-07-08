import mongoose from "mongoose";

//Function to connect to mongodb databse

export const connectDB = async () => {
    try {
        mongoose.connection.on('connceted', () => console.log('Database.connnected'));
        await mongoose.connect(`${process.env.MONGODB_URL}/chat-app `);
    } catch (error) {
        console.log(error);
    }
}