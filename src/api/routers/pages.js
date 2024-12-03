const express = require('express');
const router = express.Router();
const pagesController = require('../controllers/pages');
const { isAuthenticated, isVendor, setAuthStatus } = require('../middleware/auth');

router.get('/', pagesController.renderProductsPage);
router.get('/signup', pagesController.renderSignupPage);
router.get('/login', pagesController.renderLoginPage);
router.get('/logout', pagesController.renderLogout);
router.get('/my-cart', isAuthenticated, setAuthStatus, pagesController.renderCart);
router.get('/vendor-dashboard', isAuthenticated, setAuthStatus, isVendor, pagesController.renderVendorDashboard);
router.get('/add-product', isAuthenticated, setAuthStatus, isVendor, pagesController.renderAddProducts);
router.get('/update-product/:productId', isAuthenticated, setAuthStatus, isVendor, pagesController.renderUpdateProduct);
router.get('/admin-dashboard', isAuthenticated, setAuthStatus, pagesController.renderAdminDasboard);
router.get('/requests', isAuthenticated, setAuthStatus, pagesController.renderRequest);
router.get('/customer-list', isAuthenticated, setAuthStatus, pagesController.renderCustomerList);
router.get('/view-orders', isAuthenticated, setAuthStatus, pagesController.renderViewOrdersPage);
router.get('/system-users', isAuthenticated, setAuthStatus, pagesController.renderCustomersAndVendors);
router.get('/system-products', isAuthenticated, setAuthStatus, pagesController.renderSystemProducts);
router.get('/checkout', isAuthenticated, setAuthStatus, pagesController.renderCheckoutPage);
router.get('/profile', isAuthenticated, setAuthStatus, pagesController.renderProfile);
router.get('/home', isAuthenticated, setAuthStatus, pagesController.renderHomePage);

module.exports = router;