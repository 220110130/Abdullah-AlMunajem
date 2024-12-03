const mongoose = require('mongoose');
const subSchema = require('./order-sub-model');

const orderSchema = new mongoose.Schema({

  orderNumber: {
    type: Number,
    unique: true
  },
  address: {
    type: String,
    required: true
  },
  products: [subSchema],
  customerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  totalPrice: {
    type: Number,
    required: true
  },
  status: {
    type: String,
    enum: ['pending', 'cancelled', 'delivered'],
    default: 'pending'
  }

});

const Order = mongoose.model('Order', orderSchema);

module.exports = Order;
