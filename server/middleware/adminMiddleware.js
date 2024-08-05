const User = require('../models/User');

const adminMiddleware = async (req, res, next) => {
  try {
    const userId = req.userId; 
    const user = await User.findByPk(userId);
    if (user && user.role === 'admin') {
      next();
    } else {
      res.status(403).json({ error: 'Forbidden' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Something went wrong' });
  }
};

module.exports = adminMiddleware;
