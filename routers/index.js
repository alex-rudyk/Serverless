const express = require('express');
const { getAllBooks, getBook, createBook, updateBook, deleteBook } = require('../controllers/book');
const router = express.Router();

router.get('/books', getAllBooks);
router.get('/book/:bookUuid', getBook);
router.post('/book/add', createBook);
router.post('/book/:bookUuid/update', updateBook);
router.delete('/book/:bookUuid/delete', deleteBook);

module.exports = router;