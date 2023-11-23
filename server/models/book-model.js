const mongoose = require('mongoose')
const Schema = mongoose.Schema

const Book = new Schema(
    {
        isbn: [String],
        title: { type: String, required: true },
        authors: [String],
        genres: [String],
        descriptionPath: { type: String },
        imagePath: { type: String },
        topics: [String],
        publisher: [String],
        publishDate: [String]

    },
    { timestamps: true },
)

module.exports = mongoose.model('books', Book)