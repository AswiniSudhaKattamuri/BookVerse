const Order = require("../models/Order");
const Cart = require("../models/Cart");
const Book = require("../models/Book");

const placeOrder = async (req, res) => {
  try {
    const cart = await Cart.findOne({ user: req.user.id }).populate("items.book");

    if (!cart || cart.items.length === 0) {
      return res.status(400).json({
        message: "Cart is empty",
      });
    }

    let totalAmount = 0;

    cart.items.forEach((item) => {
      totalAmount += item.book.price * item.quantity;
    });

    const order = await Order.create({
      user: req.user.id,
      items: cart.items.map((item) => ({
        book: item.book._id,
        quantity: item.quantity,
      })),
      totalAmount,
    });

    // Clear cart after successful order
    cart.items = [];
    await cart.save();

    res.status(201).json({
      message: "Order placed successfully",
      order,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
const getMyOrders = async (req, res) => {
  try {
    const orders = await Order.find({
      user: req.user.id,
    }).populate("items.book");

    res.status(200).json({
      orders,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = { placeOrder, getMyOrders };