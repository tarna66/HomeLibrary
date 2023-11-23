
import axios from 'axios'
const config = require('../utils/config');

const api = axios.create({
    baseURL: config.BASE_URL
})

export const addBook = payload => api.post(`/book`, payload)
export const getAllBooks = () => api.get(`/books`)
export const updateBookById = (id, payload) => api.put(`/book/${id}`, payload)
export const removeBookById = id => api.delete(`/book/${id}`)
export const getBookById = id => api.get(`/book/${id}`)

const apis = {
    addBook,
    getAllBooks,
    updateBookById,
    removeBookById,
    getBookById,
}

export default apis