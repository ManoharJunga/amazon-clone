import mongoose from 'mongoose';

const offerSchema = new mongoose.Schema({
    couponCode: { type: String, required: true, unique: true },
    discountType: { type: String, enum: ['fixed', 'rate'], required: true },
    discountValue: { type: Number, required: true },
    startDate: { type: Date, required: true },
    endDate: { type: Date, required: true },
    description: { type: String, required: true },
    status: { type: String, enum: ['active', 'inactive'], required: true }
}, { timestamps: true });

const Offer = mongoose.model('Offer', offerSchema);

export default Offer;
