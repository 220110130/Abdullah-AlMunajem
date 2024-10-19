const mongoose = require(`mongoose`);

const CartSchema = new mongoose.Schema({
  customerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  productId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product'
  },
  quantity: {
    type: Number,
    default: 1
  },
});

// Create the Cart model
const Cart = mongoose.model('Cart', CartSchema);

module.exports = Cart