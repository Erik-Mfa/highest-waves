const express = require('express');
const router = express.Router();
const TagController = require('../controllers/TagController.js');
const { authorize, isAdmin } = require('../middlewares/auth/auth');


router.get('/', TagController.find);
router.get('/:id', TagController.findById);
router.post('/', authorize, TagController.save); // Protected route
router.put('/:id', authorize, TagController.update); // Protected route
router.delete('/:id', authorize, TagController.delete); // Protected route

module.exports = router;