
const jwt = require('jsonwebtoken');
const User = require('../models/userModel');
const authMiddleware = (roles = []) => {
  
  return async (req, res, next) => {
    const token = req.header('Authorization')?.replace('Bearer ', '');
    if (!token) {
      return res.status(401).json({ message: 'Unauthorized' });
    }

    try {
      const decoded = jwt.verify(token, "test");
      const user = await User.findById(decoded.id);
      if (!user || (roles.length && !roles.includes(user.role))) {
        return res.status(403).json({ message: 'Forbidden' });
      }
      req.user = user;
      next();
    } catch (error) {
      res.status(401).json({ message: 'Unauthorized' });
    }
  };
};

  module.exports = authMiddleware;
