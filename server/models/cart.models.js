import mongoose from 'mongoose';

const cartSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', default: null },
    productVariantId: { type: mongoose.Schema.Types.ObjectId, ref: 'ProductVariant', default: null },
    quantity: { type: Number, required: true }
}, { timestamps: true });

const Cart = mongoose.model('Cart', cartSchema);

export default Cart;
