const express = require('express');
const router = express.Router();
const pagesController = require('../controllers/pages');

router.get('/', pagesController.renderProductsPage);

module.exports = router;