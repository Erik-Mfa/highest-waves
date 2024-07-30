// userRoute.js
const express = require('express');
const router = express.Router();
const UserController = require('../controllers/UserController');
const { authorize, isAdmin } = require('../middlewares/auth/auth');

router.get('/', authorize, isAdmin, UserController.getAllUsers);
router.get('/:id', authorize, UserController.getUserById);
router.put('/:id', authorize, UserController.updateUser);
router.delete('/:id', authorize, isAdmin, UserController.deleteUser);

module.exports = router;
