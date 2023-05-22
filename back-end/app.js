import express from "express";
import mongoose from "mongoose";
import cors from "cors";

import brandsRoutes from './routes/brandsRoutes.js';
import modelsRoutes from './routes/modelsRoutes.js';
import specsRoutes from './routes/specsRoutes.js';
import usersRoutes from './routes/usersRoutes.js';

// MongoDB Connection
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://127.0.0.1:27017/computech');

const app = express();
app.use(express.json());
app.use(cors());

// Routes
app.use("/api", brandsRoutes);
app.use("/api", modelsRoutes);
app.use("/api", specsRoutes);
app.use("/api", usersRoutes);

// DB Connection Control
const auxRouter = express.Router();
auxRouter.use("*", (req, res) => {
    res.status(404).json({
        success: "false",
        message: "Page not found",
        error: {
            statusCode: 404,
            message: "You reached a route that is not defined on this server",
        },
    });
});

process.on('uncaughtException', (error)  => {
    console.log('Something terrible happend: ',  error);
    process.exit(1);
});

process.on('unhandledRejection', (error, promise) => {
    console.log(' We forgot to handle a promise rejection here: ', promise);
    console.log(' The error was: ', error );
});

// Port 
app.listen(8800, () => {
    console.log("Connected!");
});