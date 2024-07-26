import mongoose from 'mongoose';

const orderItemSchema = new mongoose.Schema({
  order_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Order' },
  product_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
  quantity: Number,
  price: Number
});

const OrderItem = mongoose.model('OrderItem', orderItemSchema);

export default OrderItem;
