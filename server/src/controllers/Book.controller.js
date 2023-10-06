import { createBook, findAllBooks } from "../models/book.model.js"

export const ctrlCreateBook = async (req, res) => {
    try {
        if (!req.files) {
            res.status(400).send({ message: "No file uploaded" });
            return;
        }

        const dataBook = req.body
        const portrait = req.files.portrait;
        

        console.log(portrait);
        const book = await createBook(dataBook, portrait)
        if (book) {
            return res.status(201).json({ message: "Libro creado!" })
        }

    } catch (error) {
        console.log(error)
        return res.status(500).json({ message: 'error interno del servidor!' })
    }
}

export const ctrlFindBooks = async (req, res) => {
    try {
        const books = await findAllBooks()
        if (books) {
            return res.status(200).json(books) || res.status(404).json({ message: "No hay libros!" })
        }
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "error interno del servidor!" })
    }
}