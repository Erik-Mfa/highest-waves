const express = require('express');
const router = express.Router();
const CartController = require('../controllers/CartController.js');
const { authorize, isAdmin } = require('../middlewares/auth/auth');


router.get('/', authorize, isAdmin, CartController.find);
router.get('/:id', authorize, CartController.findCartsByUserId);
router.post('/', authorize, CartController.save); // Protected route
router.put('/:id', authorize, CartController.update); // Protected route
router.delete('/:id', authorize, CartController.delete); // Protected route

module.exports = router;