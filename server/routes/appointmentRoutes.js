
const express = require('express');
const router = express.Router();
const { createAppointment, getProviderAppointments, updateAppointmentStatus } = require('../controllers/appointmentController');
const authMiddleware = require('../middleware/authMiddleware');

router.post('/', authMiddleware, createAppointment);
router.get('/provider', authMiddleware, getProviderAppointments);
router.patch('/:id', authMiddleware, updateAppointmentStatus);

module.exports = router;
