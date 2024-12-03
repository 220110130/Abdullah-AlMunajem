const express = require('express');
const router = express.Router();
const userController = require('../controllers/user');
const { isAuthenticated } = require(`../middleware/auth`)

router.post('/signup', userController.signup);
router.post('/login', userController.login);
router.get('/profile', isAuthenticated, userController.profile);
router.patch('/profile', isAuthenticated, userController.updateProfile);
router.get('/count', isAuthenticated, userController.countUsersByRole);
router.get('/get-inactive-vendors', isAuthenticated, userController.getInactiveVendors);
router.patch('/active-account/:userId', isAuthenticated, userController.updateAccountStatus);
router.get('/get-vendors', isAuthenticated, userController.getAllVendors);
router.get('/get-customers', isAuthenticated, userController.getAllCustomers);
router.patch('/update-vendors-status/:vendorId', isAuthenticated, userController.updateVendorStatus);
router.patch('/update-customers-status/:customerId', isAuthenticated, userController.updateCustomerStatus);

module.exports = router;