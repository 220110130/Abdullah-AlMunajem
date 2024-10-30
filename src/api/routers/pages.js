const express = require('express');
const router = express.Router();
const pagesController = require('../controllers/pages');
const { isAuthenticated, setAuthStatus, isVendor} = require('../middleware/auth');

router.get('/', pagesController.renderProductsPage);
router.get('/signup', pagesController.renderSignupPage);
router.get('/login', pagesController.renderLoginPage);
router.get('/logout', pagesController.renderLogout);
router.get('/my-cart', isAuthenticated, setAuthStatus, pagesController.renderCart);
router.get('/vendor-dashboard', isAuthenticated, setAuthStatus, isVendor, pagesController.renderVendorDashboard);
router.get('/add-product', isAuthenticated, setAuthStatus, isVendor, pagesController.renderAddProducts);
router.get('/update-product/:productId', isAuthenticated, setAuthStatus, isVendor, pagesController.renderUpdateProduct);

module.exports = router;