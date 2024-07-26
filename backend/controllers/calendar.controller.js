import Calendar from '../models/calendar.model.js';

// Get all calendar events
export const getCalendarEvents = async (req, res) => {
  try {
    const events = await Calendar.find();
    res.json(events);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get a specific calendar event
export const getCalendarEvent = async (req, res) => {
  try {
    const event = await Calendar.findById(req.params.id);
    if (!event) return res.status(404).json({ message: 'Event not found' });
    res.json(event);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Create a new calendar event
export const createCalendarEvent = async (req, res) => {
  const event = new Calendar(req.body);
  try {
    const newEvent = await event.save();
    res.status(201).json(newEvent);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Update a calendar event
export const updateCalendarEvent = async (req, res) => {
  try {
    const event = await Calendar.findById(req.params.id);
    if (!event) return res.status(404).json({ message: 'Event not found' });

    event.title = req.body.title || event.title;
    event.date = req.body.date || event.date;
    event.description = req.body.description || event.description;

    const updatedEvent = await event.save();
    res.json(updatedEvent);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Delete a calendar event
export const deleteCalendarEvent = async (req, res) => {
  try {
    const event = await Calendar.findById(req.params.id);
    if (!event) return res.status(404).json({ message: 'Event not found' });

    await event.remove();
    res.json({ message: 'Event deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
