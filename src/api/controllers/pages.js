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