const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('../models/user');

exports.signup = async (req, res) => {

  try {

    const { name, email, password, role, brandName, storeDescription, profilePic } = req.body;

    // Basic input validation
    if (!name || !email || !password || !role) {
      return res.status(400).json({ error: 'All fields are required' });
    }

    // Validate email format
    const emailRegex = /^\S+@\S+\.\S+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ error: 'Invalid email format' });
    }

    // Validate password length
    if (password.length < 8) {
      return res.status(400).json({ error: 'Password must be at least 8 characters long' });
    }

    if (role === 'vendor' && (!brandName || !storeDescription)) {
      return res.status(400).json({ error: 'Store name and description are required for vendors' });
    }


    let accountStatus = 'ACTIVE';
    if (role === 'vendor') {
      accountStatus = 'INACTIVE'
    }
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    const user = new User({
      name,
      email,
      profilePic,
      password: hashedPassword,
      role,
      accountStatus,
      brandName: role === 'vendor' ? brandName : undefined,
      storeDescription: role === 'vendor' ? storeDescription : undefined
    });
    await user.save();
    res.redirect('/login');
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
};

exports.login = async (req, res) => {

  try {

    const { email, password } = req.body;

    // Basic input validation
    if (!email || !password) {
      return res.status(400).json({ error: 'Email and password are required' });
    }

    const emailRegex = /^\S+@\S+\.\S+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ error: 'Invalid email format' });
    }

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({ error: 'Invalid email or password' });
    }

    if (user.accountStatus === 'INACTIVE') {
      return res.status(400).json({ error: 'account is not activated' });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(400).json({ error: 'Invalid email or password' });
    }

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: '1d'
    });

    // Save the token to the database
    user.token = token;
    await user.save();

    res.status(200).json({ token: token, role: user.role });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
};

exports.profile = async (req, res) => {

  try {

    res.status(200).json({ user: req.user });

  } catch (err) {

    console.error(err);
    res.status(500).json({ error: 'Server error' });

  }

}

exports.updateProfile = async (req, res) => {
  try {

    const { name, email, password, profilePic } = req.body;

    const user = await User.findById(req.user._id);

    user.name = name || user.name;
    user.email = email || user.email;
    user.profilePic = profilePic || user.profilePic;

    if (password) {
      const saltRounds = 10;
      const hashedPassword = await bcrypt.hash(password, saltRounds);
      user.password = await hashedPassword(password, saltRounds);
    }

    const updatedUser = await user.save();

    res.json(updatedUser);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal server error' });
  }
}

exports.countUsersByRole = async (req, res) => {
  try {
    // Count customers
    const customerCount = await User.countDocuments({ role: 'customer' });

    // Count vendors
    const vendorCount = await User.countDocuments({ role: 'vendor' });

    res.status(200).json({ success: true, customerCount, vendorCount });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
};

exports.getInactiveVendors = async (req, res) => {
  try {
    const inactiveVendors = await User.find({ role: 'vendor', accountStatus: { $ne: 'ACTIVE' } }, { name: 1, email: 1 });

    res.status(200).json({ success: true, inactiveVendors });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
};

exports.updateAccountStatus = async (req, res) => {
  try {
    const { userId } = req.params;

    // Find the user by userId and update the account status to "ACTIVE"
    const updatedUser = await User.findByIdAndUpdate(userId, { accountStatus: 'ACTIVE' }, { new: true });

    if (!updatedUser) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }

    res.status(200).json({ success: true, updatedUser });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
};

exports.getAllVendors = async (req, res) => {
  try {
    const vendors = await User.find({ role: 'vendor' });
    res.json(vendors);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getAllCustomers = async (req, res) => {
  try {
    const vendors = await User.find({ role: 'customer' });
    res.json(vendors);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Update vendor status
exports.updateVendorStatus = async (req, res) => {

  try {
    const { accountStatus } = req.body;
    const vendor = await User.findOneAndUpdate({ _id: req.params.vendorId }, { accountStatus });
    if (!vendor) {
      return res.status(404).json({ message: 'Vendor not found' });
    }
    res.json(vendor);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Update customer status
exports.updateCustomerStatus = async (req, res) => {

  try {
    const { accountStatus } = req.body;
    const customer = await User.findOneAndUpdate({ _id: req.params.customerId }, { accountStatus });
    if (!customer) {
      return res.status(404).json({ message: 'customer not found' });
    }
    res.json(customer);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};