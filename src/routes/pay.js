const express = require('express');
const router = express.Router();
// const authController = require('../app/controllers/AuthController');
const payController = require('../controllers/PayController');

// create payment vnpay
router.post('/vnPay/:id', payController.createVNPay);

//PAYMENT RETURN
router.get('/vnpay/return', payController.vnpayReturn);

// create payment paypal
router.get('/paypal/:id', payController.createPaypal);
module.exports = router;
