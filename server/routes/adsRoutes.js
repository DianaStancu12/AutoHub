const express = require('express');
const router = express.Router();
const { getFilteredAds, getAllAds, createAd, getAdById, rateAd, getAdRating } = require('../controllers/adsController');

router.get('/filtered', getFilteredAds); 
router.get('/all', getAllAds); 
router.post('/create', createAd); 
router.get('/:id', getAdById); 
router.post('/rate', rateAd);
router.get('/rating/:adId', getAdRating);

module.exports = router;
