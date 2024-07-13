import mongoose from 'mongoose';

const orderShippingAddressSchema = new mongoose.Schema({
    orderId: { type: mongoose.Schema.Types.ObjectId, ref: 'Order', required: true },
    shippingAddressId: { type: mongoose.Schema.Types.ObjectId, ref: 'ShippingAddress', required: true },
    fullAddress: { type: String, required: true },
    state: { type: String, required: true },
    city: { type: String, required: true },
    zipCode: { type: String, required: true }
}, { timestamps: true });

const OrderShippingAddress = mongoose.model('OrderShippingAddress', orderShippingAddressSchema);

export default OrderShippingAddress;
