const express = require('express');
const router = express.Router();
var { isAdmin, isLogin } = require('../utils.js');

const orderController = require('../controllers/OrderController');

// get all order of all user for admin
router.get('/', isAdmin, orderController.getAllUsersOrders);

// get order by id for admin
router.get('/id/:id', isAdmin, orderController.getOrderByID);

// confirm an order
router.get('/confirmed/:id', isLogin, orderController.confirmOrder)

// delivered order
router.get('/delivered/:id', isLogin, orderController.deliveredOrder);

// delete an order
router.get('/deleted/:id', isLogin, orderController.deleteOrder);

// get detail an order
router.get('/detail/:id', isLogin, orderController.getDetailOrder);

// get all order of an user
router.get('/user', isLogin, orderController.getAllOrderByUser);

// get an order for user by id
router.get('/user/id/:id', isLogin, orderController.getOrderUserById);

// get shipping page
router.get('/shipping', orderController.getOrderShipping);

// checkout
router.post('/checkout', orderController.checkout);

// getSucess
router.get('/success/:id', orderController.getSuccess);

module.exports = router;
