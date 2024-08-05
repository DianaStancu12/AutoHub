const Appointment = require('../models/Appointment');

const createAppointment = async (req, res) => {
  const { date, time, services, provider } = req.body;
  const clientId = req.user.uid;

  console.log("Creating appointment with:", {
    appointmentDate: date,
    appointmentTime: time,
    services: services,
    clientId: clientId,
    provider: provider,
  });

  try {
    const appointment = await Appointment.create({
      appointmentDate: date,
      appointmentTime: time,
      services: services,
      clientId: clientId,
      provider: provider,
    });
    res.status(201).json(appointment);
  } catch (error) {
    console.error("Error creating appointment:", error);
    res.status(500).json({ error: 'Failed to create appointment', details: error.message });
  }
};



const getProviderAppointments = async (req, res) => {
const provider = req.user.email; 
console.log("Provider email: ", provider); 
try {
    const appointments = await Appointment.findAll({ where: { provider } });
    if (!appointments.length) {
    return res.status(404).json({ error: 'No appointments found' });
    }
    res.status(200).json(appointments);
} catch (error) {
    res.status(500).json({ error: 'Failed to fetch appointments' });
}
};

const updateAppointmentStatus = async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;
  try {
    const appointment = await Appointment.findByPk(id);
    if (!appointment) {
      return res.status(404).json({ error: 'Appointment not found' });
    }
    appointment.status = status;
    await appointment.save();
    res.status(200).json(appointment);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update appointment status' });
  }
};

module.exports = { createAppointment, getProviderAppointments, updateAppointmentStatus };
