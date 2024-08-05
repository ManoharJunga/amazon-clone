import mongoose from 'mongoose';

const orderSchema = new mongoose.Schema({
  orderNumber: { 
    type: String, 
    unique: true, 
    index: true  // Index for faster queries
  },
  customer_id: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User',
    required: true  // Ensure customer is always associated
  },
  products: [{
    product_id: { 
      type: mongoose.Schema.Types.ObjectId, 
      ref: 'Product', 
      required: true 
    },
    quantity: { 
      type: Number, 
      required: true, 
      min: 1 // Ensure quantity is positive
    }
  }],
  date: { 
    type: Date, 
    default: Date.now 
  },
  status: { 
    type: String, 
    enum: ['Pending', 'Shipped', 'Delivered'], 
    default: 'Pending' 
  },
  total_amount: { 
    type: Number, 
    required: true, 
    min: 0 // Ensure total amount is non-negative
  },
  shipping_address: {
    type: String,
    required: true // Ensure shipping address is provided
  }
}, {
  timestamps: true // Automatically add createdAt and updatedAt
});

const Order = mongoose.model('Order', orderSchema);

export default Order;
