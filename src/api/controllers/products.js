const Product = require('../models/product');

exports.getAllProducts = async (req, res) => {
  try {
    const products = await Product.find().exec();

    res.status(200).json(products);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
};

exports.addProduct = async (req, res) => {
  const { name, description, price, imageUrl, category } = req.body;
  const vendor = req.user._id;

  try {
    const product = new Product({
      name,
      description,
      price,
      category,
      imageUrl,
      vendor
    });
    await product.save();
    res.status(201).json(product);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
};

exports.getProductById = async (req, res) => {
  const { productId } = req.params;
  try {
    const product = await Product.findById(productId).populate('vendor', 'name');
    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }
    res.status(200).json(product);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
};

exports.updateProductById = async (req, res) => {
  const { productId } = req.params;
  try {
    const product = await Product.findOneAndUpdate({ _id: productId }, { ...req.body });

    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }
    res.status(200).json(product);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }

};

exports.deleteProductById = async (req, res) => {
  try {
    const { productId } = req.params;
    const result = await Product.findOneAndDelete({ _id: productId });
    res.status(200).json({ success: true, message: 'Product removed' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
};

exports.getVendorProducts = async (req, res) => {
  try {

    const products = await Product.find({ vendor: req.user._id });
    res.status(200).json(products);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
};
