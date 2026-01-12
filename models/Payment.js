const mongoose = require('mongoose')

const paymentSchema = new mongoose.Schema({
  orderId: mongoose.Schema.Types.ObjectId,
  razorpayOrderId: String,
  razorpayPaymentId: String,
  status: String
})

module.exports = mongoose.model('Payment', paymentSchema)
