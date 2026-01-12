const router = require('express').Router()
const { createOrder,getUserOrders,getAllOrders,updateOrderStatus } = require('../controllers/orderController')
const auth = require('../middleware/authMiddleware');
router.patch('/:id/status', auth, updateOrderStatus);
router.post('/',auth, createOrder)
router.get('/my-orders', auth, getUserOrders);
router.get('/admin/all', auth, getAllOrders);
// Add 'updateOrderStatus' to the requirements at the top first


module.exports = router
