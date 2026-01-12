const mongoose = require('mongoose')

const brandSchema = new mongoose.Schema(
  {
    name: String,
    logo: { type: String, required: true },
    active: { type: Boolean, default: true }
  },
  { timestamps: true }
)

module.exports = mongoose.model('Brand', brandSchema)
