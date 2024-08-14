// userRoute.js
const express = require('express');
const router = express.Router();
const UserController = require('../controllers/UserController');
const { authorize, isAdmin } = require('../middlewares/auth/auth');

router.get('/', authorize, isAdmin, UserController.find);
router.get('/:id', authorize, UserController.getUserById);
router.put('/:id', authorize, UserController.update);
router.delete('/:id', authorize, isAdmin, UserController.delete);

module.exports = router;
