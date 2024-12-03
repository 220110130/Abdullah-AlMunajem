const Order = require('../models/order');
const Cart = require('../models/cart');

exports.saveOrder = async (req, res) => {

  try {

    let { _id } = req.user;

    const { address, products, totalPrice } = req.body;
    let orderObj = {};
    let items = [];

    for (let product of products) {
      let xyz = {
        productId: product.productId._id,
        vendorId: product.productId.vendor,
        quantity: product.quantity
      }
      items.push(xyz)
    }

    let orderNumber = generateOrderNumber();

    orderObj = {
      customerId: _id,
      orderNumber,
      totalPrice: parseFloat(totalPrice.split('$')[1]),
      products: items,
      address
    }

    const order = new Order(orderObj);
    await order.save();

    const deleteCartItems = await Cart.deleteMany({ customerId: _id }).exec();

    res.status(201).json({ message: 'Order created successfully', orderNumber, order });

  } catch (error) {

    console.error(error);
    res.status(500).json({ message: 'Failed to create order' });
  }

}

exports.getAllOrders = async (req, res) => {

  try {

    const { role, _id } = req.user;

    let orders;

    if (role === 'customer') {

      orders = await Order.find({ customerId: _id }).populate('products.productId', 'name price category');

    } else if (role === 'vendor') {

      orders = await Order.find({ 'products.vendorId': _id }).populate('products.productId', 'name price category');

    } else if (role === 'admin') {

      orders = await Order.find().populate('products.productId', 'name price category');

    }

    return res.status(200).json({ role: role, orders });

  } catch (error) {

    console.error(error);
    res.status(500).json({ message: 'Failed to fetch orders' });

  }

}

exports.updateOrder = async (req, res) => {

  try {

    const orderId = req.params.orderId;
    const { status } = req.body;
    const order = await Order.findByIdAndUpdate(orderId, { status: status });
    res.status(200).json({ message: 'Order cancelled successfully', order });

  } catch (error) {

    console.error(error);
    res.status(500).json({ message: 'Failed to cancel order' });

  }

}

exports.getOrdersByStatus = async (req, res) => {

  try {

    const user = req.user;

    if (user.role === 'customer') {

      const orderCounts = await Order.aggregate([
        { $match: { customerId: user._id } },
        { $group: { _id: '$status', count: { $sum: 1 } } },
      ]);

      const defaultCounts = {
        pending: 0,
        delivered: 0,
        cancelled: 0,
      };

      const counts = orderCounts.reduce((acc, cur) => {
        acc[cur._id] = cur.count;
        return acc;
      }, defaultCounts);

      res.json(counts);

    } else if (user.role === 'vendor') {

      const orderCounts = await Order.aggregate([
        { $unwind: '$products' },
        { $match: { 'products.vendorId': user._id } },
        { $group: { _id: '$status', count: { $sum: 1 } } },
      ]);

      const defaultCounts = {
        pending: 0,
        delivered: 0,
        cancelled: 0,
      };

      const counts = orderCounts.reduce((acc, cur) => {
        acc[cur._id] = cur.count;
        return acc;
      }, defaultCounts);

      res.json(counts);

    } else {

      res.status(403).json({ message: 'Forbidden' });

    }

  } catch (err) {

    res.status(500).json({ message: err.message });

  }

}



function generateOrderNumber() {
  return Math.floor(100000 + Math.random() * 900000);
}