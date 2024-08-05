const express = require('express');
const { addRating, getRatingByServiceId } = require('../controllers/ratingController');
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();

router.post('/', addRating); 
router.get('/:serviceId', getRatingByServiceId);

module.exports = router;
