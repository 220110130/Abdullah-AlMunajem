const express = require('express');
const router = express.Router();
const productsController = require('../controllers/products');
const { isAuthenticated, isVendor } = require('../middleware/auth');

router.post('/products', isAuthenticated, isVendor, productsController.addProduct);
router.get('/products', productsController.getAllProducts);
router.delete('/products/:productId', isAuthenticated, productsController.deleteProductById);
router.get('/products/vendor', isAuthenticated, isVendor, productsController.getVendorProducts);
router.get('/products/:productId', productsController.getProductById);
router.patch('/products/:productId', productsController.updateProductById);

module.exports = router;