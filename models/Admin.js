const mongoose = require('mongoose');

const adminSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true }
}, { timestamps: true });

// ✅ FIX: Check if the model exists before creating it
module.exports = mongoose.models.Admin || mongoose.model('Admin', adminSchema);