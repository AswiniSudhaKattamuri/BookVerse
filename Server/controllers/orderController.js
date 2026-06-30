const Order = require("../models/Order");
const Cart = require("../models/Cart");
const Book = require("../models/Book");
const Address = require("../models/Address");

const placeOrder = async (req, res) => {
	const defaultAddress = await Address.findOne({
  user: req.user.id,
  isDefault: true,
});

if (!defaultAddress) {
  return res.status(400).json({
    message: "Please select a default delivery address",
  });
}
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
const { paymentMethod } = req.body;
   const order = await Order.create({
  user: req.user.id,

  items: cart.items.map((item) => ({
    book: item.book._id,
    quantity: item.quantity,
  })),

  address: {
    fullName: defaultAddress.fullName,
    phone: defaultAddress.phone,
    house: defaultAddress.house,
    street: defaultAddress.street,
    city: defaultAddress.city,
    state: defaultAddress.state,
    pincode: defaultAddress.pincode,
    landmark: defaultAddress.landmark,
  },

  totalAmount,

  paymentMethod,

  paymentStatus: "Pending",

  status: "Processing",
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