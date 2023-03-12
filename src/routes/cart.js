const express = require('express');
const router = express.Router();
const { isLogin } = require('../utils.js');
// const authController = require('../app/controllers/AuthController');
const cartController = require('../controllers/CartController');

// get cart views
router.get('/', isLogin, cartController.getCart);

// add to cart
router.get('/add/:id', cartController.addToCart);

// increase & decrease item quantity
router.get('/sub/:id', cartController.subIten)

// remove item from cart
router.get('/remove/:id', cartController.removeItem)

module.exports = router;
