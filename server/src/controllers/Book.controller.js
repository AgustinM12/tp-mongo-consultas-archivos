import { createBook, findAllBooks, findBook, deleteBook, updateBook, changeBookAuthor } from "../models/book.model.js"

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
        return res.status(500).json("Internal Server Error...")
    }
}

export const ctrlFindAllBooks = async (req, res) => {
    try {
        const books = await findAllBooks()
        if (books) {
            return res.status(200).json(books) || res.status(404).json({ message: "No hay libros!" })
        }
    } catch (error) {
        console.log(error);
        return res.status(500).json("Internal Server Error...")
    }
}

export const ctrlFindBook = async (req, res) => {
    try {
        const bookId = req.params.id
        const book = await findBook(bookId)
        if (book) {
            return res.status(200).json(book) || res.status(404).json({ message: "No existe el libro!" })
        }
    } catch (error) {
        console.log(error);
        return res.status(500).json("Internal Server Error...")
    }
}

export const ctrlUpdateBook = async (req, res) => {
    try {
        const dataBook = req.body
        const bookId = req.params.id

        const updatedBook = await updateBook(dataBook, bookId)
        if (updatedBook) {
            return res.status(200).json(updatedBook)
        }
    } catch (error) {
        console.log(error);
        return res.status(500).json("Internal Server Error...")
    }
}

export const ctrlDeleteBook = async (req, res) => {
    try {
        const bookId = req.params.id
        const deletedBook = await deleteBook(bookId)
        if (deletedBook) {
            res.status(204).json("Book deleted successfully")
        }
    } catch (error) {
        console.log(error);
        return res.status(500).json("Internal Server Error...")
    }
}

export const ctrlChangeBookAuthor = async (req, res) => {
    const bookId = req.body.bookId
    const authorId = req.body.authorId

    try {
        const updatedBookAuthor = await changeBookAuthor(bookId, authorId)
        if (updatedBookAuthor) {
            return res.status(200).json("Book and Author updated successfully")
        }

    } catch (error) {
        console.log(error);
        return res.status(500).json("Internal Server Error...")
    }
}