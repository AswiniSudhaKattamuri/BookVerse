const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    items: [
      {
        book: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Book",
          required: true,
        },

        quantity: {
          type: Number,
          required: true,
        },
      },
    ],

    address: {
      fullName: String,
      phone: String,
      house: String,
      street: String,
      city: String,
      state: String,
      pincode: String,
      landmark: String,
    },

    totalAmount: {
      type: Number,
      required: true,
    },

    paymentMethod: {
      type: String,
      default: "Cash on Delivery",
    },

    paymentStatus: {
      type: String,
      default: "Pending",
    },

    status: {
      type: String,
      default: "Processing",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Order", orderSchema);