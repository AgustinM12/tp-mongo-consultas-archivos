import { Schema, model } from "mongoose";

import { Book } from "./book.model.js";

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

//CREAR AUTORES POR DEFECTO


export async function createDefaultAuthors() {
    try {
        const existAuthors = await Author.find()
        if (existAuthors.length == 0) {

            const defaultAuthors = [
                {
                    name: "Alan",
                    lastname: "Moore",
                    bio: 'Alan Moore es un influyente escritor y guionista de cómics británico nacido en 1953. Es conocido por su trabajo revolucionario en la industria del cómic, Fincluyendo obras maestras como "Watchmen" y "V for Vendetta". Moore es famoso por su estilo narrativo oscuro y maduro, y su impacto en la cultura pop es innegable.',
                    books: [],
                },{
                    name: "Howard Phillip",
                    lastname: "Lovecraft",
                    bio: 'H.P. Lovecraft (Howard Phillips Lovecraft) fue un escritor estadounidense nacido en 1890 y fallecido en 1937. Es considerado uno de los maestros del género de terror y ciencia ficción. Lovecraft es conocido por su creación del "mito de Cthulhu" y su estilo literario único que explora lo cósmico y lo desconocido. Sus obras influyeron en el género del horror durante el siglo XX.',
                    books: [],
                },
                {
                    name: "George ",
                    lastname: "Orwell",
                    bio: 'George Orwell, cuyo nombre real era Eric Arthur Blair, fue un escritor y periodista británico nacido en 1903 y fallecido en 1950. Es famoso por su novela distópica "1984", que retrata un futuro totalitario y vigilante. Orwell también escribió "Rebelión en la granja", una alegoría política. Su trabajo se centra en la crítica social y política, y ha dejado una profunda huella en la literatura política del siglo XX.',
                    books: [],
                }
            ];

            await Author.insertMany(defaultAuthors);
            console.log("Defaut authors created successfully.");
            return defaultAuthors;
        };
    } catch (error) {
        console.log("Error creating default authors", error);
    }
}

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
        // Buscar libros con el autor especificado

        // Eliminar al autor
        const deletedAuthor = await Author.findByIdAndDelete(authorId);

        if (deletedAuthor) {
            // Eliminar todos los libros asociados al autor
            await Book.deleteMany({ author: authorId });
        }

        return deletedAuthor
    } catch (error) {
        console.log("Error at delete author", error);
        throw error; // Propaga el error para que sea manejado en otro lugar si es necesario
    }
}
