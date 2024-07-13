import mongoose from 'mongoose';

const orderItemSchema = new mongoose.Schema({
    orderId: { type: mongoose.Schema.Types.ObjectId, ref: 'Order', required: true },
    productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
    productVariantId: { type: mongoose.Schema.Types.ObjectId, ref: 'ProductVariant', required: true },
    productName: { type: String, required: true },
    color: { type: String, default: null },
    size: { type: String, default: null },
    price: { type: Number, required: true },
    quantity: { type: Number, required: true },
    totalAmount: { type: Number, required: true }
}, { timestamps: true });

const OrderItem = mongoose.model('OrderItem', orderItemSchema);

export default OrderItem;
