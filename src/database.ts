import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const uri: string = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}/${process.env.DB_DATABSE}?retryWrites=true&w=majority`;

export default async function connectDb() {

    try {
        await mongoose.connect(uri, { useNewUrlParser: true });
    } catch(err) {
        console.log(err);
    }

}