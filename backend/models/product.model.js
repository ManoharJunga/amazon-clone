import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: String,
  price: { type: Number, required: true },
  category: String,
  stock: { type: Number, required: true },
  seller: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  urlSlug: { type: String, unique: true },
  imagePath: String // Added imagePath field
}, {
  timestamps: true
});

const Product = mongoose.model('Product', productSchema);

export default Product;