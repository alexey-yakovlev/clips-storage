import dotenv from 'dotenv';
dotenv.config();
import mongoose from 'mongoose';
import User from './user';
import Clip from './clip';
 
const connectDb = () => {
  return mongoose.connect(process.env.DATABASE_URL, {
    useCreateIndex: true, 
    useNewUrlParser: true, 
    useUnifiedTopology: true});
};
 
export { connectDb, Clip, User };