const Rating = require('../models/Rating'); 
const Ad = require('../models/Ad');

exports.addRating = async (req, res) => {
  const { serviceId, rating, userId } = req.body;

  try {
    const newRating = await Rating.create({
      serviceId,
      rating,
      userId,
    });

    const ratings = await Rating.findAll({ where: { serviceId } });
    const averageRating = ratings.reduce((acc, r) => acc + r.rating, 0) / ratings.length;

    await Ad.update({ rating: averageRating }, { where: { id: serviceId } });

    res.status(201).json(newRating);
  } catch (error) {
    console.error('Error adding rating:', error);
    res.status(500).json({ message: 'Server error', error });
  }
};

exports.getRatingByServiceId = async (req, res) => {
  const { serviceId } = req.params;

  try {
    const ratings = await Rating.findAll({ where: { serviceId } });
    const averageRating = ratings.reduce((acc, r) => acc + r.rating, 0) / ratings.length;

    res.json({ rating: averageRating });
  } catch (error) {
    console.error('Error fetching rating:', error);
    res.status(500).json({ message: 'Server error', error });
  }
};
