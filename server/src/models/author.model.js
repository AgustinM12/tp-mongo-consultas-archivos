import { Schema, model } from "mongoose";

const authorSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    lastname: {
        type: String,
        required: true
    },
    bio: {
        type: String,
        required: true
    },
    books: {
        type: [
            {
                type: Schema.Types.ObjectId,
                ref: "Book"
            },
        ],
        required: false,
    },
}, {
    versionKey: false,
});

export const Author = model("Author", authorSchema);

//SERVICIOS
//CREAR AUTORES EN LA DB

export async function createAuthor(dataAuthor) {
    try {
        return await Author.create({
            name: dataAuthor.name,
            lastname: dataAuthor.lastname,
            bio: dataAuthor.bio,
            books: dataAuthor.books,
        })
    } catch (error) {
        console.log("Error creating author", error);
    }
};

//LISTAR TODOS LOS AUTORES
export async function findAllAuthors() {
    try {
        return await Author.find().populate("books");
    } catch (error) {
        console.log("Error at find authors", error);
    }
};


//LISTAR UN AUTOR
export async function findAuthor(authorId) {
    try {
        return await Author.findById(authorId).populate("books");
    } catch (error) {
        console.log("Error at find authors", error);
    }
};

//ACTUALIZAR UN AUTOR
export async function updateAuthor(dataAuthor, authorId) {
    try {
        return await Author.findByIdAndUpdate(authorId,
            {
                name: dataAuthor.name,
                lastname: dataAuthor.lastname,
                bio: dataAuthor.bio
            },
            { new: true })
    } catch (error) {
        console.log("Error at update author", error);
    }
};

//ELIMINAR UN AUTOR
export async function deleteAuthor(authorId) {
    try {
        return await Author.findByIdAndDelete(authorId);
    } catch (error) {
        console.log("Error at delete author", error);
    }
}