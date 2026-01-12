const router = require('express').Router()
const adminAuth = require('../middleware/adminAuth')
const upload = require('../middleware/upload') // ✅ ADD

const {
  addFeatured,
  deleteFeatured,
  getFeatured
} = require('../controllers/featuredController')

router.get('/', getFeatured)
router.post('/', adminAuth, upload.single('image'), addFeatured)
router.delete('/:id', adminAuth, deleteFeatured)

module.exports = router
