import { createAuthor, findAllAuthors, findAuthor, updateAuthor, deleteAuthor } from "../models/author.model.js";

export const ctrlCreateAuthor = async (req, res) => {
    try {
        const dataAuthor = req.body
        const author = await createAuthor(dataAuthor)
        if (author) {
            return res.status(201).json(author)
        }
    } catch (error) {
        console.log(error)
        res.status(500).json("Internal Server Error...")
    }
}

export const ctrlFindAllAuthors = async (req, res) => {
    try {
        const authors = await findAllAuthors()
        if (authors) {
            return res.status(200).json(authors)
        }
    } catch (error) {
        console.log(error);
        return res.status(500).json("Internal Server Error...")
    }
}

export const ctrlFindAuthor = async (req, res) => {
    try {
        const authorId = req.params.id
        const author = await findAuthor(authorId)
        if (author) {
            return res.status(200).json(author)
        }
    } catch (error) {
        console.log(error);
        return res.status(500).json("Internal Server Error...")
    }
}

export const ctrlUpdateAuthor = async (req, res) => {
    try {
        const dataAuthor = req.body
        const authorId = req.params.id

        const updatedAuthor = await updateAuthor(dataAuthor, authorId)
        if (updatedAuthor) {
            return res.status(201).json(updatedAuthor)
        }
    } catch (error) {
        console.log(error);
        return res.status(500).json("Internal Server Error...")
    }
}


export const ctrlDeleteAuthor = async (req, res) => {
    try {
        const authorId = req.params.id
        const deletedAuthor = await deleteAuthor(authorId)
        if (deletedAuthor) {
            return res.status(201).json("Author deleted successfully")
        }
    } catch (error) {
        console.log(error);
        return res.status(500).json("Internal Server Error...")
    }
}
