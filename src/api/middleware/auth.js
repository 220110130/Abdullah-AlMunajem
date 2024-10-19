const jwt = require('jsonwebtoken');
const User = require('../models/user');

exports.isAuthenticated = async (req, res, next) => {
  try {
    const token = req.headers.cookie.split('=')[1]
    if (!token) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.userId);
    if (!user) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    req.user = user;
    next();
  } catch (err) {
    console.error(err);
    res.status(401).json({ error: 'Unauthorized' });
  }
};

exports.isVendor = (req, res, next) => {
  if (req.user.role !== 'vendor') {
    return res.status(403).json({ error: 'Forbidden' });
  }
  next();
};

exports.setAuthStatus = async (req, res, next) => {
  try {

    const token = req.headers.cookie.split('=')[1]
    if (token) {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      const user = await User.findById(decoded.userId);
      if (user) {
        req.user = user;
        res.locals.isLoggedIn = true;
      }
    }
    next();
  } catch (err) {
    console.error(err);
    next();
  }
};