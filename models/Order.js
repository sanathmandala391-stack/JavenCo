const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  userId: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User', 
    required: true 
  },
  products: [
    {
      productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
      name: String,
      quantity: Number,
      price: Number,
    }
  ],
  totalAmount: { type: Number, required: true },
  address: { type: String, required: true }, // ✅ Added this
  status: { type: String,enum:["Order Confirmed","Shipped","Delivered","Cancelled"], default: 'Order Confirmed' },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Order', orderSchema);