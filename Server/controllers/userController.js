const User = require("../models/User");

const Order = require("../models/Order");
const Wishlist = require("../models/Wishlist");
const Address = require("../models/Address");

console.log("Wishlist:", Wishlist);
console.log("Type:", typeof Wishlist);
console.log("findOne:", Wishlist.findOne);
const getProfile = async (req, res) => {
  try {

    const user = await User.findById(req.user.id).select("-password");

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    const orderCount = await Order.countDocuments({
      user: req.user.id,
    });

    const addressCount = await Address.countDocuments({
      user: req.user.id,
    });

    const wishlist = await Wishlist.findOne({
      user: req.user.id,
    });

    const wishlistCount = wishlist
      ? wishlist.books.length
      : 0;

    res.status(200).json({
      ...user.toObject(),
      orderCount,
      wishlistCount,
      addressCount,
    });

  } catch (error) {
  console.log(error);

  res.status(500).json({
    message: error.message,
  });
}
};

const updateProfile = async (req, res) => {
  try {

    const { name, email, phone } = req.body;

    const user = await User.findById(req.user.id);

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    user.name = name || user.name;
    user.email = email || user.email;
    user.phone = phone || user.phone;

    await user.save();

    res.status(200).json({
      message: "Profile updated successfully",
      user,
    });

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });

  }
};

module.exports = {
  getProfile,
  updateProfile,
};