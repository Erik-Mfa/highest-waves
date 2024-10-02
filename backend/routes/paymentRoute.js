const bodyParser = require('body-parser');
const express = require('express');
const router = express.Router();
const PaymentController = require('../controllers/PaymentController.js');
const { authorize } = require('../services/auth/auth');

// Middleware for JSON requests
router.use(bodyParser.json());

// router.post('/webhook', express.raw({ type: 'application/json' }), PaymentController.handleWebhook);
router.post('/create-payment-intent', authorize, PaymentController.save); 

module.exports = router;