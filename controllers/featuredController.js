const FeaturedCollection = require('../models/FeaturedCollection')

// ADMIN
exports.addFeatured = async (req, res) => {
  try {
    const item = await FeaturedCollection.create({
      title: req.body.title,
      link: req.body.link,
      image: req.file.path, // ✅ Cloudinary URL
      active: req.body.active ?? true
    })

    res.json(item)
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}

exports.deleteFeatured = async (req, res) => {
  await FeaturedCollection.findByIdAndDelete(req.params.id)
  res.json({ message: 'Removed' })
}

// USER
exports.getFeatured = async (req, res) => {
  const items = await FeaturedCollection.find({ active: true })
  res.json(items)
}

