import mongoose from 'mongoose';

const orderSchema = new mongoose.Schema({
    orderNumber: { type: String, required: true, unique: true },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    totalAmount: { type: Number, required: true },
    discountAmount: { type: Number, required: true },
    grossAmount: { type: Number, required: true },
    shippingAmount: { type: Number, required: true },
    netAmount: { type: Number, required: true },
    status: { type: String, enum: ['placed', 'processing', 'shipping', 'delivered'], required: true },
    paymentStatus: { type: String, enum: ['paid', 'not paid'], required: true },
    paymentType: { type: String, enum: ['netbanking', 'upi', 'cod'], required: true },
    paymentTransactionId: { type: String, required: true }
}, { timestamps: true });

const Order = mongoose.model('Order', orderSchema);

export default Order;
