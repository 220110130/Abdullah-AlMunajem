exports.renderHomePage = (req, res) => {
    res.render('pages/home', { isLoggedIn: true, role: 'customer' });
  };
  
exports.renderProductsPage = (req, res) => {
    let isLoggedIn = false;
    if (req.cookies.token) {
      isLoggedIn = true;
    }
    res.render('pages/products', { isLoggedIn: isLoggedIn, role: '' });
};

exports.renderSignupPage = (req, res) => {
  res.render('pages/signup', { isLoggedIn: res.locals.isLoggedIn });
};

exports.renderLoginPage = (req, res) => {
  res.render('pages/login', { isLoggedIn: res.locals.isLoggedIn });
};

exports.renderLogout = (req, res) => {
  res.render('pages/logout', { isLoggedIn: false });
};

exports.renderCart = (req, res) => {
  res.render('pages/cart', { isLoggedIn: true, role: 'customer' });
};

exports.renderVendorDashboard = (req, res) => {
  res.render('pages/vendor-dashboard', { isLoggedIn: true, role: 'vendor' });
};

exports.renderAddProducts = (req, res) => {
  res.render('pages/add-product', { isLoggedIn: true, role: 'vendor' });
};

exports.renderUpdateProduct = (req, res) => {
  res.render('pages/update-product', { isLoggedIn: true, role: 'vendor' });
};

exports.renderAdminDasboard = (req, res) => {
  res.render('pages/admin-dashboard', { isLoggedIn: true, role: 'admin' });
};

exports.renderRequest = (req, res) => {
  res.render('pages/approval-requests', { isLoggedIn: true, role: 'admin' });
};

exports.renderCustomerList = (req, res) => {
  res.render('pages/customer-list', { isLoggedIn: true, role: 'admin' });
};

exports.renderCustomersAndVendors = (req, res) => {
  res.render('pages/customers-vendors', { isLoggedIn: true, role: req.user.role });
}

exports.renderSystemProducts = (req, res) => {
  res.render('pages/system-products', { isLoggedIn: true, role: req.user.role });
}

exports.renderProfile = (req, res) => {
  res.render('pages/profile', { isLoggedIn: true, role: req.user.role });
};

exports.renderCheckoutPage = (req, res) => {
  res.render('pages/checkout', { isLoggedIn: true, role: 'customer' });
}

exports.renderViewOrdersPage = (req, res) => {
  res.render('pages/view-orders', { isLoggedIn: true, role: req.user.role });
}