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
export async function createBook(dataBook, portrait) {
    try {

        const book = await Book.create({
            title: dataBook.title,
            genre: dataBook.genre,
            year: dataBook.year,
            description: dataBook.description,
            portrait: portrait.name,
            author: dataBook.author
        })

        if (book) {
            await Author.findByIdAndUpdate(book.author, { $push: { books: book._id } }) ?? null
            return book
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

//LISTAR UN LIBRO
export async function findBook(bookId) {
    try {
        return await Book.findById(bookId).populate("author", { books: 0, _id: 0, model: 0 });
    } catch (error) {
        console.log("Error at find book", error);
    }
}


//ACTUALIZAR UN LIIBRO
export async function updateBook(dataBook, bookId) {
    try {
        return await Book.findByIdAndUpdate(bookId,
            {
                title: dataBook.title,
                genre: dataBook.genre,
                year: dataBook.year,
                description: dataBook.description,
                portrait: portrait.name,
            },
            { new: true })
    } catch (error) {
        console.log("Error at update book", error);
    }
};

//ELIMINAR UN LIBRO
export async function deleteBook(bookId) {
    try {
        return await Book.findByIdAndDelete(bookId);
    } catch (error) {
        console.log("Error at delete book", error);
    }
}


//CAMBIAR AUTOR DE UN LIBRO
export async function changeBookAuthor(bookId, authorId) {
    try {
        const updatedBook = await Book.findByIdAndUpdate(bookId, { author: authorId })
        const updatedAuthor = await Author.findByIdAndUpdate(authorId, { $push: { books: bookId } })
        if (updatedBook && updatedAuthor) {
            return updatedBook
        }
    } catch (error) {
        console.log("Error at change book author", error);
    }
}