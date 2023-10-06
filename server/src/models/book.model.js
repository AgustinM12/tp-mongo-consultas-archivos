import { Schema, model } from "mongoose";
import { Author } from "./author.model.js";

const bookSchema = new Schema({
    title: {
        type: String,
        required: true,
        unique: true
    },
    genre: {
        type: String,
        required: true
    },
    year: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    portrait: {
        type: String,
        required: false
    },
    author: {
        type: Schema.Types.ObjectId,
        ref: "Author"
    }
}, {
    versionKey: false,
});

export const Book = model("Book", bookSchema);

//SERVICIOS

//CARGAR LIBRO
export async function createBook(dataBook) {
    try {

        const book = await Book.create({
            title: dataBook.title,
            genre: dataBook.genre,
            year: dataBook.year,
            description: dataBook.description,
            portrait: dataBook.portrait,
            author: dataBook.author
        })

        if (book) {
            await Author.findByIdAndUpdate(book.author, { $push: { books: book._id } })
        }

    } catch (error) {
        console.log("Error creating book", error);
    }
};

//LISTAR LIBROS
export async function findAllBooks() {
    try {

        return await Book.find().populate("author", { books: 0, _id: 0, model: 0 });

    } catch (error) {
        console.log("Error at find books", error);
    }
}