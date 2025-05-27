import mongoose from 'mongoose';

const connectdb = async () => {
    await mongoose.connect(process.env.MONGO_URL);
    console.log('Connected to mongoDb');
};

export default connectdb;
