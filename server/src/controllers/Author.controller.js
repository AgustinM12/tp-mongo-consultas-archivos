import { createAuthor, findAllAuthors } from "../models/author.model.js";

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