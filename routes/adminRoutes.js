const router = require('express').Router()
const { getAllOrders, deleteProduct } = require('../controllers/adminController')

router.get('/orders', getAllOrders)
router.delete('/products/:id', deleteProduct)


module.exports = router
