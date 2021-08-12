const bookModel = require('../models/book');

module.exports.getAllBooks = async (req, res) => {

    try {
        const result = await bookModel.getAll();

        res.status(200).json(result.Items ?? []);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Could not retreive books' });
    }
}

module.exports.getBook = async (req, res) => {
    const { bookUuid } = req.params;

    if (!bookUuid) {
        res.status(400).json({ error: 'bookUuid is required' });
        return;
    }

    try {
        const { Item } = await bookModel.get(bookUuid);

        if (!Item) {
            res.status(404).json({ error: 'Could not find book with provided "bookUuid"' });
        } else {
            res.status(200).json(Item);
        }
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Could not retreive book' });
    }
}

module.exports.createBook = async (req, res) => {
    const { uuid, name, releaseDate, authorName } = req.body;

    const bookData = {
        bookUuid: uuid,
        name,
        releaseDate,
        authorName
    }

    try {
        await bookModel.create(bookData);

        res.status(201).json(bookData);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Could not create book' });
    }
}

module.exports.updateBook = async (req, res) => {
    const { bookUuid } = req.params;
    const { name, releaseDate, authorName } = req.body;

    if (!bookUuid) {
        res.status(400).json({ error: 'bookUuid is required' });
        return;
    }

    const bookData = {
        bookUuid,
        name,
        releaseDate,
        authorName
    }

    try {
        const newData = await bookModel.update(bookData);

        res.status(201).json(newData.Attributes);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Could not update book' });
    }
}

module.exports.deleteBook = async (req, res) => {
    const { bookUuid } = req.params;

    if (!bookUuid) {
        res.status(400).json({ error: 'bookUuid is required' });
        return;
    }

    try {
        await bookModel.delete(bookUuid);

        res.status(204).end();
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Could not delete book' });
    }
}