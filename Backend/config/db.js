import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();
const connectdb = async () => {
    await mongoose.connect(process.env.MONGO_URL);
    console.log('Connected to mongoDb');
};

export default connectdb;
