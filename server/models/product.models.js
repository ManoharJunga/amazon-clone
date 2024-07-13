import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
    productName: { type: String, required: true },
    urlSlug: { type: String, required: true, unique: true },
    categoryId: { type: mongoose.Schema.Types.ObjectId, ref: 'Category', required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    stockQuantity: { type: Number, required: true },
    status: { type: String, enum: ['active', 'inactive'], required: true }
}, { timestamps: true });

const Product = mongoose.model('Product', productSchema);

export default Product;
