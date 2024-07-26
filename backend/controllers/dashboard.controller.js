import Dashboard from '../models/dashboard.model.js';

// Get all dashboard data
export const getDashboard = async (req, res) => {
  try {
    const dashboard = await Dashboard.find();
    res.json(dashboard);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Create new dashboard data
export const createDashboard = async (req, res) => {
  const dashboard = new Dashboard(req.body);
  try {
    const newDashboard = await dashboard.save();
    res.status(201).json(newDashboard);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Update dashboard data
export const updateDashboard = async (req, res) => {
  try {
    const dashboard = await Dashboard.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(dashboard);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Delete dashboard data
export const deleteDashboard = async (req, res) => {
  try {
    await Dashboard.findByIdAndDelete(req.params.id);
    res.json({ message: 'Deleted Dashboard' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
