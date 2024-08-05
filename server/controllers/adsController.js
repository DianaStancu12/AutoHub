const Ad = require('../models/Ad'); 
const Rating = require('../models/Rating');

exports.getFilteredAds = async (req, res) => {
  const { county, locality, serviceType, sortBy, order } = req.query;

  console.log("Received query parameters:", req.query);

  const filter = {};
  if (county) filter.county = county;
  if (locality) filter.locality = locality;
  if (serviceType) filter.serviceType = serviceType;

  let sortOptions = [];
  if (sortBy) {
    const sortOrder = order === 'Z-A' || order === 'Descrescător' ? 'DESC' : 'ASC';
    sortOptions.push([sortBy === 'Alfabetic' ? 'title' : 'rating', sortOrder]);
  } else {
    sortOptions.push(['title', 'ASC'], ['rating', 'DESC']);
  }

  try {
    let ads;
    if (serviceType) {
      // Filtrare doar după tipul de serviciu, ignorând județul și localitatea
      ads = await Ad.findAll({ where: { serviceType }, order: sortOptions });
      if (county) {
        // Filtrare după tipul de serviciu și județ
        ads = ads.filter(ad => ad.county === county);
      }
    } else {
      // Filtrare după județ și localitate (dacă sunt selectate)
      ads = await Ad.findAll({ where: filter, order: sortOptions });
    }
    res.json(ads);
  } catch (error) {
    console.error('Error fetching ads:', error.message);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

exports.getAllAds = async (req, res) => {
  try {
    const ads = await Ad.findAll();
    res.json(ads);
  } catch (error) {
    console.error('Error fetching ads:', error);
    res.status(500).json({ message: 'Server error', error });
  }
};

exports.createAd = async (req, res) => {
  const { title, description, category, location, county, locality, serviceType, carType, isOnlineAppointment, is24_7, paymentMethods, workingHours } = req.body;

  try {
    const newAd = await Ad.create({
      title,
      description,
      category,
      location,
      county,
      locality,
      serviceType,
      carType,
      isOnlineAppointment,
      is24_7,
      paymentMethods,
      workingHours,
      createdAt: new Date(),
      updatedAt: new Date()
    });
    res.status(201).json(newAd);
  } catch (error) {
    console.error('Error creating ad:', error);
    res.status(500).json({ message: 'Server error', error });
  }
};

exports.getAdById = async (req, res) => {
  const { id } = req.params;

  try {
    const ad = await Ad.findByPk(id);
    if (ad) {
      res.json(ad);
    } else {
      res.status(404).json({ message: 'Ad not found' });
    }
  } catch (error) {
    console.error('Error fetching ad:', error);
    res.status(500).json({ message: 'Server error', error });
  }
};

exports.rateAd = async (req, res) => {
  const { id, rating, userId } = req.body;
  console.log(`adId: ${adId}, rating: ${rating}, userId: ${userId}`); 

  try {
    const ad = await Ad.findByPk(id);
    if (!ad) {
      return res.status(404).json({ message: 'Ad not found' });
    }

    await Rating.create({ adId, userId, rating });

    const allRatings = await Rating.findAll({ where: { adId } });
    const totalRating = allRatings.reduce((sum, r) => sum + r.rating, 0) / allRatings.length;

    ad.rating = totalRating;
    await ad.save();

    res.json(ad);
  } catch (error) {
    console.error('Error submitting rating:', error);
    res.status(500).json({ message: 'Server error', error });
  }
};

exports.getAdRating = async (req, res) => {
  const { id } = req.params;
  if (!id) {
    return res.status(400).json({ message: 'Missing id parameter' });
  }

  try {
    const ratings = await Rating.findAll({ where: { adId: id } });
    const totalRating = ratings.reduce((sum, r) => sum + r.rating, 0) / ratings.length;
    res.json({ rating: totalRating });
  } catch (error) {
    console.error('Error fetching rating:', error);
    res.status(500).json({ message: 'Server error', error });
  }
};

