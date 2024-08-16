const express = require('express');
const router = express.Router();
const OrderController = require('../controllers/OrderController.js');
const { authorize, isAdmin } = require('../services/auth/auth');

router.get('/', authorize, isAdmin, OrderController.find);
router.get('/all/:id', authorize, OrderController.findOrdersByUserId);
router.get('/:id', authorize, OrderController.findById);
router.post('/', authorize, OrderController.save); // Protected route
router.put('/:id', authorize, OrderController.update); // Protected route
router.delete('/:id', authorize, OrderController.delete); // Protected route

module.exports = router;