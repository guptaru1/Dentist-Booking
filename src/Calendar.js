import React, { useState, useEffect } from 'react';
import { Box, Typography, Button, Modal, TextField, MenuItem, Select, FormControl, InputLabel } from '@mui/material';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';

function Calendar() {
  const [events, setEvents] = useState([]);
  const [availableSlots, setAvailableSlots] = useState([]);
  const [open, setOpen] = useState(false);
  const [patientInfo, setPatientInfo] = useState({ name: '', email: '', phoneNumber: '', medicalAid: '' });
  const [reason, setReason] = useState('');
  const [selectedSlot, setSelectedSlot] = useState('');
  const mockAvailableSlots = [
    { start: '2024-07-01T10:00:00', end: '2024-07-01T11:00:00' },
    { start: '2024-07-01T11:00:00', end: '2024-07-01T12:00:00' },
    { start: '2024-07-02T14:00:00', end: '2024-07-02T15:00:00' },
    // Add more slots as needed
];
  useEffect(() => {
    fetch('/api/bookings')
      .then((response) => response.json())
      .then((data) => setEvents(data));

     // fetch('api/availableSlots?startDate=2024-07-01&endDate=2024-07-07')
      //.then((response) => response.json())
      //.then((data) => setAvailableSlots(data));

      setAvailableSlots(mockAvailableSlots);
  }, []);

  const handleBookAppointment = () => {
    const slot = availableSlots.find(s => s.start === selectedSlot);

    if (!slot) {
      alert('Invalid slot selected');
      return;
    }

    fetch('/api/book', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        patientInfo,
        reason,
        start: slot.start,
        end: slot.end,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.message === 'Booking successful') {
          setEvents([...events, { start: slot.start, end: slot.end, title: patientInfo.name }]);
          setOpen(false);
        } else {
          alert('Booking failed');
        }
      });
  };

  return (
    <Box p={3}>
      <Typography variant="h4">Calendar Bookings</Typography>
      <FullCalendar
        plugins={[dayGridPlugin]}
        initialView="dayGridMonth"
        events={events}
      />
      <Button variant="contained" color="primary" onClick={() => setOpen(true)}>
        Book Appointment
      </Button>
      <Modal open={open} onClose={() => setOpen(false)}>
        <Box p={3} bgcolor="white" borderRadius={5}>
          <Typography variant="h6">Book Appointment</Typography>
          <TextField
            label="Name"
            value={patientInfo.name}
            onChange={(e) => setPatientInfo({ ...patientInfo, name: e.target.value })}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Email"
            value={patientInfo.email}
            onChange={(e) => setPatientInfo({ ...patientInfo, email: e.target.value })}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Phone Number"
            value={patientInfo.phoneNumber}
            onChange={(e) => setPatientInfo({ ...patientInfo, phoneNumber: e.target.value })}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Medical Aid"
            value={patientInfo.medicalAid}
            onChange={(e) => setPatientInfo({ ...patientInfo, medicalAid: e.target.value })}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Reason"
            value={reason}
            onChange={(e) => setReason(e.target.value)}
            fullWidth
            margin="normal"
          />
          <FormControl fullWidth margin="normal">
            <InputLabel id="select-slot-label">Select Slot</InputLabel>
            <Select
              labelId="select-slot-label"
              value={selectedSlot}
              onChange={(e) => setSelectedSlot(e.target.value)}
            >
              {availableSlots.map((slot) => (
                <MenuItem key={slot.start} value={slot.start}>
                  {`${new Date(slot.start).toLocaleString()} - ${new Date(slot.end).toLocaleString()}`}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <Button variant="contained" color="primary" onClick={handleBookAppointment}>
            Book Appointment
          </Button>
        </Box>
      </Modal>
    </Box>
  );
}

export default Calendar;