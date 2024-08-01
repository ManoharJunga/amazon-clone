import mongoose from 'mongoose';

const categorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  description: {
    type: String,
    trim: true,
  },
  urlSlug: {
    type: String,
    unique: true, // Ensure uniqueness
    required: true, // Ensure it is not null
    trim: true,
  },
});

const Category = mongoose.model('Category', categorySchema);

export default Category;
