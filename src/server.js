const express = require('express');
const moment = require('moment');
const sequelize = require('../models/database');
const User = require('../models/User');
const Appointment = require('../models/Appointment');
const app = express();

app.use(express.json());
const cors = require('cors');

// Add CORS middleware
//app.use(cors({
  //  origin: 'http://localhost:3001', // Allow frontend origin
    //methods: 'GET,POST,PUT,DELETE', // Allow HTTP methods
    //credentials: true
//}));
app.use(cors({
    origin: 'http://localhost:3001', // Allow frontend origin
    methods: 'GET,POST,PUT,DELETE',
    credentials: true
}));

// Generate potential slots for a given date range
function generatePotentialSlots(startDate, endDate) {
    let slots = [];
    let current = moment(startDate).startOf('day');
    const end = moment(endDate).endOf('day');

    while (current.isBefore(end)) {
        slots.push({
            start: current.format('YYYY-MM-DDTHH:mm:ss'),
            end: current.add(1, 'hour').format('YYYY-MM-DDTHH:mm:ss')
        });
        current.add(1, 'hour'); // Move to the next hour
    }

    return slots;
}

// Filter available slots by removing slots that overlap with existing appointments
function filterAvailableSlots(slots, appointments) {
    return slots.filter(slot => {
        return !appointments.some(appointment => {
            return (
                moment(slot.start).isBefore(appointment.end) &&
                moment(slot.end).isAfter(appointment.start)
            );
        });
    });
}

sequelize.sync({ force: true }).then(() => {
    console.log('Database synchronized');
    app.listen(3000, () => console.log('Server running on port 3000'));
});

// API Endpoints
app.get('/api/bookings', async (req, res) => {
    console.log("adi i really want eruope with you");
    console.log("ADI PLEASE")
    const bookings = await Appointment.findAll({ include: User });
    res.json(bookings);
});

app.post('/api/book', async (req, res) => {
    const { patientInfo, reason, start, end } = req.body;

    // Check for conflicts
    const conflict = await Appointment.findOne({
        where: {
            start: { [sequelize.Op.lt]: end },
            end: { [sequelize.Op.gt]: start }
        }
    });

    if (conflict) {
        return res.status(400).json({ message: 'Slot not available' });
    }

    let user = await User.findOne({ where: { email: patientInfo.email } });
    if (!user) {
        user = await User.create(patientInfo);
    }

    await Appointment.create({
        userId: user.id,
        reason,
        start,
        end
    });

    res.status(200).json({ message: 'Booking successful' });
});

// Endpoint to get available slots
app.get('/api/availableSlots', async (req, res) => {
    const { startDate, endDate } = req.query;
    console.log("Received request for available slots");
    // Fetch all appointments
    const appointments = await Appointment.findAll();

    // Generate potential slots
    const potentialSlots = generatePotentialSlots(startDate, endDate);

    // Filter out slots that overlap with existing appointments
    const availableSlots = filterAvailableSlots(potentialSlots, appointments);
    console.log(availableSlots);
    res.json(availableSlots);
});