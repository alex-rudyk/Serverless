const express = require('express');
const { getAllBooks, getBook, createBook, updateBook, deleteBook } = require('../controllers/book');
const router = express.Router();
const validator = require('../middlewares/validation');

router.get('/books', getAllBooks);
router.get('/book/:bookUuid', getBook);
router.post('/book/add', validator.createBook, createBook);
router.post('/book/:bookUuid/update', validator.updateBook, updateBook);
router.delete('/book/:bookUuid/delete', deleteBook);

module.exports = router;