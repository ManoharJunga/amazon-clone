import mongoose from 'mongoose';

const customerSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  phoneNumber: { type: String, required: true },
  status: { type: String, required: true }
}, {timestamps: true});

const Customer = mongoose.model('Customer', customerSchema);

export default Customer;
