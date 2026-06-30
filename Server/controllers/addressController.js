const Address = require("../models/Address");

const addAddress = async (req, res) => {
  try {
    const address = await Address.create({
      ...req.body,
      user: req.user.id,
    });

    res.status(201).json({
      message: "Address added successfully",
      address,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const getAddresses = async (req, res) => {
  try {
    const addresses = await Address.find({
      user: req.user.id,
    });

    res.status(200).json({
      addresses,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
const updateAddress = async (req, res) => {
  try {
    const { id } = req.params;

    const address = await Address.findOneAndUpdate(
      {
        _id: id,
        user: req.user.id,
      },
      req.body,
      {
        new: true,
      }
    );

    if (!address) {
      return res.status(404).json({
        message: "Address not found",
      });
    }

    res.status(200).json({
      message: "Address updated successfully",
      address,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
const deleteAddress = async (req, res) => {
  try {
    const { id } = req.params;

    const address = await Address.findOneAndDelete({
      _id: id,
      user: req.user.id,
    });

    if (!address) {
      return res.status(404).json({
        message: "Address not found",
      });
    }

    res.status(200).json({
      message: "Address deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const setDefaultAddress = async (req, res) => {
  try {
    const { id } = req.params;

    await Address.updateMany(
      { user: req.user.id },
      { isDefault: false }
    );

    const address = await Address.findOneAndUpdate(
      {
        _id: id,
        user: req.user.id,
      },
      {
        isDefault: true,
      },
      {
        new: true,
      }
    );

    if (!address) {
      return res.status(404).json({
        message: "Address not found",
      });
    }

    res.status(200).json({
      message: "Default address updated",
      address,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = {
  addAddress,
  getAddresses,
  updateAddress,
  deleteAddress,
  setDefaultAddress
};