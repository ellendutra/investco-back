import mongoose from "mongoose";
import dotenv from 'dotenv';
dotenv.config();

const { MONGO_DATA, MONGO_DATABASE } = process.env;

mongoose.connect(`mongodb+srv://${MONGO_DATA}@invest.zqjdikh.mongodb.net/${MONGO_DATABASE}`);

let db = mongoose.connection;

export default db; 