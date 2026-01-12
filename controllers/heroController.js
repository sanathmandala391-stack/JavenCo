const HeroBanner = require('../models/HeroBanner')

// ADMIN


exports.addHero = async (req, res) => {
  try {
    const hero = await HeroBanner.create({
      title: req.body.title,
      subtitle: req.body.subtitle,
      image: req.file.path // Cloudinary URL
    })

    res.json(hero)
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}


exports.deleteHero = async (req, res) => {
  await HeroBanner.findByIdAndDelete(req.params.id)
  res.json({ message: 'Hero removed' })
}

// USER
exports.getHeroes = async (req, res) => {
  const heroes = await HeroBanner.find({ active: true })
  res.json(heroes)
}
