import mongoose from 'mongoose';

const productVariantSchema = new mongoose.Schema({
    productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
    color: { type: String, default: null },
    size: { type: String, default: null },
    price: { type: Number, required: true },
    stockQuantity: { type: Number, required: true }
}, { timestamps: true });

const ProductVariant = mongoose.model('ProductVariant', productVariantSchema);

export default ProductVariant;
