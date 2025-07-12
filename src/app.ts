import cors from "cors";
import express, { Request, Response } from "express"
import { globalErrorHandler } from "./app/midleware/globalErrorHandeler";
import { router } from "./app/routes";
import notFound from "./app/midleware/notFound";

const app = express()

app.use(express.json())
app.use(cors())

app.use("/api/v1", router)

app.get("/", (req:Request, res: Response)=>{
    res.status(200).json({
        message:"welcome to Tour Management System Backend"
    })
})


app.use(globalErrorHandler)
app.use(notFound)

export default app;