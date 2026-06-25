const Cart = require("../models/Cart");

const addToCart = async (req, res) => {
  try {
    const { bookId, quantity } = req.body;

    let cart = await Cart.findOne({ user: req.user.id });

    if (!cart) {
      cart = await Cart.create({
        user: req.user.id,
        items: [
          {
            book: bookId,
            quantity: quantity || 1,
          },
        ],
      });
    } else {
      const existingItem = cart.items.find(
        (item) => item.book.toString() === bookId
      );

      if (existingItem) {
        existingItem.quantity += quantity || 1;
      } else {
        cart.items.push({
          book: bookId,
          quantity: quantity || 1,
        });
      }

      await cart.save();
    }

    res.status(200).json({
      message: "Book added to cart",
      cart,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const getCart = async (req, res) => {
  try {
    const cart = await Cart.findOne({
      user: req.user.id,
    }).populate("items.book");

    res.status(200).json({
      cart,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const updateCartQuantity = async (req, res) => {
  try {
    const { quantity } = req.body;
    const { bookId } = req.params;

    const cart = await Cart.findOne({ user: req.user.id });

    if (!cart) {
      return res.status(404).json({
        message: "Cart not found",
      });
    }

    const item = cart.items.find(
      (item) => item.book.toString() === bookId
    );

    if (!item) {
      return res.status(404).json({
        message: "Book not found in cart",
      });
    }

    item.quantity = quantity;

    await cart.save();

    res.status(200).json({
      message: "Cart updated successfully",
      cart,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const removeFromCart = async (req, res) => {
  try {
    const { bookId } = req.params;

    const cart = await Cart.findOne({
      user: req.user.id,
    });

    if (!cart) {
      return res.status(404).json({
        message: "Cart not found",
      });
    }

    cart.items = cart.items.filter(
      (item) => item.book.toString() !== bookId
    );

    await cart.save();

    res.status(200).json({
      message: "Book removed from cart",
      cart,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = { addToCart, getCart, updateCartQuantity, removeFromCart };