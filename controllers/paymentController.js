const Payment = require('../models/Payment')

exports.createPayment = async (req, res) => {
  const payment = await Payment.create({
    orderId: req.body.orderId,
    status: 'CREATED'
  })

  res.json({
    message: 'Payment created (Razorpay integration next)',
    payment
  })
}
