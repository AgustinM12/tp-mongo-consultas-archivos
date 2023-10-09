import { Schema, model } from "mongoose";
import { Author } from "./author.model.js";
import path from "path";

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
        const existBook = await Book.findOne({ title: dataBook.title });
        if (existBook) {
            throw new Error("Ya existe un libro con ese nombre");
        }

        const existAuthor = await Author.findById(dataBook.author);
        if (!existAuthor) {
            throw new Error("No existe el autor elegido");
        }

        if (!portrait) {
            throw new Error("No se ha subido ningún archivo de imagen");
        }

        const portraitName = portrait.name; // Obtén el nombre del archivo

        // Mueve el archivo temporal a la carpeta de imágenes
        await portrait.mv(path.join(process.cwd(), './src/images/', portraitName));

        const book = await Book.create({
            title: dataBook.title,
            genre: dataBook.genre,
            year: dataBook.year,
            description: dataBook.description,
            portrait: `src/images/${portraitName}`,
            author: dataBook.author
        })

        if (book) {
            existAuthor.books.push(book._id);
            existAuthor.save()
            // await Author.findByIdAndUpdate(book.author, { $push: { books: book._id } });
            return book;
        }
    } catch (error) {
        console.log("Error creating book", error);
        throw error;
    }
};

//LISTAR LIBROS
export async function findAllBooks() {
    try {

        return await Book.find().populate("author", { books: 0, _id: 0, bio: 0 });

    } catch (error) {
        console.log("Error at find books", error);
    }
}

//LISTAR UN LIBRO
export async function findBook(bookId) {
    try {
        return await Book.findById(bookId).populate("author", { books: 0, _id: 0, bio: 0 });
    } catch (error) {
        console.log("Error at find book", error);
    }
}


//ACTUALIZAR UN LIIBRO
export async function updateBook(dataBook, bookId, portrait) {
    try {
        return await Book.findByIdAndUpdate(bookId,
            {
                title: dataBook.title,
                genre: dataBook.genre,
                year: dataBook.year,
                description: dataBook.description,
                author: dataBook.author,
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
        const authorsWithBook = await Author.findOne({ books: bookId });

        const deletedBook = await Book.findByIdAndDelete(bookId);

        if (deletedBook) {
            authorsWithBook.books.pull(bookId)
            await authorsWithBook.save();
        }
    } catch (error) {
        console.log("Error at delete book", error);
        throw error; 
    }
}

//CAMBIAR AUTOR DE UN LIBRO
export async function changeBookAuthor(bookId, authorId) {
    try {
        const oldAuthor = await Author.find({ books: bookId}); 

        const deleteAuthor = await Author.findByIdAndUpdate(oldAuthor, { $pull: { books: bookId } });
        
        const updatedBook = await Book.findByIdAndUpdate(bookId, { author: authorId })

        const updatedAuthor = await Author.findByIdAndUpdate(authorId, { $push: { books: bookId } })


        if (updatedBook && updatedAuthor && deleteAuthor) {
            return updatedBook
        }
    } catch (error) {
        console.log("Error at change book author", error);
    }
}

//FILTRAR UN LIBRO POR GENERO
export async function countBooksByGenre() {
    try {
        const results = await Book.distinct("genre");
        const genres = {};
        for (const genre of results) {
            genres[genre] = 0;
        }
        const books = await Book.find();
        for (const book of books) {
            genres[book.genre]++;
        }
        return genres;
    } catch (error) {
        console.log("Error at count books by genre", error);
    }
};
