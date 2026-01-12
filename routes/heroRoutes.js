const express = require('express')
const adminAuth = require('../middleware/adminAuth')
const upload = require('../middleware/upload') // 👈 ADD THIS
const router = express.Router()

const {
  addHero,
  deleteHero,
  getHeroes
} = require('../controllers/heroController')

router.get('/', getHeroes)

// 👇 upload.single('image') is the KEY
router.post(
  '/',
  adminAuth,
  upload.single('image'),
  addHero
)

router.delete('/:id', adminAuth, deleteHero)

module.exports = router
