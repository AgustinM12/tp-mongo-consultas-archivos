import express from "express";
import morgan from "morgan";
import cors from "cors";
import fileUpload from "express-fileupload";
import { connectDB } from "./src/config/db.js";
import { authorRouter, bookRouter } from "./src/routes/allRouter.routes.js"
import path from "path";

const app = express()
const PORT = process.env.PORT || 5000

app.use(express.json());
app.use(cors());
app.use(morgan("dev"));
app.use(fileUpload({
    useTempFiles: true,
    uriDecodeFileNames: true,
    tempFileDir: path.join(process.cwd(), './src/images/'),
    limits: { fileSize: 50 * 1024 * 1024 },
    responseOnLimit: "El archivo es demasiado grande"
}))

//ROUTES
app.use(authorRouter);
app.use(bookRouter);

//ESCUCHA DEL SERVIDOR
app.listen(PORT, () => {
    try {
        connectDB();
        console.log(`Server on port localhost:${PORT}`);
    } catch (error) {
        console.log("Error connecting to DB", error);
    }
});