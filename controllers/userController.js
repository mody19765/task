
const Product = require('../models/productModel');

exports.createProduct = async (req, res) => {
  const { name, description, price } = req.body;
  try {
    const product = new Product({ name, description, price, userId: req.user._id });
    await product.save();
    res.status(201).json(product);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};

exports.getProducts = async (req, res) => {
  try {
    const products = await Product.find({ userId: req.user._id });
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};

exports.updateProduct = async (req, res) => {
  const { id } = req.params;
  const { name, description, price } = req.body;
  try {
    const product = await Product.findOneAndUpdate(
      { _id: id, userId: req.user._id },
      { name, description, price },
      { new: true }
    );
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    res.json(product);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};

exports.deleteProduct = async (req, res) => {
  const { id } = req.params;
  try {
    const product = await Product.findOneAndDelete({ _id: id, userId: req.user._id });
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    res.json({ message: 'Product deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};

exports.addToWishlist = async (req, res) => {
  const { productId } = req.body;
  try {
    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    req.user.wishlist.push(productId);
    await req.user.save();
    res.json({ message: 'Product added to wishlist' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};

exports.removeFromWishlist = async (req, res) => {
  const { productId } = req.params;
  try {
    req.user.wishlist = req.user.wishlist.filter((id) => id.toString() !== productId);
    await req.user.save();
    res.json({ message: 'Product removed from wishlist' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};

exports.getWishlist = async (req, res) => {
  try {
    const user = await req.user.populate('wishlist').execPopulate();
    res.json(user.wishlist);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};
