import mongoose from 'mongoose';

const categorySchema = new mongoose.Schema({
    categoryName: { type: String, required: true },
    urlSlug: { type: String, required: true, unique: true },
    parentCatId: { type: mongoose.Schema.Types.ObjectId, ref: 'Category', default: null },
    status: { type: String, enum: ['active', 'inactive'], required: true }
}, { timestamps: true });

const Category = mongoose.model('Category', categorySchema);

export default Category;
