const Brand = require('../models/Brand')

// ADMIN
exports.addBrand = async (req, res) => {
  console.log('BODY:', req.body)
  console.log('FILE:', req.file)

  if (!req.file) {
    return res.status(400).json({ message: 'Logo file missing' })
  }

  const brand = await Brand.create({
    name: req.body.name,
    logo: req.file.path,
    active: true
  })

  res.json(brand)
}


exports.deleteBrand = async (req, res) => {
  await Brand.findByIdAndDelete(req.params.id)
  res.json({ message: 'Brand deleted' })
}

// USER
exports.getBrands = async (req, res) => {
  const brands = await Brand.find({ active: true })
  res.json(brands)
}
