import connectDb from "./database";
import app from "./server";
import dotenv from "dotenv";

dotenv.config();

// start the server with this self-invoking function
(async function start() {

    // first connect to the database
    await connectDb();

    // after estabilishing the db connection, start the application
    app.listen(process.env.PORT || 5000);

})();