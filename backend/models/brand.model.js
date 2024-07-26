import mongoose from 'mongoose';

const brandSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: String,
  logo_url: String,
  created_at: { type: Date, default: Date.now }
});

const Brand = mongoose.model('Brand', brandSchema);

export default Brand;
