const Wishlist = require("../models/Wishlist");

const addToWishlist = async (req, res) => {
  try {
    const { bookId } = req.body;

    let wishlist = await Wishlist.findOne({ user: req.user.id });

    if (!wishlist) {
      wishlist = await Wishlist.create({
        user: req.user.id,
        books: [bookId],
      });
    } else {
      if (!wishlist.books.includes(bookId)) {
        wishlist.books.push(bookId);
        await wishlist.save();
      }
    }

    res.status(200).json({
      message: "Book added to wishlist",
      wishlist,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const getWishlist = async (req, res) => {
  try {
    const wishlist = await Wishlist.findOne({
      user: req.user.id,
    }).populate("books");

    res.status(200).json({
      wishlist,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
const removeFromWishlist = async (req, res) => {
  try {
    const { bookId } = req.params;

    const wishlist = await Wishlist.findOne({
      user: req.user.id,
    });

    if (!wishlist) {
      return res.status(404).json({
        message: "Wishlist not found",
      });
    }

    wishlist.books = wishlist.books.filter(
      (id) => id.toString() !== bookId
    );

    await wishlist.save();

    res.status(200).json({
      message: "Book removed from wishlist",
      wishlist,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
module.exports = { addToWishlist, getWishlist, removeFromWishlist };