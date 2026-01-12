const mongoose = require('mongoose')

const heroSchema = new mongoose.Schema(
  {
    title: String,
    subtitle: String,
    image: { type: String, required: true },
    active: { type: Boolean, default: true }
  },
  { timestamps: true }
)

module.exports = mongoose.model('HeroBanner', heroSchema)
