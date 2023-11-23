
const express = require('express')
const router = express.Router()
const Book = require('../models/book-model')

router.post('/book', (req, res) => {
    const body = req.body

    if (!body) {
        return res.status(400).json({
            success: false,
            error: 'Server says: You must have book',
        })
    }

    const book = new Book(body)

    if (!book) {
        return res.status(400).json({ success: false, error: err })
    }

    book.save()
        .then(() => {
            return res.status(201).json({
                success: true,
                id: book._id,
                message: 'Server says: Book added',
            })
        })
        .catch(error => {
            return res.status(400).json({
                error,
                message: 'Server says: Something went wrog. Book not added!',
            })
        })
})


router.put('/book/:id', (req, res) => {
    const body = req.body

    if (!body) {
        return res.status(400).json({
            success: false,
            error: 'Server says: Could not update. Add update info',
        })
    }

    Book.findOne({ _id: req.params.id }, (err, book) => {
        if (err) {
            return res.status(404).json({
                err,
                message: 'Server says: Book not found!',
            })
        }
        book.title = body.title
        book.authors = body.authors
        book.isbn = body.isbn
        book.genres = body.genres
        book.descriptionPath = body.descriptionPath
        book.imagePath = body.imagePath
        book.topics = body.topics
        book.publisher = body.publisher
        book.publishDate = body.publishDate

        book.save()
            .then(() => {
                return res.status(200).json({
                    success: true,
                    id: book._id,
                    message: 'Server says: Book updated!',
                })
            })
            .catch(error => {
                return res.status(404).json({
                    error,
                    message: 'Server says: Book update fails',
                })
            })
    })
})


router.delete('/book/:id', (req, res) => {
    Book.findOneAndDelete({ _id: req.params.id }, (err, book) => {
        if (err) {
            return res.status(400).json({ success: false, error: err })
        }

        if (!book) {
            return res
                .status(404)
                .json({ success: false, error: `Server says: Book not found` })
        }

        return res.status(200).json({ success: true, data: book })
    }).catch(err => console.log(err))
})


router.get('/book/:id', (req, res) => {
    Book.findOne({ _id: req.params.id }, (err, book) => {
        if (err) {
            return res.status(400).json({ success: false, error: err })
        }

        if (!book) {
            return res
                .status(404)
                .json({ success: false, error: `Server says: Book not found` })
        }
        return res.status(200).json({ success: true, data: book })
    }).catch(err => console.log(err))
})


router.get('/books', (req, res) => {
    Book.find({}, (err, books) => {
        if (err) {
            return res.status(400).json({ success: false, error: err })
        }
        if (!books.length) {
            return res
                .status(404)
                .json({ success: false, error: `Server says: Books not found` })
        }
        return res.status(200).json({ success: true, data: books })
    }).catch(err => console.log(err))
})

module.exports = router