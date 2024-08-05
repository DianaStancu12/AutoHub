const express = require('express');
const router = express.Router();
const adController = require('../controllers/adController');
const adminMiddleware = require('../middleware/adminMiddleware');

router.get('/search', adController.searchAds);
router.put('/accept/:id', adminMiddleware, adController.acceptAd);
router.delete('/delete/:id', adminMiddleware, adController.deleteAd);

module.exports = router;
