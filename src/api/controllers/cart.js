const Cart = require('../models/cart');

exports.addToCart = async (req, res) => {
  try {
    const { productId } = req.body;
    const customerId = req.user._id;

    let cartItem = await Cart.findOne({ customerId, productId });

    if (cartItem) {
      cartItem.quantity += 1;
    } else {
      cartItem = new Cart({ customerId, productId });
    }

    await cartItem.save();

    res.status(201).json({ success: true, message: 'Item added to cart successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
};


exports.removeFromCart = async (req, res) => {
  try {
    const { cartId } = req.params;
    const result = await Cart.findOneAndDelete({ _id: cartId });
    res.status(200).json({ success: true, message: 'Item removed from cart successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
};

exports.updateQuantity = async (req, res) => {
  try {

    const [{ cartId }, { quantity }] = [req.params, req.body];
    const result = await Cart.findOneAndUpdate({ _id: cartId }, { quantity });
    res.status(200).json({ success: true, message: 'Cart item quantity updated successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
};

exports.getCartItems = async (req, res) => {
  try {
    const customerId = req.user._id;

    const cartItems = await Cart.find({ customerId })
      .populate({
        path: 'productId',
        populate: {
          path: 'vendor',
          match: { accountStatus: 'ACTIVE' } // Filter vendors by accountStatus
        }
      })
      .exec();

    // Filter out cart items with no associated product or vendors with inactive status
    const filteredCartItems = cartItems.filter(item => item.productId && item.productId.vendor);

    res.status(200).json({ success: true, cartItems: filteredCartItems });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
};
