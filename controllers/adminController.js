const Product = require('../models/Product')
const Order = require('../models/Order')
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