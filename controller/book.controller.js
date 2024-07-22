import Book from '../models/book.model.js';

export const createBook = async (req, res) => {
  const { title, author, genre } = req.body;

  try {
    const newBook = new Book({ title, author, genre });
    await newBook.save();
    res.status(201).json(newBook);
  } catch (err) {
    res.status(500).json({ message: 'Error creating book', error: err.message });
  }
};

export const getBooks = async (req, res) => {
  const { page = 1, limit = 10, search = '', genre } = req.query;
  const query = {
    $or: [
      { title: new RegExp(search, 'i') },
      { author: new RegExp(search, 'i') }
    ]
  };
  if (genre) query.genre = genre;

  try {
    const books = await Book.find(query)
      .skip((page - 1) * limit)
      .limit(Number(limit));
    const total = await Book.countDocuments(query);

    res.json({ books, total, page: Number(page), limit: Number(limit) });
  } catch (err) {
    res.status(500).json({ message: 'Error retrieving books', error: err.message });
  }
};

export const getBookById = async (req, res) => {
  const { id } = req.params;

  try {
    const book = await Book.findById(id);
    if (!book) return res.status(404).json({ message: 'Book not found' });

    res.json(book);
  } catch (err) {
    res.status(500).json({ message: 'Error retrieving book', error: err.message });
  }
};

export const updateBook = async (req, res) => {
  const { id } = req.params;
  const { title, author, genre } = req.body;

  try {
    const updatedBook = await Book.findByIdAndUpdate(
      id,
      { title, author, genre },
      { new: true }
    );
    if (!updatedBook) return res.status(404).json({ message: 'Book not found' });

    res.json(updatedBook);
  } catch (err) {
    res.status(500).json({ message: 'Error updating book', error: err.message });
  }
};

export const deleteBook = async (req, res) => {
  const { id } = req.params;

  try {
    const deletedBook = await Book.findByIdAndDelete(id);
    if (!deletedBook) return res.status(404).json({ message: 'Book not found' });

    res.json({ message: 'Book deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Error deleting book', error: err.message });
  }
};
