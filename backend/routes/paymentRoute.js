const express = require('express');
const router = express.Router();
const PaymentController = require('../controllers/PaymentController.js');
const { authorize, isAdmin } = require('../services/auth/auth');

router.post('/create-payment-intent', authorize, PaymentController.save); 

module.exports = router;