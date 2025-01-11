const express = require('express')
const router = express.Router()
const LicenseController = require('../controllers/LicenseController.js')
const { authorize } = require('../services/auth/auth')

router.get('/', LicenseController.find)
router.get('/:id', LicenseController.findById)
router.post('/', authorize, LicenseController.save) // Protected route
router.put('/:id', authorize, LicenseController.update) // Protected route
router.delete('/:id', authorize, LicenseController.delete) // Protected route

module.exports = router
