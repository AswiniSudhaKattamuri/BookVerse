const express = require("express");
const { addToCart,getCart,updateCartQuantity,removeFromCart } = require("../controllers/cartController");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/", authMiddleware, addToCart);
router.get("/", authMiddleware, getCart);
router.put("/:bookId", authMiddleware, updateCartQuantity);
router.delete("/:bookId", authMiddleware, removeFromCart);
module.exports = router;