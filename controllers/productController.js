const Product = require('../models/Product')
const cloudinary = require("../config/cloudinary")





exports.addProduct = async (req, res) => {
  try {
    const { name, price, description, category, stock } = req.body;

    if (!req.file) {
      return res.status(400).json({ message: "Please upload an image" });
    }

    const upload = await cloudinary.uploader.upload(req.file.path, {
      folder: "products",
    });

    const product = await Product.create({
      name,
      price,
      description,
      category,
      stock,
      image: upload.secure_url, // ✅ SINGLE IMAGE
    });

    res.status(201).json(product);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Product creation failed" });
  }
};

exports.getProducts = async (req, res) => {
  res.json(await Product.find())
}
exports.getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ message: "Product not found in database" });
    }
    res.json(product);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error finding product" });
  }
}

// backend/controllers/productController.js
exports.getUniqueCategories = async (req, res) => {
  try {
    // .distinct finds unique values for the 'category' field
    const categories = await Product.distinct('category');
    
    // Optional: Sort them alphabetically
    const sortedCategories = categories.sort();
    
    res.json(sortedCategories);
  } catch (err) {
    res.status(500).json({ message: "Could not fetch categories" });
  }
};