const express = require("express");

const {
  addBook,
  getAllBooks,
  getBookById,
  updateBook,
  deleteBook,
  searchBooks,
  filterBooksByCategory,
} = require("../controllers/bookController");

const authMiddleware = require("../middleware/authMiddleware");
const adminMiddleware = require("../middleware/adminMiddleware");

const router = express.Router();

// Admin only
router.post("/", authMiddleware, adminMiddleware, addBook);
router.put("/:id", authMiddleware, adminMiddleware, updateBook);
router.delete("/:id", authMiddleware, adminMiddleware, deleteBook);

// Public
router.get("/", getAllBooks);
router.get("/search/title", searchBooks);
router.get("/filter/category", filterBooksByCategory);
router.get("/:id", getBookById);

module.exports = router;