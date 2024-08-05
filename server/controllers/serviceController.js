const Service = require('../models/Service');

const getServices = async (req, res) => {
  try {
    const services = await Service.findAll();
    res.json(services);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching services' });
  }
};

const createService = async (req, res) => {
  const { name, description, rating, price } = req.body;
  try {
    const service = await Service.create({ name, description, rating, price });
    res.status(201).json(service);
  } catch (error) {
    res.status(500).json({ error: 'Error creating service' });
  }
};

module.exports = { getServices, createService };
