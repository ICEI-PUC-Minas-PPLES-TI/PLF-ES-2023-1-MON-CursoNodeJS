import dotenv from "dotenv";
import express, { json, urlencoded } from "express";
import "express-async-errors";
import cors from "cors";

// Get env variables
dotenv.config();

import database from "./app/database/index.js";
import routes from "./app/routes/index.js"; // Import API routes

// Establish database connection
(async () => {
    await database();
})();

// Create express instance
const app = express();

// Define cors origin
const corsOptions = {
    origin: "*",
    optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204 (default)
    methods: ["GET", "POST", "DELETE", "UPDATE", "PUT", "PATCH"],
};
app.use(cors(corsOptions));
app.use(json());
app.use(urlencoded({ extended: true }));

// Inject API Routes
app.use("/api", routes);

app.get("/", (req, res) => {
    res.json({ message: "Welcome to ToDo-Simple NodeJS API." });
});

// eslint-disable-next-line no-unused-vars
app.use(function (error, req, response, next) {
    if (process.env.APP_DEBUG) {
        console.error(error);
        return response.status(error.statusCode ?? 500).json({
            status: "Error",
            message: error.message,
            error: error,
        });
    } else {
        return response.status(error.statusCode ?? 500).json({
            status: "Error",
            message: error.message,
        });
    }
});

const port = process.env.NODE_LOCAL_PORT || 3001;
app.listen(port, () => {
    // eslint-disable-next-line no-console
    console.log(`ToDoSimple NodeJS API listening on port ${port}`);
    console.log(`---> http://${process.env.NODE_APP_HOST}:${port}`);
});
