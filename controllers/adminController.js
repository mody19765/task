const User = require('../models/userModel');
const Product = require('../models/productModel');
const Category = require('../models/categoryModel');

exports.getUsers = async (req, res) => {
  try {
    const users = await User.find({});
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};

exports.deleteUser = async (req, res) => {
  const { id } = req.params;
  try {
    const user = await User.findByIdAndDelete(id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json({ message: 'User deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};

exports.getAllProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};

exports.deleteProduct = async (req, res) => {
  const { id } = req.params;
  try {
    const product = await Product.findByIdAndDelete(id);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    res.json({ message: 'Product deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};

exports.createCategory = async (req, res) => {
  const { name, type, parent } = req.body;
  try {
    const category = new Category({ name, type, parent });
    await category.save();
    res.status(201).json(category);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};
exports.updateCategory = async (req, res) => {
  const { id } = req.params;
  const { name, type, parent } = req.body;
  try {
    const category = await Category.findByIdAndUpdate(
      id,
      { name, type, parent },
      { new: true }
    );
    if (!category) {
      return res.status(404).json({ message: 'Category not found' });
    }
    res.json(category);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};

exports.deleteCategory = async (req, res) => {
  const { id } = req.params;
  try {
    const category = await Category.findByIdAndDelete(id);
    if (!category) {
      return res.status(404).json({ message: 'Category not found' });
    }
    res.json({ message: 'Category deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};

exports.getCategories = async (req, res) => {
  try {
    const categories = await Category.find().populate('parent');
    res.json(categories);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};
