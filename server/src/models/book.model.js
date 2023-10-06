import { Schema, model } from "mongoose";

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

    },
    description: {
        type: String,
        required: true
    },
    portrait: {
        type: String,
        required: false
    }
    // author: {
    //     type: Schema.Types.ObjectId,
    //     ref: "Author"
    // }
},{
    versionKey: false,
});

export const Book = model("Book", bookSchema);