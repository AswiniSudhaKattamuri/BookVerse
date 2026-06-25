const express=require("express");
const {addBook,getAllBooks,getBookById,updateBook,deleteBook,searchBooks,filterBooksByCategory}=require("../controllers/bookController");
const router=express.Router();
router.post("/",addBook);
router.get("/",getAllBooks);
router.get("/search/title", searchBooks);
router.get("/filter/category", filterBooksByCategory);
router.get("/:id",getBookById);
router.put("/:id",updateBook);
router.delete("/:id",deleteBook);

module.exports=router;