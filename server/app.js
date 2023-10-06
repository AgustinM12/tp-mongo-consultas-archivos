import express from "express";
import morgan from "morgan";
import cors from "cors";
import { connectDB } from "./src/config/db.js";
import {authorRouter, bookRouter} from "./src/routes/allRouter.routes.js"


const app = express()
const PORT = process.env.PORT || 5000

app.use(express.json());
app.use(cors());
app.use(morgan("dev"));
app.use(authorRouter)
app.use(bookRouter)
app.listen(PORT, () => {
    try {
        connectDB();
        console.log("Connection successful to DB");
    } catch (error) {
        console.log("Error connecting to DB", error);
    }
    console.log(`Server on port localhost:${PORT}`);
})