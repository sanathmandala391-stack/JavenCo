const router = require('express').Router()
const adminAuth = require('../middleware/adminAuth')
const upload = require('../middleware/upload') // ✅ ADD

const {
  addBrand,
  deleteBrand,
  getBrands
} = require('../controllers/brandController')

router.get('/', getBrands)
router.post('/', adminAuth, upload.single('logo'), addBrand)
router.delete('/:id', adminAuth, deleteBrand)

module.exports = router
