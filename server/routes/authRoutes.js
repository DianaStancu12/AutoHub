const express = require('express');
const { loginUser, registerUser, validateToken, getUserProfile } = require('../controllers/authController');
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();

router.post('/login', loginUser);
router.post('/register', registerUser);
router.get('/validate-token', validateToken);
router.get('/profile', authMiddleware, getUserProfile);

module.exports = router;
