const config = require('../utils/config')
const mongoose = require('mongoose')


mongoose
    .connect(config.MONGODB_URI, { useNewUrlParser: true })
    .catch(e => {
        console.error('Connection error', e.message)
    })

const db = mongoose.connection

module.exports = db