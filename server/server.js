import dotenv from 'dotenv'
import express from 'express'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import mongoose from 'mongoose'

import todoRoute from "./routes/ToDoRoutes.js";

const app = express();
dotenv.config()

app.use(express.json())
app.use(cors())
app.use(cookieParser())
app.use("/service/todo", todoRoute)

const PORT = process.env.PORT
const URI = process.env.URI

app.get("/", (req, res) => {
    res.send("API Running");
});

mongoose.set("strictQuery", true)
mongoose.connect(URI)
    .then(() => app.listen(PORT, () => console.log(`All Set! Listening at http://localhost:${PORT}`)))
    .catch((error) => console.log(error.message));