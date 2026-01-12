const express = require('express')
const cors = require('cors')

const authRoutes = require('./routes/authRoutes')
const productRoutes = require('./routes/productRoutes')
const orderRoutes = require('./routes/orderRoutes')
const cartRoutes = require('./routes/cartRoutes')
const paymentRoutes = require('./routes/paymentRoutes')
const adminRoutes = require('./routes/adminRoutes')

const heroRoutes = require('./routes/heroRoutes')
const brandRoutes = require('./routes/brandRoutes')
const featuredRoutes = require('./routes/featuredRoutes')

const app = express()

app.use(cors({
  origin: '*',
  credentials: true
}))

app.use(express.json())

app.get('/', (req, res) => {
  res.send('Server is running')
})

app.use('/api/auth', authRoutes)
app.use('/api/products', productRoutes)
app.use('/api/orders', orderRoutes)
app.use('/api/cart', cartRoutes)
app.use('/api/payments', paymentRoutes)
app.use('/api/admin', adminRoutes)

app.use('/api/heroes', heroRoutes)
app.use('/api/brands', brandRoutes)
app.use('/api/featured', featuredRoutes)

module.exports = app
