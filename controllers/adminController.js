const Product = require('../models/Product')
const Order = require('../models/Order')
const User = require('../models/User');
const mongoose = require('mongoose')
exports.getAllOrders = async (req, res) => {
  const orders = await Order.find()
  res.json(orders)
}

exports.deleteProduct = async (req, res) => {
  try {
    const id = req.params.id.trim() // ✅ REMOVE NEWLINE

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: 'Invalid product ID' })
    }

    await Product.findByIdAndDelete(id)

    res.json({ message: 'Product deleted successfully' })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

exports.getAllUsers = async (req, res) => {
  try {
    // .select('-password') ensures we don't send the hashed passwords to the frontend
    const users = await User.find().select('-password').sort({ createdAt: -1 });
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: "Error fetching users", error: error.message });
  }
};