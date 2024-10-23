// authRoute.js
const express = require('express')
const router = express.Router()
const AuthController = require('../controllers/AuthController')
const upload = require('../services/multer/usersMulter')

router.post('/register', upload.single('image'), AuthController.register)
router.post('/login', AuthController.login)
router.post('/logout', AuthController.logout)

module.exports = router
