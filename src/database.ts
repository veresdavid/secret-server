import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const uri: string = "mongodb://localhost/secret";
// const uri: string = `mongodb://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_DATABSE}`;

export default async function connectDb() {

    try {
        await mongoose.connect(uri, { useNewUrlParser: true });
    } catch(err) {
        console.log(err);
    }

}