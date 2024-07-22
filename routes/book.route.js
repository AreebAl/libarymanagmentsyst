import express from 'express';
import { authenticate } from '../middleware/auth.middleware.js';
import {
  createBook,
  getBooks,
  getBookById,
  updateBook,
  deleteBook
} from '../controller/book.controller.js';

const router = express.Router();

router.post('/', authenticate, createBook);
router.get('/', getBooks);
router.get('/:id', getBookById);
router.put('/:id', authenticate, updateBook);
router.delete('/:id', authenticate, deleteBook);

export default router;
