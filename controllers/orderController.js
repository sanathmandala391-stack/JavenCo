const Order = require('../models/Order');
const Cart = require('../models/Cart');

exports.createOrder = async (req, res) => {
  try {
const userId = req.user?.id || req.user?._id; 
    
    if (!userId) {
      console.log("Auth Debug: req.user is", req.user);
      return res.status(401).json({ message: "User not authenticated - Missing ID" });
    }
    const { address } = req.body;

    // 1. Validation: Ensure address is provided
    if (!address) {
      return res.status(400).json({ message: "Shipping address is required" });
    }

    // 2. Get the user's cart and populate product details
    const cart = await Cart.findOne({ userId }).populate('items.productId');

    if (!cart || cart.items.length === 0) {
      return res.status(400).json({ message: "Cart is empty" });
    }

    // 3. Calculate Total & Prepare Products (Combined for efficiency)
    let totalAmount = 0;
    const orderProducts = [];

    cart.items.forEach(item => {
      if (item.productId) {
        const itemTotal = item.productId.price * item.quantity;
        totalAmount += itemTotal;
        
        orderProducts.push({
          productId: item.productId._id,
          name: item.productId.name,
          quantity: item.quantity,
          price: item.productId.price
        });
      }
    });

    if (orderProducts.length === 0) {
      return res.status(400).json({ message: "All products in cart are no longer available" });
    }

    // 4. Create the Order (Only once!)
    const order = await Order.create({
      userId,
      products: orderProducts,
      totalAmount,
      address,
      status: 'Order Confirmed'
    });

    // 5. Clear the cart
    await Cart.findOneAndDelete({ userId });

    res.status(201).json(order);
    
  } catch (err) {
    console.error("Order Creation Error:", err);
    res.status(500).json({ message: "Server error creating order", error: err.message });
  }
};

exports.getUserOrders = async (req, res) => {
  try {
    const userId = req.user.id; // From your working authMiddleware
    const orders = await Order.find({ userId }).sort({ createdAt: -1 });
    res.json(orders);
  } catch (err) {
    res.status(500).json({ message: "Error fetching orders" });
  }
};

// Get ALL orders for Admin Dashboard
// Export this so the router can see it
exports.getAllOrders = async (req, res) => {
  try {
    // Check if the user is an admin (Optional but recommended)
    if (req.user.role !== 'admin') {
      return res.status(403).json({ message: "Access denied. Admins only." });
    }

    const orders = await Order.find()
      .populate('userId', 'name email') 
      .sort({ createdAt: -1 });
    
    res.json(orders);
  } catch (err) {
    res.status(500).json({ message: "Admin Fetch Error", error: err.message });
  }
};
exports.updateOrderStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const order = await Order.findByIdAndUpdate(
      req.params.id, 
      { status }, 
      { new: true }
    );
    res.json(order);
  } catch (err) {
    res.status(500).json({ message: "Update failed", error: err.message });
  }
};