import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  category: { type: String, required: true },
  stock: { type: Number, required: true },
  imagePaths: [{ type: String }] // Array to store multiple image paths
}, {
  timestamps: true
});

export default mongoose.model('Product', productSchema);
