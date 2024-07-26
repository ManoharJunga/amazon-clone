import OrderItem from '../models/orderItem.model.js';

// Get all order items
export const getOrderItems = async (req, res) => {
  try {
    const items = await OrderItem.find();
    res.json(items);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get a specific order item
export const getOrderItem = async (req, res) => {
  try {
    const item = await OrderItem.findById(req.params.id);
    if (!item) return res.status(404).json({ message: 'Order item not found' });
    res.json(item);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Create a new order item
export const createOrderItem = async (req, res) => {
  const item = new OrderItem(req.body);
  try {
    const newItem = await item.save();
    res.status(201).json(newItem);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Update an order item
export const updateOrderItem = async (req, res) => {
  try {
    const item = await OrderItem.findById(req.params.id);
    if (!item) return res.status(404).json({ message: 'Order item not found' });

    item.name = req.body.name || item.name;
    item.quantity = req.body.quantity || item.quantity;
    item.price = req.body.price || item.price;

    const updatedItem = await item.save();
    res.json(updatedItem);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Delete an order item
export const deleteOrderItem = async (req, res) => {
  try {
    const item = await OrderItem.findById(req.params.id);
    if (!item) return res.status(404).json({ message: 'Order item not found' });

    await item.remove();
    res.json({ message: 'Order item deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
