
const express = require('express');
const authMiddleware = require('../middleware/authMiddleware');
const {
  createProduct,
  getProducts,
  updateProduct,
  deleteProduct,
  addToWishlist,
  removeFromWishlist,
  getWishlist
} = require('../controllers/userController');

const router = express.Router();

router.post('/products', authMiddleware(['user']), createProduct);
router.get('/products', authMiddleware(['user']), getProducts);
router.put('/products/:id', authMiddleware(['user']), updateProduct);
router.delete('/products/:id', authMiddleware(['user']), deleteProduct);

router.post('/wishlist', authMiddleware(['user']), addToWishlist);
router.get('/wishlist', authMiddleware(['user']), getWishlist);
router.delete('/wishlist/:productId', authMiddleware(['user']), removeFromWishlist);

module.exports = router;
