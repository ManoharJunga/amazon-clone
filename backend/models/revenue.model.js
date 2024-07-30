import mongoose from 'mongoose';

const revenueSchema = new mongoose.Schema({
  payment_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Payment' },
  total_revenue: { type: Number, required: true },
  period_start: { type: Date, required: true },
  period_end: { type: Date, required: true },
  status: { type: String, enum: ['Calculated', 'Pending', 'Error'], default: 'Pending' },
  notes: { type: String }
}, {
  timestamps: true
});

const Revenue = mongoose.model('Revenue', revenueSchema);

export default Revenue;
