const express = require('express');
const router = express.Router();
const cartController = require('../controllers/cart');
const { isAuthenticated } = require('../middleware/auth');

router.post('/add', isAuthenticated, cartController.addToCart);
router.delete('/:cartId', isAuthenticated, cartController.removeFromCart);
router.patch('/:cartId', isAuthenticated, cartController.updateQuantity);
router.get('/view', isAuthenticated, cartController.getCartItems);

module.exports = router;