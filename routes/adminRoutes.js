
const express = require('express');
const authMiddleware = require('../middleware/authMiddleware');
const {
  getUsers,
  deleteUser,
  getAllProducts,
  deleteProduct,
  createCategory,
  updateCategory,
  deleteCategory,
  getCategories
} = require('../controllers/adminController');

const router = express.Router();

router.get('/users', authMiddleware(['admin']), getUsers);
router.delete('/users/:id', authMiddleware(['admin']), deleteUser);

router.get('/products', authMiddleware(['admin']), getAllProducts);
router.delete('/products/:id', authMiddleware(['admin']), deleteProduct);

router.post('/categories', authMiddleware(['admin']), createCategory);
router.put('/categories/:id', authMiddleware(['admin']), updateCategory);
router.delete('/categories/:id', authMiddleware(['admin']), deleteCategory);
router.get('/categories', authMiddleware(['admin']), getCategories);

module.exports = router;
