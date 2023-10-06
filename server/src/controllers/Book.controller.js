import { createBook, findAllBooks } from "../models/book.model.js"

export const ctrlCreateBook = async (req, res) => {
    try {
        const dataBook = req.body
        const book = await createBook(dataBook)
        if (book) {
            return res.status(201).json(book)
        }
    } catch (error) {
        console.log(error)
        return res.status(500).json({message:'error interno del servidor!'})
    }
} 

export const ctrlFindBooks = async (req, res) =>{
    try {
        const books = await findAllBooks()
if(books){
    return res.status(200).json(books) || res.status(404).json({message: "No hay libros!"})
}
    } catch (error) {
        console.log(error);
        return res.status(500).json({message: "error interno del servidor!"})
    }
}