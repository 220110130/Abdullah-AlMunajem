const express = require('express');
const router = express.Router();
const orderController = require('../controllers/order');
const { isAuthenticated, isVendor } = require('../middleware/auth');

router.post('/checkout', isAuthenticated, orderController.saveOrder);
router.get('/orders', isAuthenticated, orderController.getAllOrders);
router.get('/orders/count', isAuthenticated, orderController.getOrdersByStatus);
router.patch('/orders/:orderId', isAuthenticated, orderController.updateOrder);

module.exports = router;