import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  category: { type: String, required: true },
  stock: { type: Number, required: true },
  imagePath: { type: String } // Optional: path to the uploaded image
}, {
  timestamps: true
});

export default mongoose.model('Product', productSchema);
