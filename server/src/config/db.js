import mongoose from "mongoose";

export const connectDB = async () => {
    try {
        await mongoose.connect("mongodb://127.0.0.1:27017/tpLibros")
        console.log("Conexion exitosa a la DB");
    } catch (error) {
        console.log("Error al conectar a la DB", error);
    }
};