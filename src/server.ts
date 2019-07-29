import express from "express";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import baseRouter from "./routers/base-router";

dotenv.config();

// create new express application
const app = express();

// configure the bodyParser middleware, so we can handle request body correctly and easily
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// use the main router of the API
app.use(`/${process.env.API_VERSION}`, baseRouter);

export default app;