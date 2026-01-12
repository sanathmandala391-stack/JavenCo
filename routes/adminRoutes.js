const router = require('express').Router();
const { 
  getAllOrders, 
  deleteProduct, 
  getAllUsers // Import the new controller
} = require('../controllers/adminController');

// Route to get all users
router.get('/users', getAllUsers);

router.get('/orders', getAllOrders);
router.delete('/products/:id', deleteProduct);

module.exports = router;
