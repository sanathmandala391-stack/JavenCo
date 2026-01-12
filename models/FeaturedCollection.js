const mongoose = require('mongoose')

const featuredSchema = new mongoose.Schema(
  {
    title: String,
    image: { type: String, required: true },
    link: String,
    active: { type: Boolean, default: true }
  },
  { timestamps: true }
)

module.exports = mongoose.model('FeaturedCollection', featuredSchema)
