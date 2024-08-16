// userRoute.js
const express = require('express');
const router = express.Router();
const UserController = require('../controllers/UserController');
const { authorize, isAdmin } = require('../middlewares/auth/auth');

router.get('/', authorize, UserController.find);
router.get('/:id', authorize, UserController.getUserById); // Protected route
router.put('/:id', authorize, UserController.update); // Protected route
router.delete('/:id', authorize, isAdmin, UserController.delete); // Protected route

module.exports = router;
