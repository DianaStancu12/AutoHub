const jwt = require('jsonwebtoken');
const User = require('../models/User');
const Appointment = require('../models/Appointment');
const admin = require('../config/firebaseAdmin');

const loginUser = async (req, res) => {
  const { email, password, role } = req.body;
  try {
    const user = await User.findByCredentials(email, password);
    const token = await user.generateAuthToken();
    
    res.send({ user, token });
  } catch (error) {
    res.status(400).send({ error: 'Login failed' });
  }
};

const registerUser = async (req, res) => {
  const user = new User(req.body);
  try {
    await user.save();
    const token = await user.generateAuthToken();
    res.status(201).send({ user, token });
  } catch (error) {
    res.status(400).send(error);
  }
};

const validateToken = async (req, res) => {
  const token = req.header('Authorization').replace('Bearer ', '');
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findOne({ _id: decoded._id, 'tokens.token': token });
    if (!user) {
      throw new Error();
    }
    res.send({ valid: true });
  } catch (e) {
    res.status(401).send({ error: 'Invalid token' });
  }
};

const getUserProfile = async (req, res) => {
  try {
    console.log('Fetching user profile for user ID:', req.user.uid);

    
    const userRecord = await admin.auth().getUser(req.user.uid);
    const user = {
      email: userRecord.email,
      username: userRecord.username || '', 
      role: 'client', 
    };

    
    const appointments = await Appointment.findAll({ where: { clientId: req.user.uid } });
    console.log('Appointments fetched:', appointments);

    res.status(200).json({
      user,
      appointments,
    });
  } catch (error) {
    console.error('Error fetching user profile:', error);
    res.status(500).json({ error: 'Failed to fetch user profile' });
  }
};

module.exports = { loginUser, registerUser, validateToken, getUserProfile };
