import mongoose from 'mongoose';

const orderSchema = new mongoose.Schema({
  orderNumber: { type: String, unique: true },
  customer_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  products: [{
    product_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
    quantity: { type: Number, required: true }
  }],
  date: { type: Date, default: Date.now },
  status: { type: String, enum: ['Pending', 'Shipped', 'Delivered'], default: 'Pending' },
  total_amount: { type: Number, required: true },
  shipping_address: String
}, {
  timestamps: true
});

const Order = mongoose.model('Order', orderSchema);

export default Order;
