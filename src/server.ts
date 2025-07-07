/* eslint-disable no-console */
import { Server } from "http";

import mongoose from "mongoose";
import app from "./app";
import { envVars } from "./app/config/env";


let server: Server;

const startServer = async () => {
    try {
        console.log(envVars.DB_URL);
        await mongoose.connect(envVars.DB_URL)
        console.log("connected to DB!!");
        server = app.listen(5000, () => {
            console.log("Server is listen in port 5000");
        })
    } catch (error) {
        console.log(error);
    }
}
startServer()

process.on("unhandledRejection", (err) => {
    console.log("unhandledRejection detected", err);
    if (server) {
        server.close(() => {
            process.exit(1)
        })

    }
    process.exit(1)
})


process.on("uncaughtException", (err) => {
    console.log("uncaughtException detected", err);
    if (server) {
        server.close(() => {
            process.exit(1)
        })

    }
    process.exit(1)
})
// Promise.reject(new Error("i forget to catch this error"))
// throw new Error("I forget to handle this local error")
process.on("SIGTERM", (err) => {
    console.log("sinterm signal  detected", err);
    if (server) {
        server.close(() => {
            process.exit(1)
        })

    }
    process.exit(1)
})
