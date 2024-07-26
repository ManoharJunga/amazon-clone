import mongoose from 'mongoose';

const dashboardSchema = new mongoose.Schema({
  user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  total_revenue: Number,
  total_orders: Number,
  total_customers: Number,
  new_customers: Number,
  pending_orders: Number,
  created_at: { type: Date, default: Date.now }
});

const Dashboard = mongoose.model('Dashboard', dashboardSchema);

export default Dashboard;
