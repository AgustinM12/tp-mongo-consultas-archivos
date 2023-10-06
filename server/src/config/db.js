import mongoose from "mongoose";
import "dotenv/config"

export const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGOURL)
        console.log("Conexion exitosa a la DB");
    } catch (error) {
        console.log("Error al conectar a la DB", error);
    }
};