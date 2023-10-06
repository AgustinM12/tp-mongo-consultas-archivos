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

