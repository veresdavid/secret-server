import express from "express";
import secretRouter from "./secret-router";

const baseRouter = express.Router();

baseRouter.use("/secret", secretRouter);

export default baseRouter;