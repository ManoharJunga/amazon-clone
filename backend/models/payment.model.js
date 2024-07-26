import mongoose from 'mongoose';

const paymentSchema = new mongoose.Schema({
  order_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Order' }, // Reference to the order
  amount: { type: Number, required: true },
  payment_method: { type: String, enum: ['Credit Card', 'PayPal', 'Bank Transfer'], required: true },
  payment_status: { type: String, enum: ['Completed', 'Pending', 'Failed'], default: 'Pending' },
  payment_date: { type: Date, default: Date.now }
}, {
  timestamps: true
});

const Payment = mongoose.model('Payment', paymentSchema);

export default Payment;
