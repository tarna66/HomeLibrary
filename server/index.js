
const config = require('./utils/config')
const express = require('express')
const cors = require('cors')

const db = require('./db')
const bookRouter = require('./routes/book-router')

const app = express()
app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(cors())
db.on('error', console.error.bind(console, 'MongoDB connection error:'))

app.get('/', (req, res) => {
    res.send('Hello from a server!')
})

app.use('/api', bookRouter)

app.listen(config.PORT, () => console.log(`Server running on port ${config.PORT}`))