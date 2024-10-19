const express = require('express');
const router = express.Router();
const pagesController = require('../controllers/pages');

router.get('/', pagesController.renderProductsPage);
router.get('/signup', pagesController.renderSignupPage);
router.get('/login', pagesController.renderLoginPage);
router.get('/logout', pagesController.renderLogout);

module.exports = router;