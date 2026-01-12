const router = require('express').Router()
const auth = require('../middleware/authMiddleware')
const {
  addToCart,
  getCart,
  removeFromCart
} = require('../controllers/cartController')

router.post('/', auth, addToCart)
router.get('/', auth, getCart)
router.delete('/:productId', auth, removeFromCart)

module.exports = router
