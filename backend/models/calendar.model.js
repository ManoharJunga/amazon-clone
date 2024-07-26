import mongoose from 'mongoose';

const { Schema } = mongoose;

const calendarSchema = new Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  date: { type: String, required: true },
  time: { type: String, required: true },
  participants: { type: String, required: true },
  location: { type: String, required: true }
});

const Calendar = mongoose.model('Calendar', calendarSchema);

export default Calendar;
