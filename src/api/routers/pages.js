const express = require('express');
const router = express.Router();
const pagesController = require('../controllers/pages');
const { isAuthenticated, setAuthStatus } = require('../middleware/auth');

router.get('/', pagesController.renderProductsPage);
router.get('/signup', pagesController.renderSignupPage);
router.get('/login', pagesController.renderLoginPage);
router.get('/logout', pagesController.renderLogout);
router.get('/my-cart', isAuthenticated, setAuthStatus, pagesController.renderCart);

module.exports = router;