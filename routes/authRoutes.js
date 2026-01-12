const router = require('express').Router()
const {
  userRegister,
  userLogin,
  adminRegister,
  adminLogin
} = require('../controllers/authController')

router.post('/register', userRegister)
router.post('/login', userLogin)

// ⚠️ Admin
router.post('/admin/register', adminRegister) // use once
router.post('/admin/login', adminLogin)

module.exports = router
