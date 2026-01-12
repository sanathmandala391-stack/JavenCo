const Cart = require('../models/Cart');

exports.addToCart = async (req, res) => {
  const { productId, quantity } = req.body;
  const userId = req.user.id;

  try {
    let cart = await Cart.findOne({ userId });

    if (!cart) {
      // FIX: Added await here so the DB actually finishes creating the record
      cart = await Cart.create({
        userId,
        items: [{ productId, quantity: Number(quantity) }]
      });
    } else {
      // CHECK: Does this product already exist in the cart?
      const itemIndex = cart.items.findIndex(item => 
        item.productId.toString() === productId
      );

      if (itemIndex > -1) {
        // If it exists, update the quantity instead of pushing a new item
        cart.items[itemIndex].quantity += Number(quantity);
      } else {
        // If it doesn't exist, add it to the array
        cart.items.push({ productId, quantity: Number(quantity) });
      }
      
      await cart.save();
    }

    // FIX: Populate before sending back so the frontend gets the Image/Name immediately
    const updatedCart = await Cart.findById(cart._id).populate('items.productId');
    res.json(updatedCart);

  } catch (err) {
    console.error("Cart Update Error:", err);
    res.status(500).json({ message: "Server error updating cart" });
  }
};

exports.getCart = async (req, res) => {
  try {
    const cart = await Cart.findOne({ userId: req.user.id }).populate('items.productId');
    if (!cart) return res.json({ items: [] });
    res.json(cart);
  } catch (err) {
    res.status(500).json({ message: "Error fetching cart" });
  }
};

exports.removeFromCart = async (req, res) => {
  try {
    const { productId } = req.params;
    const cart = await Cart.findOne({ userId: req.user.id });

    if (!cart) return res.status(404).json({ message: "Cart not found" });

    // Use .filter to remove EVERY item that matches this product ID
    // This clears out those duplicates that caused the warning
    cart.items = cart.items.filter(
      (item) => item.productId.toString() !== productId
    );

    await cart.save();
    
    // Return populated data
    const updatedCart = await Cart.findOne({ userId: req.user.id }).populate('items.productId');
    res.json(updatedCart || { items: [] });
  } catch (err) {
    res.status(500).json({ message: "Error removing item" });
  }
};