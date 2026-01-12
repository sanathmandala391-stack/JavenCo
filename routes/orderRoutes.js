const router = require('express').Router();
const { 
    createOrder, 
    getUserOrders, 
    getAllOrders, 
    updateOrderStatus, 
    cancelOrder 
} = require('../controllers/orderController');
const auth = require('../middleware/authMiddleware');

router.get('/my-orders', auth, getUserOrders);
router.get('/admin/all', auth, getAllOrders);
router.post('/', auth, createOrder);

// User-facing cancel route
router.patch('/:id/cancel', auth, cancelOrder);

// Admin-facing status update route
router.patch('/:id/status', auth, updateOrderStatus);

module.exports = router;