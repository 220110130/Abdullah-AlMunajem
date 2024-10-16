exports.renderHomePage = (req, res) => {
    res.render('pages/home', { isLoggedIn: true, role: 'customer' });
  };
  
exports.renderProductsPage = (req, res) => {
    let isLoggedIn = false;
    res.render('pages/products', { isLoggedIn: isLoggedIn, role: '' });
};